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
  { href: "#calculator", label: "Tile Calculator" },
  { href: "#products", label: "Products" },
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

// Top announcement bar
function TopBar() {
  return (
    <div className="bg-ink text-white px-4 py-2 text-xs font-medium border-b border-white/10">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center flex-wrap">
          <span className="inline-flex items-center gap-1 text-gold font-bold">
            <MapPin className="h-3.5 w-3.5" /> Raniramchandrapur, Gariapur, Jajpur Town - 755001
          </span>
          <span className="hidden sm:inline text-white/40">•</span>
          <span className="text-white/80">Mon – Sat: 9:00 AM – 8:00 PM | Sun: 9:00 AM – 7:00 PM</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={getTelUrl(siteData.phones[0])}
            className="hover:text-gold transition-colors inline-flex items-center gap-1 font-semibold"
          >
            <Phone className="h-3 w-3" /> +91 {siteData.phones[0]}
          </a>
          <a
            href={getWhatsAppUrl(siteData.phones[0])}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-green-400 text-green-400 font-semibold inline-flex items-center gap-1"
          >
            <MessageCircle className="h-3 w-3" /> WhatsApp Quote
          </a>
        </div>
      </div>
    </div>
  );
}

// Header Navbar
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        <a href="#home" className="min-w-0 flex items-center gap-3 group">
          <img
            src="/logo.jpg"
            alt="Shirdi Sai Marbles & Tiles Logo"
            className="h-12 sm:h-14 w-auto object-contain rounded-xl border border-gold/60 shadow-md group-hover:scale-105 transition-transform bg-slate-950 p-0.5 shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="block truncate font-display text-xl sm:text-2xl font-bold leading-tight text-foreground md:text-3xl">
              Shirdi Sai <span className="text-primary font-bold">Marbles &amp; Tiles</span>
            </span>
            <span className="block truncate font-odia text-xs font-semibold text-gold">
              {siteData.nameOdia}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-slate-800 hover:text-primary transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a href="#visit" className="btn btn-primary text-sm shadow-md">
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
            className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border text-foreground bg-white"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          className="h-[calc(100dvh-5rem)] border-t border-border bg-white px-6 py-6 overflow-y-auto lg:hidden"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-border">
            <img
              src="/logo.jpg"
              alt="Shirdi Sai Marbles Logo"
              className="h-12 w-auto object-contain rounded-xl border border-gold/60 shadow-sm bg-slate-950 p-0.5"
            />
            <div>
              <p className="font-display text-lg font-bold text-slate-900 leading-tight">Shirdi Sai Marbles</p>
              <p className="font-odia text-xs font-semibold text-gold">{siteData.nameOdia}</p>
            </div>
          </div>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block border-b border-border/40 py-3.5 font-display text-xl font-bold text-foreground hover:text-primary"
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
              className="btn btn-primary w-full text-base"
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
              <Phone className="h-5 w-5" /> Call +91 {siteData.phones[0]}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

