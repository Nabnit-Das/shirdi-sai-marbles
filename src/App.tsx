import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
  Calculator,
  Clock,
  ShieldCheck,
  Truck,
  Star,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Award,
} from "lucide-react";
import { ScrollCanvas } from "./ScrollCanvas";
import { saveEnquiryToSupabase } from "./lib/supabase";

export const siteData = {
  name: "Shirdi Sai Marbles & Tiles",
  nameOdia: "ଶିରିଡି ସାଇ ମାର୍ବଲ୍ସ ଓ ଟାଇଲ୍ସ",
  tagline: "Building Beautiful Spaces in Odisha",
  addressLine1: "Raniramchandrapur, Gariapur",
  addressLine2: "Jajpur Town, Odisha - 755001",
  phones: ["9438467960", "7606890777"],
  hours: "Mon – Sat: 9:00 AM – 8:00 PM | Sun: 9:00 AM – 7:00 PM (Open All 7 Days)",
  hoursMonSat: "Monday – Saturday: 9:00 AM – 8:00 PM",
  hoursSun: "Sunday: 9:00 AM – 7:00 PM",
  yearsInBusiness: "16 Years in Business (Since 2010)",
};

export const defaultWhatsAppMessage =
  "Hello Shirdi Sai Marbles & Tiles, I am planning a home project in Odisha and would like information on your designs and prices.";

export const getWhatsAppUrl = (
  phone: string,
  text: string = defaultWhatsAppMessage
) => `https://wa.me/91${phone}?text=${encodeURIComponent(text)}`;

export const getTelUrl = (phone: string) => `tel:+91${phone}`;

export const googleMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Shirdi%20Sai%20Marbles%20%26%20Tiles%2C%20Raniramchandrapur%2C%20Gariapur%2C%20Jajpur%20Town%2C%20Odisha%20755001";

export interface ProductItem {
  id: string;
  name: string;
  category: "floor" | "wall" | "marble" | "stone";
  categoryLabel: string;
  img: string;
  desc: string;
  sizes: string;
  finish: string;
  bestFor: string;
}

export const products: ProductItem[] = [
  {
    id: "floor-tiles",
    name: "Premium Floor Tiles",
    category: "floor",
    categoryLabel: "Floor Tiles",
    img: "/assets/floor-qtPy_ZYX.jpg",
    desc: "Large-format polished surfaces that give rooms an open, luxurious marble-like shine.",
    sizes: "600x1200 mm, 800x1600 mm",
    finish: "High Gloss, Carving, Satin Matte",
    bestFor: "Living Rooms, Master Bedrooms, Hallways",
  },
  {
    id: "wall-tiles",
    name: "Designer Wall Tiles",
    category: "wall",
    categoryLabel: "Wall Tiles",
    img: "/assets/wall-CWI9mQi2.jpg",
    desc: "High-depth 3D textures, geometric and floral accents for stylish vertical surfaces.",
    sizes: "300x600 mm, 300x450 mm",
    finish: "Glossy, Matte, 3D Elevation Punch",
    bestFor: "Kitchen Backsplashes, Bathrooms, Dining Walls",
  },
  {
    id: "ceramic-tiles",
    name: "Ceramic Utility & Accent Tiles",
    category: "floor",
    categoryLabel: "Ceramic",
    img: "/assets/ceramic-CDMi7BeQ.jpg",
    desc: "Easy-to-clean, stain-resistant tiles offering endless color choices and durability.",
    sizes: "300x300 mm, 400x400 mm",
    finish: "Anti-Skid, Satin, Sugar Finish",
    bestFor: "Balconies, Utility Areas, Bathrooms",
  },
  {
    id: "vitrified-tiles",
    name: "Double Charge Vitrified Tiles",
    category: "floor",
    categoryLabel: "Vitrified",
    img: "/assets/vitrified-Cs-pzRKa.jpg",
    desc: "Ultra-dense, scratch-resistant tiles designed for heavy foot traffic and lasting gloss.",
    sizes: "600x600 mm, 800x800 mm",
    finish: "Nano Polished, Mirror Gloss",
    bestFor: "Entire House Flooring, Offices, Commercial",
  },
  {
    id: "designer-tiles",
    name: "Moroccan & Wooden Designer Tiles",
    category: "wall",
    categoryLabel: "Designer",
    img: "/assets/designer-NInghuyx.jpg",
    desc: "Statement vintage patterns, natural wood planks, and artistic mosaics that stand out.",
    sizes: "200x1200 mm, 600x600 mm",
    finish: "Textured Wood Grain, Matte Embossed",
    bestFor: "Balconies, Feature Walls, Cafes, Terraces",
  },
  {
    id: "marble-slabs",
    name: "Natural Imported & Indian Marble",
    category: "marble",
    categoryLabel: "Marble",
    img: "/assets/marble-BNUs5o2p.jpg",
    desc: "Timeless Italian, Statuario, and Makrana marble with natural veining that ages gracefully.",
    sizes: "Custom Cut Slabs & Tiles",
    finish: "Mirror Polished, Honed, Bookmatched",
    bestFor: "Luxury Living, Mandir Areas, Staircases",
  },
  {
    id: "granite-counters",
    name: "Heavy-Duty Granite Slabs",
    category: "marble",
    categoryLabel: "Granite",
    img: "/assets/granite-IgocAFxw.jpg",
    desc: "Tough Black Galaxy, Tan Brown, and Jet Black granite that withstands heat and heavy use.",
    sizes: "Full Gangsaw Slabs (Custom Cut)",
    finish: "High Mirror Polish, Flamed, Leathered",
    bestFor: "Kitchen Countertops, Steps, Window Sills",
  },
  {
    id: "natural-stone",
    name: "Natural Cladding & Paving Stone",
    category: "stone",
    categoryLabel: "Natural Stone",
    img: "/assets/stone-6M2Q9GK3.jpg",
    desc: "Earthy Kota stone, Sandstone, and Slate for exterior elevation and serene courtyards.",
    sizes: "Tiles & Custom Dimensional Slabs",
    finish: "Natural Cleft, Rough Flamed, Antique",
    bestFor: "Exterior Elevation, Patios, Gate Pillars",
  },
];

