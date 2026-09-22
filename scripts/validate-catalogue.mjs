import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const products = JSON.parse(fs.readFileSync(path.join(root, "data/products.json"), "utf8"));
const inventory = JSON.parse(fs.readFileSync(path.join(root, "data/inventory.json"), "utf8"));
const sources = JSON.parse(fs.readFileSync(path.join(root, "docs/image-sources.json"), "utf8"));
const failures = [];

const unique = (values) => new Set(values).size === values.length;
if (products.length !== 182) failures.push(`Expected 182 catalogue entries, found ${products.length}`);
if (!unique(products.map((product) => product.id))) failures.push("Duplicate product IDs");
if (!unique(products.map((product) => product.slug))) failures.push("Duplicate product slugs");

const counts = Object.groupBy(products, (product) => product.category);
for (const [category, expected] of Object.entries({ phones: 90, tablets: 58, laptops: 34 })) {
  if ((counts[category] || []).length !== expected) failures.push(`${category} count is ${(counts[category] || []).length}, expected ${expected}`);
}

for (const product of products) {
  if (!product.name || !product.brand || !product.chip || !product.storageGb?.length || !product.sources?.length) failures.push(`${product.id}: missing required manufacturer data`);
  if (!product.images?.length) failures.push(`${product.id}: missing imagery`);
  if (product.offers?.length) failures.push(`${product.id}: offers belong in inventory.json`);
  for (const image of product.images || []) {
    for (const relativePath of [image.src, image.thumbnail]) {
      if (!relativePath || !fs.existsSync(path.join(root, "public", relativePath))) failures.push(`${product.id}: missing file ${relativePath}`);
    }
    if (!image.sourcePage || !image.originalUrl || image.width < 1 || image.height < 1) failures.push(`${product.id}: incomplete image metadata`);
  }
  for (const [storage, memory] of Object.entries(product.memoryByStorage || {})) {
    if (!product.storageGb.includes(Number(storage)) || memory.some((value) => !product.ramGb.includes(value))) failures.push(`${product.id}: invalid storage/memory relationship`);
  }
}

for (const [productId, offers] of Object.entries(inventory)) {
  const product = products.find(({ id }) => id === productId);
  if (!product) {
    failures.push(`Unknown inventory product ${productId}`);
    continue;
  }
  for (const offer of offers) {
    if (!product.storageGb.includes(offer.storageGb)) failures.push(`${productId}: invalid offer storage`);
    if (offer.ramGb && !product.ramGb.includes(offer.ramGb)) failures.push(`${productId}: invalid offer RAM`);
    if (offer.price !== null && (!(offer.price > 0) || offer.currency !== "NGN")) failures.push(`${productId}: invalid offer price`);
  }
}

if (sources.images.length < products.length) failures.push("Image source register is incomplete");
for (const image of sources.images) {
  if (!image.sourcePage?.startsWith("https://") || !image.originalUrl?.startsWith("https://") || image.upscaled) failures.push(`${image.productId}: invalid image provenance`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Validated ${products.length} products, ${sources.images.length} image records and ${Object.keys(inventory).length} inventory records.`);