// Hero Section with high-contrast architectural card over the scroll animation
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-center mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-24"
    >
      <div className="max-w-3xl rounded-3xl bg-white/95 md:bg-white/92 backdrop-blur-xl p-6 sm:p-10 md:p-14 border border-gold/40 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/logo.jpg"
            alt="Shirdi Sai Marbles Official Logo"
            className="h-20 w-auto sm:h-24 md:h-28 object-contain rounded-2xl shadow-xl border-2 border-gold/70 p-1 bg-slate-950 shrink-0"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider border border-gold/30">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{siteData.tagline}</span>
            </div>
            <p className="mt-2 font-odia text-base sm:text-lg font-bold text-gold">
              {siteData.nameOdia}
            </p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mt-0.5">
              Official Flagship Showroom • Jajpur Town
            </p>
          </div>
        </div>

        <h1 className="text-3xl leading-[1.12] sm:text-5xl md:text-6xl text-slate-900 font-extrabold font-display">
          Find the Perfect <span className="text-primary">Tiles &amp; Marble</span> for Your Dream Home
        </h1>

        <p className="mt-4 max-w-2xl text-base text-slate-800 font-medium sm:text-lg leading-relaxed">
          Explore a rich collection of premium vitrified floor tiles, 3D wall tiles, Italian &amp; Indian marble, and heat-resistant granite slabs at <strong>direct factory wholesale rates</strong>.
        </p>

        {/* Quick action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a
            href={getWhatsAppUrl(
              siteData.phones[0],
              "Hello Shirdi Sai Marbles & Tiles, I would like to get a price catalogue for tiles and marble."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp text-base shadow-lg"
          >
            <MessageCircle className="h-5 w-5" /> Get WhatsApp Price List
          </a>
          <a href="#products" className="btn btn-primary text-base shadow-lg">
            Explore 8 Collections <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#visit" className="btn btn-outline text-base">
            <MapPin className="h-4 w-4" /> Showroom Map
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left">
          <div>
            <p className="text-2xl font-bold font-display text-primary">16 Years</p>
            <p className="text-xs font-semibold text-slate-700">In Business (Since 2010)</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-primary">5,000+</p>
            <p className="text-xs font-semibold text-slate-700">Homes Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-primary">500+</p>
            <p className="text-xs font-semibold text-slate-700">Live Stock Designs</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-display text-gold flex items-center justify-center sm:justify-start gap-1">
              <Star className="h-5 w-5 fill-current" /> 4.9 / 5
            </p>
            <p className="text-xs font-semibold text-slate-700">Customer Rating</p>
          </div>
        </div>
      </div>

      {/* Interactive scroll cue */}
      <div className="mt-8 self-start flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-slate-300 shadow-md">
        <div className="w-5 h-8 border-2 border-slate-700 rounded-full flex justify-center pt-1.5">
          <div className="w-1.5 h-2.5 bg-primary rounded-full animate-bounce"></div>
        </div>
        <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">
          Scroll down to tour the marble showroom
        </span>
      </div>
    </section>
  );
}

