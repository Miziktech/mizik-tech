import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
export default function NotFound(){return <main id="main-content" className="not-found container"><span className="eyebrow">LET’S GET YOU BACK ON TRACK</span><h1>This page is<br/>out of reach.</h1><p>The device or page you’re looking for could not be found.</p><Link href="/catalogue" className="button">Explore the catalogue <ArrowUpRight size={20}/></Link></main>;}
