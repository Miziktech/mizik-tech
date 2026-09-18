export type Category = "phones" | "tablets" | "laptops";
export type Condition = "new" | "mint" | "good";
export type Availability = "in-stock" | "out-of-stock" | "preorder";
export type ProductImage = {src:string; thumbnail?:string; width:number; height:number; alt:string; view:string; color?:string; sourcePage?:string; originalUrl?:string};
export type Offer = {sku:string; storageGb:number; ramGb?:number; color:string; condition:Condition; availability:Availability; price:number|null; currency:"NGN"; quantity?:number; purchaseUrl?:string};
export type Product = {id:string;slug:string;name:string;brand:string;category:Category;family:string;yearIntroduced:number;chip:string;screenSize:number|null;storageGb:number[];ramGb:number[];colors:string[];specifications:{label:string;value:string}[];images:ProductImage[];sources:string[];offers:Offer[];featured?:boolean;description?:string;memoryByStorage?:Record<string,number[]>;configurationNote?:string;checkedAt?:string;releaseDate?:string};
export const categories = [{slug:"phones" as Category,name:"Phones",description:"From your first iPhone to your next flagship."},{slug:"tablets" as Category,name:"Tablets",description:"Room to create, study and unwind."},{slug:"laptops" as Category,name:"Laptops",description:"MacBooks for wherever the day takes you."}];
export const formatStorage = (gb:number) => gb>=1024 ? (gb/1024)+"TB" : gb+"GB";
export const formatPrice = (price:number) => new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(price);
export const getPrice = (p:Product) => {const prices=p.offers.flatMap(o=>o.price===null?[]:[o.price]);return prices.length?Math.min(...prices):null;};
export const conditionLabels = {new:"New",mint:"Mint",good:"Good"};
export type Filters = {q:string;brand:string;storage:string;ram:string;condition:string;availability:string;min:string;max:string;sort:string;page:number};
export const defaultFilters:Filters={q:"",brand:"all",storage:"all",ram:"all",condition:"all",availability:"all",min:"",max:"",sort:"newest",page:1};
export function readFilters(params:URLSearchParams):Filters {
 const page=Number(params.get("page"));
 return {...defaultFilters,...Object.fromEntries(Object.keys(defaultFilters).filter(k=>k!=="page").map(k=>[k,params.get(k)||defaultFilters[k as keyof Filters]])),page:Number.isInteger(page)&&page>0?page:1};
}
export function filterProducts(items:Product[],f:Filters){
 const terms=f.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
 const filtered=items.filter(p=>{
  if(terms.some(t=>!`${p.name} ${p.brand} ${p.family} ${p.chip} ${p.yearIntroduced}`.toLowerCase().includes(t)))return false;
  if(f.brand!=="all"&&p.brand.toLowerCase()!==f.brand)return false;
  const commercialFilter=f.condition!=="all"&&f.condition!=="enquire"||f.availability!=="all"&&f.availability!=="enquire"||f.min!==""||f.max!=="";
  if((f.condition==="enquire"||f.availability==="enquire")&&p.offers.length)return false;
  if(!p.offers.length){
   if(commercialFilter)return false;
   return (f.storage==="all"||p.storageGb.includes(Number(f.storage)))&&(f.ram==="all"||p.ramGb.includes(Number(f.ram)));
  }
  return p.offers.some(o=>(f.storage==="all"||o.storageGb===Number(f.storage))&&(f.ram==="all"||o.ramGb===Number(f.ram))&&(f.condition==="all"||o.condition===f.condition)&&(f.availability==="all"||o.availability===f.availability)&&(f.min===""||o.price!==null&&o.price>=Number(f.min))&&(f.max===""||o.price!==null&&o.price<=Number(f.max)));
 });
 return filtered.sort((a,b)=>{
  if(f.sort==="name")return a.name.localeCompare(b.name,undefined,{numeric:true});
  if(f.sort==="oldest")return a.yearIntroduced-b.yearIntroduced||a.name.localeCompare(b.name,undefined,{numeric:true});
  if(f.sort==="price-low"||f.sort==="price-high"){const x=getPrice(a),y=getPrice(b);if(x===null)return y===null?0:1;if(y===null)return -1;return f.sort==="price-low"?x-y:y-x;}
  return b.yearIntroduced-a.yearIntroduced||(b.releaseDate||"").localeCompare(a.releaseDate||"")||a.name.localeCompare(b.name,undefined,{numeric:true});
 });
}
