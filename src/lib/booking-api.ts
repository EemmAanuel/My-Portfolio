type WorkerEnvironment = {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  BOOKING_ADMIN_TOKEN?: string;
};

type CloudflareRequest = Request & {
  runtime?: {
    cloudflare?: {
      env?: WorkerEnvironment;
    };
  };
};

type BookingInput = {
  name: string;
  email: string;
  service: string;
  budget: string;
  customBudget?: number | null;
  project: string;
  deadline: string;
};

type Estimate = {
  service: string;
  budgetLabel: string;
  amountNgn: number | null;
  deliverables: string[];
  notes: string;
  status: "draft_estimate" | "awaiting_scope";
};

const serviceCategories: Record<string, "design" | "website" | "software" | "complete" | "other"> =
  {
    "Graphic Design": "design",
    "Website Development": "website",
    "Social Media Design": "design",
    "Flyer / Poster": "design",
    "Event Flyer": "design",
    "Social Media Bundle": "design",
    "Business Card": "design",
    "Presentation Design": "design",
    "Logo Design": "design",
    "Logo + Basic Brand Kit": "design",
    "Full Brand Identity": "design",
    "Starter Design Package": "design",
    "Social Media Starter": "design",
    "Brand Starter": "design",
    "Landing Page": "website",
    "Portfolio Website": "website",
    "Business Website": "website",
    "E-commerce Website": "website",
    "Custom Web Application": "software",
    "Custom Software Development": "software",
    "Software Development": "software",
    "Full Digital Experience": "complete",
    Other: "other",
  };

const budgetTiers: Record<string, { label: string; amount: number } | null> = {
  under_25k: { label: "Under ₦25,000", amount: 20000 },
  "25k_50k": { label: "₦25,000 – ₦50,000", amount: 37500 },
  "50k_100k": { label: "₦50,000 – ₦100,000", amount: 75000 },
  "100k_250k": { label: "₦100,000 – ₦250,000", amount: 175000 },
  "250k_500k": { label: "₦250,000 – ₦500,000", amount: 375000 },
  over_500k: { label: "₦500,000+", amount: 500000 },
  custom: null,
  unsure: null,
};

