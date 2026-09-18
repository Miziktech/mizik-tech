import catalogue from "@/data/products.json";
import inventory from "@/data/inventory.json";
import type {Product,Offer} from "@/lib/catalogue";
const offers=inventory as Record<string,Offer[]>;
export const products=(catalogue as Product[]).map(p=>({...p,offers:offers[p.id]||p.offers||[]}));
export const getProduct=(slug:string)=>products.find(p=>p.slug===slug);
export const cardProducts=(items:Product[])=>items.map(p=>({...p,specifications:[],sources:[],images:p.images.slice(0,1),description:undefined,configurationNote:undefined,memoryByStorage:undefined}));
