import Link from "next/link";
import Image from "next/image";
import {ArrowUpRight} from "lucide-react";
import {Product,getPrice,formatPrice,formatStorage} from "@/lib/catalogue";
export function ProductCard({product:p}:{product:Product}) {
 const price=getPrice(p);const image=p.images[0];const availability=p.offers.some(o=>o.availability==="in-stock")?"In stock":p.offers.some(o=>o.availability==="preorder")?"Pre-order":p.offers.length?"Out of stock":"Enquire for availability";
 return <article className="product-card"><Link className="product-image-link" href={"/products/"+p.slug} aria-label={"View "+p.name}><span className="product-year">{p.yearIntroduced} MODEL</span><Image src={image.thumbnail||image.src} alt={image.alt} width={image.width} height={image.height} unoptimized loading="lazy"/>{image.credit&&<small className="image-credit">{image.credit}</small>}<span className="card-arrow"><ArrowUpRight size={19}/></span></Link><div className="product-card-copy"><span className="product-brand">{p.brand} / {p.family}</span><h3><Link href={"/products/"+p.slug}>{p.name}</Link></h3><p className="product-summary">{p.chip}{p.screenSize?" · "+p.screenSize+"″":""}</p><p className="storage-summary">{p.storageGb.map(formatStorage).join(" / ")}</p><div className="product-card-bottom"><strong>{price===null?"Price on request":formatPrice(price)}</strong><span>{availability}</span></div></div></article>;
}
