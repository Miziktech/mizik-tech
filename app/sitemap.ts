import type {MetadataRoute} from "next";
import {products} from "@/lib/products";
const origin="https://mizik-tech.vercel.app";
export default function sitemap():MetadataRoute.Sitemap{return ["","/catalogue","/catalogue/phones","/catalogue/tablets","/catalogue/laptops","/contact","/terms","/privacy",...products.map(p=>"/products/"+p.slug)].map(path=>({url:origin+path,changeFrequency:"weekly",priority:path===""?1:path.startsWith("/products")?.7:.8}));}