const designServices: Record<string, { minimum: number; core: string[]; expanded: string[] }> = {
  "Social Media Design": {
    minimum: 5000,
    core: ["One custom social media post design", "One revision round", "Final web-ready export"],
    expanded: [
      "Five coordinated social media designs",
      "Consistent visual direction",
      "Two revision rounds",
      "Final web-ready exports",
    ],
  },
  "Flyer / Poster": {
    minimum: 7500,
    core: [
      "One custom flyer or poster design",
      "One revision round",
      "Final print or web-ready export",
    ],
    expanded: [
      "Main flyer/poster design",
      "Two campaign size adaptations",
      "Two revision rounds",
      "Print and web-ready exports",
    ],
  },
  "Event Flyer": {
    minimum: 7500,
    core: ["One event flyer design", "One revision round", "Final web-ready export"],
    expanded: [
      "Main event flyer",
      "Two social format adaptations",
      "Two revision rounds",
      "Final print and web-ready exports",
    ],
  },
  "Social Media Bundle": {
    minimum: 20000,
    core: [
      "Five social media designs",
      "Consistent visual style",
      "Two revision rounds",
      "Web-ready exports",
    ],
    expanded: [
      "Ten coordinated social media designs",
      "Two platform formats",
      "Two revision rounds",
      "Web-ready exports",
    ],
  },
  "Business Card": {
    minimum: 5000,
    core: ["One business card design", "One revision round", "Print-ready file"],
    expanded: [
      "Front and back business card design",
      "Two revision rounds",
      "Print-ready file and digital contact card",
    ],
  },
  "Presentation Design": {
    minimum: 15000,
    core: ["Up to five designed slides", "One revision round", "Editable presentation file"],
    expanded: [
      "Up to fifteen designed slides",
      "Consistent visual system",
      "Two revision rounds",
      "Editable presentation file",
    ],
  },
  "Logo Design": {
    minimum: 20000,
    core: ["One initial logo direction", "One revision round", "Final logo export after approval"],
    expanded: [
      "Two logo directions",
      "Two revision rounds",
      "Primary and alternate logo exports",
      "Basic usage notes",
    ],
  },
  "Logo + Basic Brand Kit": {
    minimum: 35000,
    core: ["Logo design", "Basic color palette", "Two revision rounds", "Final logo exports"],
    expanded: [
      "Logo and alternate lockup",
      "Color palette and typography",
      "Three social templates",
      "Basic brand guide",
    ],
  },
  "Full Brand Identity": {
    minimum: 60000,
    core: [
      "Core logo system",
      "Color and typography direction",
      "Two revision rounds",
      "Basic brand guide",
    ],
    expanded: [
      "Full logo system and visual identity",
      "Color and typography system",
      "Three branded templates",
      "Brand guide and asset exports",
    ],
  },
  "Starter Design Package": {
    minimum: 25000,
    core: [
      "Logo",
      "Business card",
      "Two social media designs",
      "Basic color palette",
      "Two revision rounds",
    ],
    expanded: [
      "Starter identity package",
      "Three social media designs",
      "Basic brand guide",
      "Two revision rounds",
    ],
  },
  "Social Media Starter": {
    minimum: 20000,
    core: ["Five social media designs", "Consistent visual style", "Two revision rounds"],
    expanded: [
      "Eight social media designs",
      "Consistent visual style",
      "Reusable post template",
      "Two revision rounds",
    ],
  },
  "Brand Starter": {
    minimum: 35000,
    core: [
      "Logo",
      "Color palette",
      "Typography",
      "Three social media templates",
      "Basic brand guide",
    ],
    expanded: [
      "Logo and alternate lockup",
      "Color and typography system",
      "Five social templates",
      "Expanded brand guide",
    ],
  },
};

const websiteServices: Record<string, { minimum: number; core: string[]; expanded: string[] }> = {
  "Landing Page": {
    minimum: 100000,
    core: [
      "One responsive landing page",
      "Contact call-to-action",
      "Basic on-page SEO",
      "Deployment",
    ],
    expanded: [
      "One responsive landing page",
      "Conversion-focused sections",
      "Contact form integration",
      "Basic analytics and SEO",
      "Deployment",
    ],
  },
  "Portfolio Website": {
    minimum: 120000,
    core: [
      "Responsive portfolio site",
      "Up to four content sections",
      "Contact call-to-action",
      "Deployment",
    ],
    expanded: [
      "Responsive portfolio site",
      "Up to six content sections",
      "Project gallery",
      "Basic SEO and deployment",
    ],
  },
  "Business Website": {
    minimum: 180000,
    core: [
      "Responsive business website",
      "Up to five pages",
      "Contact pathway",
      "Basic SEO and deployment",
    ],
    expanded: [
      "Responsive business website",
      "Up to eight pages",
      "Lead capture form",
      "Basic SEO and deployment",
    ],
  },
  "E-commerce Website": {
    minimum: 250000,
    core: ["Storefront setup", "Up to ten product listings", "Core shopping flow", "Deployment"],
    expanded: [
      "Storefront setup",
      "Up to twenty product listings",
      "Core shopping flow",
      "Payment provider integration",
      "Deployment",
    ],
  },
};

const softwareScope: Record<string, string[]> = {
  discovery: [
    "Requirements and workflow discovery",
    "Written technical scope",
    "Prioritized feature plan",
  ],
  prototype: [
    "Requirements and workflow discovery",
    "Interactive interface prototype",
    "Technical delivery plan",
  ],
  module: [
    "One agreed core workflow",
    "Working first software module",
    "Basic data model",
    "Handover notes",
  ],
  extended: [
    "Agreed application modules",
    "Database-backed workflows",
    "Integration planning",
    "Deployment and handover",
  ],
};

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

function requestIsSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  return !!origin && origin === new URL(request.url).origin;
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
  const contentType = request.headers.get("content-type") ?? "";
  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (!contentType.includes("application/json") || declaredLength > 20000) return null;
  const text = await request.text();
  if (text.length > 20000) return null;
  try {
    const value: unknown = JSON.parse(text);
    return value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function getBudget(
  value: unknown,
  customValue?: unknown,
): { label: string; amount: number | null } | null {
  if (typeof value !== "string" || !Object.hasOwn(budgetTiers, value)) return null;
  if (value === "custom") {
    const amount = Number(customValue);
    if (!Number.isSafeInteger(amount) || amount < 1000 || amount > 50000000) return null;
    return { label: `Custom budget — ₦${amount.toLocaleString("en-NG")}`, amount };
  }
  const tier = budgetTiers[value];
  if (!tier) return { label: "Not sure yet", amount: null };
  return tier;
}

function estimateFor(service: string, budget: { label: string; amount: number | null }): Estimate {
  const category = serviceCategories[service];
  if (!category) throw new Error("Unsupported service");
  const amount = budget.amount;

  if (category === "design") {
    const plan = designServices[service];
    if (!plan || amount === null) {
      return {
        service,
        budgetLabel: budget.label,
        amountNgn: null,
        deliverables: ["Service-specific deliverables to be confirmed after project review"],
        notes: "A priced estimate needs an agreed scope and budget.",
        status: "awaiting_scope",
      };
    }
    const deliverables =
      amount < plan.minimum
        ? [
            "A reduced-scope concept or design direction",
            "Final production files and extended revisions are excluded at this budget",
          ]
        : amount >= plan.minimum * 2
          ? plan.expanded
          : plan.core;
    return {
      service,
      budgetLabel: budget.label,
      amountNgn: amount,
      deliverables,
      notes:
        amount < plan.minimum
          ? `The selected budget is below the usual ${service} starting price. The estimate is limited to early-stage design scope.`
          : "Scope is matched to the selected budget and remains subject to review.",
      status: "draft_estimate",
    };
  }

  if (category === "website") {
    const plan = websiteServices[service];
    if (!plan || amount === null) {
      return {
        service,
        budgetLabel: budget.label,
        amountNgn: null,
        deliverables: ["Website scope to be confirmed after project review"],
        notes: "A priced estimate needs an agreed scope and budget.",
        status: "awaiting_scope",
      };
    }
    const deliverables =
      amount < plan.minimum
        ? [
            "Website requirements and page outline",
            "No coded production website or deployment included at this budget",
          ]
        : amount >= plan.minimum * 1.5
          ? plan.expanded
          : plan.core;
    return {
      service,
      budgetLabel: budget.label,
      amountNgn: amount,
      deliverables,
      notes:
        amount < plan.minimum
          ? `The selected budget is below the usual ${service} starting price. This estimate covers planning, not a finished website.`
          : "Scope is matched to the selected budget and remains subject to review.",
      status: "draft_estimate",
    };
  }

  if (category === "software") {
    const scope: keyof typeof softwareScope =
      amount === null
        ? "discovery"
        : amount < 50000
          ? "discovery"
          : amount < 150000
            ? "prototype"
            : amount < 500000
              ? "module"
              : "extended";
    return {
      service,
      budgetLabel: budget.label,
      amountNgn: amount,
      deliverables: softwareScope[scope] ?? [
        "Requirements and workflow discovery",
        "Written technical scope",
        "Prioritized feature plan",
      ],
      notes:
        "Custom software is scope-based. This is a budget-aligned estimate, not a fixed-price commitment.",
      status: amount === null ? "awaiting_scope" : "draft_estimate",
    };
  }

  if (category === "complete") {
    const deliverables =
      amount !== null && amount >= 500000
        ? [
            "Brand identity starter scope",
            "Responsive website scope",
            "Software requirements and workflow discovery",
            "Deployment plan",
          ]
        : amount !== null && amount >= 100000
          ? [
              "Brand direction and core identity",
              "Website page plan and visual direction",
              "Software workflow discovery",
            ]
          : [
              "Project discovery and digital presence roadmap",
              "Prioritized brand, website, and software phases",
            ];
    return {
      service,
      budgetLabel: budget.label,
      amountNgn: amount,
      deliverables,
      notes:
        "A multi-stage digital experience requires final scope confirmation before a payable invoice is issued.",
      status: "awaiting_scope",
    };
  }

  return {
    service,
    budgetLabel: budget.label,
    amountNgn: amount,
    deliverables: [
      "Project discovery",
      "Service scope and deliverables to be agreed with the client",
    ],
    notes: "The estimate will be finalized after project details are reviewed.",
    status: "awaiting_scope",
  };
}

function validInput(data: Record<string, unknown>): BookingInput | null {
  const name = typeof data["name"] === "string" ? data["name"].trim() : "";
  const email = typeof data["email"] === "string" ? data["email"].trim().toLowerCase() : "";
  const service = typeof data["service"] === "string" ? data["service"] : "";
  const budget = typeof data["budget"] === "string" ? data["budget"] : "";
  const project = typeof data["project"] === "string" ? data["project"].trim() : "";
  const deadline = typeof data["deadline"] === "string" ? data["deadline"] : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const parsedDeadline = new Date(`${deadline}T00:00:00.000Z`);
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (name.length < 2 || name.length > 120) return null;
  if (email.length > 254 || !emailPattern.test(email)) return null;
  if (!Object.hasOwn(serviceCategories, service)) return null;
  if (!Object.hasOwn(budgetTiers, budget) || !getBudget(budget, data["customBudget"])) return null;
  if (project.length < 10 || project.length > 5000) return null;
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(deadline) ||
    Number.isNaN(parsedDeadline.valueOf()) ||
    parsedDeadline.toISOString().slice(0, 10) !== deadline ||
    parsedDeadline < today
  )
    return null;

  const customBudget = budget === "custom" ? Number(data["customBudget"]) : null;
  return { name, email, service, budget, customBudget, project, deadline };
}