export const galleryItems = [
  { label: "Grand Living Room", img: "/assets/hero-DYYG86bx.jpg", tag: "600x1200mm Polished Vitrified" },
  { label: "Serene Master Bedroom", img: "/assets/bedroom-GGb3jYTU.jpg", tag: "Warm Satin Finish Floor" },
  { label: "Modern Granite Kitchen", img: "/assets/granite-IgocAFxw.jpg", tag: "Jet Black Granite Counter" },
  { label: "Spa Bathroom & Shower", img: "/assets/bathroom-BcEu9w9d.jpg", tag: "High-Gloss Anti-Stain Wall" },
  { label: "Natural Stone Feature Wall", img: "/assets/stone-6M2Q9GK3.jpg", tag: "Rustic Exterior Cladding" },
  { label: "Polished Marble Staircase", img: "/assets/staircase-DmipgpjV.jpg", tag: "Full-Length Bullnose Steps" },
  { label: "Entrance Hallway", img: "/assets/floor-qtPy_ZYX.jpg", tag: "High-Traffic Polished Glaze" },
  { label: "Contemporary Dining Room", img: "/assets/vitrified-Cs-pzRKa.jpg", tag: "Double Charge Vitrified" },
];

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#tour", label: "3D Virtual Tour" },
  { href: "#calculator", label: "Tile Calculator" },
  { href: "#products", label: "Collections" },
  { href: "#gallery", label: "Gallery" },
  { href: "#why-us", label: "Why Choose Us" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact & Location" },
];

export const whyChooseUsItems = [
  {
    title: "500+ Live Designs to Compare Side-by-Side",
    desc: "Touch, feel, and see exact textures, reflections, and shades under realistic showroom lighting before purchasing.",
    badge: "Wide Selection",
  },
  {
    title: "Direct Wholesale & Factory Pricing",
    desc: "Competitive pricing for retail homeowners and volume discounts for builders, civil contractors, and architects.",
    badge: "Best Value",
  },
  {
    title: "100% Genuine First-Quality Materials",
    desc: "We stock only certified premier quality tiles and uncompromised natural stones from India's trusted manufacturers.",
    badge: "Quality Guaranteed",
  },
  {
    title: "Safe & Fast Doorstep Delivery",
    desc: "Prompt delivery service across Jajpur Town, Vyasanagar, Keonjhar, Bhadrak, and neighboring regions with careful unloading.",
    badge: "Reliable Transit",
  },
  {
    title: "Free On-Site Quantity Estimation & Guidance",
    desc: "Our experienced staff helps you calculate exact tile boxes and minimal wastage for rooms, kitchens, and bathrooms.",
    badge: "Expert Advice",
  },
];

export const testimonials = [
  {
    name: "Ramesh Chandra Mohapatra",
    location: "Jajpur Town",
    role: "Homeowner",
    comment:
      "We purchased all floor tiles (600x1200mm) and kitchen granite from Shirdi Sai Marbles. The quality is first class, and their advice on matching border tiles saved us significant money.",
    rating: 5,
  },
  {
    name: "Bikash Jena",
    location: "Vyasanagar, Jajpur Road",
    role: "Civil Contractor",
    comment:
      "As a contractor, I look for consistency and zero broken pieces. Their delivery was on time, slabs were uniform, and wholesale rates are the best in the district.",
    rating: 5,
  },
  {
    name: "Smrutirekha Das",
    location: "Gariapur, Jajpur",
    role: "Renovating 3BHK",
    comment:
      "The showroom is huge with so many designs to see in person. We finalized all bathroom wall and floor combinations in a single afternoon. Highly recommended!",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "How do I choose between Vitrified Tiles and Natural Marble?",
    a: "Vitrified tiles are non-porous, stain-resistant, require zero polishing, and are budget-friendly with uniform patterns. Natural marble has unique, luxurious natural veining that can be repolished over decades for a majestic look. We display both at our showroom so you can see the difference firsthand.",
  },
  {
    q: "Do you deliver tiles and marble to my construction site in Odisha?",
    a: "Yes! We arrange safe and prompt transport directly to your doorstep in Jajpur Town, Jajpur Road, Keonjhar, Bhadrak, Cuttack, and surrounding areas.",
  },
  {
    q: "Can I get price quotes and design photos on WhatsApp?",
    a: "Absolutely. Tap any 'Enquire on WhatsApp' button or text us at 9438467960. Let us know your approximate area or the look you want, and we will send design photos and price estimates immediately.",
  },
  {
    q: "Do you cut and polish granite slabs for kitchen countertops?",
    a: "Yes, we provide full gangsaw granite slabs in various thicknesses suitable for kitchen platforms, stair treads, and window sills. We can also guide you on local edge moulding and polishing.",
  },
  {
    q: "What are your showroom timings and location?",
    a: "We are open all 7 days a week: Monday to Saturday from 9:00 AM to 8:00 PM, and Sunday from 9:00 AM to 7:00 PM. Our showroom is conveniently located at Raniramchandrapur, Gariapur, Jajpur Town, Odisha - 755001.",
  },
];

// Top announcement bar in sheer crystal style
function TopBar() {
  return (
    <div className="bg-black/40 backdrop-blur-md text-slate-300 px-4 py-2 text-xs font-medium border-b border-white/10 relative z-30">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center flex-wrap">
          <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
            <MapPin className="h-3.5 w-3.5 text-amber-400" /> Raniramchandrapur, Gariapur, Jajpur Town - 755001
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="text-white/80">Mon – Sat: 9:00 AM – 8:00 PM | Sun: 9:00 AM – 7:00 PM</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={getTelUrl(siteData.phones[0])}
            className="hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-semibold text-white/90"
          >
            <Phone className="h-3 w-3 text-amber-400" /> +91 {siteData.phones[0]}
          </a>
          <a
            href={getWhatsAppUrl(siteData.phones[0])}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 text-emerald-400 font-semibold inline-flex items-center gap-1"
          >
            <MessageCircle className="h-3 w-3" /> WhatsApp Quote
          </a>
        </div>
      </div>
    </div>
  );
}

