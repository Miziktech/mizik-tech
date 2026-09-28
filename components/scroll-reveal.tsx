"use client";

import {useEffect} from "react";

const targets = ".section-heading, .category-tile, .product-card, .brands-section, .contact-band, .specification-section, .contact-page-grid, .text-page";

export function ScrollReveal() {
 useEffect(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const seen = new WeakSet<Element>();
  const observer = new IntersectionObserver(entries => {
   for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
   }
  }, {threshold:0.06, rootMargin:'0px 0px -5% 0px'});

  const scan = () => {
   document.querySelectorAll<HTMLElement>(targets).forEach(element => {
    if (seen.has(element)) return;
    seen.add(element);
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    element.classList.add('scroll-reveal');
    observer.observe(element);
   });
  };

  scan();
  let frame = 0;
  const mutations = new MutationObserver(() => {
   cancelAnimationFrame(frame);
   frame = requestAnimationFrame(scan);
  });
  mutations.observe(document.body, {childList:true, subtree:true});
  return () => {
   cancelAnimationFrame(frame);
   mutations.disconnect();
   observer.disconnect();
  };
 }, []);

 return null;
}
