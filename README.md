# MizikTech catalogue

A responsive device catalogue built with React, TypeScript and Next.js App Router conventions, running on Vinext for a Cloudflare-compatible deployment.

This checkpoint includes the branded homepage, searchable catalogue, category and brand browsing, filters, sorting, product pages, image galleries, configuration preferences and call enquiries. The comprehensive historical catalogue and final manufacturer image audit are in progress; the current checked-in catalogue contains representative devices.

## Run locally

Use Node.js 22.13 or later.

```sh
npm ci
npm run dev
npm run build
```

## Catalogue and stock

- `data/products.json`: manufacturer model information and locally hosted product galleries.
- `data/inventory.json`: offers keyed by product ID, separate from manufacturer specifications. Empty offers mean price, condition and availability must be confirmed by enquiry.
- `data/store.json`: business contact settings. The current call number comes from page 16 of the supplied MizikTech brand manual. WhatsApp and email actions activate when those details are supplied.
- `lib/catalogue.ts`: shared product types, formatting and filtering.
- `lib/products.ts`: catalogue and inventory loading.

No prices, stock quantities, warranty promises or delivery terms have been invented. Product configuration selection prepares an enquiry and does not reserve inventory or take payment.

## Brand and imagery

The supplied MizikTech brand manual defines the palette, extracted logo assets, Bricolage Grotesque headlines and Poppins body type. Product images are optimized local manufacturer assets. Manufacturer copyright and reuse rights remain with their respective owners; public availability does not itself establish a commercial reuse licence.

## Hosting

The `.openai/hosting.json` file preserves the registered Sites project. The code can also run with the declared Next.js dependency and App Router conventions. For a separate hosting provider, retain the product architecture and configure that provider's build commands and canonical origin.