function invoiceNumber(date: Date): string {
  const day = date.toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `SETH-${day}-${suffix}`;
}

function toEstimate(data: Record<string, unknown>): Estimate | null {
  const service = typeof data["service"] === "string" ? data["service"] : "";
  if (!Object.hasOwn(serviceCategories, service)) return null;
  const budget = getBudget(data["budget"], data["customBudget"]);
  if (!budget) return null;
  return estimateFor(service, budget);
}

function sameToken(left: string, right: string): boolean {
  const encoder = new TextEncoder();
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  let difference = leftBytes.length ^ rightBytes.length;
  const length = Math.max(leftBytes.length, rightBytes.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }
  return difference === 0;
}

function getSupabaseConfig(
  environment: WorkerEnvironment,
): { baseUrl: string; serviceKey: string } | null {
  const configuredUrl = environment.SUPABASE_URL?.trim();
  const serviceKey = environment.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!configuredUrl || !serviceKey) return null;

  try {
    const url = new URL(configuredUrl);
    const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (
      (!isLocal && url.protocol !== "https:") ||
      (isLocal && !["http:", "https:"].includes(url.protocol))
    )
      return null;
    if (url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
    return { baseUrl: url.origin, serviceKey };
  } catch {
    return null;
  }
}

function supabaseHeaders(serviceKey: string): HeadersInit {
  const headers: Record<string, string> = {
    apikey: serviceKey,
    "content-type": "application/json",
    accept: "application/json",
  };
  if (!serviceKey.startsWith("sb_secret_")) {
    headers.authorization = `Bearer ${serviceKey}`;
  }
  return headers;
}

