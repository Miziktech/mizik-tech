import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {CatalogueBrowser} from "@/components/catalogue-browser";
import {Category,readFilters,categories} from "@/lib/catalogue";
import {products,cardProducts} from "@/lib/products";
type Props={params:Promise<{category?:string[]}>;searchParams:Promise<Record<string,string|string[]|undefined>>};
export async function generateMetadata({params}:Props):Promise<Metadata>{const {category}=await params;const name=categories.find(c=>c.slug===category?.[0])?.name;return {title:name||"Device catalogue",description:"Browse "+(name?.toLowerCase()||"phones, tablets and MacBooks")+" from Apple, Samsung and Google. Choose your specifications and enquire with MizikTech.",alternates:{canonical:"/catalogue"+(category?"/"+category.join("/"):"")}};}
export default async function CataloguePage({params,searchParams}:Props){const [{category},query]=await Promise.all([params,searchParams]);if(category&&(category.length!==1||!categories.some(c=>c.slug===category[0])))notFound();const selected=category?.[0] as Category|undefined;const paramsQuery=new URLSearchParams();Object.entries(query).forEach(([k,v])=>{if(typeof v==="string")paramsQuery.set(k,v);});const items=selected?products.filter(p=>p.category===selected):products;return <main id="main-content"><CatalogueBrowser key={(selected||"all")+paramsQuery.toString()} items={cardProducts(items)} category={selected} initial={readFilters(paramsQuery)}/></main>;}
