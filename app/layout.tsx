import type {Metadata} from "next";
import "./globals.css";
import {SiteHeader} from "@/components/site-header";
import {Toaster} from "@/components/ui/sonner";
import {SiteFooter} from "@/components/site-footer";
import {ScrollReveal} from "@/components/scroll-reveal";
export const metadata:Metadata = {
 metadataBase:new URL("https://mizik-tech.vercel.app"),
 title:{default:"MizikTech — Quality devices. Honest value.",template:"%s | MizikTech"},
 description:"Explore iPhones, Samsung Galaxy and Google Pixel phones, iPads, Galaxy tablets, MacBooks and smartwatches at MizikTech. Quality devices and honest value from Lagos.",
 icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><head><link rel="preload" href="/fonts/bricolage-bold.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/></head><body><SiteHeader/>{children}<SiteFooter/><ScrollReveal/><Toaster richColors/></body></html>;
}
