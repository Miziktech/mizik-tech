# MizikTech catalogue

A responsive device catalogue built with React, TypeScript and Next.js App Router conventions, running on Vinext for a Cloudflare-compatible deployment.

The catalogue contains 182 researched Apple, Samsung and Google model and chip variants across phones, tablets and laptops. It includes the branded homepage, category and brand browsing, search, filters, sorting, dedicated product pages, multi-image galleries, configuration preferences and call enquiries.

## Run locally

Use Node.js 22.13 or later.

```sh
npm ci
npm run validate:catalogue
npm run dev
npm run build
```

## Catalogue and stock

- `data/products.json` contains manufacturer model information and locally hosted product galleries.
- `data/inventory.json` contains MizikTech offers keyed by product ID, separate from manufacturer specifications. Empty offers mean price, condition and availability must be confirmed by enquiry.
- `data/store.json` contains business contact settings. The current call number comes from page 16 of the supplied MizikTech brand manual. WhatsApp and email actions activate when those details are supplied.
- `lib/catalogue.ts` contains the shared product types, formatting and filtering.
- `lib/products.ts` joins catalogue records with live inventory.
- `docs/image-sources.json` records each image's exact product, source page, original URL, native and web dimensions, hash and rights context.

No prices, stock quantities, warranty promises or delivery terms have been invented. Product configuration selection prepares an enquiry and does not reserve inventory or take payment.

## Adding stock

Add an array under a product ID in `data/inventory.json`. Each offer supports a unique SKU, storage, optional RAM, colour, condition, availability, nullable NGN price, optional quantity and an optional purchase URL. Only use configurations listed by that product. Run `npm run validate:catalogue` after an update.

## Brand and imagery

The supplied MizikTech brand manual defines the palette, extracted logo assets, Bricolage Grotesque headlines and Poppins body type. The font licences are stored alongside the font files. Product galleries use locally optimized, exact-model manufacturer assets; no product images were AI-generated or upscaled.

Manufacturer copyright remains applicable. The source register identifies media assets whose commercial catalogue permission was not established during research. The deployed owner-only preview is suitable for review; replace or license those records under MizikTech's reseller or media agreement before making the catalogue public or using them in paid advertising.

## Hosting

`.openai/hosting.json` preserves the registered private Sites project. The app also uses standard App Router conventions for deployment to another compatible provider.
