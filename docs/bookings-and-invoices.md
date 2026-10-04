# Bookings and Draft Estimates

Booking requests and invoice snapshots are stored in Cloudflare D1. The generated document is a draft estimate, not a tax invoice, payment demand, or proof of payment. Final scope, price, tax treatment, and payment terms must be confirmed with the client.

## Configure Cloudflare

1. Create the D1 database: `npx wrangler d1 create seth-portfolio-bookings`.
2. Copy the returned database ID into the `CLOUDFLARE_D1_DATABASE_ID` build environment variable. The local default is `local`; production builds must use the real ID.
3. Apply the schema locally with `npx wrangler d1 migrations apply seth-portfolio-bookings --local` and remotely with `npx wrangler d1 migrations apply seth-portfolio-bookings --remote`.
4. Set the owner-only booking review secret with `npx wrangler secret put BOOKING_ADMIN_TOKEN`. Keep this secret out of source control and frontend code.
5. Run the app with `npm run dev`. For deployment, build with `CLOUDFLARE_D1_DATABASE_ID` set and deploy the generated `.output/server/wrangler.json` configuration.

## API

- `POST /api/quotes/preview` calculates service deliverables from the selected budget without storing personal data.
- `POST /api/bookings` validates and stores the booking and its numbered draft estimate together in D1.
- `GET /api/invoices/{id}` retrieves a saved estimate using its unguessable invoice ID.
- `GET /api/admin/bookings` lists recent bookings and invoice snapshots. Send `Authorization: Bearer <BOOKING_ADMIN_TOKEN>`; restrict this token to the owner.

The booking form only reports success after D1 confirms the write. After the booking is saved, the client can print the estimate or explicitly send the booking details to the existing WhatsApp contact. Email delivery, payment collection, and a tax-compliant final invoice are not configured by this backend.