async function readSupabaseJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function handleBookingApi(
  request: Request,
  rawEnvironment: unknown,
): Promise<Response | null> {
  const url = new URL(request.url);
  const requestEnvironment = (request as CloudflareRequest).runtime?.cloudflare?.env;
  const viteEnvironment =
    typeof import.meta !== "undefined" && import.meta.env ? import.meta.env : {};
  const processEnvironment = typeof process !== "undefined" && process.env ? process.env : {};
  const environment = {
    ...(processEnvironment as Record<string, string | undefined>),
    ...(viteEnvironment as Record<string, string | undefined>),
    ...((rawEnvironment ?? requestEnvironment ?? {}) as WorkerEnvironment),
  } as WorkerEnvironment;

  if (url.pathname === "/api/quotes/preview") {
    if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
    if (!requestIsSameOrigin(request))
      return jsonResponse({ error: "Request origin is not allowed" }, 403);
    const data = await readJson(request);
    const estimate = data ? toEstimate(data) : null;
    if (!estimate) return jsonResponse({ error: "Choose a valid service and budget." }, 400);
    return jsonResponse({ estimate });
  }

  if (url.pathname === "/api/bookings") {
    if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
    if (!requestIsSameOrigin(request))
      return jsonResponse({ error: "Request origin is not allowed" }, 403);
    const data = await readJson(request);
    const input = data ? validInput(data) : null;
    if (!input)
      return jsonResponse({ error: "Please check all booking fields and try again." }, 400);
    const supabase = getSupabaseConfig(environment);
    if (!supabase) return jsonResponse({ error: "Booking storage is not configured yet." }, 503);

    const now = new Date();
    const bookingId = crypto.randomUUID();
    const invoiceId = crypto.randomUUID();
    const number = invoiceNumber(now);
    const budget = getBudget(input.budget, input.customBudget);
    if (!budget) return jsonResponse({ error: "Choose a valid budget." }, 400);
    const estimate = estimateFor(input.service, budget);
    const bookingStatus =
      estimate.status === "awaiting_scope" ? "received_needs_quote" : "received";
    const invoiceNotes = `${estimate.notes} This document is a draft estimate, not a payment demand. Final scope, price, tax, and payment terms require confirmation.`;

    const invoice = {
      id: invoiceId,
      number,
      service: input.service,
      budgetLabel: budget.label,
      amountNgn: estimate.amountNgn,
      currency: "NGN",
      status: estimate.status,
      deliverables: estimate.deliverables,
      notes: invoiceNotes,
      createdAt: now.toISOString(),
    };

    try {
      const response = await fetch(`${supabase.baseUrl}/rest/v1/rpc/create_booking_with_invoice`, {
        method: "POST",
        headers: supabaseHeaders(supabase.serviceKey),
        body: JSON.stringify({
          p_booking: {
            id: bookingId,
            client_name: input.name,
            client_email: input.email,
            service: input.service,
            budget_label: budget.label,
            custom_budget_ngn: input.customBudget,
            project_description: input.project,
            preferred_deadline: input.deadline,
            status: bookingStatus,
            created_at: now.toISOString(),
          },
          p_invoice: {
            id: invoiceId,
            invoice_number: number,
            booking_id: bookingId,
            service: input.service,
            budget_label: budget.label,
            amount_ngn: estimate.amountNgn,
            currency: "NGN",
            status: estimate.status,
            deliverables: estimate.deliverables,
            notes: invoiceNotes,
            created_at: now.toISOString(),
          },
        }),
      });
      if (!response.ok) {
        console.error("Supabase booking transaction failed with status", response.status);
        return jsonResponse(
          { error: "The booking could not be saved. Please try again shortly." },
          503,
        );
      }
    } catch (error) {
      console.error("Failed to reach Supabase booking transaction", error);
      return jsonResponse(
        { error: "The booking could not be saved. Please try again shortly." },
        503,
      );
    }

    return jsonResponse(
      {
        bookingId,
        bookingStatus,
        invoice,
      },
      201,
    );
  }

  if (url.pathname.startsWith("/api/invoices/")) {
    if (request.method !== "GET") return jsonResponse({ error: "Method not allowed" }, 405);
    const supabase = getSupabaseConfig(environment);
    if (!supabase) return jsonResponse({ error: "Invoice storage is not configured." }, 503);
    const id = url.pathname.slice("/api/invoices/".length);
    if (!/^[0-9a-f-]{36}$/i.test(id)) return jsonResponse({ error: "Invoice not found." }, 404);
    try {
      const query = new URLSearchParams({
        id: `eq.${id}`,
        select:
          "id,invoice_number,service,budget_label,amount_ngn,currency,status,deliverables,notes,created_at",
        limit: "1",
      });
      const response = await fetch(`${supabase.baseUrl}/rest/v1/invoices?${query}`, {
        headers: supabaseHeaders(supabase.serviceKey),
      });
      if (!response.ok)
        return jsonResponse({ error: "Invoice lookup is temporarily unavailable." }, 503);
      const result: unknown = await readSupabaseJson(response);
      if (!Array.isArray(result) || result.length === 0)
        return jsonResponse({ error: "Invoice not found." }, 404);
      const row = result[0] as Record<string, unknown>;
      return jsonResponse({
        invoice: {
          id: row["id"],
          number: row["invoice_number"],
          service: row["service"],
          budgetLabel: row["budget_label"],
          amountNgn: row["amount_ngn"],
          currency: row["currency"],
          status: row["status"],
          deliverables: row["deliverables"],
          notes: row["notes"],
          createdAt: row["created_at"],
        },
      });
    } catch (error) {
      console.error("Failed to reach Supabase invoice lookup", error);
      return jsonResponse({ error: "Invoice lookup is temporarily unavailable." }, 503);
    }
  }

  if (url.pathname === "/api/admin/bookings") {
    if (request.method !== "GET") return jsonResponse({ error: "Method not allowed" }, 405);
    const token = environment.BOOKING_ADMIN_TOKEN;
    const supplied = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
    if (!token || !supplied || !sameToken(supplied, token))
      return jsonResponse({ error: "Unauthorized" }, 401);
    const supabase = getSupabaseConfig(environment);
    if (!supabase) return jsonResponse({ error: "Booking storage is not configured." }, 503);
    const limitValue = Number(url.searchParams.get("limit") ?? 50);
    const limit = Number.isInteger(limitValue) ? Math.min(100, Math.max(1, limitValue)) : 50;
    try {
      const query = new URLSearchParams({
        select:
          "id,client_name,client_email,service,budget_label,custom_budget_ngn,project_description,preferred_deadline,status,created_at,invoices(id,invoice_number,amount_ngn,status,deliverables)",
        order: "created_at.desc",
        limit: String(limit),
      });
      const response = await fetch(`${supabase.baseUrl}/rest/v1/bookings?${query}`, {
        headers: supabaseHeaders(supabase.serviceKey),
      });
      if (!response.ok)
        return jsonResponse({ error: "Bookings are temporarily unavailable." }, 503);
      const rows: unknown = await readSupabaseJson(response);
      if (!Array.isArray(rows))
        return jsonResponse({ error: "Bookings are temporarily unavailable." }, 503);
      const bookings = rows.map((value: unknown) => {
        const row = value as Record<string, unknown>;
        const relatedInvoices = row["invoices"];
        const invoice = Array.isArray(relatedInvoices) ? relatedInvoices[0] : relatedInvoices;
        return {
          id: row["id"],
          name: row["client_name"],
          email: row["client_email"],
          service: row["service"],
          budget: row["budget_label"],
          customBudgetNgn: row["custom_budget_ngn"],
          project: row["project_description"],
          deadline: row["preferred_deadline"],
          bookingStatus: row["status"],
          createdAt: row["created_at"],
          invoice,
        };
      });
      return jsonResponse({ bookings });
    } catch (error) {
      console.error("Failed to reach Supabase booking list", error);
      return jsonResponse({ error: "Bookings are temporarily unavailable." }, 503);
    }
  }

  return null;
}
