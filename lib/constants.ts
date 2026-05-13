export const SITE_NAME = "QuoteMate";

export const PRICING = {
  free: {
    name: "Free",
    price: "$0",
    period: "/month",
    tagline: "Perfect to get started",
    features: [
      { text: "5 quotes per calendar month", included: true },
      { text: "Voice-to-quote (on device)", included: true },
      { text: "GST calculations & ABN validation", included: true },
      { text: "PDF export (QuoteMate watermark)", included: true },
      { text: "Unlimited quotes & invoices", included: false },
      { text: "Clean PDFs (no watermark)", included: false },
      { text: "Email delivery to clients", included: false },
      { text: "Bunnings live pricing", included: false },
      { text: "Xero + MYOB sync", included: false },
      { text: "AR/LiDAR measurements", included: false },
    ],
  },
  pro: {
    name: "Pro",
    price: "$39",
    period: "AUD/month",
    tagline: "For tradies who mean business",
    popular: true,
    features: [
      { text: "Unlimited quotes & invoices", included: true },
      { text: "Voice-to-quote (on device)", included: true },
      { text: "GST calculations & ABN validation", included: true },
      { text: "Clean PDFs (no watermark)", included: true },
      { text: "Email delivery to clients", included: true },
      { text: "Bunnings live pricing", included: true },
      { text: "Xero + MYOB sync", included: true },
      { text: "AR/LiDAR measurements (iOS)", included: true },
      { text: "Priority support", included: true },
    ],
  },
};

export const TESTIMONIALS = [
  {
    quote:
      "Used to spend an hour on quotes after a long day. Now it's done before I pack up the ute. Dead simple.",
    name: "Dave K.",
    role: "Electrician",
    location: "Sydney",
  },
  {
    quote:
      "First quote I did on site took 2 minutes. Client signed it same arvo.",
    name: "Mick T.",
    role: "Plumber",
    location: "Brisbane",
  },
  {
    quote:
      "Bunnings prices built in means I'm not guessing materials anymore. Game changer.",
    name: "Sarah L.",
    role: "Painter",
    location: "Melbourne",
  },
  {
    quote:
      "The photo quote thing is unreal. Snap the bathroom, get a quote. Absolute legends.",
    name: "Aaron B.",
    role: "Tiler",
    location: "Perth",
  },
  {
    quote:
      "Been using it for 3 months. Best 39 bucks I spend all month, no question.",
    name: "James R.",
    role: "Handyman",
    location: "Adelaide",
  },
  {
    quote:
      "Saved me hours every week. My clients reckon I'm super professional now.",
    name: "Tom W.",
    role: "Carpenter",
    location: "Gold Coast",
  },
];

export const FEATURES = [
  {
    id: "voice",
    label: "Voice & Text",
    color: "#60A5FA",
    icon: "mic",
    headline: "Just describe the job",
    description:
      "Speak naturally or type — QuoteMate turns any job description into itemised line items with materials, labour, and GST calculated automatically.",
    bullets: [
      "Handles informal language and trade slang",
      "Imperial to metric conversion built-in",
      "2025 AU trade rate cards baked in",
      "Accepts vague descriptions, makes smart assumptions",
    ],
  },
  {
    id: "photo",
    label: "Photo AI",
    color: "#34D399",
    icon: "camera",
    headline: "Snap a photo, get a quote",
    description:
      "Point your camera at any job site. QuoteMate's vision AI identifies the scope of work, suggests materials, and generates a quote — no description needed.",
    bullets: [
      "GPT-4o vision analysis",
      "Identifies labour and materials from the photo",
      "Combine with AR measurements for precision",
      "Works indoors and outdoors",
    ],
  },
  {
    id: "beforeafter",
    label: "Before / After",
    color: "#F472B6",
    icon: "compare",
    headline: "Quote the scope of change",
    description:
      "Upload a before and after photo of a job site. The AI calculates exactly what work was done and generates a line-item quote for the scope of change.",
    bullets: [
      "Ideal for insurance and renovation quotes",
      "Detects surface changes, additions, removals",
      "Add measurements for material quantities",
      "Dispute-proof documentation",
    ],
  },
  {
    id: "ar",
    label: "AR / LiDAR",
    color: "#A78BFA",
    icon: "scan",
    headline: "Measure with your phone",
    description:
      "Use your iPhone Pro's LiDAR scanner or AR camera to measure rooms and surfaces precisely. Measurements feed directly into your quote for accurate material quantities.",
    bullets: [
      "LiDAR precision: ±2cm accuracy",
      "AR world tracking: ±5–15cm",
      "Auto-calculates floor area and wall area",
      "Available on iPhone Pro and iPad Pro",
    ],
  },
  {
    id: "bunnings",
    label: "Bunnings Pricing",
    color: "#FCD34D",
    icon: "tag",
    headline: "Real pricing, no guessing",
    description:
      "Bunnings product pricing is built right in. Browse 500+ SKUs across electrical, plumbing, paint, hardware, and timber — budget, standard, and premium tiers.",
    bullets: [
      "500+ products across all trade categories",
      "Budget, standard, and premium tiers",
      "Live pricing via Bunnings API",
      "Automatically added to your quote",
    ],
  },
  {
    id: "accounting",
    label: "Xero / MYOB",
    color: "#34D399",
    icon: "sync",
    headline: "One tap to your accounting",
    description:
      "Connect QuoteMate to Xero or MYOB and sync invoices automatically. No double data entry — quotes become invoices, invoices become accounting records.",
    bullets: [
      "Xero and MYOB supported",
      "One-tap invoice sync",
      "GST treatment preserved",
      "OAuth2 secure connection",
    ],
  },
];

export const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "describe",
    title: "Describe the job",
    description:
      "Speak into your phone, snap a photo, or type a quick description. Any format works — QuoteMate understands trade language.",
  },
  {
    step: "02",
    icon: "ai",
    title: "AI builds the quote",
    description:
      "In seconds, GPT-4o parses your input into itemised line items with labour, materials, and GST — priced to 2025 Australian market rates.",
  },
  {
    step: "03",
    icon: "send",
    title: "Send it on site",
    description:
      "Review, tweak, and send a professional PDF to your client before you leave the job. They approve it, you invoice it.",
  },
];