// Header Navbar with Sheer Luxury Glassmorphism
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-amber-500/20 bg-slate-950/40 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <a href="#home" className="min-w-0 flex items-center gap-3.5 group">
          <img
            src="/logo.webp"
            alt="Shirdi Sai Marbles & Tiles Logo"
            width={260}
            height={390}
            className="h-12 sm:h-14 w-auto object-contain rounded-xl border border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover:scale-105 transition-transform bg-slate-950/80 p-0.5 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="block truncate font-royal text-xl sm:text-2xl font-bold leading-tight text-white md:text-3xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Shirdi Sai <span className="gold-shimmer-text font-serif italic font-normal">Marbles &amp; Tiles</span>
            </span>
            <span className="block truncate font-odia text-xs font-semibold text-amber-300 drop-shadow glow-gold-text">
              {siteData.nameOdia}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-100 hover:text-amber-400 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-amber-400 after:transition-all drop-shadow"
            >
              {link.label}
            </a>
          ))}
          <a href="#visit" className="btn btn-gold text-xs shadow-md">
            Visit Showroom
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={getWhatsAppUrl(siteData.phones[0])}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp min-h-10 px-3 py-1 text-xs"
          >
            <MessageCircle className="h-4 w-4" /> Quote
          </a>
          <button
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/20 text-white bg-slate-900/60 backdrop-blur-md"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6 text-amber-400" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          className="h-[calc(100dvh-5rem)] border-t border-amber-500/20 bg-slate-950/95 backdrop-blur-2xl px-6 py-6 overflow-y-auto lg:hidden"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
            <img
              src="/logo.webp"
              alt="Shirdi Sai Marbles Logo"
              width={260}
              height={390}
              className="h-12 w-auto object-contain rounded-xl border border-amber-500/50 shadow-sm bg-slate-950 p-0.5"
            />
            <div>
              <p className="font-display text-lg font-bold text-white leading-tight">Shirdi Sai Marbles</p>
              <p className="font-odia text-xs font-semibold text-amber-400">{siteData.nameOdia}</p>
            </div>
          </div>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block border-b border-white/10 py-3.5 font-display text-xl font-bold text-slate-100 hover:text-amber-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3">
            <a
              href="#visit"
              onClick={() => setIsOpen(false)}
              className="btn btn-gold w-full text-base"
            >
              Visit Our Showroom
            </a>
            <a
              href={getWhatsAppUrl(siteData.phones[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full text-base"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
            <a
              href={getTelUrl(siteData.phones[0])}
              className="btn btn-outline w-full text-base"
            >
              <Phone className="h-5 w-5 text-amber-400" /> Call +91 {siteData.phones[0]}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

// Hero Section: Completely Open & Unobstructed 3D Background with Floating Luxury Typography
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex flex-col justify-between mx-auto max-w-7xl px-4 pt-4 pb-6 md:px-8 md:pt-6 md:pb-8"
    >
      {/* Brand & Value Proposition Floating Over 3D Scene - NO BLOCKING BOX! */}
      <div className="max-w-3xl">
        {/* Floating Excellence Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-md px-3.5 py-1 text-[11px] font-royal font-bold text-amber-300 uppercase tracking-[0.2em] border border-amber-500/50 mb-3 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
          <Award className="h-3.5 w-3.5 text-amber-400" />
          <span>ESTD. 2010 • 16 Years of Family Trust &amp; Craftsmanship</span>
        </div>

        {/* Grand Brand Headline with Animated Gold Shimmer */}
        <h1 className="font-royal text-4xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.04] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          Shirdi Sai{" "}
          <span className="gold-shimmer-text font-serif italic font-normal block sm:inline tracking-normal">
            Marbles &amp; Tiles
          </span>
        </h1>

        {/* Odia Title with Warm Candlelight Glow */}
        <p className="mt-2 font-odia text-xl sm:text-2xl font-semibold text-amber-300 drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)] glow-gold-text">
          {siteData.nameOdia}
        </p>

        {/* Location & Heritage Line */}
        <p className="mt-1.5 text-xs sm:text-sm font-medium uppercase tracking-[0.25em] text-amber-200/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
          Raniramchandrapur, Gariapur • Jajpur Town, Odisha - 755001
        </p>

        {/* Human-Touched Value Proposition */}
        <p className="mt-3 text-lg sm:text-xl text-white font-display font-medium leading-relaxed drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)] max-w-2xl">
          Odisha&apos;s Flagship Wholesale Sanctuary for Italian Marble, Vitrified Slabs &amp; Designer 3D Wall Tiles.
        </p>
        <p className="mt-1.5 text-xs sm:text-sm text-amber-100/90 font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-xl">
          Direct from our family showroom to your dream home. Touch, feel and compare over 500+ genuine first-grade slabs with personalized guidance and wholesale pricing.
        </p>

        {/* Quick action buttons floating directly on 3D view */}
        <div className="mt-5 flex flex-wrap gap-3 sm:gap-4">
          <a
            href={getWhatsAppUrl(
              siteData.phones[0],
              "Hello Shirdi Sai Marbles & Tiles, I would like to get a price catalogue for tiles and marble."
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get WhatsApp Price List for Shirdi Sai Marbles & Tiles"
            className="btn btn-whatsapp text-sm font-bold shadow-[0_4px_25px_rgba(22,163,74,0.45)]"
          >
            <MessageCircle className="h-4.5 w-4.5" /> Get WhatsApp Price List
          </a>
          <a href="#products" className="btn btn-gold text-sm font-bold shadow-[0_4px_25px_rgba(245,158,11,0.5)]">
            Explore 8 Collections <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#visit" className="btn btn-outline text-sm font-semibold">
            <MapPin className="h-4 w-4 text-amber-400" /> Showroom Location
          </a>
        </div>

        {/* Trust Badges - 4 Sleek Floating Glass Pills */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl">
          <div className="rounded-xl bg-black/50 backdrop-blur-md px-3.5 py-2 border border-amber-500/25 shadow-lg hover:border-amber-400/50 transition-all">
            <p className="text-xl sm:text-2xl font-royal font-bold gold-shimmer-text">16 Years</p>
            <p className="text-[11px] font-medium text-slate-200">Family Trust</p>
          </div>
          <div className="rounded-xl bg-black/50 backdrop-blur-md px-3.5 py-2 border border-amber-500/25 shadow-lg hover:border-amber-400/50 transition-all">
            <p className="text-xl sm:text-2xl font-royal font-bold gold-shimmer-text">5,000+</p>
            <p className="text-[11px] font-medium text-slate-200">Homes Built</p>
          </div>
          <div className="rounded-xl bg-black/50 backdrop-blur-md px-3.5 py-2 border border-amber-500/25 shadow-xl hover:border-amber-400/50 transition-all">
            <p className="text-xl sm:text-2xl font-royal font-bold gold-shimmer-text">500+</p>
            <p className="text-[11px] font-medium text-slate-200">Live Slabs</p>
          </div>
          <div className="rounded-xl bg-black/50 backdrop-blur-md px-3.5 py-2 border border-amber-500/25 shadow-xl hover:border-amber-400/50 transition-all">
            <p className="text-xl sm:text-2xl font-royal font-bold text-amber-300 flex items-center gap-1.5 glow-gold-text">
              <Star className="h-4 w-4 fill-current text-amber-400" /> 4.9 / 5
            </p>
            <p className="text-[11px] font-medium text-slate-200">Customer Love</p>
          </div>
        </div>
      </div>

      {/* Prominent, Centered, Animated Scroll Down Indicator for the 3D Showroom Walkthrough */}
      <div className="mt-6 self-center flex flex-col items-center gap-1.5 cursor-pointer group">
        <a
          href="#tour"
          className="flex flex-col items-center gap-2 text-center transition-all hover:scale-105"
        >
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center pt-1.5 shadow-[0_0_25px_rgba(245,158,11,0.7)] bg-black/60 backdrop-blur-md">
            <div className="w-1.5 h-3 bg-gradient-to-b from-amber-200 to-amber-500 rounded-full animate-bounce shadow-[0_0_10px_rgba(245,158,11,0.9)]"></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm font-royal font-bold gold-shimmer-text tracking-[0.25em] uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Scroll Down To Tour 3D Showroom
            </span>
            <span className="text-[11px] text-amber-100/90 font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              300 Cinematic Frames • Architectural Walkthrough
            </span>
          </div>
          <div className="flex flex-col items-center -space-y-2 text-amber-400 animate-pulse mt-0.5 drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]">
            <ChevronRight className="h-5 w-5 rotate-90" />
            <ChevronRight className="h-5 w-5 rotate-90 opacity-70" />
          </div>
        </a>
      </div>
    </section>
  );
}

// 3D Tour Milestones Section (Transparent with Floating Tour Cards as you Scroll)
function TourShowcase() {
  return (
    <section id="tour" className="relative z-10 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="eyebrow flex items-center justify-center gap-1.5">
            <Sparkles className="h-4 w-4 text-amber-400" /> Interactive 3D Walkthrough
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-white font-display drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            Tour Our Luxury Residence &amp; Showroom
          </h2>
          <p className="mt-3 text-base text-slate-200 font-normal drop-shadow">
            Continue scrolling to navigate the 3D showroom camera through our premium architectural marble spaces.
          </p>
        </div>

        {/* 4 Interactive Floating Tour Stop Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Grand Italian Foyer",
              desc: "Polished Statuario & imported white marble with high-reflective gloss.",
              tag: "Frames 1 – 75",
            },
            {
              step: "02",
              title: "Vitrified Living Hall",
              desc: "Large format 800x1600mm double charge vitrified slabs for open rooms.",
              tag: "Frames 76 – 150",
            },
            {
              step: "03",
              title: "Granite & Stone Gallery",
              desc: "Heavy-duty Jet Black & Tan Brown gangsaw granite for countertops.",
              tag: "Frames 151 – 225",
            },
            {
              step: "04",
              title: "3D Wall Elevation Hall",
              desc: "Textured elevation tiles and Moroccan accents for vertical luxury.",
              tag: "Frames 226 – 300",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-2xl bg-black/40 backdrop-blur-md p-5 border border-amber-500/30 hover:border-amber-400 transition-all text-white shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-2xl font-bold gold-text">{item.step}</span>
                  <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Interactive Tile & Square Feet Calculator in Translucent Luxury Glass
function TileCalculator() {
  const [length, setLength] = useState<string>("15");
  const [width, setWidth] = useState<string>("12");
  const [includeWastage, setIncludeWastage] = useState<boolean>(true);
  const [tileSize, setTileSize] = useState<string>("600x1200");

  const numLength = parseFloat(length) || 0;
  const numWidth = parseFloat(width) || 0;
  const rawSqFt = numLength * numWidth;
  const totalSqFt = includeWastage ? Math.round(rawSqFt * 1.1) : Math.round(rawSqFt);

  // Box coverage mapping
  const boxSqFtMap: Record<string, number> = {
    "600x1200": 15.5,
    "600x600": 15.5,
    "800x1600": 27.5,
    "300x600": 8.7,
  };

  const boxCoverage = boxSqFtMap[tileSize] || 15.5;
  const boxesNeeded = totalSqFt > 0 ? Math.ceil(totalSqFt / boxCoverage) : 0;

  const handleShareQuote = () => {
    const text = `Hello Shirdi Sai Marbles & Tiles, I calculated my room size:\n- Room Dimension: ${numLength} ft x ${numWidth} ft\n- Total Area: ${totalSqFt} sq. ft. (with 10% buffer)\n- Tile Size Preferred: ${tileSize} mm\n- Estimated Boxes: ${boxesNeeded} boxes\nPlease share the best price quote and available designs for this size.`;
    window.open(getWhatsAppUrl(siteData.phones[0], text), "_blank", "noopener");
  };

  return (
    <section id="calculator" className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow flex items-center gap-1.5">
            <Calculator className="h-4 w-4" /> Free Planning Tool
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-white font-display drop-shadow">
            Tile &amp; Square Feet Estimator
          </h2>
          <p className="mt-3 text-base text-slate-200 font-normal drop-shadow">
            Enter your room dimensions to instantly estimate total square footage and required boxes. Send the estimate to us on WhatsApp for an exact price quote!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="calc-room-length" className="block text-sm font-bold text-slate-200">Room Length (Feet)</label>
                <input
                  id="calc-room-length"
                  type="number"
                  min="1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="mt-2 block w-full rounded-xl border-2 border-slate-700 bg-black/50 p-3 text-lg font-bold text-white focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. 15"
                />
              </div>
              <div>
                <label htmlFor="calc-room-width" className="block text-sm font-bold text-slate-200">Room Width (Feet)</label>
                <input
                  id="calc-room-width"
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="mt-2 block w-full rounded-xl border-2 border-slate-700 bg-black/50 p-3 text-lg font-bold text-white focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. 12"
                />
              </div>
            </div>

            <div>
              <label htmlFor="calc-tile-size" className="block text-sm font-bold text-slate-200">Select Tile Size</label>
              <select
                id="calc-tile-size"
                aria-label="Select Tile Size"
                value={tileSize}
                onChange={(e) => setTileSize(e.target.value)}
                className="mt-2 block w-full rounded-xl border-2 border-slate-700 bg-slate-950 p-3 text-base font-bold text-white focus:border-amber-400 focus:outline-none"
              >
                <option value="600x1200" className="bg-slate-950 text-white">600x1200 mm (2x4 ft) – Most Popular Floor Tile</option>
                <option value="600x600" className="bg-slate-950 text-white">600x600 mm (2x2 ft) – Standard Double Charge Vitrified</option>
                <option value="800x1600" className="bg-slate-950 text-white">800x1600 mm (Large Format Luxury Slab)</option>
                <option value="300x600" className="bg-slate-950 text-white">300x600 mm (1x2 ft) – Wall &amp; Bathroom Tile</option>
              </select>
            </div>

            <label htmlFor="calc-wastage" className="flex items-center gap-3 cursor-pointer select-none">
              <input
                id="calc-wastage"
                type="checkbox"
                checked={includeWastage}
                onChange={(e) => setIncludeWastage(e.target.checked)}
                className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-amber-500 accent-amber-500"
              />
              <span className="text-sm font-semibold text-slate-200">
                Add recommended 10% cutting &amp; corner wastage buffer
              </span>
            </label>
          </div>

          <div className="rounded-3xl glass-panel-gold p-6 sm:p-8 border-2 border-amber-500/50 shadow-2xl flex flex-col justify-between text-white">
            <div>
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <span className="text-sm font-bold text-slate-200">Estimated Requirements</span>
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-500/30">
                  Instant Estimate
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-black/40 p-4 border border-white/10">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Area</p>
                  <p className="mt-1 text-3xl font-extrabold text-white font-display">
                    {totalSqFt} <span className="text-sm font-sans font-bold text-slate-400">Sq. Ft.</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">({rawSqFt} sq ft actual area)</p>
                </div>

                <div className="rounded-xl bg-black/40 p-4 border border-white/10">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Boxes Needed</p>
                  <p className="mt-1 text-3xl font-extrabold gold-text font-display">
                    ~{boxesNeeded} <span className="text-sm font-sans font-bold text-slate-400">Boxes</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">({boxCoverage} sq ft / box)</p>
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-300 leading-relaxed font-normal">
                * Actual coverage may vary based on room corners, diagonal laying, and tile margins. Visit our showroom in Jajpur Town for free laser measurement verification.
              </p>
            </div>

            <button
              onClick={handleShareQuote}
              className="btn btn-whatsapp mt-6 w-full text-base font-bold shadow-md"
            >
              <MessageCircle className="h-5 w-5" /> Send to WhatsApp for Exact Price Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Products Catalog Section
function Products() {
  const [filter, setFilter] = useState<string>("all");

  const filteredProducts =
    filter === "all" ? products : products.filter((p) => p.category === filter);

  return (
    <section id="products" className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Our Products &amp; Materials</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-white font-display drop-shadow">
              Tiles, Marble &amp; Granite for Every Space
            </h2>
            <p className="mt-3 text-base text-slate-200 font-normal drop-shadow">
              Browse our flagship collections below. Click <strong>Enquire on WhatsApp</strong> for live photos of stock in our Jajpur Town showroom.
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "All Products" },
              { id: "floor", label: "Floor & Vitrified" },
              { id: "wall", label: "Wall Tiles" },
              { id: "marble", label: "Marble & Granite" },
              { id: "stone", label: "Natural Stones" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? "btn-gold text-slate-950 shadow-md"
                    : "glass-panel-subtle text-slate-200 hover:text-white border border-white/10 hover:border-amber-400/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col rounded-3xl glass-panel p-4 border border-white/10 hover:border-amber-400/50 hover:shadow-[0_16px_40px_rgba(245,158,11,0.2)] transition-all duration-300 text-white"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-black/60 border border-white/10">
                <img
                  src={product.img}
                  alt={`${product.name} – Shirdi Sai Marbles Jajpur`}
                  loading="lazy"
                  width={800}
                  height={1008}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-md bg-black/80 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-amber-300 border border-amber-500/30 shadow">
                  {product.categoryLabel}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-white font-display">
                {product.name}
              </h3>

              <p className="mt-1 flex-1 text-sm text-slate-300 font-normal leading-relaxed">
                {product.desc}
              </p>

              {/* Product Specs */}
              <div className="mt-4 rounded-xl bg-black/40 p-3 text-xs text-slate-300 space-y-1 border border-white/10">
                <p>
                  <strong className="text-amber-400 font-semibold">Sizes:</strong> {product.sizes}
                </p>
                <p>
                  <strong className="text-amber-400 font-semibold">Finishes:</strong> {product.finish}
                </p>
                <p>
                  <strong className="text-amber-400 font-semibold">Best For:</strong> {product.bestFor}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                <span>Wholesale Rates</span>
                <span>In Stock Today</span>
              </div>

              <a
                href={getWhatsAppUrl(
                  siteData.phones[0],
                  `Hello Shirdi Sai Marbles & Tiles, I am interested in ${product.name}. Please share available designs and price per sq. ft.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Enquire about ${product.name} on WhatsApp`}
                className="btn btn-whatsapp mt-3 w-full text-sm font-bold shadow-sm"
              >
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-3xl glass-panel p-6 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
            <p className="text-sm font-medium text-slate-200">
              Need custom sizes or bulk supply for commercial projects, apartments, or temples? We offer custom cut slabs and bulk contractor quotes.
            </p>
          </div>
          <a
            href={getTelUrl(siteData.phones[0])}
            className="btn btn-gold whitespace-nowrap text-sm font-bold shrink-0"
          >
            <Phone className="h-4 w-4" /> Talk to Store Manager
          </a>
        </div>
      </div>
    </section>
  );
}

// Gallery Component with Lightbox
function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight")
        setSelectedIndex((i) => (i === null ? null : (i + 1) % galleryItems.length));
      if (e.key === "ArrowLeft")
        setSelectedIndex((i) =>
          i === null ? null : (i - 1 + galleryItems.length) % galleryItems.length
        );
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <section id="gallery" className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Design Inspiration</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-white font-display drop-shadow">
            Realize Your Dream Space
          </h2>
          <p className="mt-3 text-base text-slate-200 font-normal drop-shadow">
            Explore curated room ideas to visualize finishes in your own home. Click any image to view full details and ask for matching materials.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setSelectedIndex(index)}
              className={`group relative overflow-hidden rounded-2xl text-left cursor-pointer border border-white/15 hover:border-amber-400/60 shadow-xl transition-all ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              aria-label={`View ${item.label} inspiration`}
            >
              <img
                src={item.img}
                alt={`${item.label} design inspiration`}
                loading="lazy"
                width={800}
                height={800}
                className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 text-white">
                <span className="block font-display text-lg sm:text-xl font-bold">{item.label}</span>
                <span className="block text-xs font-semibold text-amber-400 mt-0.5">{item.tag}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={galleryItems[selectedIndex].label}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 text-white"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 hover:bg-white/20 text-white"
            aria-label="Close"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="h-6 w-6" />
          </button>

          <img
            src={galleryItems[selectedIndex].img}
            alt={`${galleryItems[selectedIndex].label} design inspiration`}
            width={1200}
            height={900}
            className="max-h-[70vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-2xl font-bold">{galleryItems[selectedIndex].label}</p>
            <p className="text-sm text-amber-400 font-semibold">{galleryItems[selectedIndex].tag}</p>
          </div>

          <div
            className="mt-4 flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white"
              aria-label="Previous"
              onClick={() =>
                setSelectedIndex(
                  (selectedIndex - 1 + galleryItems.length) % galleryItems.length
                )
              }
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="min-w-32 text-center text-sm font-bold text-white/80">
              {selectedIndex + 1} of {galleryItems.length}
            </span>
            <button
              className="grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 hover:bg-white/20 text-white"
              aria-label="Next"
              onClick={() =>
                setSelectedIndex((selectedIndex + 1) % galleryItems.length)
              }
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <a
            onClick={(e) => e.stopPropagation()}
            href={getWhatsAppUrl(
              siteData.phones[0],
              `Hello Shirdi Sai Marbles & Tiles, I loved the ${galleryItems[
                selectedIndex
              ].label} (${galleryItems[selectedIndex].tag}) shown on your website. Do you have this in stock?`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-4 text-base font-bold shadow-lg"
          >
            <MessageCircle className="h-5 w-5" /> Enquire About This Design on WhatsApp
          </a>
        </div>
      )}
    </section>
  );
}

// Why Choose Us Section in Translucent Glass
function WhyChooseUs() {
  return (
    <section id="why-us" className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <p className="eyebrow">The Shirdi Sai Advantage</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-white font-display drop-shadow">
              Why Homeowners &amp; Builders Choose Us
            </h2>
            <p className="mt-4 text-base text-slate-200 font-normal leading-relaxed drop-shadow">
              Flooring and wall tiles remain with your home for a lifetime. Seeing hundreds of options side-by-side in our spacious Jajpur Town showroom ensures you make the right choice with complete confidence.
            </p>

            <div className="mt-8 rounded-3xl glass-panel p-6 border border-amber-500/25 space-y-4 text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-amber-400 shrink-0" />
                <span className="text-sm font-bold text-slate-200">Zero Defect Guarantee on First-Grade Boxes</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-amber-400 shrink-0" />
                <span className="text-sm font-bold text-slate-200">Fast Doorstep Delivery Across All Jajpur Blocks</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-amber-400 shrink-0" />
                <span className="text-sm font-bold text-slate-200">Open 7 Days a Week from 9 AM to 8 PM</span>
              </div>
            </div>

            <a href="#visit" className="btn btn-gold mt-8 shadow-md">
              Plan Your Showroom Visit
            </a>
          </div>

          <ol className="divide-y divide-white/10 border-y border-white/10">
            {whyChooseUsItems.map((item, idx) => (
              <li key={item.title} className="py-6 flex gap-4 sm:gap-6 items-start">
                <span className="font-display text-4xl sm:text-5xl font-extrabold gold-text shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <div className="inline-block rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-300 mb-1">
                    {item.badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white drop-shadow">{item.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

// About Us Section with Sheer Glass Overlay
function AboutUs() {
  return (
    <section id="about" className="relative z-10 py-20 md:py-28 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-3xl border border-white/20 shadow-2xl">
          <img
            src="/assets/staircase-DmipgpjV.jpg"
            alt="Marble staircase display at Shirdi Sai Marbles"
            loading="lazy"
            width={800}
            height={1008}
            className="aspect-[4/5] w-full object-cover lg:max-h-[600px]"
          />
        </div>

        <div>
          <div className="flex items-center gap-4 mb-5">
            <img
              src="/logo.webp"
              alt="Shirdi Sai Marbles Official Emblem"
              width={260}
              height={390}
              className="h-16 w-auto sm:h-20 object-contain rounded-2xl border-2 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.25)] bg-slate-950 p-1 shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-300 uppercase tracking-wider mb-2 border border-amber-500/40">
                <Award className="h-3.5 w-3.5 text-amber-400" /> 16 Years of Business Excellence (Since 2010)
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow">
                Shirdi Sai Marbles &amp; Tiles
              </h3>
              <p className="font-odia text-base font-bold text-amber-400 mt-0.5">
                {siteData.nameOdia}
              </p>
            </div>
          </div>

          <p className="mt-5 text-slate-200 font-normal leading-relaxed text-base sm:text-lg drop-shadow">
            Proudly completing <strong>16 years of business in Jajpur Town</strong>, Shirdi Sai Marbles &amp; Tiles has been the trusted foundation for more than 5,000 homes, apartments, temples, and commercial spaces across Odisha.
          </p>
          <p className="mt-4 text-slate-200 font-normal leading-relaxed text-base sm:text-lg drop-shadow">
            Located at <strong>Raniramchandrapur, Gariapur, Jajpur Town</strong>, our showroom displays over 500+ live slab and tile designs. For 16 years, our commitment has stayed the same: 100% genuine first-grade materials at direct wholesale pricing with doorstep delivery.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 py-4 border-y border-white/20">
            <div className="rounded-2xl glass-panel p-4 border border-amber-500/30">
              <p className="text-3xl font-bold gold-text font-display">16 Years</p>
              <p className="text-xs text-slate-300 font-semibold mt-1">Of Business in Jajpur</p>
            </div>
            <div className="rounded-2xl glass-panel p-4 border border-amber-500/30">
              <p className="text-3xl font-bold gold-text font-display">5,000+</p>
              <p className="text-xs text-slate-300 font-semibold mt-1">Homes &amp; Sites Supplied</p>
            </div>
          </div>

          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-amber-400 text-xs uppercase font-bold tracking-wider">Showroom Address</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-200 font-medium drop-shadow">
                {siteData.addressLine1}
                <br />
                {siteData.addressLine2}
              </dd>
            </div>
            <div>
              <dt className="text-amber-400 text-xs uppercase font-bold tracking-wider">Contact Numbers</dt>
              <dd className="mt-2 space-y-1 text-sm font-semibold text-slate-200">
                {siteData.phones.map((phone) => (
                  <a
                    key={phone}
                    href={getTelUrl(phone)}
                    className="block hover:text-amber-400 transition-colors"
                  >
                    +91 {phone}
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-gold text-sm">
              <MapPin className="h-4 w-4" /> Open in Google Maps
            </a>
            <a href={getWhatsAppUrl(siteData.phones[0])} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp text-sm">
              <MessageCircle className="h-4 w-4" /> Contact Manager on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials / Social Proof Section in Translucent Glass
function Testimonials() {
  return (
    <section className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Customer Experiences</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-white font-display drop-shadow">
            Trusted by 5,000+ Odisha Homes
          </h2>
          <p className="mt-3 text-base text-slate-200 font-normal drop-shadow">
            Hear what local homeowners, builders, and engineers say about our quality and service.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/15 hover:border-amber-500/40 transition-all text-white flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-200 font-medium text-base italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-xs font-semibold text-amber-400">
                  {t.role} • {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section in Translucent Glass
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow flex items-center justify-center gap-1.5">
            <HelpCircle className="h-4 w-4" /> Got Questions?
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-white font-display drop-shadow">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-200 font-normal drop-shadow">
            Everything you need to know about our tile inventory, wholesale pricing, and doorstep delivery.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl glass-panel border border-white/10 hover:border-amber-400/40 overflow-hidden shadow-lg transition-all text-white"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
                >
                  <span className="font-bold text-white text-lg sm:text-xl pr-4 font-display">
                    {faq.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 font-bold text-amber-400 transition-transform ${
                      isOpen ? "rotate-180 bg-amber-500 text-slate-950" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-200 text-base font-normal leading-relaxed border-t border-white/10">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm font-semibold text-slate-300">Have a specific question not listed here?</p>
          <a
            href={getWhatsAppUrl(
              siteData.phones[0],
              "Hello Shirdi Sai Marbles & Tiles, I have a question regarding tiles and delivery."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-3 inline-flex text-sm font-bold shadow-sm"
          >
            <MessageCircle className="h-4 w-4" /> Ask Us Directly on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// Visit Our Showroom CTA Section: Ultra-luxury architectural glass card
function VisitShowroom() {
  return (
    <section id="visit" className="relative z-10 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="rounded-3xl glass-panel-gold p-6 sm:p-10 md:p-14 shadow-2xl text-white">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/logo.webp"
              alt="Shirdi Sai Marbles Official Logo"
              width={260}
              height={390}
              className="h-16 w-auto sm:h-20 object-contain rounded-2xl border-2 border-amber-500/70 shadow-[0_0_20px_rgba(245,158,11,0.25)] bg-slate-950 p-1 shrink-0"
            />
            <div>
              <p className="eyebrow">Visit Our Showroom in Jajpur Town</p>
              <h2 className="mt-1 text-2xl sm:text-4xl md:text-5xl font-bold text-white font-display drop-shadow">
                Experience 500+ Designs in Person
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-200 font-normal leading-relaxed">
            Visit <strong>Shirdi Sai Marbles &amp; Tiles</strong> at <strong>Raniramchandrapur, Gariapur, Jajpur Town, Odisha - 755001</strong>. Our showroom consultants are available 7 days a week to help you choose the best materials, calculate exact box quantities, and offer wholesale discounts.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-black/40 p-5 border border-white/10 shadow-sm flex gap-3.5">
              <MapPin className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-white">Address</p>
                <p className="text-sm text-slate-300 mt-1 leading-relaxed font-medium">
                  {siteData.addressLine1}
                  <br />
                  {siteData.addressLine2}
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-black/40 p-5 border border-white/10 shadow-sm flex gap-3.5">
              <Clock className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-white">Working Hours</p>
                <div className="text-sm text-slate-300 mt-1 leading-relaxed font-medium space-y-0.5">
                  <p>{siteData.hoursMonSat}</p>
                  <p>{siteData.hoursSun}</p>
                  <span className="inline-block mt-1 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    Open All 7 Days
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-black/40 p-5 border border-white/10 shadow-sm flex gap-3.5">
              <Phone className="h-6 w-6 text-amber-400 shrink-0 mt-1" />
              <div>
                <p className="font-bold text-white">Phone Numbers</p>
                <p className="text-sm text-slate-300 mt-1 font-semibold space-y-1">
                  {siteData.phones.map((p) => (
                    <a key={p} href={getTelUrl(p)} className="block hover:text-amber-400">
                      +91 {p}
                    </a>
                  ))}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold text-base font-bold shadow-md"
            >
              <MapPin className="h-5 w-5" /> Get Google Maps Directions
            </a>
            <a
              href={getTelUrl(siteData.phones[0])}
              className="btn btn-outline text-base font-bold"
            >
              <Phone className="h-5 w-5 text-amber-400" /> Call Showroom Directly
            </a>
            <a
              href={getWhatsAppUrl(siteData.phones[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-base font-bold shadow-md"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Form with WhatsApp Integration in Sheer Glass
function ContactEnquiry() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Vitrified Floor Tiles");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [targetPhone, setTargetPhone] = useState(siteData.phones[0]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (name.trim().length < 2) {
      newErrors.name = "Please enter your name.";
    }

    const cleanPhone = phone.replace(/\D/g, "").slice(-10);
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const fullMessage = [
        "Hello Shirdi Sai Marbles & Tiles, I am submitting an enquiry from your website:",
        `• Name: ${name}`,
        `• Phone: ${phone}`,
        `• Interested In: ${category}`,
        area && `• Approximate Area: ${area} sq. ft.`,
        message && `• Requirement Note: ${message}`,
        "",
        "Please provide information on current designs and price quotes.",
      ]
        .filter(Boolean)
        .join("\n");

      // Asynchronously record lead to Supabase database (if configured)
      saveEnquiryToSupabase({
        name,
        phone,
        category,
        area,
        message,
        target_phone: targetPhone,
      });

      window.open(getWhatsAppUrl(targetPhone, fullMessage), "_blank", "noopener");
      setSubmitted(true);
    }
  };

  const inputStyle =
    "mt-2 block w-full rounded-xl border-2 border-slate-700 bg-black/60 px-4 py-3 text-base font-medium text-white outline-none focus:border-amber-400 transition-colors";

  return (
    <section id="contact" className="relative z-10 py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-3.5 mb-3">
            <img
              src="/logo.webp"
              alt="Shirdi Sai Marbles Official Logo"
              width={260}
              height={390}
              className="h-12 w-auto sm:h-14 object-contain rounded-xl border border-amber-500/60 shadow-md bg-slate-950 p-0.5 shrink-0"
            />
            <div>
              <p className="eyebrow">Official WhatsApp Quote Desk</p>
              <p className="font-odia text-xs font-bold text-amber-400">{siteData.nameOdia}</p>
            </div>
          </div>
          <h2 className="mt-1 text-3xl md:text-5xl font-bold text-white font-display drop-shadow">
            Request Price Estimate
          </h2>
          <p className="mt-4 text-base text-slate-300 font-normal leading-relaxed drop-shadow">
            Fill in your project details. We will automatically format and open WhatsApp with your message ready. You can review and edit before sending!
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-slate-200 font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Instant response during showroom working hours</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Free design catalog sent directly to your phone</span>
            </div>
            <div className="flex items-center gap-3 text-slate-200 font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Wholesale pricing quotation with no obligation</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl glass-panel p-6 sm:p-10 border border-amber-500/30 shadow-2xl space-y-5 text-white"
        >
          <div>
            <label htmlFor="name" className="text-sm font-bold text-slate-200">
              Your Name *
            </label>
            <input
              id="name"
              className={inputStyle}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh Kumar"
              aria-invalid={!!errors.name}
            />
            {errors.name && <p className="mt-1 text-sm font-bold text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-bold text-slate-200">
              Mobile Number (10 digits) *
            </label>
            <input
              id="phone"
              type="tel"
              className={inputStyle}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9438467960"
              aria-invalid={!!errors.phone}
            />
            {errors.phone && <p className="mt-1 text-sm font-bold text-red-400">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cat" className="text-sm font-bold text-slate-200">
                Product of Interest
              </label>
              <select
                id="cat"
                className={inputStyle}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {products.map((p) => (
                  <option key={p.id} value={p.name} className="bg-slate-950 text-white">
                    {p.name}
                  </option>
                ))}
                <option value="Complete House Package" className="bg-slate-950 text-white">Complete House Package</option>
                <option value="Granite Kitchen Countertop" className="bg-slate-950 text-white">Granite Kitchen Countertop</option>
              </select>
            </div>

            <div>
              <label htmlFor="area" className="text-sm font-bold text-slate-200">
                Approx. Area (Sq. Ft.)
              </label>
              <input
                id="area"
                type="number"
                className={inputStyle}
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="e.g. 1200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="note" className="text-sm font-bold text-slate-200">
              Additional Details / Preferences <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              id="note"
              rows={3}
              className={inputStyle}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Looking for white marble finish floor tiles and black granite for kitchen..."
            />
          </div>

          <fieldset>
            <legend className="text-sm font-bold text-slate-200">Send WhatsApp Message To:</legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {siteData.phones.map((num) => (
                <label
                  key={num}
                  className="flex items-center gap-2 cursor-pointer font-semibold text-sm text-slate-200"
                >
                  <input
                    type="radio"
                    name="targetPhone"
                    checked={targetPhone === num}
                    onChange={() => setTargetPhone(num)}
                    className="accent-amber-400 h-4 w-4"
                  />
                  +91 {num}
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="btn btn-whatsapp w-full text-base font-bold shadow-lg py-3.5">
            <MessageCircle className="h-5 w-5" /> Continue on WhatsApp
          </button>

          {submitted && (
            <p role="status" className="text-sm font-bold text-emerald-400 bg-emerald-950/60 p-3 rounded-xl border border-emerald-500/30">
              ✓ WhatsApp has opened in a new tab with your enquiry filled out. Please press send there!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

// Footer Component in Dark Luxury Glass
function Footer() {
  return (
    <footer className="relative z-10 bg-black/70 backdrop-blur-md border-t border-amber-500/20 text-white pb-24 md:pb-10 pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <img
            src="/logo.webp"
            alt="Shirdi Sai Marbles & Tiles Official Logo"
            width={260}
            height={390}
            className="h-20 w-auto object-contain rounded-2xl border-2 border-amber-500/70 shadow-2xl bg-slate-900 p-1 mb-4"
          />
          <p className="font-display text-2xl font-bold text-white">{siteData.name}</p>
          <p className="mt-1 font-odia text-amber-400 font-bold">{siteData.nameOdia}</p>
          <p className="mt-3 text-sm text-slate-300 font-normal leading-relaxed">
            {siteData.tagline}. Leading distributor of tiles, marble slabs, and granite in Jajpur Town, Odisha.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-amber-300 font-bold bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 rounded-md">
              <Star className="h-3 w-3 fill-current" /> Certified Dealer
            </span>
          </div>
        </div>

        <div>
          <p className="text-amber-400 text-xs uppercase font-bold tracking-wider">Product Categories</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300 font-medium">
            {products.map((p) => (
              <li key={p.id}>
                <a href="#products" className="hover:text-amber-400 transition-colors">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-amber-400 text-xs uppercase font-bold tracking-wider">Quick Navigation</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-amber-400 transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-amber-400 text-xs uppercase font-bold tracking-wider">Showroom &amp; Contact</p>
          <p className="mt-4 text-slate-300 font-medium leading-relaxed">
            {siteData.addressLine1}
            <br />
            {siteData.addressLine2}
          </p>
          <p className="mt-3 text-xs text-slate-400 font-semibold">{siteData.hours}</p>
          <div className="mt-3 space-y-1">
            {siteData.phones.map((phone) => (
              <a
                key={phone}
                href={getTelUrl(phone)}
                className="block text-white font-bold hover:text-amber-400 transition-colors"
              >
                +91 {phone}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={getWhatsAppUrl(siteData.phones[0])}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Enquiry
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-400 hover:underline inline-flex items-center gap-1"
            >
              <MapPin className="h-3.5 w-3.5" /> Get Directions in Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4 md:px-8">
        <p>&copy; {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
        <p className="text-slate-400">Building Beautiful Spaces across Odisha.</p>
      </div>
    </footer>
  );
}

// Mobile Fixed Bottom Bar (Thumb-Friendly)
function MobileQuickBar() {
  const itemStyle =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-bold transition-colors select-none";

  return (
    <nav
      aria-label="Quick Mobile Actions"
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-amber-500/20 bg-slate-950/90 backdrop-blur-xl md:hidden shadow-2xl text-white"
    >
      <a href={getTelUrl(siteData.phones[0])} className={`${itemStyle} text-slate-200 active:bg-slate-900`}>
        <Phone className="h-5 w-5 text-amber-400" />
        Call Showroom
      </a>
      <a
        href={getWhatsAppUrl(siteData.phones[0])}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get instant WhatsApp Quote"
        className={`${itemStyle} bg-emerald-600 text-white active:bg-emerald-700 shadow-md`}
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp Quote
      </a>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemStyle} text-slate-200 active:bg-slate-900`}
      >
        <MapPin className="h-5 w-5 text-amber-400" />
        Directions
      </a>
    </nav>
  );
}

// Main App Root Component
export default function App() {
  return (
    <div className="relative min-h-screen text-slate-100 pb-16 md:pb-0 bg-transparent">
      {/* Scroll-based 3D Marble Tour Canvas in background */}
      <ScrollCanvas />

      {/* Layered Translucent Content */}
      <div className="relative z-10">
        <TopBar />
        <Header />
        <main>
          <Hero />
          <TourShowcase />
          <TileCalculator />
          <Products />
          <Gallery />
          <WhyChooseUs />
          <AboutUs />
          <Testimonials />
          <FAQ />
          <VisitShowroom />
          <ContactEnquiry />
        </main>
        <Footer />
      </div>
      <MobileQuickBar />
    </div>
  );
}
