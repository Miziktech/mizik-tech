"use client";
import Link from "next/link";
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main-content" className="not-found container"><h1>A small hiccup.</h1><p>We couldn’t load this page. Please try again.</p><button className="button" onClick={reset}>Try again</button><Link className="text-link" href="/catalogue">Return to the catalogue</Link></main>;}