// Interactive Tile & Square Feet Calculator
function TileCalculator() {
  const [length, setLength] = useState<string>("15");
  const [width, setWidth] = useState<string>("12");
  const [includeWastage, setIncludeWastage] = useState<boolean>(true);
  const [tileSize, setTileSize] = useState<string>("600x1200"); // 600x1200mm = ~7.75 sqft per tile (2 tiles/box = 15.5 sqft)

  const numLength = parseFloat(length) || 0;
  const numWidth = parseFloat(width) || 0;
  const rawSqFt = numLength * numWidth;
  const totalSqFt = includeWastage ? Math.round(rawSqFt * 1.1) : Math.round(rawSqFt);

  // Box coverage mapping
  const boxSqFtMap: Record<string, number> = {
    "600x1200": 15.5, // 2 tiles of 2x4 ft = ~15.5 sqft
    "600x600": 15.5,  // 4 tiles of 2x2 ft = ~16 sqft
    "800x1600": 27.5, // 2 tiles = ~27.5 sqft
    "300x600": 8.7,   // 8 tiles of wall = ~8.7 sqft
  };

  const boxCoverage = boxSqFtMap[tileSize] || 15.5;
  const boxesNeeded = totalSqFt > 0 ? Math.ceil(totalSqFt / boxCoverage) : 0;

  const handleShareQuote = () => {
    const text = `Hello Shirdi Sai Marbles & Tiles, I calculated my room size:\n- Room Dimension: ${numLength} ft x ${numWidth} ft\n- Total Area: ${totalSqFt} sq. ft. (with 10% buffer)\n- Tile Size Preferred: ${tileSize} mm\n- Estimated Boxes: ${boxesNeeded} boxes\nPlease share the best price quote and available designs for this size.`;
    window.open(getWhatsAppUrl(siteData.phones[0], text), "_blank", "noopener");
  };

  return (
    <section id="calculator" className="relative z-10 bg-secondary py-16 md:py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow flex items-center gap-1.5">
            <Calculator className="h-4 w-4" /> Free Planning Tool
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-slate-900">
            Tile &amp; Square Feet Estimator
          </h2>
          <p className="mt-3 text-base text-slate-800 font-medium">
            Enter your room dimensions to instantly estimate total square footage and required boxes. Send the estimate to us on WhatsApp for an exact price quote!
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-2xl bg-white p-6 sm:p-8 border border-border shadow-md space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-900">Room Length (Feet)</label>
                <input
                  type="number"
                  min="1"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="mt-2 block w-full rounded-lg border-2 border-slate-300 p-3 text-lg font-bold text-slate-900 focus:border-primary focus:outline-none"
                  placeholder="e.g. 15"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-900">Room Width (Feet)</label>
                <input
                  type="number"
                  min="1"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className="mt-2 block w-full rounded-lg border-2 border-slate-300 p-3 text-lg font-bold text-slate-900 focus:border-primary focus:outline-none"
                  placeholder="e.g. 12"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900">Select Tile Size</label>
              <select
                value={tileSize}
                onChange={(e) => setTileSize(e.target.value)}
                className="mt-2 block w-full rounded-lg border-2 border-slate-300 p-3 text-base font-bold text-slate-900 focus:border-primary focus:outline-none"
              >
                <option value="600x1200">600x1200 mm (2x4 ft) – Most Popular Floor Tile</option>
                <option value="600x600">600x600 mm (2x2 ft) – Standard Double Charge Vitrified</option>
                <option value="800x1600">800x1600 mm (Large Format Luxury Slab)</option>
                <option value="300x600">300x600 mm (1x2 ft) – Wall &amp; Bathroom Tile</option>
              </select>
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={includeWastage}
                onChange={(e) => setIncludeWastage(e.target.checked)}
                className="h-5 w-5 rounded border-slate-400 text-primary accent-primary"
              />
              <span className="text-sm font-semibold text-slate-800">
                Add recommended 10% cutting &amp; corner wastage buffer
              </span>
            </label>
          </div>

          <div className="rounded-2xl bg-white p-6 sm:p-8 border-2 border-gold/60 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-sm font-bold text-slate-700">Estimated Requirements</span>
                <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-gold">
                  Instant Estimate
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Total Area</p>
                  <p className="mt-1 text-3xl font-extrabold text-slate-900 font-display">
                    {totalSqFt} <span className="text-sm font-sans font-bold text-slate-600">Sq. Ft.</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">({rawSqFt} sq ft actual area)</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">Boxes Needed</p>
                  <p className="mt-1 text-3xl font-extrabold text-primary font-display">
                    ~{boxesNeeded} <span className="text-sm font-sans font-bold text-slate-600">Boxes</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-1">({boxCoverage} sq ft / box)</p>
                </div>
              </div>

              <p className="mt-5 text-xs text-slate-600 leading-relaxed font-medium">
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
    <section id="products" className="relative z-10 bg-white py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Our Products &amp; Materials</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-slate-900">
              Tiles, Marble &amp; Granite for Every Space
            </h2>
            <p className="mt-3 text-base text-slate-800 font-medium">
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
                    ? "bg-primary text-white shadow-md"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300"
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
              className="group flex flex-col rounded-2xl bg-white p-4 border border-slate-200 shadow-sm hover:shadow-xl hover:border-gold/60 transition-all duration-300"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={product.img}
                  alt={`${product.name} – Shirdi Sai Marbles Jajpur`}
                  loading="lazy"
                  width={800}
                  height={1008}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-md bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 text-xs font-bold text-white shadow">
                  {product.categoryLabel}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-slate-900 font-display">
                {product.name}
              </h3>

              <p className="mt-1 flex-1 text-sm text-slate-700 font-medium leading-relaxed">
                {product.desc}
              </p>

              {/* Product Specs */}
              <div className="mt-4 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-800 space-y-1 border border-slate-200">
                <p>
                  <strong className="text-slate-900">Sizes:</strong> {product.sizes}
                </p>
                <p>
                  <strong className="text-slate-900">Finishes:</strong> {product.finish}
                </p>
                <p>
                  <strong className="text-slate-900">Best For:</strong> {product.bestFor}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-md border border-emerald-200">
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
                className="btn btn-whatsapp mt-3 w-full text-sm font-bold shadow-sm"
              >
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-slate-50 p-6 border border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0" />
            <p className="text-sm font-semibold text-slate-800">
              Need custom sizes or bulk supply for commercial projects, apartments, or temples? We offer custom cut slabs and bulk contractor quotes.
            </p>
          </div>
          <a
            href={getTelUrl(siteData.phones[0])}
            className="btn btn-outline whitespace-nowrap text-sm font-bold shrink-0"
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
    <section id="gallery" className="relative z-10 bg-secondary py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Design Inspiration</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-slate-900">
            Realize Your Dream Space
          </h2>
          <p className="mt-3 text-base text-slate-800 font-medium">
            Explore curated room ideas to visualize finishes in your own home. Click any image to view full details and ask for matching materials.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setSelectedIndex(index)}
              className={`group relative overflow-hidden rounded-2xl text-left cursor-pointer border border-slate-300 shadow-md hover:shadow-xl transition-all ${
                index === 0 ? "col-span-2 row-span-2" : ""
              }`}
              aria-label={`View ${item.label} inspiration`}
            >
              <img
                src={item.img}
                alt={`${item.label} design inspiration`}
                loading="lazy"
                className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent p-4 text-white">
                <span className="block font-display text-lg sm:text-xl font-bold">{item.label}</span>
                <span className="block text-xs font-semibold text-gold mt-0.5">{item.tag}</span>
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 text-white"
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
            className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="mt-4 text-center" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-2xl font-bold">{galleryItems[selectedIndex].label}</p>
            <p className="text-sm text-gold font-semibold">{galleryItems[selectedIndex].tag}</p>
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

// Why Choose Us Section
function WhyChooseUs() {
  return (
    <section id="why-us" className="relative z-10 bg-white py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] items-start">
          <div>
            <p className="eyebrow">The Shirdi Sai Advantage</p>
            <h2 className="mt-2 text-3xl md:text-5xl font-bold text-slate-900">
              Why Homeowners &amp; Builders Choose Us
            </h2>
            <p className="mt-4 text-base text-slate-800 font-medium leading-relaxed">
              Flooring and wall tiles remain with your home for a lifetime. Seeing hundreds of options side-by-side in our spacious Jajpur Town showroom ensures you make the right choice with complete confidence.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-50 p-6 border border-slate-200 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
                <span className="text-sm font-bold text-slate-900">Zero Defect Guarantee on First-Grade Boxes</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-6 w-6 text-primary shrink-0" />
                <span className="text-sm font-bold text-slate-900">Fast Doorstep Delivery Across All Jajpur Blocks</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary shrink-0" />
                <span className="text-sm font-bold text-slate-900">Open 7 Days a Week from 9 AM to 9 PM</span>
              </div>
            </div>

            <a href="#visit" className="btn btn-primary mt-8 shadow-md">
              Plan Your Showroom Visit
            </a>
          </div>

          <ol className="divide-y divide-slate-200 border-y border-slate-200">
            {whyChooseUsItems.map((item, idx) => (
              <li key={item.title} className="py-6 flex gap-4 sm:gap-6 items-start">
                <span className="font-display text-4xl font-extrabold text-gold shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <div className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700 mb-1 border border-slate-300">
                    {item.badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
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

// About Us Section
function AboutUs() {
  return (
    <section id="about" className="relative z-10 bg-ink py-20 md:py-28 text-white">
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
              src="/logo.jpg"
              alt="Shirdi Sai Marbles Official Emblem"
              className="h-16 w-auto sm:h-20 object-contain rounded-2xl border-2 border-gold/70 shadow-xl bg-slate-950 p-1 shrink-0"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider mb-2 border border-gold/40">
                <Award className="h-3.5 w-3.5" /> 16 Years of Business Excellence (Since 2010)
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                Shirdi Sai Marbles &amp; Tiles
              </h3>
              <p className="font-odia text-base font-bold text-gold/90 mt-0.5">
                {siteData.nameOdia}
              </p>
            </div>
          </div>

          <p className="mt-5 text-slate-200 font-medium leading-relaxed text-base sm:text-lg">
            Proudly completing <strong>16 years of business in Jajpur Town</strong>, Shirdi Sai Marbles &amp; Tiles has been the trusted foundation for more than 5,000 homes, apartments, temples, and commercial spaces across Odisha.
          </p>
          <p className="mt-4 text-slate-200 font-medium leading-relaxed text-base sm:text-lg">
            Located at <strong>Raniramchandrapur, Gariapur, Jajpur Town</strong>, our showroom displays over 500+ live slab and tile designs. For 16 years, our commitment has stayed the same: 100% genuine first-grade materials at direct wholesale pricing with doorstep delivery.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 py-4 border-y border-white/20">
            <div className="rounded-xl bg-white/5 p-3 border border-white/10">
              <p className="text-2xl font-bold text-gold font-display">16 Years</p>
              <p className="text-xs text-slate-300 font-semibold">Of Business in Jajpur</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3 border border-white/10">
              <p className="text-2xl font-bold text-gold font-display">5,000+</p>
              <p className="text-xs text-slate-300 font-semibold">Homes &amp; Sites Supplied</p>
            </div>
          </div>

          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-gold text-xs uppercase font-bold tracking-wider">Showroom Address</dt>
              <dd className="mt-2 text-sm leading-relaxed text-white font-medium">
                {siteData.addressLine1}
                <br />
                {siteData.addressLine2}
              </dd>
            </div>
            <div>
              <dt className="text-gold text-xs uppercase font-bold tracking-wider">Contact Numbers</dt>
              <dd className="mt-2 space-y-1 text-sm font-semibold text-white">
                {siteData.phones.map((phone) => (
                  <a
                    key={phone}
                    href={getTelUrl(phone)}
                    className="block hover:text-gold transition-colors"
                  >
                    +91 {phone}
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-4">
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-sm">
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

// Testimonials / Social Proof Section
function Testimonials() {
  return (
    <section className="relative z-10 bg-white py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="eyebrow">Customer Experiences</p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-slate-900">
            Trusted by 5,000+ Odisha Homes
          </h2>
          <p className="mt-3 text-base text-slate-700 font-medium">
            Hear what local homeowners, builders, and engineers say about our quality and service.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-slate-50 p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 text-gold mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-800 font-medium text-base italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-xs font-semibold text-slate-600">
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

// FAQ Section
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 bg-secondary py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow flex items-center justify-center gap-1.5">
            <HelpCircle className="h-4 w-4" /> Got Questions?
          </p>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-slate-700 font-medium">
            Everything you need to know about our tile inventory, wholesale pricing, and doorstep delivery.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer"
                >
                  <span className="font-bold text-slate-900 text-lg sm:text-xl pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-slate-100 font-bold text-slate-700 transition-transform ${
                      isOpen ? "rotate-180 bg-primary text-white" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-700 text-base font-medium leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm font-semibold text-slate-700">Have a specific question not listed here?</p>
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

// Visit Our Showroom CTA Section
function VisitShowroom() {
  return (
    <section id="visit" className="relative z-10 bg-white py-20 md:py-28 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="rounded-3xl border-2 border-gold/50 bg-gradient-to-br from-white via-slate-50 to-amber-50/30 p-6 sm:p-10 md:p-14 shadow-xl">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/logo.jpg"
              alt="Shirdi Sai Marbles Official Logo"
              className="h-16 w-auto sm:h-20 object-contain rounded-2xl border-2 border-gold/60 shadow-lg bg-slate-950 p-1 shrink-0"
            />
            <div>
              <p className="eyebrow">Visit Our Showroom in Jajpur Town</p>
              <h2 className="mt-1 text-2xl sm:text-4xl md:text-5xl font-bold text-slate-900 font-display">
                Experience 500+ Designs in Person
              </h2>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
            Visit <strong>Shirdi Sai Marbles &amp; Tiles</strong> at <strong>Raniramchandrapur, Gariapur, Jajpur Town, Odisha - 755001</strong>. Our showroom consultants are available 7 days a week to help you choose the best materials, calculate exact box quantities, and offer wholesale discounts.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-sm flex gap-3">
              <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="font-bold text-slate-900">Address</p>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed font-medium">
                  {siteData.addressLine1}
                  <br />
                  {siteData.addressLine2}
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-sm flex gap-3">
              <Clock className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="font-bold text-slate-900">Working Hours</p>
                <div className="text-sm text-slate-700 mt-1 leading-relaxed font-medium space-y-0.5">
                  <p>{siteData.hoursMonSat}</p>
                  <p>{siteData.hoursSun}</p>
                  <span className="inline-block mt-1 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Open All 7 Days
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white p-4 border border-slate-200 shadow-sm flex gap-3">
              <Phone className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="font-bold text-slate-900">Phone Numbers</p>
                <p className="text-sm text-slate-700 mt-1 font-semibold space-y-1">
                  {siteData.phones.map((p) => (
                    <a key={p} href={getTelUrl(p)} className="block hover:text-primary">
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
              className="btn btn-primary text-base font-bold shadow-md"
            >
              <MapPin className="h-5 w-5" /> Get Google Maps Directions
            </a>
            <a
              href={getTelUrl(siteData.phones[0])}
              className="btn btn-outline text-base font-bold"
            >
              <Phone className="h-5 w-5" /> Call Showroom Directly
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

// Contact Form with WhatsApp Integration
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
    "mt-2 block w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-base font-medium text-slate-900 outline-none focus:border-primary transition-colors";

  return (
    <section id="contact" className="relative z-10 bg-secondary py-20 md:py-28 border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="flex items-center gap-3.5 mb-3">
            <img
              src="/logo.jpg"
              alt="Shirdi Sai Marbles Official Logo"
              className="h-12 w-auto sm:h-14 object-contain rounded-xl border border-gold/60 shadow-md bg-slate-950 p-0.5 shrink-0"
            />
            <div>
              <p className="eyebrow">Official WhatsApp Quote Desk</p>
              <p className="font-odia text-xs font-bold text-gold">{siteData.nameOdia}</p>
            </div>
          </div>
          <h2 className="mt-1 text-3xl md:text-5xl font-bold text-slate-900">
            Request Price Estimate
          </h2>
          <p className="mt-4 text-base text-slate-700 font-medium leading-relaxed">
            Fill in your project details. We will automatically format and open WhatsApp with your message ready. You can review and edit before sending!
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Instant response during showroom working hours</span>
            </div>
            <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Free design catalog sent directly to your phone</span>
            </div>
            <div className="flex items-center gap-3 text-slate-800 font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Wholesale pricing quotation with no obligation</span>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-3xl bg-white p-6 sm:p-10 border border-slate-200 shadow-xl space-y-5"
        >
          <div>
            <label htmlFor="name" className="text-sm font-bold text-slate-900">
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
            {errors.name && <p className="mt-1 text-sm font-bold text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-bold text-slate-900">
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
            {errors.phone && <p className="mt-1 text-sm font-bold text-red-600">{errors.phone}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cat" className="text-sm font-bold text-slate-900">
                Product of Interest
              </label>
              <select
                id="cat"
                className={inputStyle}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
                <option value="Complete House Package">Complete House Package</option>
                <option value="Granite Kitchen Countertop">Granite Kitchen Countertop</option>
              </select>
            </div>

            <div>
              <label htmlFor="area" className="text-sm font-bold text-slate-900">
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
            <label htmlFor="note" className="text-sm font-bold text-slate-900">
              Additional Details / Preferences <span className="text-slate-500 font-normal">(Optional)</span>
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
            <legend className="text-sm font-bold text-slate-900">Send WhatsApp Message To:</legend>
            <div className="mt-2 flex flex-wrap gap-4">
              {siteData.phones.map((num) => (
                <label
                  key={num}
                  className="flex items-center gap-2 cursor-pointer font-semibold text-sm text-slate-800"
                >
                  <input
                    type="radio"
                    name="targetPhone"
                    checked={targetPhone === num}
                    onChange={() => setTargetPhone(num)}
                    className="accent-primary h-4 w-4"
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
            <p role="status" className="text-sm font-bold text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
              ✓ WhatsApp has opened in a new tab with your enquiry filled out. Please press send there!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="relative z-10 bg-slate-950 text-white pb-20 md:pb-8 pt-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-4 md:px-8">
        <div className="md:col-span-1">
          <img
            src="/logo.jpg"
            alt="Shirdi Sai Marbles & Tiles Official Logo"
            className="h-20 w-auto object-contain rounded-2xl border-2 border-gold/70 shadow-2xl bg-slate-900 p-1 mb-4"
          />
          <p className="font-display text-2xl font-bold text-white">{siteData.name}</p>
          <p className="mt-1 font-odia text-gold font-bold">{siteData.nameOdia}</p>
          <p className="mt-3 text-sm text-slate-300 font-medium leading-relaxed">
            {siteData.tagline}. Leading distributor of tiles, marble slabs, and granite in Jajpur Town, Odisha.
          </p>
          <div className="mt-4 flex gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-gold font-bold bg-white/10 px-2.5 py-1 rounded-md">
              <Star className="h-3 w-3 fill-current" /> Certified Dealer
            </span>
          </div>
        </div>

        <div>
          <p className="text-gold text-xs uppercase font-bold tracking-wider">Product Categories</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300 font-medium">
            {products.map((p) => (
              <li key={p.id}>
                <a href="#products" className="hover:text-gold transition-colors">
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-gold text-xs uppercase font-bold tracking-wider">Quick Navigation</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300 font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-gold transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <p className="text-gold text-xs uppercase font-bold tracking-wider">Showroom &amp; Contact</p>
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
                className="block text-white font-bold hover:text-gold transition-colors"
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
              className="text-xs font-bold text-green-400 hover:underline inline-flex items-center gap-1"
            >
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Enquiry
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-gold hover:underline inline-flex items-center gap-1"
            >
              <MapPin className="h-3.5 w-3.5" /> Get Directions in Google Maps
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 px-4 pt-6 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4 md:px-8">
        <p>&copy; {new Date().getFullYear()} {siteData.name}. All rights reserved.</p>
        <p className="text-slate-500">Building Beautiful Spaces across Odisha.</p>
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
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-slate-200 bg-white/98 backdrop-blur-lg md:hidden shadow-2xl"
    >
      <a href={getTelUrl(siteData.phones[0])} className={`${itemStyle} text-slate-900 active:bg-slate-100`}>
        <Phone className="h-5 w-5 text-primary" />
        Call Showroom
      </a>
      <a
        href={getWhatsAppUrl(siteData.phones[0])}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemStyle} bg-emerald-600 text-white active:bg-emerald-700 shadow-md`}
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp Quote
      </a>
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${itemStyle} text-slate-900 active:bg-slate-100`}
      >
        <MapPin className="h-5 w-5 text-primary" />
        Directions
      </a>
    </nav>
  );
}

// Main App Root Component
export default function App() {
  return (
    <div className="relative min-h-screen text-foreground pb-16 md:pb-0">
      {/* Scroll-based 3D Marble Tour Canvas in background */}
      <ScrollCanvas />

      {/* Layered Content */}
      <TopBar />
      <Header />
      <main>
        <Hero />
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
      <MobileQuickBar />
    </div>
  );
}
