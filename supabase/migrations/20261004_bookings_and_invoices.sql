create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_email text not null,
  service text not null,
  budget_label text,
  custom_budget_ngn integer,
  project_description text not null,
  preferred_deadline date not null,
  status text not null default 'received',
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  booking_id uuid not null references public.bookings(id) on delete cascade,
  service text not null,
  budget_label text,
  amount_ngn integer,
  currency text not null default 'NGN',
  status text not null default 'draft_estimate',
  deliverables jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists bookings_created_at_idx on public.bookings(created_at desc);
create index if not exists bookings_status_idx on public.bookings(status);
create index if not exists invoices_booking_id_idx on public.invoices(booking_id);
create index if not exists invoices_status_idx on public.invoices(status);

create or replace function public.create_booking_with_invoice(p_booking jsonb, p_invoice jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_booking public.bookings;
  v_invoice public.invoices;
begin
  insert into public.bookings (
    id,
    client_name,
    client_email,
    service,
    budget_label,
    custom_budget_ngn,
    project_description,
    preferred_deadline,
    status,
    created_at
  ) values (
    coalesce((p_booking ->> 'id')::uuid, gen_random_uuid()),
    p_booking ->> 'client_name',
    p_booking ->> 'client_email',
    p_booking ->> 'service',
    p_booking ->> 'budget_label',
    nullif(p_booking ->> 'custom_budget_ngn', '')::integer,
    p_booking ->> 'project_description',
    (p_booking ->> 'preferred_deadline')::date,
    coalesce(p_booking ->> 'status', 'received'),
    coalesce((p_booking ->> 'created_at')::timestamptz, now())
  ) returning * into v_booking;

  insert into public.invoices (
    id,
    invoice_number,
    booking_id,
    service,
    budget_label,
    amount_ngn,
    currency,
    status,
    deliverables,
    notes,
    created_at
  ) values (
    coalesce((p_invoice ->> 'id')::uuid, gen_random_uuid()),
    p_invoice ->> 'invoice_number',
    v_booking.id,
    p_invoice ->> 'service',
    p_invoice ->> 'budget_label',
    nullif(p_invoice ->> 'amount_ngn', '')::integer,
    coalesce(p_invoice ->> 'currency', 'NGN'),
    coalesce(p_invoice ->> 'status', 'draft_estimate'),
    coalesce(p_invoice -> 'deliverables', '[]'::jsonb),
    p_invoice ->> 'notes',
    coalesce((p_invoice ->> 'created_at')::timestamptz, now())
  ) returning * into v_invoice;

  return jsonb_build_object(
    'booking', to_jsonb(v_booking),
    'invoice', to_jsonb(v_invoice)
  );
end;
$$;

alter table public.bookings enable row level security;
alter table public.invoices enable row level security;

drop policy if exists "Allow service role to manage bookings" on public.bookings;
drop policy if exists "Allow service role to manage invoices" on public.invoices;

revoke all on function public.create_booking_with_invoice(jsonb, jsonb) from public, anon, authenticated;
grant execute on function public.create_booking_with_invoice(jsonb, jsonb) to service_role;
