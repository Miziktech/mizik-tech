"use client";
import {useState} from "react";
import {Phone,Copy,MessageCircle,ArrowUpRight,Mail} from "lucide-react";
import {toast} from "sonner";
import store from "@/data/store.json";
export function ContactEnquiry({initialMessage}:{initialMessage:string}){
 const [message,setMessage]=useState(initialMessage);
 async function copy(){try{await navigator.clipboard.writeText(message);toast.success("Enquiry copied. Share it with MizikTech.");}catch{toast.error("Select the message and copy it to share with MizikTech.");}}
 return <div className="enquiry-card"><span className="eyebrow">YOUR ENQUIRY</span><h2>Tell us what you’re looking for.</h2><label htmlFor="enquiry-message">Device, preferred specs and budget</label><textarea id="enquiry-message" value={message} onChange={e=>setMessage(e.target.value)} rows={7} maxLength={2000}/><button className="copy-enquiry" onClick={copy}><Copy size={17}/> Copy enquiry</button><div className="contact-actions">{store.whatsapp?<a href={"https://wa.me/"+store.whatsapp.replace(/\D/g,"")+"?text="+encodeURIComponent(message)} target="_blank" rel="noopener noreferrer" className="button"><MessageCircle size={20}/> Enquire on WhatsApp <ArrowUpRight size={19}/></a>:<a href={"tel:"+store.phone} className="button"><Phone size={20}/> Call MizikTech <ArrowUpRight size={19}/></a>}{store.email&&<a href={"mailto:"+store.email+"?subject="+encodeURIComponent("Device enquiry — MizikTech")+"&body="+encodeURIComponent(message)} className="button button-outline"><Mail size={19}/> Email your enquiry</a>}</div><p className="enquiry-note">Your message stays on this page until you choose to copy or share it. Selecting a device does not reserve stock.</p></div>;
}
