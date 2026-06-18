import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import
{
  ShoppingBag, Heart, User, Search, ArrowRight, RotateCw,
  Camera, CheckCircle2, ShieldAlert, MapPin, TrendingUp,
  Trash2, Plus, Minus, Info, Lock, Check, Menu, X, Filter,
  ChevronLeft, ChevronRight, Star, Grid, SlidersHorizontal, Ship,
  ChevronDown, HelpCircle, Phone, Globe, Gift, Award, ArrowLeft,
  Share2, Truck, Shield, Clock, Eye, Mail, Quote, Sparkles
} from 'lucide-react';

// ==========================================================================
// 1. DATA MODELS & CONSTANTS
// ==========================================================================

const GUILD_DESIGNERS = [
  { id: 'all', name: 'All Guilds', avatar: '🏛️' },
  {
    id: 'majuli',
    name: 'Majuli Weavers',
    avatar: '🌾',
    location: 'Assam River Island',
    bio: 'Based on the world\'s largest river island, Majuli Weavers Guild specializes in gold drapes. Their weavers utilize centuries-old loom techniques passed down through generations, centering on royal raw silks.',
    rating: '4.9',
    established: '1948'
  },
  {
    id: 'sualkuchi',
    name: 'Sualkuchi Guild',
    avatar: '✨',
    location: 'Sualkuchi Silk Hub',
    bio: 'Renowned as the Manchester of Assam, Sualkuchi Silk Cooperative is famous for raw mulberry and Eri peace silks. Their fabrics are known for their natural golden sheen and high warp density.',
    rating: '4.8',
    established: '1952'
  },
  {
    id: 'tripura',
    name: 'Agartala Cane',
    avatar: '🎋',
    location: 'Tripura Bamboo Forests',
    bio: 'Agartala Cane Craft Union harvests local seasoned bamboo (Bambusa tulda) and weaves high-end eco-luxury vessels, finished with insect-repelling natural Dammar resin.',
    rating: '4.7',
    established: '1966'
  },
  {
    id: 'nagaland',
    name: 'Mokokchung Carvers',
    avatar: '🪵',
    location: 'Mokokchung Hills',
    bio: 'Working with solid rosewood, the Mokokchung Wooden Guild crafts sculptural details and heritage panels reflecting local Naga tribal folklore and geometric engravings.',
    rating: '4.9',
    established: '1971'
  }
];

const AZ_DESIGNERS = [
  { id: 'majuli', name: 'Majuli Weavers Guild', region: 'Assam' },
  { id: 'sualkuchi', name: 'Sualkuchi Silk Cooperative', region: 'Assam' },
  { id: 'tripura', name: 'Agartala Cane Craft Union', region: 'Tripura' },
  { id: 'nagaland', name: 'Mokokchung Wooden Guild', region: 'Nagaland' },
  { id: 'manipur', name: 'Imphal Handloom Guild', region: 'Manipur' },
  { id: 'meghalaya', name: 'Shillong Organic Dye Union', region: 'Meghalaya' }
];

const INITIAL_PRODUCTS = [
  // ============ MAJULI WEAVERS GUILD (Assam — Handlooms) ============
  {
    id: 'prod-muga-saree',
    name: 'Royal Muga Silk Mekhela Chador',
    price: 18500,
    originalPrice: 21000,
    category: 'handloom',
    subcategory: 'sarees',
    designer: 'Majuli Weavers Guild',
    designerId: 'majuli',
    rating: '4.9',
    description: 'An elegant traditional two-piece drape, meticulously handwoven with delicate gold zari embroidery. Each strand represents months of dedicated loom-work.',
    primaryImg: '/images/silk_handloom.png',
    secondaryImg: '/images/hero_weaver.png',
    details: 'Thread: 100% natural muga silk. Weave density: 26 wraps/inch. Zari: Pure silver plated with 24k gold.',
    stock: 14,
    giTag: 'GI-ASSAM-MUGA-902',
    sizes: ['Standard', 'Custom Fit'],
    badge: 'Bestseller'
  },
  {
    id: 'prod-muga-gamosa',
    name: 'Ceremonial Muga Gamosa',
    price: 2800,
    originalPrice: 3200,
    category: 'handloom',
    subcategory: 'accessories',
    designer: 'Majuli Weavers Guild',
    designerId: 'majuli',
    rating: '4.7',
    description: 'The Gamosa is the cultural emblem of Assam — a symbol of honor, respect, and identity. This premium muga silk variant features hand-embroidered jaapi motifs along the red vermillion border.',
    primaryImg: '/images/hero_weaver.png',
    secondaryImg: '/images/silk_handloom.png',
    details: 'Thread: 80% muga silk, 20% cotton. Border: Traditional red vermillion. Length: 150cm × 48cm.',
    stock: 22,
    giTag: 'GI-ASSAM-GAMO-417',
    sizes: ['One Size'],
    badge: 'Heritage'
  },
  {
    id: 'prod-muga-riha',
    name: 'Golden Riha Bridal Drape',
    price: 28500,
    originalPrice: 32000,
    category: 'handloom',
    subcategory: 'sarees',
    designer: 'Majuli Weavers Guild',
    designerId: 'majuli',
    rating: '5.0',
    description: 'Reserved for bridal trousseaus — this full-body golden Riha drape is woven over 45 days by a single master weaver. Features intricate kingkhap buta patterns symbolizing fertility and prosperity.',
    primaryImg: '/images/silk_handloom.png',
    secondaryImg: '/images/hero_weaver.png',
    details: 'Thread: 100% golden muga silk. Motif: Kingkhap buta. Zari: 24k gold leaf. Loom time: 45 days.',
    stock: 3,
    giTag: 'GI-ASSAM-RIHA-201',
    sizes: ['Standard', 'Custom Fit'],
    badge: 'Limited Edition'
  },
  {
    id: 'prod-muga-stole',
    name: 'Muga Silk Evening Stole',
    price: 4500,
    originalPrice: 5200,
    category: 'handloom',
    subcategory: 'stoles',
    designer: 'Majuli Weavers Guild',
    designerId: 'majuli',
    rating: '4.8',
    description: 'A lightweight evening stole in natural golden muga silk, perfect for pairing with western or traditional ensembles. The subtle sheen catches light beautifully in evening settings.',
    primaryImg: '/images/hero_weaver.png',
    secondaryImg: '/images/silk_handloom.png',
    details: 'Thread: 100% muga silk. Dimensions: 200cm × 70cm. Weight: 120g. Finish: Raw natural sheen.',
    stock: 18,
    giTag: 'GI-ASSAM-STOL-518',
    sizes: ['One Size'],
    badge: null
  },

  // ============ SUALKUCHI SILK COOPERATIVE (Assam — Handlooms) ============
  {
    id: 'prod-eri-shawl',
    name: 'Eri Vegan Peace Silk Shawl',
    price: 6800,
    originalPrice: 7500,
    category: 'handloom',
    subcategory: 'shawls',
    designer: 'Sualkuchi Guild',
    designerId: 'sualkuchi',
    rating: '4.8',
    description: 'Soft, warm wool-like texture made without harming silk moths. Colored entirely using natural plant dyes and organic turmeric roots.',
    primaryImg: '/images/hero_weaver.png',
    secondaryImg: '/images/silk_handloom.png',
    details: 'Thread: 100% peace silk (Eri). Dye: Wild turmeric and walnut hull. Weight: 240g.',
    stock: 8,
    giTag: 'GI-ASSAM-ERI-311',
    sizes: ['One Size'],
    badge: 'Eco-Friendly'
  },
  {
    id: 'prod-pat-saree',
    name: 'Pat Silk Mekhela in Ivory',
    price: 12800,
    originalPrice: 14500,
    category: 'handloom',
    subcategory: 'sarees',
    designer: 'Sualkuchi Guild',
    designerId: 'sualkuchi',
    rating: '4.6',
    description: 'A refined ivory pat silk Mekhela with delicate floral butis along the pallu. Pat silk is the mulberry silk of Assam — smoother than muga, with a brilliant white sheen.',
    primaryImg: '/images/silk_handloom.png',
    secondaryImg: '/images/hero_weaver.png',
    details: 'Thread: 100% mulberry pat silk. Weave: Jacquard. Buti motif: Lotus flower. Length: 5.5m + 2.5m.',
    stock: 10,
    giTag: 'GI-ASSAM-PAT-622',
    sizes: ['Standard', 'Custom Fit'],
    badge: null
  },
  {
    id: 'prod-eri-blanket',
    name: 'Organic Eri Silk Throw Blanket',
    price: 9200,
    originalPrice: 10800,
    category: 'handloom',
    subcategory: 'home',
    designer: 'Sualkuchi Guild',
    designerId: 'sualkuchi',
    rating: '4.9',
    description: 'A luxuriously soft throw blanket woven from vegan Eri peace silk, naturally temperature-regulating and hypoallergenic. Dyed with indigo leaf extract for a rich midnight blue tone.',
    primaryImg: '/images/hero_weaver.png',
    secondaryImg: '/images/silk_handloom.png',
    details: 'Thread: 100% Eri silk. Dye: Organic indigo leaf. Dimensions: 200cm × 140cm. Weight: 650g.',
    stock: 6,
    giTag: 'GI-ASSAM-ERIB-730',
    sizes: ['Single', 'Double'],
    badge: 'New Arrival'
  },
  {
    id: 'prod-silk-cushion',
    name: 'Mulberry Silk Cushion Cover Set (2)',
    price: 3600,
    originalPrice: 4200,
    category: 'handloom',
    subcategory: 'home',
    designer: 'Sualkuchi Guild',
    designerId: 'sualkuchi',
    rating: '4.5',
    description: 'A set of two handwoven cushion covers in rich mulberry silk with traditional geometric borders. Perfect for adding heritage warmth to modern living spaces.',
    primaryImg: '/images/silk_handloom.png',
    secondaryImg: '/images/hero_weaver.png',
    details: 'Thread: 100% mulberry silk. Size: 45cm × 45cm each. Closure: Concealed zipper. Care: Dry clean only.',
    stock: 15,
    giTag: 'GI-ASSAM-CUSH-405',
    sizes: ['Standard 45cm'],
    badge: null
  },

  // ============ AGARTALA CANE CRAFT UNION (Tripura — Handicrafts) ============
  {
    id: 'prod-bamboo-vase',
    name: 'Jeri-Woven Tripura Bamboo Vase',
    price: 3200,
    originalPrice: 3800,
    category: 'handicraft',
    subcategory: 'home',
    designer: 'Agartala Cane',
    designerId: 'tripura',
    rating: '4.7',
    description: 'Woven using finely sliced strips of seasoned bamboo, varnished with natural insect-repellent resin. High-end eco-luxury piece.',
    primaryImg: '/images/bamboo_craft.png',
    secondaryImg: '/images/gifting_hamper.png',
    details: 'Material: Seasoned Bambusa tulda. Weave style: Jeri twill. Coating: Natural dammar resin.',
    stock: 4,
    giTag: 'GI-TRIPURA-BAMB-108',
    sizes: ['Small', 'Medium', 'Large'],
    badge: null
  },
  {
    id: 'prod-cane-basket',
    name: 'Handwoven Cane Fruit Basket',
    price: 1800,
    originalPrice: 2200,
    category: 'handicraft',
    subcategory: 'home',
    designer: 'Agartala Cane',
    designerId: 'tripura',
    rating: '4.6',
    description: 'A beautifully crafted cane fruit basket with double-reinforced handles. Each piece is unique — woven by tribal artisans using locally foraged river cane.',
    primaryImg: '/images/bamboo_craft.png',
    secondaryImg: '/images/gifting_hamper.png',
    details: 'Material: Wild river cane (Calamus rotang). Handles: Wrapped with split bamboo. Diameter: 30cm.',
    stock: 20,
    giTag: 'GI-TRIPURA-CANE-209',
    sizes: ['Standard'],
    badge: 'Under ₹2K'
  },
  {
    id: 'prod-bamboo-lamp',
    name: 'Woven Bamboo Pendant Lamp',
    price: 4800,
    originalPrice: 5600,
    category: 'handicraft',
    subcategory: 'home',
    designer: 'Agartala Cane',
    designerId: 'tripura',
    rating: '4.8',
    description: 'A sculptural pendant lamp shade handwoven in thin bamboo strips, casting intricate shadow patterns when lit. Comes with a 1.5m fabric cord and E27 bulb holder.',
    primaryImg: '/images/bamboo_craft.png',
    secondaryImg: '/images/gifting_hamper.png',
    details: 'Material: Bambusa tulda strips. Diameter: 35cm. Height: 28cm. Cord: 1.5m cotton-wrapped.',
    stock: 7,
    giTag: 'GI-TRIPURA-LAMP-315',
    sizes: ['One Size'],
    badge: null
  },
  {
    id: 'prod-cane-tote',
    name: 'Heritage Cane Tote Handbag',
    price: 5500,
    originalPrice: 6200,
    category: 'handicraft',
    subcategory: 'accessories',
    designer: 'Agartala Cane',
    designerId: 'tripura',
    rating: '4.7',
    description: 'A structured tote bag woven from dyed cane strips with a cotton-lined interior. Features brass buckle closures and an adjustable leather shoulder strap.',
    primaryImg: '/images/bamboo_craft.png',
    secondaryImg: '/images/gifting_hamper.png',
    details: 'Material: Dyed cane strips + cotton lining. Hardware: Antique brass. Strap: Genuine leather (adjustable).',
    stock: 9,
    giTag: 'GI-TRIPURA-TOTE-420',
    sizes: ['One Size'],
    badge: 'Trending'
  },

  // ============ MOKOKCHUNG CARVERS (Nagaland — Handicrafts) ============
  {
    id: 'prod-rosewood-panel',
    name: 'Naga Tribal Rosewood Wall Panel',
    price: 14200,
    originalPrice: 16500,
    category: 'handicraft',
    subcategory: 'home',
    designer: 'Mokokchung Carvers',
    designerId: 'nagaland',
    rating: '4.9',
    description: 'A hand-carved rosewood wall panel depicting traditional Ao Naga warrior motifs and harvest festival scenes. Each panel takes 3 weeks of dedicated master carving.',
    primaryImg: '/images/artisan_woodcarver.png',
    secondaryImg: '/images/bamboo_craft.png',
    details: 'Material: Solid Indian rosewood (Dalbergia sissoo). Dimensions: 60cm × 40cm × 3cm. Finish: Natural beeswax polish.',
    stock: 2,
    giTag: 'GI-NAGA-ROSE-501',
    sizes: ['Standard'],
    badge: 'Artisan Pick'
  },
  {
    id: 'prod-hornbill-sculpture',
    name: 'Hornbill Spirit Tabletop Sculpture',
    price: 7800,
    originalPrice: 9000,
    category: 'handicraft',
    subcategory: 'home',
    designer: 'Mokokchung Carvers',
    designerId: 'nagaland',
    rating: '4.8',
    description: 'A striking tabletop sculpture of the Great Indian Hornbill — the sacred bird of Nagaland. Carved from a single block of teak, with hand-painted details in natural mineral pigments.',
    primaryImg: '/images/artisan_woodcarver.png',
    secondaryImg: '/images/bamboo_craft.png',
    details: 'Material: Burmese teak. Height: 25cm. Painted: Natural mineral pigments. Base: Weighted stone mount.',
    stock: 5,
    giTag: 'GI-NAGA-HORN-604',
    sizes: ['One Size'],
    badge: null
  },
  {
    id: 'prod-naga-necklace',
    name: 'Tribal Beaded Statement Necklace',
    price: 3400,
    originalPrice: 4000,
    category: 'handicraft',
    subcategory: 'jewelry',
    designer: 'Mokokchung Carvers',
    designerId: 'nagaland',
    rating: '4.6',
    description: 'A bold multi-strand necklace featuring hand-carved bone beads, carnelian stones, and brass disc elements. Inspired by traditional Konyak warrior adornments.',
    primaryImg: '/images/artisan_woodcarver.png',
    secondaryImg: '/images/bamboo_craft.png',
    details: 'Materials: Carved bone, carnelian, brass discs. Length: 48cm (adjustable). Clasp: Hook-and-eye brass.',
    stock: 12,
    giTag: 'GI-NAGA-BEAD-710',
    sizes: ['One Size'],
    badge: null
  },
  {
    id: 'prod-wooden-coasters',
    name: 'Rosewood Coaster Set (6 pcs)',
    price: 1500,
    originalPrice: 1800,
    category: 'handicraft',
    subcategory: 'home',
    designer: 'Mokokchung Carvers',
    designerId: 'nagaland',
    rating: '4.5',
    description: 'A set of 6 hand-turned rosewood coasters with geometric tribal engravings. Each coaster is unique, finished with food-safe natural beeswax.',
    primaryImg: '/images/artisan_woodcarver.png',
    secondaryImg: '/images/bamboo_craft.png',
    details: 'Material: Indian rosewood. Diameter: 9cm each. Thickness: 8mm. Finish: Food-safe beeswax.',
    stock: 25,
    giTag: 'GI-NAGA-COAST-812',
    sizes: ['Set of 6'],
    badge: 'Under ₹2K'
  },

  // ============ CROSS-GUILD COLLABORATIONS ============
  {
    id: 'prod-silk-table-runner',
    name: 'Muga Silk Table Runner',
    price: 5200,
    originalPrice: 6000,
    category: 'handloom',
    subcategory: 'home',
    designer: 'Majuli Weavers Guild',
    designerId: 'majuli',
    rating: '4.7',
    description: 'A statement dining table runner in natural golden muga silk with hand-embroidered borders. Transforms any dining table into a heritage centerpiece.',
    primaryImg: '/images/silk_handloom.png',
    secondaryImg: '/images/hero_weaver.png',
    details: 'Thread: 100% muga silk. Dimensions: 180cm × 35cm. Border: Hand-embroidered jaapi motif.',
    stock: 11,
    giTag: 'GI-ASSAM-TBLR-920',
    sizes: ['Standard 180cm', 'Long 240cm'],
    badge: null
  },
  {
    id: 'prod-eri-scarf',
    name: 'Handspun Eri Silk Scarf',
    price: 2200,
    originalPrice: 2800,
    category: 'handloom',
    subcategory: 'stoles',
    designer: 'Sualkuchi Guild',
    designerId: 'sualkuchi',
    rating: '4.4',
    description: 'A lightweight everyday scarf handspun from Eri peace silk. The natural cream tone pairs effortlessly with both casual and formal looks. Ethically produced — no silk moths harmed.',
    primaryImg: '/images/hero_weaver.png',
    secondaryImg: '/images/silk_handloom.png',
    details: 'Thread: 100% Eri peace silk. Dimensions: 180cm × 50cm. Weight: 85g. Dye: Undyed natural cream.',
    stock: 30,
    giTag: 'GI-ASSAM-SCRF-115',
    sizes: ['One Size'],
    badge: 'Under ₹3K'
  }
];

const CUSTOMER_TESTIMONIALS = [
  {
    name: 'Priyanka Barua',
    location: 'Bangalore, India',
    rating: 5,
    text: 'The Muga silk Mekhela Chador I ordered was absolutely exquisite. The golden sheen is unlike anything I\'ve seen in any retail store. The GI provenance tag gave me complete confidence in the authenticity.',
    product: 'Royal Muga Silk Mekhela Chador',
    date: 'May 2026'
  },
  {
    name: 'Ananya Chakraborty',
    location: 'Mumbai, India',
    rating: 5,
    text: 'I used the bespoke stitching service for my sister\'s wedding trousseau. The virtual consultation with the Majuli weaver was an incredibly special experience. Delivered in pristine bamboo casket packaging.',
    product: 'Golden Riha Bridal Drape',
    date: 'April 2026'
  },
  {
    name: 'Dr. Rajesh Iyer',
    location: 'Chennai, India',
    rating: 4,
    text: 'Purchased the Tripura Bamboo Vase as a corporate gift. The craftsmanship and natural varnish finish were superb. My client was thoroughly impressed with the heritage packaging.',
    product: 'Jeri-Woven Tripura Bamboo Vase',
    date: 'March 2026'
  },
  {
    name: 'Meera Khanna',
    location: 'New Delhi, India',
    rating: 5,
    text: 'The Eri throw blanket is unbelievably soft — better than any cashmere I\'ve owned. The midnight blue indigo dye is rich and even. It\'s become the centerpiece of my living room. Truly heirloom quality.',
    product: 'Organic Eri Silk Throw Blanket',
    date: 'May 2026'
  },
  {
    name: 'Rohan Saikia',
    location: 'Guwahati, India',
    rating: 5,
    text: 'Being from Assam, I was looking for authentic Gamosa gifting. The muga silk ceremonial Gamosa here is the real deal — jaapi motifs, vermillion border, exactly as it should be. Beautiful.',
    product: 'Ceremonial Muga Gamosa',
    date: 'June 2026'
  },
  {
    name: 'Linda Ao',
    location: 'Kohima, India',
    rating: 5,
    text: 'Finally a platform that celebrates our Naga heritage. The rosewood wall panel is museum-quality — the warrior motifs are carved with incredible precision. Worth every rupee.',
    product: 'Naga Tribal Rosewood Wall Panel',
    date: 'April 2026'
  }
];

const HERO_SLIDES = [
  {
    image: '/images/hero_weaver.png',
    subtitle: 'THE COUTURE WEAVE EDIT',
    title: 'Sovereign Muga Silks',
    desc: 'Pure heritage thread counts stamped with the Assamese royal seal.'
  },
  {
    image: '/images/silk_handloom.png',
    subtitle: 'THE DESIGNER SPOTLIGHT',
    title: 'Golden Mulberry Drapes',
    desc: 'Each piece features an interactive registry tracker verifying geographic authenticity.'
  },
  {
    image: '/images/artisan_woodcarver.png',
    subtitle: 'EXOTIC HANDICRAFT',
    title: 'Rosewood & Cane Craftsmanship',
    desc: 'Monochrome artifacts curated by Mokokchung and Agartala master craftsmen.'
  }
];

export default function App()
{
  // ==========================================================================
  // 2. STATE MANAGEMENT
  // ==========================================================================
  const [currentRole, setCurrentRole] = useState('consumer'); // consumer | vendor | delivery | admin
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [specialReleaseText, setSpecialReleaseText] = useState(
    'Golden mulberry & raw muga weaves directly stamped with the Assamese royal seal.'
  );

  // Dynamic Routing state
  const [activeView, setActiveView] = useState({ type: 'storefront', value: null }); // storefront | product | designer | lookbook | info

  // Cart & Wishlist Drawers
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Mouse position tracker for custom fluid cursor
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [logoAnimationKey, setLogoAnimationKey] = useState(0);

  // Mobile navigation drawers
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Search and Filter sidebar
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDesignerFilter, setSelectedDesignerFilter] = useState('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [selectedSubcategoryFilter, setSelectedSubcategoryFilter] = useState('all');
  const [priceRangeFilter, setPriceRangeFilter] = useState(35000);
  const [sortBy, setSortBy] = useState('featured');

  // Accordion collapsed states for filters (typical of premium sidebar layouts)
  const [accordions, setAccordions] = useState({
    category: true,
    price: true,
    guilds: true,
    fabric: false
  });

  // Hover states for Megamenu dropdown
  const [hoveredMegamenu, setHoveredMegamenu] = useState(null); // 'handloom' | 'handicraft' | 'designers' | null

  // Active hover/quick buy card target (guarantees size overlay is responsive)
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Hero slider index
  const [heroIndex, setHeroIndex] = useState(0);

  // Toast Notification System
  const [toast, setToast] = useState({ show: false, message: '', icon: '✨' });

  // Hamper Builder state (Only visible in Cart Drawer when items > 1)
  const [casketSelected, setCasketSelected] = useState(false);
  const [configVessel, setConfigVessel] = useState({
    id: 'bamboo',
    name: 'Bamboo Weave Casket',
    price: 450,
    img: '/images/bamboo_craft.png'
  });
  const [configAddons, setConfigAddons] = useState({
    tea: false,
    silk: false,
    jewelry: false
  });

  // Rider/Logistics State
  const [completedSlots, setCompletedSlots] = useState({
    1: null,
    2: null,
    3: null,
    drop: null
  });
  const [isPickedUp, setIsPickedUp] = useState(false);
  const [isGeotagged, setIsGeotagged] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [riderEarnings, setRiderEarnings] = useState(1120.50);

  // Vendor Manifests and Inventory Form
  const [manifests, setManifests] = useState([
    { id: 'ORD-902-MUGA', collector: 'Bangalore, IN', rider: 'Dipankar Gogoi', giTag: 'NE-MUGA-902', status: 'Manifest Generated' },
    { id: 'ORD-311-BAMB', collector: 'Mumbai, IN', rider: 'Ranjan Saikia', giTag: 'NE-BAMB-311', status: 'Manifest Generated' }
  ]);
  const [newProductForm, setNewProductForm] = useState({
    title: '',
    price: '',
    category: 'handloom',
    giTag: '',
    description: ''
  });
  const [simulatedAttachedImage, setSimulatedAttachedImage] = useState('');

  // Admin Control Tower Gateway Screen
  const [adminActiveGateway, setAdminActiveGateway] = useState('gateway'); // gateway | consumer | vendor | rider

  // Live Traffic Telemetry (Simulated)
  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, text: 'User Priyanka Barua active in Handlooms', type: 'info' },
    { id: 2, text: 'Hamper build session locked from Jorhat Hub', type: 'info' },
    { id: 3, text: 'API Sync latency: 12ms', type: 'success' }
  ]);

  // Flash Highlight States for Admin Override Sync visual indicators
  const [flashPriceId, setFlashPriceId] = useState(null);
  const [flashStockId, setFlashStockId] = useState(null);
  const [flashBanner, setFlashBanner] = useState(false);

  // Shutter Flash overlay for Rider camera clicks
  const [cameraFlash, setCameraFlash] = useState(false);

  // New research-inspired storefront features
  const [isCustomizingFit, setIsCustomizingFit] = useState(false);
  const [fitDetails, setFitDetails] = useState({
    bust: '36',
    sleeve: 'Standard Half-Sleeve',
    height: '160',
    padded: 'No'
  });
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [stylistBooking, setStylistBooking] = useState({
    date: '2026-06-15',
    time: '14:00',
    cooperative: 'majuli'
  });
  const [validatedGiResult, setValidatedGiResult] = useState(null);
  const [lookbookPopover, setLookbookPopover] = useState(null);

  // Recently Viewed Products
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  // Newsletter Signup
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);

  // Share drawer
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Auto-play Hero Carousel (inspired by Aza)
  useEffect(() =>
  {
    const timer = setInterval(() =>
    {
      setHeroIndex(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Scroll to top on view change + track recently viewed
  useEffect(() =>
  {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (activeView.type === 'product' && activeView.value)
    {
      setRecentlyViewed(prev =>
      {
        const exists = prev.some(p => p.id === activeView.value.id);
        if (exists) return prev;
        return [activeView.value, ...prev].slice(0, 6);
      });
    }
  }, [activeView]);

  // Mouse position tracker for custom fluid cursor
  useEffect(() =>
  {
    const handleMouseMove = (e) =>
    {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) =>
    {
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.cursor-pointer') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('select') ||
        target.closest('textarea')
      )
      {
        setCursorHovered(true);
      } else
      {
        setCursorHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () =>
    {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Synchronize role with body class name
  useEffect(() =>
  {
    document.body.className = `theme-${currentRole} bg-[#FAF9F6] antialiased`;
  }, [currentRole]);

  // Newsletter handler
  const handleNewsletterSubmit = (e) =>
  {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@'))
    {
      triggerToast('Please enter a valid email address', '⚠️');
      return;
    }
    setIsNewsletterSubmitted(true);
    triggerToast('Welcome to the Prestige Circle! Check your inbox.', '💌');
    setNewsletterEmail('');
  };

  // ==========================================================================
  // 3. UTILITIES & HANDLERS
  // ==========================================================================

  const triggerToast = (message, icon = '✨') =>
  {
    setToast({ show: true, message, icon });
    setTimeout(() =>
    {
      setToast(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const handleValidateGiTag = (tag) =>
  {
    if (!tag)
    {
      triggerToast('Please enter a registry GI tag', '⚠️');
      return;
    }
    const cleanTag = tag.trim().toUpperCase();
    const match = products.find(p => p.giTag.toUpperCase() === cleanTag);
    if (match)
    {
      setValidatedGiResult({
        artisan: match.designer,
        location: match.designerId === 'majuli' ? 'Majuli River Island, Assam' : match.designerId === 'sualkuchi' ? 'Sualkuchi Silk Hub, Assam' : match.designerId === 'tripura' ? 'Agartala Hills, Tripura' : 'Mokokchung Hills, Nagaland',
        threadCount: match.category === 'handloom' ? '26 wraps/inch (Natural Golden)' : 'High-density organic warp',
        status: 'Authentic GI Registry Verified'
      });
      triggerToast('GI Provenance Tag Verified!', '🟢');
    } else
    {
      triggerToast('GI Tag not found in active registry', '🔴');
      setValidatedGiResult(null);
    }
  };

  const handleAddBespokeToCart = (product) =>
  {
    const bespokeSize = `Bespoke Custom (Bust: ${fitDetails.bust}", Height: ${fitDetails.height}cm, Sleeve: ${fitDetails.sleeve})`;
    addToCart(product, bespokeSize);
    setIsCustomizingFit(false);
    triggerToast('Added Bespoke Masterpiece to Prestige Bag!', '📐');
  };

  // Cart operations
  const addToCart = (product, size = 'Standard') =>
  {
    const itemId = `${product.id}-${size}`;
    const existing = cart.find(item => item.id === itemId);
    if (existing)
    {
      setCart(cart.map(item => item.id === itemId ? { ...item, qty: item.qty + 1 } : item));
    } else
    {
      setCart([...cart, { ...product, id: itemId, selectedSize: size, qty: 1 }]);
    }
    triggerToast(`Added ${product.name} (${size}) to Prestige Bag!`, '🛍️');
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId) =>
  {
    setCart(cart.filter(item => item.id !== itemId));
    triggerToast('Removed item from Prestige Bag', '🛍️');
  };

  const toggleWishlist = (product) =>
  {
    const isFavorited = wishlist.some(item => item.id === product.id);
    if (isFavorited)
    {
      setWishlist(wishlist.filter(item => item.id !== product.id));
      triggerToast('Removed from favorites', '🤍');
    } else
    {
      setWishlist([...wishlist, product]);
      triggerToast('Added masterpiece to prestige wishlist!', '💖');
    }
  };

  // Hamper Builder price calculator
  const calculateHamperTotal = () =>
  {
    let total = configVessel.price;
    if (configAddons.tea) total += 350;
    if (configAddons.silk) total += 1500;
    if (configAddons.jewelry) total += 900;
    return total;
  };

  // Add Configured Hamper to Cart
  const addHamperToCart = () =>
  {
    const total = calculateHamperTotal();
    const addonsArray = [];
    if (configAddons.tea) addonsArray.push('Organic Tea');
    if (configAddons.silk) addonsArray.push('Eri Silk Shawl');
    if (configAddons.jewelry) addonsArray.push('Brass Ring');

    const hamperProduct = {
      id: `configured-hamper-${Date.now()}`,
      name: `Crated Hamper (${configVessel.name.split(' ')[0]})`,
      price: total,
      primaryImg: configVessel.img,
      description: `Luxury personalized curation: ${addonsArray.join(', ') || 'No Add-ons'}.`,
      qty: 1
    };

    addToCart(hamperProduct, 'Casket');
    simulateIncomingOrder('ORD-880-HAMPR', hamperProduct.name);
    setCasketSelected(true);
    triggerToast('Premium Casket Packaging applied to order!', '🎁');
  };

  // Checkout process simulation
  const handleCheckout = () =>
  {
    if (cart.length === 0) return;
    const checkoutItem = cart[0];
    const orderId = `ORD-${Math.floor(100 + Math.random() * 900)}-GI`;

    triggerToast('Secure Prestige Checkout Complete! Order locked for courier dispatch.', '💳');
    simulateIncomingOrder(orderId, checkoutItem.name);
    setCart([]);
    setCasketSelected(false);
    setIsCartOpen(false);
  };

  // Real-time integration sync function: Spawns order into Vendor/Rider logs
  const simulateIncomingOrder = (orderId, itemName) =>
  {
    const newManifest = {
      id: orderId,
      collector: 'Delhi, IN',
      rider: 'Dipankar Gogoi',
      giTag: 'NE-MUGA-902',
      status: 'Pending Pick-up'
    };
    setManifests(prev => [newManifest, ...prev]);

    setIsPickedUp(false);
    setIsGeotagged(false);
    setIsDelivered(false);
    setCompletedSlots({ 1: null, 2: null, 3: null, drop: null });

    setTelemetryLogs(prev => [
      { id: Date.now(), text: `New Transaction checkout: ${orderId} [${itemName}]`, type: 'warning' },
      ...prev
    ]);

    triggerToast(`Guild alert: Order ${orderId} received!`, '🏪');
  };

  // Rider Camera Shutter Simulation
  const handleRiderPhotoClick = (slot) =>
  {
    setCameraFlash(true);
    setTimeout(() => setCameraFlash(false), 200);

    const mockImageUrls = {
      1: '/images/silk_handloom.png',
      2: '/images/gifting_hamper.png',
      3: '/images/ne_artisan_logo.png',
      drop: '/images/bamboo_craft.png'
    };

    setCompletedSlots(prev => ({
      ...prev,
      [slot]: mockImageUrls[slot]
    }));

    triggerToast(`Rider photo verification #${slot} captured!`, '📸');
  };

  const handleRiderPickupSubmit = () =>
  {
    setIsPickedUp(true);
    triggerToast('Pick-up verified at source. Shipment updated!', '🚛');
    setTelemetryLogs(prev => [
      { id: Date.now(), text: 'Rider confirmed loom pick-up. Provenance Hash generated.', type: 'success' },
      ...prev
    ]);
  };

  const handleRiderDropoffSubmit = () =>
  {
    setIsDelivered(true);
    setRiderEarnings(prev => prev + 420.00);
    triggerToast('Logistics Run Completed! Wallet Credited.', '🏁');
    setTelemetryLogs(prev => [
      { id: Date.now(), text: 'Delivery verification signed. Smart contract settled.', type: 'success' },
      ...prev
    ]);
  };

  // Vendor Listing Upload Simulated File
  const handleVendorSimulateImage = () =>
  {
    const list = ['/images/silk_handloom.png', '/images/bamboo_craft.png', '/images/gifting_hamper.png'];
    const selected = list[Math.floor(Math.random() * list.length)];
    setSimulatedAttachedImage(selected);
    triggerToast('Provenance photo attached successfully!', '📸');
  };

  // Vendor Listing Submit
  const handleVendorFormSubmit = (e) =>
  {
    e.preventDefault();
    const newId = `prod-custom-${Date.now()}`;
    const newProduct = {
      id: newId,
      name: newProductForm.title,
      price: parseInt(newProductForm.price),
      originalPrice: parseInt(newProductForm.price) * 1.15,
      category: newProductForm.category,
      designer: 'Majuli Weavers Guild',
      designerId: 'majuli',
      rating: '5.0',
      description: `${newProductForm.description} [GI TAG: ${newProductForm.giTag}]`,
      primaryImg: simulatedAttachedImage || '/images/bamboo_craft.png',
      secondaryImg: '/images/hero_weaver.png',
      details: `GI Tag: ${newProductForm.giTag}. Hand-made in Majuli Guild.`,
      stock: 5,
      giTag: newProductForm.giTag,
      sizes: ['Standard']
    };

    setProducts(prev => [newProduct, ...prev]);
    triggerToast(`Masterpiece "${newProduct.name}" published live!`, '🚀');

    setTelemetryLogs(prev => [
      { id: Date.now(), text: `New product listed: ${newProduct.name} (GI: ${newProduct.giTag})`, type: 'info' },
      ...prev
    ]);

    setNewProductForm({ title: '', price: '', category: 'handloom', giTag: '', description: '' });
    setSimulatedAttachedImage('');
  };

  // Admin Overrides
  const handleAdminOverrideStock = (id, newStock) =>
  {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, stock: parseInt(newStock) } : p));
    setFlashStockId(id);
    setTimeout(() => setFlashStockId(null), 1500);
    triggerToast(`Stock updated administratively for ${id}`, '🛡️');
  };

  const handleAdminOverridePrice = (id, newPrice) =>
  {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, price: parseInt(newPrice), originalPrice: parseInt(newPrice) * 1.15 } : p));
    setFlashPriceId(id);
    setTimeout(() => setFlashPriceId(null), 1500);
    triggerToast(`Price overridden to ₹${parseInt(newPrice).toLocaleString('en-IN')}`, '🛡️');
  };

  const handleAdminOverrideBanner = (newText) =>
  {
    setSpecialReleaseText(newText);
    setFlashBanner(true);
    setTimeout(() => setFlashBanner(false), 1500);
    triggerToast('Special release description updated live', '🛡️');
  };

  // ==========================================================================
  // 5. VIEWPORTS & RENDER CHUNKS
  // ==========================================================================

  const filteredProducts = products.filter(p =>
  {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.designer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDesigner = selectedDesignerFilter === 'all' || p.designerId === selectedDesignerFilter;
    const matchesCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const matchesSubcategory = selectedSubcategoryFilter === 'all' || p.subcategory === selectedSubcategoryFilter;
    const matchesPrice = p.price <= priceRangeFilter;

    return matchesSearch && matchesDesigner && matchesCategory && matchesSubcategory && matchesPrice;
  }).sort((a, b) =>
  {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
    if (sortBy === 'new') return (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0);
    return 0; // featured — default order
  });

  const cartTotalQty = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-[#1A1A1A] antialiased">

      {/* TOAST SYSTEM */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-none shadow-premium bg-white border border-[#C5A880] font-outfit"
          >
            <span className="text-base">{toast.icon}</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-[#1A1A1A]">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {cameraFlash && (
        <div className="fixed inset-0 z-50 bg-white pointer-events-none animate-ping opacity-80" />
      )}

      {/* ==============================================
           5.3 GLOBAL HEADERS (ROLE-BASED ENVIRONMENT SPECIFIC)
           ============================================== */}

      {/* A. AZA-STYLE CLONE HEADER WITH MEGAMENU */}
      {currentRole === 'consumer' && (
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">

            {/* Main Header Bar */}
            <div className="flex items-center justify-between h-20">

              {/* Left Column: Subnav quick access (desktop) */}
              <div className="hidden lg:flex gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-[#1A1A1A]/70 w-1/3">
                <button onClick={() => setActiveView({ type: 'lookbook', value: null })} className="hover:text-[#C5A880] transition-colors">The Editorial Edit</button>
                <button onClick={() => setActiveView({ type: 'page', value: 'casket-info' })} className="hover:text-[#C5A880] transition-colors">Gift Caskets</button>
                <a href="#az-catalog" onClick={() => { setActiveView({ type: 'storefront', value: null }); setTimeout(() => document.getElementById('az-catalog')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#C5A880] transition-colors">Artisans A-Z</a>
              </div>

              {/* Mobile Menu Toggle Button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="p-1.5 text-gray-700 hover:text-[#C5A880] transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              {/* Center Column: Highly Premium Center Logo (Aza Clone styling) */}
              <div
                onClick={() =>
                {
                  setLogoAnimationKey(prev => prev + 1);
                  setActiveView({ type: 'storefront', value: null });
                  setSearchQuery('');
                  setSelectedDesignerFilter('all');
                  setSelectedCategoryFilter('all');
                  setSelectedSubcategoryFilter('all');
                }}
                className="flex items-center gap-3 cursor-pointer select-none py-1 justify-center relative"
                style={{ perspective: 1000 }}
              >
                {/* 3D spinning aura rings */}
                <AnimatePresence>
                  {logoAnimationKey > 0 && (
                    <motion.div
                      key={`aura-${logoAnimationKey}`}
                      initial={{ scale: 0.6, opacity: 0.8 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute w-12 h-12 border border-[#C5A880] rounded-full pointer-events-none"
                    />
                  )}
                </AnimatePresence>

                {/* Animated Logo Container (Cropped showing only the IK graphic mark) */}
                <motion.div
                  key={`logo-${logoAnimationKey}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={logoAnimationKey > 0 ? {
                    rotateY: [0, 360],
                    scale: [1, 1.25, 0.95, 1],
                    transition: { duration: 0.8, ease: "easeInOut" }
                  } : {}}
                  className="w-10 h-10 sm:w-11 sm:h-11 overflow-hidden flex items-center justify-center relative rounded-full border border-gray-100 shadow-sm bg-white/5 backdrop-blur-sm"
                >
                  <img
                    src="/images/itin logo.png"
                    alt="ITIN Logo Design"
                    className="absolute top-0 left-0 w-full h-[140%] object-cover object-top brand-logo-img"
                  />
                </motion.div>

                {/* Title Text */}
                <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-[0.15em] text-[#1A1A1A] leading-none transition-colors duration-300">
                  ITIN KEITHEL
                </span>
              </div>

              {/* Right Column: Search & Action Widgets */}
              <div className="flex items-center justify-end gap-3 sm:gap-6 w-1/3">

                {/* Mobile Search Icon Button */}
                <button
                  onClick={() => setIsMobileSearchOpen(true)}
                  className="p-1 md:hidden text-gray-700 hover:text-[#C5A880] transition-colors"
                  title="Search"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Slim Search box (desktop) */}
                <div className="hidden md:relative md:flex items-center border border-[#E5E5E5] rounded-full px-3.5 py-1.5 w-52 focus-within:border-[#C5A880] transition-colors">
                  <Search className="w-3.5 h-3.5 text-gray-400 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search designers or silk..."
                    value={searchQuery}
                    onChange={(e) =>
                    {
                      setSearchQuery(e.target.value);
                      if (activeView.type !== 'storefront')
                      {
                        setActiveView({ type: 'storefront', value: null });
                      }
                      setSelectedCategoryFilter('all');
                      setSelectedDesignerFilter('all');
                      setSelectedSubcategoryFilter('all');
                    }}
                    className="bg-transparent border-none outline-none text-[10px] w-full placeholder:text-gray-400 font-light"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="p-0.5 hover:text-gray-700 text-gray-400 flex items-center justify-center"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Account Widget */}
                <div className="p-1 text-gray-700 hover:text-[#C5A880] transition-colors cursor-pointer" title="Account">
                  <User className="w-4 h-4" />
                </div>

                {/* Wishlist */}
                <button
                  onClick={() => setIsWishlistOpen(true)}
                  className="relative p-1 text-gray-700 hover:text-[#C5A880] transition-colors"
                  title="Favorites"
                >
                  <Heart className="w-4 h-4" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#8A1C14] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold font-mono">
                      {wishlist.length}
                    </span>
                  )}
                </button>

                {/* Bag */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-1 text-gray-700 hover:text-[#C5A880] transition-colors"
                  title="Shopping Bag"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-[#C5A880] text-[#1A1A1A] text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold font-mono">
                      {cartTotalQty}
                    </span>
                  )}
                </button>

              </div>
            </div>

            {/* Megamenu Navigation bar typical of Aza Fashions (Desktop only) */}
            <div className="hidden lg:flex border-t border-[#F2F2F2] py-3.5 justify-center gap-10 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/80 relative">

              <div
                className="relative cursor-pointer py-1 group"
                onMouseEnter={() => setHoveredMegamenu('handloom')}
                onMouseLeave={() => setHoveredMegamenu(null)}
              >
                <span className="hover:text-[#C5A880] transition-colors flex items-center gap-1">
                  Handloom Collections <ChevronDown className="w-3 h-3 text-gray-400 group-hover:rotate-180 transition-transform" />
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] group-hover:w-full transition-all duration-300" />

                {/* Mega Dropdown */}
                {hoveredMegamenu === 'handloom' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-[#E5E5E5] shadow-premium p-6 grid grid-cols-3 text-left normal-case tracking-normal z-50">
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880] border-b pb-1.5">By Weave Style</h5>
                      <ul className="text-xs space-y-2 text-gray-600 font-light">
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handloom'); setSelectedSubcategoryFilter('sarees'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Muga Silk Sarees</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handloom'); setSelectedSubcategoryFilter('shawls'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Shawls & Wraps</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handloom'); setSelectedSubcategoryFilter('stoles'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Stoles & Scarves</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handloom'); setSelectedSubcategoryFilter('home'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Home Textiles</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handloom'); setSelectedSubcategoryFilter('accessories'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Gamosa & Accessories</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880] border-b pb-1.5">By Origin Guild</h5>
                      <ul className="text-xs space-y-2 text-gray-600 font-light">
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedDesignerFilter('majuli'); setHoveredMegamenu(null); setActiveView({ type: 'designer', value: 'majuli' }); }}>Majuli Weavers</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedDesignerFilter('sualkuchi'); setHoveredMegamenu(null); setActiveView({ type: 'designer', value: 'sualkuchi' }); }}>Sualkuchi Cooperative</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedDesignerFilter('tripura'); setHoveredMegamenu(null); setActiveView({ type: 'designer', value: 'tripura' }); }}>Agartala Weave Labs</li>
                      </ul>
                    </div>
                    <div className="space-y-2 bg-[#FAF9F6] p-4 border border-[#E5DEC9]">
                      <Gift className="w-5 h-5 text-[#C5A880] mb-1" />
                      <h6 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Curated Caskets</h6>
                      <p className="text-[10px] text-gray-500 font-light mt-1 mb-2">Configure custom presentation caskets directly in your checkout bag.</p>
                      <button onClick={() => { setHoveredMegamenu(null); setActiveView({ type: 'page', value: 'casket-info' }); }} className="text-[9px] uppercase tracking-wider text-[#C5A880] font-bold">Learn More &rarr;</button>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="relative cursor-pointer py-1 group"
                onMouseEnter={() => setHoveredMegamenu('handicraft')}
                onMouseLeave={() => setHoveredMegamenu(null)}
              >
                <span className="hover:text-[#C5A880] transition-colors flex items-center gap-1">
                  Designer Handicrafts <ChevronDown className="w-3 h-3 text-gray-400 group-hover:rotate-180 transition-transform" />
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] group-hover:w-full transition-all duration-300" />

                {/* Mega Dropdown */}
                {hoveredMegamenu === 'handicraft' && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white border border-[#E5E5E5] shadow-premium p-6 grid grid-cols-2 text-left normal-case tracking-normal z-50">
                    <div className="space-y-2">
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880] border-b pb-1.5">Material Curation</h5>
                      <ul className="text-xs space-y-2 text-gray-600 font-light">
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handicraft'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Seasoned Tripura Cane</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handicraft'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Nagaland Rosewood Carvings</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handicraft'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Sarthebari Brass Vessels</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handicraft'); setSelectedSubcategoryFilter('jewelry'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Tribal Jewelry</li>
                        <li className="hover:text-[#C5A880] cursor-pointer" onClick={() => { setSelectedCategoryFilter('handicraft'); setSelectedSubcategoryFilter('accessories'); setHoveredMegamenu(null); setActiveView({ type: 'storefront', value: null }); }}>Cane Accessories</li>
                      </ul>
                    </div>
                    <div className="space-y-2 bg-[#F5EFEB] p-4 border border-[#E5DEC9] flex flex-col justify-between">
                      <div>
                        <Award className="w-5 h-5 text-[#C5A880] mb-1" />
                        <h6 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Provenance Registry</h6>
                        <p className="text-[9.5px] text-gray-500 font-light mt-1">Every physical masterpiece has a registered digital identity hash.</p>
                      </div>
                      <button onClick={() => { setHoveredMegamenu(null); setActiveView({ type: 'page', value: 'provenance-info' }); }} className="text-[9px] uppercase tracking-wider text-[#C5A880] font-bold mt-2">Check Registry Details &rarr;</button>
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => setActiveView({ type: 'page', value: 'casket-info' })} className="hover:text-[#C5A880] transition-colors relative group py-1">
                Luxury Curation Gifting
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] group-hover:w-full transition-all duration-300" />
              </button>

              <a href="#az-catalog" onClick={() => { setActiveView({ type: 'storefront', value: null }); setTimeout(() => document.getElementById('az-catalog')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-[#C5A880] transition-colors relative group py-1">
                Heritage Guild Directory
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] group-hover:w-full transition-all duration-300" />
              </a>

            </div>

          </div>
        </header>
      )}

      {/* B. VENDOR HEADER */}
      {currentRole === 'vendor' && (
        <header className="bg-[#1A1A1A] text-white sticky top-0 z-40 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/images/ne_artisan_logo.png" alt="Itin Guild" className="w-9 h-9 object-contain invert" />
              <div>
                <h1 className="font-serif text-base sm:text-lg tracking-widest font-semibold text-[#C5A880]">ITIN GUILD</h1>
                <span className="text-[8px] uppercase tracking-widest text-gray-400 block font-semibold">Seller Central Workspace</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-8 text-xs">
              <div className="text-right">
                <span className="text-gray-400 block text-[8px] uppercase tracking-wider">Today's Sales</span>
                <span className="font-semibold text-[#C5A880]">₹32,450</span>
              </div>
              <div className="text-right border-l border-white/10 pl-6">
                <span className="text-gray-400 block text-[8px] uppercase tracking-wider">Orders Pending</span>
                <span className="font-semibold text-red-400 flex items-center gap-1.5 justify-end">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block pulse-red-marker" />
                  {manifests.filter(m => m.status === 'Pending Pick-up').length}
                </span>
              </div>
              <div className="flex items-center gap-3 border-l border-white/10 pl-6">
                <div className="w-8 h-8 rounded-full bg-[#C5A880] text-[#1A1A1A] flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div className="text-left">
                  <span className="font-medium block">Majuli Weavers Guild</span>
                  <span className="text-[8px] text-gray-400 font-mono">ID: MUGA-902</span>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* C. RIDER HEADER */}
      {currentRole === 'delivery' && (
        <header className="bg-emerald-950 text-white sticky top-0 z-40 border-b border-emerald-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
            <div>
              <h1 className="font-serif text-base sm:text-lg tracking-widest font-semibold text-emerald-400">ITIN LOGISTICS</h1>
              <span className="text-[8px] uppercase tracking-widest text-emerald-200 block font-medium">Captain Workspace Portal</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-emerald-900 text-emerald-300 font-mono text-[8.5px] uppercase tracking-wider font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                GPS Connected
              </div>
              <div className="hidden sm:flex items-center gap-3 border-l border-emerald-800 pl-6 text-xs">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                  D
                </div>
                <div className="text-left">
                  <span className="font-medium block">Dipankar Gogoi</span>
                  <span className="text-[8px] text-emerald-300">Jorhat Hub (ID: ITIN-882)</span>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* D. QA ADMIN HEADER */}
      {currentRole === 'admin' && (
        <header className="bg-[#121212] text-white sticky top-0 z-40 border-b border-[#222]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <div>
                <h1 className="font-serif text-base sm:text-lg tracking-widest font-semibold text-white">ITIN CONTROLLER</h1>
                <span className="text-[8px] uppercase tracking-widest text-red-500 block font-semibold font-mono">Sovereign Control Tower</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[9px] font-mono text-gray-400 bg-black/40 px-3 py-1.5 rounded border border-gray-800">
                <span className="w-1 h-1 rounded-full bg-green-500 inline-block animate-ping" />
                Ecosystem Terminal Online
              </div>
            </div>
          </div>
        </header>
      )}

      {/* ==============================================
           5.4 DYNAMIC BODY VIEWS
           ============================================== */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-32">

        {/* VIEW A: CONSUMER VIEWPORT */}
        {currentRole === 'consumer' && (
          <div className="space-y-16">

            {/* VIEW A.1: STOREFRONT HOME GRID */}
            {activeView.type === 'storefront' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-16"
              >
                {/* 1. AUTO-SLIDING LUXURY CAROUSEL */}
                <div className="relative h-[280px] sm:h-[400px] lg:h-[480px] w-full overflow-hidden bg-black group rounded-none">

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={heroIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={HERO_SLIDES[heroIndex].image}
                        alt="Slider Collection"
                        className="w-full h-full object-cover opacity-70 sm:opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/45 to-transparent" />

                      {/* Banner Content overlay */}
                      <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-6 sm:px-12 md:px-24 text-white text-left max-w-xl space-y-3 sm:space-y-4">
                        <span className="text-[8.5px] sm:text-[10px] font-semibold tracking-[0.3em] text-[#C5A880] block font-outfit">
                          {HERO_SLIDES[heroIndex].subtitle}
                        </span>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif tracking-wide leading-tight">
                          {HERO_SLIDES[heroIndex].title}
                        </h2>
                        <p className="text-[10px] sm:text-xs text-gray-300 font-light leading-relaxed">
                          {HERO_SLIDES[heroIndex].desc}
                        </p>
                        <div className="pt-2 sm:pt-4">
                          <a
                            href="#handlooms-section"
                            className="inline-block px-6 py-2.5 sm:px-8 sm:py-3 border border-white text-white hover:bg-[#C5A880] hover:border-[#C5A880] hover:text-[#1A1A1A] text-[8.5px] sm:text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300"
                          >
                            Discover Collection
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Slider Arrows */}
                  <button
                    onClick={() => setHeroIndex(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                    className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => setHeroIndex(prev => (prev + 1) % HERO_SLIDES.length)}
                    className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

                </div>



                {/* COUTURE DISCOUNT CAMPAIGN PROMOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div
                    onClick={() =>
                    {
                      setSelectedCategoryFilter('handloom');
                      triggerToast('Filtering to Premium Handloom Silks', '🧣');
                    }}
                    className="relative min-h-[160px] sm:h-[200px] overflow-hidden border border-[#E5DEC9] bg-[#FAF9F6] p-6 sm:p-8 flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-2">
                      <span className="text-[8.5px] uppercase tracking-[0.2em] text-[#8A1C14] font-bold">LIMITED TIME INCENTIVE</span>
                      <h3 className="text-lg sm:text-xl font-serif text-[#1A1A1A]">15% Off Organic Peace Silks</h3>
                      <p className="text-[10px] sm:text-[10.5px] text-gray-500 font-light">Authenticity and ethical weaving certified via provenance ledger tags.</p>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors flex items-center gap-1 mt-4">
                      Shop The Weave Edit <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>

                  <div
                    onClick={() =>
                    {
                      setSelectedCategoryFilter('handicraft');
                      triggerToast('Filtering to Designer Handicrafts', '🎋');
                    }}
                    className="relative min-h-[160px] sm:h-[200px] overflow-hidden border border-[#E5DEC9] bg-[#F5EFEB] p-6 sm:p-8 flex flex-col justify-between group cursor-pointer"
                  >
                    <div className="space-y-2">
                      <span className="text-[8.5px] uppercase tracking-[0.2em] text-[#C5A880] font-bold">EXCLUSIVE CURATIONS</span>
                      <h3 className="text-lg sm:text-xl font-serif text-[#1A1A1A]">Tripura Cane Masterpieces</h3>
                      <p className="text-[10px] sm:text-[10.5px] text-gray-500 font-light">Meticulously woven baskets and caskets with natural Dammar varnish.</p>
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors flex items-center gap-1 mt-4">
                      Shop Handicrafts <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* GI TAG REGISTRY VALIDATOR */}
                <div className="bg-white border border-[#E5DEC9] p-6 sm:p-8 text-left space-y-4 shadow-sm">
                  <div>
                    <span className="text-[8.5px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-1">Verify Authenticity</span>
                    <h4 className="text-base font-serif font-semibold text-[#1A1A1A] tracking-wide">Geographic Indication (GI) Provenance Lookup</h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5">Enter a product's unique registry hash tag to trace its loom source, dye logs, and cooperative certifications.</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="e.g. GI-ASSAM-MUGA-902"
                      id="gi-search-input"
                      className="flex-1 px-3.5 py-2.5 border border-[#E5DEC9] text-xs outline-none focus:border-[#C5A880] font-mono rounded-none"
                    />
                    <button
                      onClick={() =>
                      {
                        const val = document.getElementById('gi-search-input').value.trim();
                        handleValidateGiTag(val);
                      }}
                      className="px-6 py-2.5 bg-[#1A1A1A] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-[9.5px] uppercase tracking-wider font-bold transition-all duration-300"
                    >
                      Validate Registry Hash
                    </button>
                  </div>

                  {/* Search result details */}
                  {validatedGiResult && (
                    <div className="bg-[#FAF9F6] border border-[#C5A880] p-4 text-xs space-y-3 relative animate-fade-in mt-4">
                      <button
                        onClick={() => setValidatedGiResult(null)}
                        className="absolute top-2.5 right-2.5 text-gray-400 hover:text-gray-600 font-bold"
                      >
                        &times;
                      </button>
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold uppercase tracking-wider text-[10px]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Authenticity Sealed &amp; Verified
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1 font-light">
                        <div>
                          <span className="text-gray-400 block text-[8px] uppercase tracking-wider">Artisan Cooperative</span>
                          <strong className="text-[#1A1A1A]">{validatedGiResult.artisan}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[8px] uppercase tracking-wider">Loom Location</span>
                          <strong className="text-[#1A1A1A]">{validatedGiResult.location}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[8px] uppercase tracking-wider">Thread Count / Build</span>
                          <strong className="text-[#1A1A1A]">{validatedGiResult.threadCount}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block text-[8px] uppercase tracking-wider">GI Seal status</span>
                          <strong className="text-emerald-700 font-bold uppercase">{validatedGiResult.status}</strong>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. AZA-STYLE EDITORIALS & LOOKBOOK SECTOR */}
                <div id="lookbook" className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#F5EFEB] p-6 sm:p-8 lg:p-12 border border-[#E5DEC9] text-left">
                  <div className="space-y-6">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] font-bold">Aza Editorials</span>
                    <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] leading-tight">The Heritage Edit: Stories of Sacred Threads</h2>
                    <div className={`text-xs text-gray-600 font-light leading-relaxed ${flashBanner ? 'bg-[#C5A880]/20 p-1 rounded transition-all duration-500' : ''}`}>
                      {specialReleaseText}
                    </div>
                    <p className="text-[10.5px] sm:text-[11px] text-gray-500 font-light leading-relaxed">
                      We explore the cultural narratives, weavers memories, and organic dyes that define North-East Indian handlooms. Each purchase triggers a Smart Provenance validation stamp, supporting local rural weavers' cooperative unions.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setActiveView({ type: 'lookbook', value: null })}
                        className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase font-semibold text-[#1A1A1A] hover:text-[#C5A880] transition-colors border-b border-[#1A1A1A] pb-0.5"
                      >
                        View Lookbook items <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-[3/4] rounded-none overflow-hidden border border-white shadow-md relative group">
                      <img src="/images/hero_weaver.png" alt="Weaving story" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                        <span className="text-[9px] uppercase tracking-widest text-white font-bold">Majuli Loom</span>
                      </div>
                    </div>
                    <div className="aspect-[3/4] rounded-none overflow-hidden border border-white shadow-md relative group mt-6">
                      <img src="/images/silk_handloom.png" alt="Saree story" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102" />
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                        <span className="text-[9px] uppercase tracking-widest text-white font-bold">Royal Muga</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. AZA-STYLE E-COMMERCE SHOPPING GRID */}
                <div id="handlooms-section" className="grid grid-cols-1 lg:grid-cols-4 gap-8 text-left">

                  {/* Left Column Filters (Desktop) */}
                  <div className="hidden lg:block space-y-4 lg:border-r lg:border-gray-200 lg:pr-8">
                    <div className="flex items-center gap-2 pb-4 border-b border-gray-200">
                      <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                      <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">Filters</h4>
                    </div>

                    {/* Collapsible Category filter */}
                    <div className="border-b border-gray-200/60 pb-3">
                      <button
                        onClick={() => setAccordions(prev => ({ ...prev, category: !prev.category }))}
                        className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-700 py-1.5 focus:outline-none"
                      >
                        <span>Category</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${accordions.category ? 'rotate-180' : ''}`} />
                      </button>
                      {accordions.category && (
                        <div className="space-y-2 text-xs pt-2">
                          {[
                            { id: 'all', label: 'All Categories', count: products.length },
                            { id: 'handloom', label: 'Handloom Textiles', count: products.filter(p => p.category === 'handloom').length },
                            { id: 'handicraft', label: 'Designer Handicrafts', count: products.filter(p => p.category === 'handicraft').length }
                          ].map(cat => (
                            <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer group">
                              <input
                                type="radio"
                                name="category-radio"
                                checked={selectedCategoryFilter === cat.id}
                                onChange={() => { setSelectedCategoryFilter(cat.id); setSelectedSubcategoryFilter('all'); }}
                                className="w-3.5 h-3.5 accent-[#C5A880] rounded-full"
                              />
                              <span className={selectedCategoryFilter === cat.id ? 'text-[#C5A880] font-bold' : 'text-gray-600'}>{cat.label}</span>
                              <span className="text-[9px] text-gray-400 ml-auto">({cat.count})</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Subcategory filter */}
                    <div className="border-b border-gray-200/60 pb-3">
                      <button
                        onClick={() => setAccordions(prev => ({ ...prev, fabric: !prev.fabric }))}
                        className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-700 py-1.5 focus:outline-none"
                      >
                        <span>Type</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${accordions.fabric ? 'rotate-180' : ''}`} />
                      </button>
                      {accordions.fabric && (
                        <div className="space-y-2 text-xs pt-2">
                          {[
                            { id: 'all', label: 'All Types' },
                            { id: 'sarees', label: 'Sarees & Drapes' },
                            { id: 'shawls', label: 'Shawls & Wraps' },
                            { id: 'stoles', label: 'Stoles & Scarves' },
                            { id: 'home', label: 'Home & Living' },
                            { id: 'jewelry', label: 'Tribal Jewelry' },
                            { id: 'accessories', label: 'Accessories & Gifting' }
                          ].map(sub => (
                            <label key={sub.id} className="flex items-center gap-2.5 cursor-pointer">
                              <input
                                type="radio"
                                name="subcategory-radio"
                                checked={selectedSubcategoryFilter === sub.id}
                                onChange={() => setSelectedSubcategoryFilter(sub.id)}
                                className="w-3.5 h-3.5 accent-[#C5A880] rounded-full"
                              />
                              <span className={selectedSubcategoryFilter === sub.id ? 'text-[#C5A880] font-bold' : 'text-gray-600'}>{sub.label}</span>
                              <span className="text-[9px] text-gray-400 ml-auto">({products.filter(p => sub.id === 'all' ? true : p.subcategory === sub.id).length})</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Collapsible Price range filter */}
                    <div className="border-b border-gray-200/60 pb-3">
                      <button
                        onClick={() => setAccordions(prev => ({ ...prev, price: !prev.price }))}
                        className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-700 py-1.5 focus:outline-none"
                      >
                        <span>Price valuation</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${accordions.price ? 'rotate-180' : ''}`} />
                      </button>
                      {accordions.price && (
                        <div className="space-y-3 pt-2">
                          <div className="flex justify-between text-[9px] uppercase tracking-widest font-semibold text-[#C5A880]">
                            <span>Max Price</span>
                            <span className="font-mono text-[#1A1A1A] font-bold">₹{priceRangeFilter.toLocaleString('en-IN')}</span>
                          </div>
                          <input
                            type="range"
                            min="1000"
                            max="35000"
                            step="500"
                            value={priceRangeFilter}
                            onChange={(e) => setPriceRangeFilter(parseInt(e.target.value))}
                            className="w-full h-1 bg-gray-200 accent-[#C5A880] rounded-lg appearance-none cursor-pointer"
                          />
                        </div>
                      )}
                    </div>

                    {/* Collapsible Designer Guild filter */}
                    <div className="border-b border-gray-200/60 pb-3">
                      <button
                        onClick={() => setAccordions(prev => ({ ...prev, guilds: !prev.guilds }))}
                        className="w-full flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-gray-700 py-1.5 focus:outline-none"
                      >
                        <span>Guild Unions</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${accordions.guilds ? 'rotate-180' : ''}`} />
                      </button>
                      {accordions.guilds && (
                        <div className="space-y-2 text-xs pt-2">
                          {GUILD_DESIGNERS.map(guild => (
                            <label key={guild.id} className="flex items-center gap-2.5 cursor-pointer">
                              <input
                                type="radio"
                                name="designer-radio"
                                checked={selectedDesignerFilter === guild.id}
                                onChange={() => setSelectedDesignerFilter(guild.id)}
                                className="w-3.5 h-3.5 accent-[#C5A880] rounded-full"
                              />
                              <span className={selectedDesignerFilter === guild.id ? 'text-[#C5A880] font-bold' : 'text-gray-600'}>{guild.name}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Columns: Product Grid */}
                  <div className="lg:col-span-3 space-y-6">

                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-500 font-light">
                        Showing <strong className="font-semibold text-[#1A1A1A]">{filteredProducts.length}</strong> of {products.length} items
                      </span>

                      <div className="flex items-center gap-3">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="hidden sm:block text-[9px] uppercase tracking-wider font-bold border border-gray-200 px-3 py-1.5 bg-white text-gray-600 outline-none focus:border-[#C5A880] cursor-pointer rounded-none"
                        >
                          <option value="featured">Sort: Featured</option>
                          <option value="price-low">Price: Low → High</option>
                          <option value="price-high">Price: High → Low</option>
                          <option value="rating">Highest Rated</option>
                          <option value="new">New Arrivals First</option>
                        </select>
                        <button
                          onClick={() => setIsMobileFiltersOpen(true)}
                          className="lg:hidden flex items-center gap-1 text-[9px] uppercase tracking-wider font-bold border border-gray-200 px-3 py-1.5 bg-white hover:bg-gray-50"
                        >
                          <Filter className="w-3 h-3 text-[#C5A880]" /> Filters
                        </button>
                        <button
                          onClick={() =>
                          {
                            setSelectedDesignerFilter('all');
                            setSelectedCategoryFilter('all');
                            setSelectedSubcategoryFilter('all');
                            setPriceRangeFilter(35000);
                            setSortBy('featured');
                            setSearchQuery('');
                            triggerToast('Cleared all filters', '🔄');
                          }}
                          className="text-[9px] uppercase tracking-wider font-bold text-gray-400 hover:text-[#1A1A1A] transition-colors self-center"
                        >
                          Reset All
                        </button>
                      </div>
                    </div>

                    {filteredProducts.length === 0 ? (
                      <div className="border border-dashed border-[#C5A880]/30 py-20 text-center text-gray-400 rounded">
                        <Grid className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-xs font-light">No heritage masterpieces match the current filter selection.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredProducts.map(p => (
                          <div
                            key={p.id}
                            onMouseEnter={() => setHoveredCardId(p.id)}
                            onMouseLeave={() => setHoveredCardId(null)}
                            className="group flex flex-col bg-white border border-[#E5E5E5] overflow-hidden relative hover-huly cursor-pointer"
                          >
                            {/* Aza-style Wishlist Heart icon */}
                            <motion.button
                              whileTap={{ scale: 1.4 }}
                              onClick={(e) =>
                              {
                                e.stopPropagation();
                                toggleWishlist(p);
                              }}
                              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm shadow flex items-center justify-center text-gray-500 hover:text-[#8A1C14] transition-colors"
                            >
                              <Heart
                                className="w-3.5 h-3.5"
                                fill={wishlist.some(w => w.id === p.id) ? '#C5A880' : 'none'}
                                stroke={wishlist.some(w => w.id === p.id) ? '#C5A880' : 'currentColor'}
                              />
                            </motion.button>

                            {/* GI Provenance tag label */}
                            <div className="absolute top-3 left-3 z-20 bg-[#1A1A1A]/90 text-[#C5A880] font-mono text-[7px] uppercase tracking-[0.15em] px-2 py-0.5 font-bold">
                              {p.giTag}
                            </div>

                            {/* Product Badge (Bestseller, New Arrival, etc.) */}
                            {p.badge && (
                              <div className={`absolute top-12 left-3 z-20 text-[7px] uppercase tracking-wider px-2 py-0.5 font-bold ${p.badge === 'Bestseller' ? 'bg-[#C5A880] text-[#1A1A1A]' :
                                p.badge === 'New Arrival' ? 'bg-emerald-600 text-white' :
                                  p.badge === 'Limited Edition' ? 'bg-[#8A1C14] text-white' :
                                    p.badge === 'Eco-Friendly' ? 'bg-green-700 text-white' :
                                      p.badge === 'Trending' ? 'bg-purple-700 text-white' :
                                        p.badge === 'Artisan Pick' ? 'bg-amber-700 text-white' :
                                          p.badge === 'Heritage' ? 'bg-[#1A1A1A] text-[#C5A880] border border-[#C5A880]/30' :
                                            'bg-[#1A1A1A] text-white'
                                }`}>
                                {p.badge}
                              </div>
                            )}

                            {/* Image container */}
                            <div
                              onClick={() => setActiveView({ type: 'product', value: p })}
                              className="relative w-full h-[320px] overflow-hidden bg-[#FAF9F6]"
                            >
                              <img
                                src={p.primaryImg}
                                alt={p.name}
                                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                              />
                              <img
                                src={p.secondaryImg}
                                alt={`${p.name} detail`}
                                className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                              />

                              {/* Slide-Up size option Quick Shop overlay */}
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className={`absolute inset-x-0 bottom-0 bg-white/95 border-t border-gray-100 p-3 transition-transform duration-300 z-20 ${hoveredCardId === p.id ? 'translate-y-0' : 'translate-y-full'}`}
                              >
                                <span className="text-[8px] uppercase tracking-[0.2em] text-gray-400 font-bold block mb-1.5 text-center font-outfit">
                                  Select Size to Buy
                                </span>
                                <div className="flex justify-center gap-2">
                                  {p.sizes.map(size => (
                                    <button
                                      key={size}
                                      onClick={() => addToCart(p, size)}
                                      className="border border-[#E5E5E5] hover:border-[#C5A880] hover:text-[#C5A880] px-2.5 py-1 text-[8.5px] uppercase tracking-wider font-semibold bg-white transition-colors"
                                    >
                                      {size}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Details card content centered */}
                            <div className="p-4 space-y-2 text-center border-t border-[#F2F2F2]">

                              <span
                                onClick={(e) =>
                                {
                                  e.stopPropagation();
                                  setActiveView({ type: 'designer', value: p.designerId });
                                }}
                                className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block hover:underline"
                              >
                                {p.designer}
                              </span>

                              <h4
                                onClick={() => setActiveView({ type: 'product', value: p })}
                                className="text-xs text-[#1A1A1A] font-light truncate px-2 hover:text-[#C5A880] transition-colors"
                              >
                                {p.name}
                              </h4>

                              <div className="flex justify-center items-center gap-2 pt-1">
                                <span className={`text-[11.5px] font-bold text-[#1A1A1A] ${flashPriceId === p.id ? 'bg-[#C5A880]/30 px-1 animate-pulse' : ''}`}>
                                  ₹{p.price.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[10px] text-gray-400 line-through">
                                  ₹{p.originalPrice.toLocaleString('en-IN')}
                                </span>
                                <span className="text-[9px] text-[#8A1C14] font-semibold">
                                  ({Math.round((1 - p.price / p.originalPrice) * 100)}% OFF)
                                </span>
                              </div>

                              <div className="pt-2.5">
                                <button
                                  onClick={(e) =>
                                  {
                                    e.stopPropagation();
                                    addToCart(p, p.sizes[0]);
                                  }}
                                  className="w-full py-2 bg-[#1A1A1A] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-[9px] uppercase tracking-widest font-semibold transition-all duration-300"
                                >
                                  Acquire Piece
                                </button>
                              </div>

                            </div>

                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                </div>

              </motion.div>
            )}

            {/* VIEW A.2: PRODUCT DETAIL PAGE */}
            {activeView.type === 'product' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8 text-left"
              >
                <button
                  onClick={() => setActiveView({ type: 'storefront', value: null })}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1A1A1A] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Catalog
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-6 sm:p-10 border border-[#E5DEC9] rounded-none">

                  {/* Left Column: Image Gallery */}
                  <div className="space-y-4">
                    <div className="w-full aspect-[3/4] bg-[#FAF9F6] border border-gray-100 overflow-hidden relative group">
                      <img
                        src={activeView.value.primaryImg}
                        alt={activeView.value.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-square bg-[#FAF9F6] border border-gray-100 overflow-hidden">
                        <img src={activeView.value.primaryImg} alt="Thumbnail 1" className="w-full h-full object-cover" />
                      </div>
                      <div className="aspect-square bg-[#FAF9F6] border border-gray-100 overflow-hidden">
                        <img src={activeView.value.secondaryImg} alt="Thumbnail 2" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Info Panel */}
                  <div className="space-y-6">
                    <div>
                      <button
                        onClick={() => setActiveView({ type: 'designer', value: activeView.value.designerId })}
                        className="text-xs uppercase tracking-[0.25em] text-[#C5A880] font-bold block mb-2 hover:underline"
                      >
                        {activeView.value.designer} &rarr;
                      </button>
                      <h2 className="text-2xl sm:text-3xl font-serif text-[#1A1A1A] leading-tight font-medium">
                        {activeView.value.name}
                      </h2>
                    </div>

                    {/* Price Block */}
                    <div className="flex items-center gap-4 py-2 border-y border-gray-100">
                      <span className="text-2xl font-bold text-[#1A1A1A]">₹{activeView.value.price.toLocaleString('en-IN')}</span>
                      <span className="text-sm text-gray-400 line-through">₹{activeView.value.originalPrice.toLocaleString('en-IN')}</span>
                      <span className="text-xs text-[#8A1C14] font-bold uppercase bg-red-50 px-2.5 py-1">12% Off</span>
                    </div>

                    {/* Rating stars */}
                    <div className="flex items-center gap-2 text-xs">
                      <div className="flex text-amber-400">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-gray-500 font-medium">({activeView.value.rating} Registry Rating)</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                      {activeView.value.description} Utilizing 100% locally-sourced threads, our weaver cooperatives maintain strict registry checkpoints to guarantee absolute regional authenticity.
                    </p>

                    {/* GI registry details */}
                    <div className="bg-[#FAF9F6] p-4 border border-[#E5DEC9] space-y-2">
                      <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A] flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#C5A880]" /> Geographic Indication Provenance Tag
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-[10px] sm:text-xs">
                        <div>
                          <span className="text-gray-400 block mb-0.5">Registry ID</span>
                          <strong className="font-mono text-[#C5A880]">{activeView.value.giTag}</strong>
                        </div>
                        <div>
                          <span className="text-gray-400 block mb-0.5">Specifications</span>
                          <strong className="text-gray-700">{activeView.value.details}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Size Selector */}
                    <div className="space-y-3">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">Select Size *</label>
                      <div className="flex flex-wrap gap-2">
                        {activeView.value.sizes.map(size => (
                          <button
                            key={size}
                            onClick={() => addToCart(activeView.value, size)}
                            className="border border-[#E5E5E5] hover:border-[#C5A880] hover:text-[#C5A880] px-4 py-2 text-xs uppercase tracking-wider font-semibold bg-white transition-colors"
                          >
                            {size}
                          </button>
                        ))}
                        {activeView.value.category === 'handloom' && (
                          <button
                            onClick={() => setIsCustomizingFit(true)}
                            className="border border-dashed border-[#C5A880] text-[#C5A880] hover:bg-[#C5A880]/5 px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center gap-1"
                          >
                            📐 Customize Stitching (Bespoke)
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-3 pt-4">
                      <div className="flex gap-4">
                        <button
                          onClick={() => addToCart(activeView.value, activeView.value.sizes[0])}
                          className="flex-1 py-3 bg-[#1A1A1A] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow"
                        >
                          Acquire Masterpiece
                        </button>
                        <button
                          onClick={() => toggleWishlist(activeView.value)}
                          className="p-3 border border-[#E5DEC9] text-gray-500 hover:text-[#8A1C14] hover:bg-gray-50 transition-colors"
                        >
                          <Heart className="w-5 h-5" fill={wishlist.some(w => w.id === activeView.value.id) ? '#C5A880' : 'none'} />
                        </button>
                      </div>

                      <button
                        onClick={() => setIsStylistOpen(true)}
                        className="w-full py-2.5 border border-[#C5A880] hover:bg-[#C5A880]/10 text-[#C5A880] text-[9.5px] uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        💬 Consult a Heritage Stylist (Virtual Video Call)
                      </button>
                    </div>

                    {/* BESPOKE MEASUREMENT MODAL */}
                    {isCustomizingFit && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white border border-[#C5A880] max-w-md w-full p-6 space-y-4 shadow-premium"
                        >
                          <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="font-serif text-base font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                              📐 Made-to-Measure Stitching
                            </h3>
                            <button
                              onClick={() => setIsCustomizingFit(false)}
                              className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                            >
                              &times;
                            </button>
                          </div>

                          <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                            Provide your sizing variables. Our designer weavers will stitch your blouse or adjust drapes to these custom specifications prior to seal generation. Custom pieces are non-returnable.
                          </p>

                          <div className="space-y-3 text-xs">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Bust (inches)</label>
                                <select
                                  value={fitDetails.bust}
                                  onChange={(e) => setFitDetails(prev => ({ ...prev, bust: e.target.value }))}
                                  className="w-full border border-gray-200 p-2 text-xs rounded-none"
                                >
                                  {['32', '34', '36', '38', '40', '42', '44', '46'].map(b => (
                                    <option key={b} value={b}>{b} inches</option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Height (cm)</label>
                                <input
                                  type="number"
                                  value={fitDetails.height}
                                  onChange={(e) => setFitDetails(prev => ({ ...prev, height: e.target.value }))}
                                  className="w-full border border-gray-200 p-2 text-xs rounded-none font-mono"
                                  min="140"
                                  max="200"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Sleeve Cut &amp; Length</label>
                              <select
                                value={fitDetails.sleeve}
                                onChange={(e) => setFitDetails(prev => ({ ...prev, sleeve: e.target.value }))}
                                className="w-full border border-gray-200 p-2 text-xs rounded-none"
                              >
                                <option value="Sleeveless">Sleeveless (Modern style)</option>
                                <option value="Standard Half-Sleeve">Standard Half-Sleeve</option>
                                <option value="Elbow-Length Sleeve">Elbow-Length (Classic elegant)</option>
                                <option value="Full Sleeve">Full Length (Sheer mesh/silk)</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Padded Inserts Required?</label>
                              <div className="flex gap-4 pt-1">
                                {['No', 'Yes (+₹300)'].map(opt => (
                                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                      type="radio"
                                      name="padded-opt"
                                      checked={fitDetails.padded === opt}
                                      onChange={() => setFitDetails(prev => ({ ...prev, padded: opt }))}
                                      className="accent-[#C5A880]"
                                    />
                                    <span>{opt}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => setIsCustomizingFit(false)}
                              className="flex-1 py-2 border border-gray-200 text-xs font-bold uppercase tracking-wider hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleAddBespokeToCart(activeView.value)}
                              className="flex-1 py-2 bg-[#1A1A1A] text-[#C5A880] text-xs font-bold uppercase tracking-wider hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-colors"
                            >
                              Apply &amp; Add to Bag
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* VIRTUAL STYLIST BOOKING MODAL */}
                    {isStylistOpen && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-white border border-[#C5A880] max-w-md w-full p-6 space-y-4 shadow-premium"
                        >
                          <div className="flex justify-between items-center border-b pb-2">
                            <h3 className="font-serif text-base font-semibold text-[#1A1A1A] flex items-center gap-1.5">
                              💬 Virtual Stylist Consultation
                            </h3>
                            <button
                              onClick={() => setIsStylistOpen(false)}
                              className="text-gray-400 hover:text-gray-600 text-lg font-bold"
                            >
                              &times;
                            </button>
                          </div>

                          <p className="text-[10px] text-gray-500 font-light leading-relaxed">
                            Schedule a private video consultation with our Master Weaver Representative and a Heritage Drape expert to review thread weight, customization parameters, or bridal trousseau curation.
                          </p>

                          <div className="space-y-3 text-xs">
                            <div>
                              <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Select Date</label>
                              <input
                                type="date"
                                value={stylistBooking.date}
                                onChange={(e) => setStylistBooking(prev => ({ ...prev, date: e.target.value }))}
                                className="w-full border border-gray-200 p-2 text-xs rounded-none font-mono"
                              />
                            </div>

                            <div>
                              <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Preferred Time Slot</label>
                              <select
                                value={stylistBooking.time}
                                onChange={(e) => setStylistBooking(prev => ({ ...prev, time: e.target.value }))}
                                className="w-full border border-gray-200 p-2 text-xs rounded-none"
                              >
                                <option value="10:00">10:00 AM (IST)</option>
                                <option value="12:00">12:00 PM (IST)</option>
                                <option value="14:00">02:00 PM (IST)</option>
                                <option value="16:00">04:00 PM (IST)</option>
                                <option value="18:00">06:00 PM (IST)</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[9px] uppercase tracking-wider text-gray-400 block mb-1">Select Weaving Guild</label>
                              <select
                                value={stylistBooking.cooperative}
                                onChange={(e) => setStylistBooking(prev => ({ ...prev, cooperative: e.target.value }))}
                                className="w-full border border-gray-200 p-2 text-xs rounded-none"
                              >
                                <option value="majuli">Majuli Weavers Guild Representative</option>
                                <option value="sualkuchi">Sualkuchi Silk Cooperative Stylist</option>
                                <option value="tripura">Agartala Cane &amp; Vessel Expert</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex gap-3 pt-2">
                            <button
                              onClick={() => setIsStylistOpen(false)}
                              className="flex-1 py-2 border border-gray-200 text-xs font-bold uppercase tracking-wider hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() =>
                              {
                                setIsStylistOpen(false);
                                triggerToast(`Video Consultation requested for ${stylistBooking.date} at ${stylistBooking.time} IST!`, '📅');
                              }}
                              className="flex-1 py-2 bg-[#1A1A1A] text-[#C5A880] text-xs font-bold uppercase tracking-wider hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-colors"
                            >
                              Schedule Consult
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}

                  </div>
                </div>

                {/* DELIVERY ESTIMATOR + TRUST BADGES */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* Delivery Estimator */}
                  <div className="bg-white border border-[#E5DEC9] p-5 space-y-4">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#C5A880]" /> Delivery Estimation
                    </h4>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500 font-light">Standard Heritage Dispatch</span>
                        <span className="font-semibold text-[#1A1A1A]">5-7 business days</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500 font-light">Express Sovereign Freight</span>
                        <span className="font-semibold text-[#C5A880]">2-3 business days (+₹499)</span>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <span className="text-gray-500 font-light">Northeast Region (Free)</span>
                        <span className="font-semibold text-emerald-700">1-2 business days</span>
                      </div>
                    </div>
                    <p className="text-[9px] text-gray-400 font-light">Estimated arrival: <strong className="text-[#1A1A1A]">June 18 – June 22, 2026</strong>. All heritage pieces include protective muslin wrapping.</p>
                  </div>

                  {/* Trust Badges & Share */}
                  <div className="bg-white border border-[#E5DEC9] p-5 space-y-4">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A] flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[#C5A880]" /> Prestige Guarantee
                    </h4>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center gap-3 py-1.5">
                        <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#E5DEC9] flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#1A1A1A] block">100% Authentic Handloom</span>
                          <span className="text-gray-400 font-light text-[10px]">GI Tag verified provenance registry</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 py-1.5">
                        <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#E5DEC9] flex items-center justify-center flex-shrink-0">
                          <Lock className="w-4 h-4 text-[#C5A880]" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#1A1A1A] block">Secure Checkout</span>
                          <span className="text-gray-400 font-light text-[10px]">256-bit SSL encrypted payment</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 py-1.5">
                        <div className="w-8 h-8 rounded-full bg-[#FAF9F6] border border-[#E5DEC9] flex items-center justify-center flex-shrink-0">
                          <RotateCw className="w-4 h-4 text-[#C5A880]" />
                        </div>
                        <div>
                          <span className="font-semibold text-[#1A1A1A] block">7-Day Exchange Policy</span>
                          <span className="text-gray-400 font-light text-[10px]">Hassle-free returns for standard sizes</span>
                        </div>
                      </div>
                    </div>

                    {/* Share Button */}
                    <div className="border-t border-gray-100 pt-3 mt-2">
                      <button
                        onClick={() =>
                        {
                          if (navigator.share)
                          {
                            navigator.share({
                              title: activeView.value.name,
                              text: `Check out ${activeView.value.name} on Itin Keithel — ₹${activeView.value.price.toLocaleString('en-IN')}`,
                              url: window.location.href
                            });
                          } else
                          {
                            navigator.clipboard.writeText(window.location.href);
                            triggerToast('Product link copied to clipboard!', '📋');
                          }
                        }}
                        className="flex items-center gap-2 text-[9.5px] uppercase tracking-wider font-bold text-gray-500 hover:text-[#C5A880] transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" /> Share This Masterpiece
                      </button>
                    </div>
                  </div>
                </div>

                {/* YOU MAY ALSO LIKE (Cross-sell Recommendations) */}
                {products.filter(p => p.id !== activeView.value.id).length > 0 && (
                  <div className="space-y-5">
                    <div className="text-center border-b border-gray-100 pb-3">
                      <span className="text-[8.5px] uppercase tracking-[0.3em] text-[#C5A880] font-bold block mb-1">Curated For You</span>
                      <h3 className="text-base font-serif font-semibold text-[#1A1A1A]">You May Also Like</h3>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {products
                        .filter(p => p.id !== activeView.value.id)
                        .slice(0, 4)
                        .map(p => (
                          <div
                            key={p.id}
                            onClick={() => setActiveView({ type: 'product', value: p })}
                            className="group bg-white border border-[#E5E5E5] overflow-hidden cursor-pointer hover-huly"
                          >
                            <div className="w-full h-[200px] overflow-hidden bg-[#FAF9F6] relative">
                              <img src={p.primaryImg} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-3 text-center space-y-1">
                              <span className="text-[8px] uppercase tracking-wider text-[#C5A880] font-bold block">{p.designer}</span>
                              <h5 className="text-[10px] text-[#1A1A1A] font-light truncate">{p.name}</h5>
                              <span className="text-[10px] font-bold text-[#1A1A1A] font-mono block">₹{p.price.toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

              </motion.div>
            )}

            {/* VIEW A.3: DESIGNER PROFILE DETAIL */}
            {activeView.type === 'designer' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-8 text-left"
              >
                <button
                  onClick={() => setActiveView({ type: 'storefront', value: null })}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1A1A1A] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Storefront
                </button>

                {/* Profile Header */}
                {GUILD_DESIGNERS.filter(g => g.id === activeView.value).map(guild => (
                  <div key={guild.id} className="bg-white border border-[#E5DEC9] p-6 sm:p-10 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full border border-[#C5A880] bg-[#F5EFEB] flex items-center justify-center text-3xl">
                          {guild.avatar}
                        </div>
                        <div>
                          <h2 className="text-xl sm:text-2xl font-serif text-[#1A1A1A] font-semibold">{guild.name}</h2>
                          <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-bold block mt-1">{guild.location} Registry</span>
                        </div>
                      </div>

                      <div className="flex gap-4 text-xs font-mono">
                        <div className="bg-[#FAF9F6] border border-gray-100 px-4 py-2 text-center">
                          <span className="text-gray-400 text-[8px] uppercase tracking-wider block">Established</span>
                          <strong className="text-[#1A1A1A]">{guild.established}</strong>
                        </div>
                        <div className="bg-[#FAF9F6] border border-gray-100 px-4 py-2 text-center">
                          <span className="text-gray-400 text-[8px] uppercase tracking-wider block">QA Registry</span>
                          <strong className="text-[#8A1C14]">{guild.rating}★</strong>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed max-w-3xl">
                      {guild.bio} By working directly with our platform registry, this cooperative ensures that proceeds bypass intermediate brokers to reach the handloom weavers directly, preserving ecological dye forests and geographical weaving seals.
                    </p>
                  </div>
                ))}

                {/* Designer Products Grid */}
                <div className="space-y-6">
                  <h3 className="text-base font-serif font-semibold text-[#1A1A1A] border-b pb-2">Available Masterpieces</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.filter(p => p.designerId === activeView.value).map(p => (
                      <div
                        key={p.id}
                        onClick={() => setActiveView({ type: 'product', value: p })}
                        className="group flex flex-col bg-white border border-[#E5E5E5] overflow-hidden relative hover-huly cursor-pointer"
                      >
                        <div className="relative w-full h-[300px] overflow-hidden bg-[#FAF9F6]">
                          <img src={p.primaryImg} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 space-y-1 text-center border-t border-[#F2F2F2]">
                          <h4 className="text-xs font-medium text-[#1A1A1A] truncate">{p.name}</h4>
                          <span className="text-xs font-bold text-[#C5A880] block font-mono">₹{p.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* VIEW A.4: LOOKBOOK PAGE */}
            {activeView.type === 'lookbook' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8 text-left"
              >
                <button
                  onClick={() => setActiveView({ type: 'storefront', value: null })}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1A1A1A] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Storefront
                </button>

                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="text-[8.5px] uppercase tracking-[0.3em] text-[#C5A880] font-bold block">Digital Catalog</span>
                  <h2 className="text-3xl font-serif text-[#1A1A1A] font-semibold">The Sacred Threads Lookbook</h2>
                  <p className="text-xs text-gray-500 font-light">An editorial chronicle of weaver lineage, mulberry silk harvests, and ecological drapes.</p>
                </div>

                <div className="space-y-12">
                  {HERO_SLIDES.map((slide, idx) => (
                    <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-white border border-[#E5DEC9] p-6 sm:p-10">
                      <div className="aspect-[16/10] overflow-hidden relative group">
                        <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                        {/* Interactive pulsing gold hotspot */}
                        <div className="absolute top-[40%] left-[55%] z-20">
                          <button
                            onClick={() =>
                            {
                              setLookbookPopover({
                                idx,
                                product: products[idx % products.length]
                              });
                              triggerToast('Shoppable Look details revealed!', '🔍');
                            }}
                            className="w-7 h-7 rounded-full bg-[#C5A880] border-2 border-white flex items-center justify-center text-white text-[11px] font-bold shadow-lg animate-bounce focus:outline-none hover:scale-110 transition-transform"
                            title="Shop the Look"
                          >
                            +
                          </button>

                          {/* Popover overlay */}
                          {lookbookPopover && lookbookPopover.idx === idx && (
                            <div className="absolute top-9 -left-20 w-44 bg-white/95 backdrop-blur border border-[#C5A880] p-3.5 shadow-premium z-30 text-xs text-left space-y-2.5">
                              <div className="flex justify-between items-start gap-1">
                                <span className="font-serif font-bold text-[#1A1A1A] text-[10px] leading-tight block truncate w-32">{lookbookPopover.product.name}</span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setLookbookPopover(null); }}
                                  className="text-gray-400 hover:text-gray-600 font-bold"
                                >
                                  &times;
                                </button>
                              </div>
                              <span className="font-mono text-[#C5A880] font-bold block">₹{lookbookPopover.product.price.toLocaleString('en-IN')}</span>
                              <button
                                onClick={() =>
                                {
                                  setActiveView({ type: 'product', value: lookbookPopover.product });
                                  setLookbookPopover(null);
                                }}
                                className="w-full py-1 text-[8.5px] uppercase tracking-wider font-bold bg-[#1A1A1A] text-white text-center hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-colors"
                              >
                                View Piece
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-[#C5A880] font-bold block">{slide.subtitle}</span>
                        <h3 className="text-xl sm:text-2xl font-serif text-[#1A1A1A]">{slide.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">{slide.desc} Handcrafted in Assam, this collection highlights geometric motifs hand-beaten using indigenous frame looms.</p>
                        <button
                          onClick={() =>
                          {
                            setSelectedDesignerFilter('majuli');
                            setActiveView({ type: 'storefront', value: null });
                            triggerToast('Filtering catalog to Majuli Weavers', '🏛️');
                          }}
                          className="px-6 py-2.5 bg-[#1A1A1A] text-[#C5A880] text-[9.5px] uppercase tracking-wider font-semibold hover:bg-[#C5A880] hover:text-[#1A1A1A] transition-colors"
                        >
                          Acquire Looks
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* VIEW A.5: STATIC HELP & POLICY VIEWPORT */}
            {activeView.type === 'page' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 text-left max-w-3xl mx-auto"
              >
                <button
                  onClick={() => setActiveView({ type: 'storefront', value: null })}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1A1A1A] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back to Storefront
                </button>

                <div className="bg-white p-8 border border-[#E5DEC9] rounded-none space-y-6">

                  {activeView.value === 'casket-info' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-[#1A1A1A] border-b pb-3 font-semibold">Prestige Gift Casket Packaging</h2>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                        Our customized gift casket service is an exclusive prestige feature reserved for collector orders containing multiple items.
                      </p>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#C5A880] pt-2">How to Unlock:</h3>
                      <ol className="list-decimal pl-5 text-xs text-gray-600 space-y-2 font-light">
                        <li>Browse the heritage storefront and select your favorite masterpieces.</li>
                        <li>Add <strong>more than one item</strong> (at least 2 products) to your Prestige Bag.</li>
                        <li>Open the Prestige Bag drawer. A custom configuration tool will automatically appear, allowing you to wrap your purchases inside a hand-woven Bamboo or Silk-lined casket!</li>
                      </ol>
                    </div>
                  )}

                  {activeView.value === 'provenance-info' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-[#1A1A1A] border-b pb-3 font-semibold">Geographic Indication (GI) Provenance Registry</h2>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                        To combat duplication, every silk Mekhela Chador, Eri shawl, and cane artifact sold on Itin Keithel is registered with the state board and embedded with a unique verification hash.
                      </p>
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#C5A880] pt-2">Logistics Audits</h3>
                      <p className="text-xs text-gray-600 font-light leading-relaxed">
                        Our regional logistics captains take photographs directly at the weaver's loom, packaging desk, and shipping terminal. This photographic sequence is verified administratively at our Jorhat QA hub before the dispatch seal is approved.
                      </p>
                    </div>
                  )}

                  {activeView.value === 'concierge' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-[#1A1A1A] border-b pb-3 font-semibold">Heritage Concierge Services</h2>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                        Our premium concierge matches collectors with master weavers for custom measurements, specific zari embroideries, and personalized drapes.
                      </p>
                      <p className="text-xs text-gray-500">Contact prestige help: concierge@itin-keithel.in</p>
                    </div>
                  )}

                  {activeView.value === 'shipping' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-[#1A1A1A] border-b pb-3 font-semibold">Sovereign Air Freight Logistics</h2>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                        Shipments are routed from remote river locations via ferry boats to flight cargo hubs in Guwahati and Jorhat, guaranteeing direct delivery within 3-5 days.
                      </p>
                    </div>
                  )}

                  {activeView.value === 'care' && (
                    <div className="space-y-4">
                      <h2 className="text-2xl font-serif text-[#1A1A1A] border-b pb-3 font-semibold">Heritage Silk Care Instructions</h2>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light">
                        Natural Muga and Eri silk are delicate fibers. Dry clean only. Keep out of direct sun exposure, and store in soft muslin wraps.
                      </p>
                    </div>
                  )}

                </div>
              </motion.div>
            )}

            {/* 7. HERITAGE DIRECTORY A-Z */}
            <div id="az-catalog" className="bg-white border border-[#E5DEC9] p-6 sm:p-8 lg:p-12 text-left space-y-8">
              <div className="border-b border-gray-100 pb-4">
                <span className="text-[8.5px] uppercase tracking-[0.3em] text-[#C5A880] font-bold block mb-1">Heritage Catalog</span>
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-[#1A1A1A]">Artisans &amp; Cooperatives A-Z</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-xs">
                {AZ_DESIGNERS.map(artisan => (
                  <div
                    key={artisan.id}
                    onClick={() =>
                    {
                      if (GUILD_DESIGNERS.some(g => g.id === artisan.id))
                      {
                        setActiveView({ type: 'designer', value: artisan.id });
                      } else
                      {
                        triggerToast(`Registering ${artisan.name} registry soon!`, '🏛️');
                      }
                    }}
                    className="space-y-1.5 p-3 hover:bg-[#FAF9F6] border border-transparent hover:border-[#E5DEC9] transition-all cursor-pointer group"
                  >
                    <h5 className="font-bold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors">{artisan.name}</h5>
                    <span className="text-[10px] text-gray-500 font-light block">{artisan.region} Registry</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. CUSTOMER TESTIMONIALS */}
            <div className="bg-white border border-[#E5DEC9] p-6 sm:p-8 lg:p-12 text-left space-y-8">
              <div className="text-center border-b border-gray-100 pb-4">
                <span className="text-[8.5px] uppercase tracking-[0.3em] text-[#C5A880] font-bold block mb-1">Prestige Voices</span>
                <h3 className="text-lg sm:text-xl font-serif font-semibold text-[#1A1A1A]">What Our Collectors Say</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CUSTOMER_TESTIMONIALS.map((review, idx) => (
                  <div key={idx} className="bg-[#FAF9F6] border border-[#E5DEC9] p-5 space-y-3 relative group hover:shadow-md transition-shadow">
                    <Quote className="w-6 h-6 text-[#C5A880]/30 absolute top-4 right-4" />

                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-200" />
                      ))}
                    </div>

                    <p className="text-[10.5px] text-gray-600 font-light leading-relaxed italic">
                      "{review.text}"
                    </p>

                    <div className="border-t border-[#E5DEC9] pt-3 flex justify-between items-end">
                      <div>
                        <span className="text-xs font-semibold text-[#1A1A1A] block">{review.name}</span>
                        <span className="text-[9px] text-gray-400 font-light">{review.location}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] uppercase tracking-wider text-[#C5A880] font-bold block">Purchased</span>
                        <span className="text-[9px] text-gray-500 font-light">{review.product}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 9. RECENTLY VIEWED PRODUCTS */}
            {recentlyViewed.length > 0 && (
              <div className="bg-white border border-[#E5DEC9] p-6 sm:p-8 text-left space-y-6">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                  <Eye className="w-4 h-4 text-[#C5A880]" />
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">Recently Viewed</h4>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                  {recentlyViewed.map(p => (
                    <div
                      key={p.id}
                      onClick={() => setActiveView({ type: 'product', value: p })}
                      className="flex-shrink-0 w-[140px] group cursor-pointer"
                    >
                      <div className="w-full h-[180px] overflow-hidden bg-[#FAF9F6] border border-gray-100 relative">
                        <img src={p.primaryImg} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="pt-2 text-center space-y-0.5">
                        <h5 className="text-[9px] text-[#1A1A1A] font-light truncate">{p.name}</h5>
                        <span className="text-[9px] font-bold text-[#C5A880] font-mono block">₹{p.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 10. NEWSLETTER SIGNUP BANNER */}
            <div className="relative bg-[#1A1A1A] text-white p-8 sm:p-12 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(197,168,128,0.3) 35px, rgba(197,168,128,0.3) 36px)' }} />
              </div>

              <div className="relative z-10 max-w-lg mx-auto space-y-4">
                <Sparkles className="w-6 h-6 text-[#C5A880] mx-auto" />
                <h3 className="text-xl sm:text-2xl font-serif font-semibold tracking-wide">Join the Prestige Circle</h3>
                <p className="text-[10.5px] text-gray-300 font-light leading-relaxed">
                  Receive exclusive access to new designer drops, seasonal lookbooks, early sale previews, and curated weaver stories. Members enjoy 10% off their first heritage acquisition.
                </p>

                {isNewsletterSubmitted ? (
                  <div className="flex items-center justify-center gap-2 text-[#C5A880] text-sm font-semibold py-3">
                    <CheckCircle2 className="w-5 h-5" /> Welcome to the Circle!
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 text-white text-xs outline-none placeholder:text-gray-400 focus:border-[#C5A880] rounded-none font-light"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#C5A880] text-[#1A1A1A] text-[9.5px] uppercase tracking-wider font-bold hover:bg-white transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                )}

                <p className="text-[8px] uppercase tracking-wider text-gray-500">Unsubscribe anytime · No spam guarantee · Your data stays sovereign</p>
              </div>
            </div>

            {/* AZA-STYLE PRESTIGE FOOTER */}
            <footer className="border-t border-[#E5E5E5] pt-12 pb-6 text-left text-xs text-gray-500 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <span className="font-serif text-lg tracking-widest text-[#1A1A1A] font-bold block">ITIN KEITHEL</span>
                  <p className="font-light text-[11px] leading-relaxed">
                    Sovereign luxury e-commerce bringing traditional weavers cooperative guilds from the North-East straight to prestige collectors worldwide.
                  </p>
                </div>
                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Prestige Services</h5>
                  <ul className="space-y-2 font-light text-[11px]">
                    <li onClick={() => setActiveView({ type: 'page', value: 'concierge' })} className="hover:text-[#C5A880] cursor-pointer">Heritage Concierge</li>
                    <li onClick={() => setActiveView({ type: 'page', value: 'casket-info' })} className="hover:text-[#C5A880] cursor-pointer">Hamper Customization</li>
                    <li onClick={() => setActiveView({ type: 'page', value: 'provenance-info' })} className="hover:text-[#C5A880] cursor-pointer">GI Provenance Check</li>
                    <li onClick={() => setActiveView({ type: 'page', value: 'shipping' })} className="hover:text-[#C5A880] cursor-pointer">Logistics Tracking</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Regional Guilds</h5>
                  <ul className="space-y-2 font-light text-[11px]">
                    <li onClick={() => setActiveView({ type: 'designer', value: 'majuli' })} className="hover:text-[#C5A880] cursor-pointer">Majuli Silk Weavers</li>
                    <li onClick={() => setActiveView({ type: 'designer', value: 'sualkuchi' })} className="hover:text-[#C5A880] cursor-pointer">Sualkuchi Cooperatives</li>
                    <li onClick={() => setActiveView({ type: 'designer', value: 'tripura' })} className="hover:text-[#C5A880] cursor-pointer">Tripura Cane Weave Union</li>
                    <li onClick={() => setActiveView({ type: 'page', value: 'care' })} className="hover:text-[#C5A880] cursor-pointer">Heritage Silk Care</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Prestige Trust</h5>
                  <div className="flex gap-4">
                    <Globe className="w-5 h-5 text-gray-400" />
                    <Phone className="w-5 h-5 text-gray-400" />
                    <HelpCircle className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-[10px] font-light mt-2">© 2026 Itin Keithel Luxury. Authenticity guaranteed.</p>
                </div>
              </div>
            </footer>

          </div>
        )}

        {/* VIEW B: VENDOR/GUILD CONSOLE */}
        {currentRole === 'vendor' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left"
          >
            {/* Left Columns (Operational tables and listings) */}
            <div className="lg:col-span-2 space-y-8">

              {/* Manifest table */}
              <div className="bg-white p-6 sm:p-8 border border-[#E5DEC9] rounded-none shadow-premium space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#F2F2F2] pb-4">
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-[#1A1A1A]">Rider Manifest slips &amp; Pick-up logistics</h3>
                    <span className="text-xs text-gray-500 font-light block mt-0.5">Linked dynamically to live Customer Checkout logs</span>
                  </div>
                  <span className="text-[9px] uppercase tracking-widest bg-red-50 text-[#8A1C14] border border-[#8A1C14]/20 px-3 py-1 font-bold animate-pulse">
                    Awaiting pickup
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#E5DEC9] text-gray-400 font-medium">
                        <th className="pb-3 uppercase tracking-wider font-semibold">Order ID</th>
                        <th className="pb-3 uppercase tracking-wider font-semibold">Collector Node</th>
                        <th className="pb-3 uppercase tracking-wider font-semibold">Assigned Captain</th>
                        <th className="pb-3 uppercase tracking-wider font-semibold">GI ID</th>
                        <th className="pb-3 uppercase tracking-wider font-semibold">Logistics status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {manifests.map(m => (
                        <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 font-semibold text-[#1A1A1A]">{m.id}</td>
                          <td className="py-3 text-gray-600">{m.collector}</td>
                          <td className="py-3 text-gray-600 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                            {m.rider}
                          </td>
                          <td className="py-3 font-mono text-[#C5A880]">{m.giTag}</td>
                          <td className="py-3">
                            <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-medium border ${m.status.includes('Pending') ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Product Listing Form */}
              <div className="bg-white p-6 sm:p-8 border border-[#E5DEC9] rounded-none shadow-premium space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#1A1A1A]">List a New Heritage Masterpiece</h3>
                  <span className="text-xs text-gray-500 font-light block mt-0.5">Publish new direct-from-loom textiles into the global e-commerce catalog</span>
                </div>

                <form onSubmit={handleVendorFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Product Masterpiece Title *</label>
                      <input
                        type="text"
                        required
                        value={newProductForm.title}
                        onChange={(e) => setNewProductForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. Assamese Eri Silk Mekhela"
                        className="w-full px-3 py-2 border border-[#E5DEC9] text-xs outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Acquisition Value (₹) *</label>
                      <input
                        type="number"
                        required
                        value={newProductForm.price}
                        onChange={(e) => setNewProductForm(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="7800"
                        className="w-full px-3 py-2 border border-[#E5DEC9] text-xs outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Category Type *</label>
                      <select
                        value={newProductForm.category}
                        onChange={(e) => setNewProductForm(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border border-[#E5DEC9] text-xs outline-none bg-white focus:border-[#C5A880]"
                      >
                        <option value="handloom">Handloom: Drape &amp; Texture</option>
                        <option value="handicraft">Handicraft: Form &amp; Detail</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">GI Registry Tag ID *</label>
                      <input
                        type="text"
                        required
                        value={newProductForm.giTag}
                        onChange={(e) => setNewProductForm(prev => ({ ...prev, giTag: e.target.value }))}
                        placeholder="GI-ASSAM-MASKS-12"
                        className="w-full px-3 py-2 border border-[#E5DEC9] text-xs outline-none focus:border-[#C5A880] font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Storytelling Description *</label>
                    <textarea
                      rows="3"
                      required
                      value={newProductForm.description}
                      onChange={(e) => setNewProductForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Lineage details, raw materials sourcing details, natural dye roots etc."
                      className="w-full px-3 py-2 border border-[#E5DEC9] text-xs outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Provenance Image Upload</label>
                    <div
                      onClick={handleVendorSimulateImage}
                      className="border-2 border-dashed border-[#E5DEC9] p-6 flex flex-col items-center justify-center gap-2 bg-[#FAF9F6] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Camera className="w-5 h-5 text-[#C5A880]" />
                      <span className="text-xs text-gray-600 font-medium">
                        {simulatedAttachedImage ? 'File attached (Click to swap)' : 'Attach Provenance File'}
                      </span>
                      {simulatedAttachedImage && (
                        <img src={simulatedAttachedImage} alt="Preview" className="w-16 h-16 object-cover border border-[#E5DEC9] mt-2" />
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1A1A1A] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] uppercase tracking-widest text-[9px] font-semibold transition-all duration-300 shadow btn-premium-hover"
                  >
                    Publish Masterpiece to Storefront
                  </button>
                </form>
              </div>

            </div>

            {/* Right Column (Analytics, Stock indicators) */}
            <div className="space-y-8">

              {/* Analytics SVG Graph */}
              <div className="bg-white p-6 sm:p-8 border border-[#E5DEC9] rounded-none shadow-premium space-y-4">
                <h3 className="text-base font-serif font-semibold text-[#1A1A1A]">Revenue Growth &amp; Projections</h3>

                <div className="aspect-[5/2] w-full bg-[#FAF9F6] border border-gray-100 p-2 flex items-center justify-center">
                  <svg viewBox="0 0 500 200" className="w-full h-full">
                    <polyline fill="none" stroke="#8A1C14" strokeWidth="3" points="50,155 130,105 210,85 290,65 370,25 450,10" />
                    <circle cx="50" cy="155" r="4" fill="#8A1C14" />
                    <circle cx="450" cy="10" r="4" fill="#8A1C14" />
                  </svg>
                </div>
              </div>

              {/* Guild Inventory Adjustments */}
              <div className="bg-white p-6 sm:p-8 border border-[#E5DEC9] rounded-none shadow-premium space-y-4">
                <h3 className="text-base font-serif font-semibold text-[#1A1A1A]">Guild Stock Levels</h3>
                <div className="divide-y divide-gray-100">
                  {products.map(p => (
                    <div key={p.id} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-medium text-[#1A1A1A] block">{p.name}</span>
                        <span className="text-[9.5px] text-gray-500 font-mono">
                          {p.stock} units in inventory
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAdminOverrideStock(p.id, Math.max(0, p.stock - 1))}
                          className="w-7 h-7 bg-gray-100 text-[#1A1A1A] rounded flex items-center justify-center font-bold hover:bg-gray-200 transition-colors"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleAdminOverrideStock(p.id, p.stock + 1)}
                          className="w-7 h-7 bg-gray-100 text-[#1A1A1A] rounded flex items-center justify-center font-bold hover:bg-gray-200 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* VIEW C: RIDER/LOGISTICS MOBILE APP */}
        {currentRole === 'delivery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-sm rounded-[36px] border-[12px] border-[#1A1A1A] bg-[#FAF9F6] shadow-2xl overflow-hidden text-left flex flex-col justify-between min-h-[640px]">

              {/* Rider Header */}
              <div className="bg-emerald-950 text-white p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-900 border border-emerald-700 text-[8.5px] uppercase tracking-wider text-emerald-300 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-ping" />
                    Online Captain
                  </span>

                  <div className="text-right">
                    <span className="text-[8px] text-emerald-300 uppercase block tracking-wider font-light">Today's Wallet</span>
                    <strong className="text-sm font-semibold text-emerald-400 font-mono">₹{riderEarnings.toFixed(2)}</strong>
                  </div>
                </div>
              </div>

              {/* Rider App Body */}
              <div className="flex-1 p-5 overflow-y-auto space-y-5">

                {/* Active Trip Card */}
                <div className="bg-white p-4 shadow-premium border border-gray-100 space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[8px] uppercase tracking-widest font-bold bg-[#C5A880]/20 text-[#C5A880] px-2.5 py-0.5 rounded">
                      Active Pick-up Run
                    </span>
                  </div>

                  <div className="space-y-3 relative text-xs">
                    <div className="absolute top-4 bottom-4 left-3 w-px border-dashed border-gray-300" />

                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold z-10 font-mono">P</div>
                      <div>
                        <h4 className="font-semibold text-[#1A1A1A]">Majuli Handloom Weavers</h4>
                        <p className="text-[9.5px] text-gray-500 font-light">Kamalabari Gate, Majuli Hub</p>
                      </div>
                    </div>

                    <div className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center font-bold z-10 font-mono">D</div>
                      <div>
                        <h4 className="font-semibold text-[#1A1A1A]">ITIN Sovereign QA Hub</h4>
                        <p className="text-[9.5px] text-gray-500 font-light">Jorhat Flight Cargo Terminal</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Double-Verification */}
                <div className="bg-white p-4 shadow-premium border border-gray-100 space-y-4">
                  <div>
                    <h3 className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]">Sovereign Double Verification</h3>
                  </div>

                  {!isPickedUp ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 1, label: 'Loom close' },
                          { id: 2, label: 'Package Seal' },
                          { id: 3, label: 'Guild Stamp' }
                        ].map(slot => (
                          <div
                            key={slot.id}
                            onClick={() => handleRiderPhotoClick(slot.id)}
                            className={`aspect-square border-2 border-dashed flex flex-col justify-center items-center gap-1 p-1 cursor-pointer transition-colors ${completedSlots[slot.id] ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:bg-gray-50 text-gray-400'}`}
                          >
                            {completedSlots[slot.id] ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <>
                                <Camera className="w-4 h-4 text-[#C5A880]" />
                                <span className="text-[7.5px] uppercase font-bold text-gray-400 block text-center leading-none">{slot.label}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handleRiderPickupSubmit}
                        disabled={!completedSlots[1] || !completedSlots[2] || !completedSlots[3]}
                        className="w-full py-2.5 bg-[#1A1A1A] disabled:bg-gray-100 disabled:text-gray-400 text-[#C5A880] font-semibold text-[9px] uppercase tracking-widest transition-all shadow"
                      >
                        Verify &amp; Complete Pick-up
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4 text-xs">
                      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded text-[9.5px] font-medium flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" /> Pick-up complete! Provenance Hash generated.
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold block">Phase 2: QA Hub Drop-off</span>

                        <button
                          onClick={() =>
                          {
                            setIsGeotagged(true);
                            triggerToast('GPS geotag matched cargo gates!', '📍');
                          }}
                          disabled={isGeotagged}
                          className={`w-full py-2 border rounded font-mono text-[8.5px] uppercase tracking-wider font-semibold transition-all ${isGeotagged ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-[#C5A880] text-[#C5A880] hover:bg-gray-50'}`}
                        >
                          {isGeotagged ? 'Geotag Locked (26.96N, 94.12E)' : 'Secure Geotag at Hub Entrance'}
                        </button>

                        <div
                          onClick={() => isGeotagged && handleRiderPhotoClick('drop')}
                          className={`border-2 border-dashed rounded p-4 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${!isGeotagged ? 'opacity-40 pointer-events-none' : ''} ${completedSlots.drop ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-gray-200 hover:bg-gray-50 text-gray-400'}`}
                        >
                          {completedSlots.drop ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <>
                              <Camera className="w-5 h-5 text-[#C5A880]" />
                              <span className="text-[7.5px] uppercase font-bold text-gray-400">Capture Cargo Desk Slip</span>
                            </>
                          )}
                        </div>

                        <button
                          onClick={handleRiderDropoffSubmit}
                          disabled={!isGeotagged || !completedSlots.drop || isDelivered}
                          className="w-full py-2.5 bg-emerald-800 text-white disabled:bg-gray-200 disabled:text-gray-400 font-semibold text-[9px] uppercase tracking-widest transition-all shadow"
                        >
                          {isDelivered ? 'LOGISTICS RUN COMPLETE' : 'Complete Delivery Logistics'}
                        </button>
                      </div>
                    </div>
                  )}

                </div>

              </div>

            </div>
          </motion.div>
        )}

        {/* VIEW D: QA ADMIN HUB */}
        {currentRole === 'admin' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 text-left"
          >
            {adminActiveGateway === 'gateway' ? (
              <div className="space-y-8">
                <div className="bg-[#1C1C1C] p-8 rounded-none border border-red-500/20 text-center max-w-xl mx-auto space-y-3">
                  <ShieldAlert className="w-8 h-8 text-red-500 mx-auto" />
                  <h2 className="text-2xl font-serif text-white tracking-wider">Sovereign Inspection Hub Gateways</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    onClick={() => setAdminActiveGateway('consumer')}
                    className="bg-white p-6 rounded-none border border-[#E5DEC9] hover:border-[#C5A880] hover:shadow-premium transition-all duration-300 cursor-pointer space-y-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F5EFEB] text-[#C5A880] flex items-center justify-center text-lg">
                      🛍️
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors">Storefront Overseer</h3>
                      <p className="text-xs text-gray-500 font-light mt-1">Monitor customer traffic, modify royal descriptions, and override catalog valuations.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setAdminActiveGateway('vendor')}
                    className="bg-white p-6 rounded-none border border-[#E5DEC9] hover:border-[#C5A880] hover:shadow-premium transition-all duration-300 cursor-pointer space-y-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F5EFEB] text-[#C5A880] flex items-center justify-center text-lg">
                      🏪
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors">Guild Central Auditor</h3>
                      <p className="text-xs text-gray-500 font-light mt-1">Verify seller listings, audit manifest dispatches, and check top guild stock indicators.</p>
                    </div>
                  </div>

                  <div
                    onClick={() => setAdminActiveGateway('rider')}
                    className="bg-white p-6 rounded-none border border-[#E5DEC9] hover:border-[#C5A880] hover:shadow-premium transition-all duration-300 cursor-pointer space-y-4 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F5EFEB] text-[#C5A880] flex items-center justify-center text-lg">
                      🚛
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-[#1A1A1A] group-hover:text-[#C5A880] transition-colors">Logistics Registry Inspector</h3>
                      <p className="text-xs text-gray-500 font-light mt-1">Trace rider coordinates, inspect loom provenance photographs, and apply official QA hub seals.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // SUB DASHBOARDS
              <div className="space-y-6">

                <div className="flex justify-between items-center bg-white p-4 border border-[#E5DEC9] rounded-none">
                  <button
                    onClick={() => setAdminActiveGateway('gateway')}
                    className="text-xs font-semibold text-[#C5A880] uppercase tracking-wider hover:text-[#1A1A1A] transition-colors flex items-center gap-1.5"
                  >
                    &larr; Return to Inspection Gateways
                  </button>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] bg-[#F5EFEB] px-3 py-1 rounded-none font-mono">
                    Console: {adminActiveGateway.toUpperCase()}
                  </span>
                </div>

                {adminActiveGateway === 'consumer' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 bg-white p-6 sm:p-8 border border-[#E5DEC9] rounded-none shadow-premium space-y-6">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[9px] uppercase tracking-wider text-gray-500 font-semibold block">Rewrite Royal Release Special Text</label>
                          <div className="flex gap-3">
                            <input
                              type="text"
                              value={specialReleaseText}
                              onChange={(e) => setSpecialReleaseText(e.target.value)}
                              className="flex-1 px-3 py-2 border border-[#E5DEC9] text-xs outline-none focus:border-[#C5A880]"
                            />
                            <button
                              onClick={() => handleAdminOverrideBanner(specialReleaseText)}
                              className="px-4 py-2 bg-[#1A1A1A] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-[9px] font-semibold uppercase tracking-wider transition-all"
                            >
                              Rewrite Banner
                            </button>
                          </div>
                        </div>

                        <div className="space-y-4 border-t border-gray-100 pt-4">
                          <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">Valuation &amp; Stock Registry Overrides</h4>
                          <div className="divide-y divide-gray-100">
                            {products.map(p => (
                              <div key={p.id} className="py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs">
                                <span className="font-medium text-[#1A1A1A] shrink-0">{p.name}</span>

                                <div className="flex flex-wrap gap-4 items-center w-full md:justify-end">
                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400 text-[9px]">Stock:</span>
                                    <input
                                      type="number"
                                      defaultValue={p.stock}
                                      id={`stock-override-${p.id}`}
                                      className="w-16 px-2 py-1 border border-[#E5DEC9] text-xs outline-none focus:border-[#C5A880]"
                                    />
                                    <button
                                      onClick={() =>
                                      {
                                        const val = document.getElementById(`stock-override-${p.id}`).value;
                                        handleAdminOverrideStock(p.id, val);
                                      }}
                                      className="px-2.5 py-1 bg-gray-100 text-[#1A1A1A] text-[9.5px] font-bold"
                                    >
                                      Lock
                                    </button>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className="text-gray-400 text-[9px]">Valuation:</span>
                                    <input
                                      type="number"
                                      defaultValue={p.price}
                                      id={`price-override-${p.id}`}
                                      className="w-20 px-2 py-1 border border-[#E5DEC9] text-xs outline-none focus:border-[#C5A880] font-mono"
                                    />
                                    <button
                                      onClick={() =>
                                      {
                                        const val = document.getElementById(`price-override-${p.id}`).value;
                                        handleAdminOverridePrice(p.id, val);
                                      }}
                                      className="px-2.5 py-1 bg-gray-100 text-[#1A1A1A] text-[9.5px] font-bold"
                                    >
                                      Lock
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="bg-white p-6 sm:p-8 border border-[#E5DEC9] rounded-none shadow-premium space-y-4">
                      <h3 className="text-base font-serif font-semibold text-[#1A1A1A]">Live Traffic Telemetry</h3>
                      <div className="space-y-3 font-mono text-[9px]">
                        {telemetryLogs.map(log => (
                          <div key={log.id} className="flex gap-2 items-start border-b border-gray-50 pb-2">
                            <span className="text-gray-500 leading-normal">{log.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {adminActiveGateway === 'vendor' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 sm:p-8 border border-[#E5DEC9] rounded-none shadow-premium space-y-6">
                      <h3 className="text-lg font-serif font-semibold text-[#1A1A1A]">Active Dispatch Ledgers Audit</h3>
                      <div className="overflow-x-auto text-xs">
                        <table className="w-full text-left min-w-[400px]">
                          <thead>
                            <tr className="border-b border-[#E5DEC9] text-gray-400">
                              <th className="pb-2">Order ID</th>
                              <th className="pb-2">Origin Guild</th>
                              <th className="pb-2">Tag ID</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {manifests.map(m => (
                              <tr key={m.id}>
                                <td className="py-2.5 font-semibold text-[#1A1A1A]">{m.id}</td>
                                <td className="py-2.5 text-gray-600 font-mono text-[#C5A880]">{m.giTag}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {adminActiveGateway === 'rider' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white p-6 sm:p-8 border border-[#E5DEC9] rounded-none shadow-premium space-y-6">
                      <div>
                        <h3 className="text-lg font-serif font-semibold text-[#1A1A1A]">Provenance Proven Verification Module</h3>
                        <p className="text-xs text-gray-500 font-light mt-0.5">Match physical loom photos uploaded by logistics captains against registry benchmarks.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="bg-[#F5EFEB] p-4 border border-[#E5DEC9] space-y-4">
                          <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">Captain Loom Uploads (ID: NE-MUGA-902)</h4>

                          <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3].map(id => (
                              <div key={id} className="aspect-square bg-white border border-[#E5DEC9] flex flex-col justify-center items-center text-center p-1">
                                {completedSlots[id] ? (
                                  <img src={completedSlots[id]} alt="Capture" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider leading-none">Awaiting Upload</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-[#F5EFEB] p-6 border border-[#E5DEC9] space-y-4">
                          <h4 className="text-xs uppercase tracking-wider font-bold text-[#1A1A1A]">Verification Checklist</h4>
                          <div className="space-y-2 text-xs font-light">
                            <label className="flex items-center gap-2">
                              <input type="checkbox" defaultChecked className="accent-[#C5A880] rounded" />
                              <span>Weave density &gt; 24 threads/inch confirmed</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input type="checkbox" defaultChecked className="accent-[#C5A880] rounded" />
                              <span>GI Royal Seal stamp matches registry</span>
                            </label>
                          </div>

                          <button
                            disabled={!completedSlots[1]}
                            onClick={() =>
                            {
                              triggerToast('Official seal applied. Flight logistics unlocked!', '🛡️');
                            }}
                            className="w-full py-2.5 bg-[#1A1A1A] disabled:bg-gray-100 disabled:text-gray-400 text-[#C5A880] font-semibold text-[9px] uppercase tracking-widest transition-all"
                          >
                            Approve and Seal for Dispatch
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

          </motion.div>
        )}

      </main>

      {/* ==============================================
           5.5 SLIDING SIDE DRAWERS (WISHLIST & PRESTIGE BAG)
           ============================================== */}

      {/* 1. Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#FAF9F6] border-l border-[#C5A880] h-full flex flex-col shadow-premium z-50 text-left"
            >
              <div className="p-6 border-b border-[#E5DEC9] flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-serif text-[#1A1A1A] font-semibold tracking-wider">Prestige Wishlist</h3>
                  <span className="text-[9px] text-gray-500 font-light block mt-0.5">Favorited heritage masterpieces ready for acquisition</span>
                </div>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#E5DEC9] flex items-center justify-center hover:bg-gray-100 transition-colors font-bold text-gray-500"
                >
                  &times;
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-gray-400">
                    <Heart className="w-8 h-8 stroke-[1.2]" />
                    <p className="text-xs font-light">Your wishlist is empty. Explore our drapes and pieces to save favorites.</p>
                  </div>
                ) : (
                  wishlist.map(item => (
                    <div key={item.id} className="flex gap-4 p-3 border border-[#E5DEC9] rounded-none bg-white shadow-sm items-center">
                      <img src={item.primaryImg} alt={item.name} className="w-16 h-16 object-cover border border-[#E5DEC9]" />
                      <div className="flex-1 space-y-1">
                        <h4 className="text-xs font-serif text-[#1A1A1A] font-semibold leading-tight">{item.name}</h4>
                        <span className="text-[9.5px] text-[#C5A880] font-mono block">₹{item.price.toLocaleString('en-IN')}</span>
                        <button
                          onClick={() =>
                          {
                            addToCart(item, 'Standard');
                            toggleWishlist(item);
                          }}
                          className="text-[8.5px] uppercase tracking-wider text-white bg-[#C5A880] hover:bg-[#1A1A1A] px-3 py-1 transition-colors font-bold"
                        >
                          Add to Bag
                        </button>
                      </div>
                      <button
                        onClick={() => toggleWishlist(item)}
                        className="text-gray-400 hover:text-[#8A1C14] transition-colors text-sm font-semibold"
                      >
                        &times;
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Prestige Bag (Cart) Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#FAF9F6] border-l border-[#C5A880] h-full flex flex-col shadow-premium z-50 text-left"
            >
              <div className="p-6 border-b border-[#E5DEC9] flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-serif text-[#1A1A1A] font-semibold tracking-wider">Prestige Bag</h3>
                  <span className="text-[9px] text-gray-500 font-light block mt-0.5">Heritage crafts currently locked for your collection</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#E5DEC9] flex items-center justify-center hover:bg-gray-100 transition-colors font-bold text-gray-500"
                >
                  &times;
                </button>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-2 text-gray-400">
                    <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
                    <p className="text-xs font-light">Your bag is empty. Configure a gift hamper or pick a masterwork.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={item.id} className="flex gap-4 p-3 border border-[#E5DEC9] rounded-none bg-white shadow-sm items-center">
                          <img src={item.primaryImg} alt={item.name} className="w-16 h-16 object-cover border border-[#E5DEC9]" />
                          <div className="flex-1 space-y-0.5">
                            <h4 className="text-xs font-serif text-[#1A1A1A] font-semibold leading-tight">{item.name}</h4>
                            <span className="text-[9.5px] text-[#C5A880] font-mono block">₹{item.price.toLocaleString('en-IN')} (x{item.qty})</span>
                            <span className="inline-block bg-[#F5EFEB] text-[#C5A880] text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 mt-1">
                              Size: {item.selectedSize}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-[#8A1C14] transition-colors text-sm font-semibold"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* UNLOCKED CASKET PACKAGING: Only visible if total item qty > 1 */}
                    {cartTotalQty > 1 && (
                      <div className="bg-[#F5EFEB] p-4 border border-[#E5DEC9] space-y-4">
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-[#C5A880]" />
                          <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">Prestige Casket Packaging</h4>
                        </div>
                        <p className="text-[9.5px] text-gray-500 font-light leading-relaxed">
                          You have selected multiple items. Package them together in a curated heritage presentation casket.
                        </p>

                        {/* Select Casket Box Type */}
                        <div className="space-y-2">
                          <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold block">1. Select Casket Box</span>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { id: 'bamboo', name: 'Bamboo Casket', price: 450, img: '/images/bamboo_craft.png' },
                              { id: 'cane', name: 'Sovereign Cane', price: 600, img: '/images/gifting_hamper.png' },
                              { id: 'silk', name: 'Silk-Lined Box', price: 1200, img: '/images/silk_handloom.png' }
                            ].map(v => (
                              <button
                                key={v.id}
                                onClick={() =>
                                {
                                  setConfigVessel(v);
                                  triggerToast(`Updated casket base: ${v.name}`, '🎁');
                                }}
                                className={`p-2 text-center border text-[8.5px] font-semibold transition-all ${configVessel.id === v.id ? 'border-[#C5A880] bg-white text-[#C5A880]' : 'border-[#E5DEC9] bg-[#FAF9F6]'}`}
                              >
                                {v.name.split(' ')[0]} (+₹{v.price})
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Select Add-ons */}
                        <div className="space-y-2">
                          <span className="text-[8px] uppercase tracking-wider text-gray-400 font-bold block">2. Add Optional Mini-Treasures</span>
                          <div className="flex flex-col gap-1.5 text-[9.5px] font-light text-gray-700">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={configAddons.tea}
                                onChange={() => setConfigAddons(prev => ({ ...prev, tea: !prev.tea }))}
                                className="w-3.5 h-3.5 accent-[#C5A880] rounded"
                              />
                              <span>Organic Assam Tea (+₹350)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={configAddons.silk}
                                onChange={() => setConfigAddons(prev => ({ ...prev, silk: !prev.silk }))}
                                className="w-3.5 h-3.5 accent-[#C5A880] rounded"
                              />
                              <span>Eri Silk Ribbon (+₹1500)</span>
                            </label>
                          </div>
                        </div>

                        <button
                          onClick={addHamperToCart}
                          className="w-full py-2 bg-[#1A1A1A] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] text-[9px] uppercase tracking-widest font-bold transition-colors"
                        >
                          Confirm &amp; Pack Casket (+₹{calculateHamperTotal()})
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-[#E5DEC9] bg-[#F5EFEB]/50 space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Acquisition Cost</span>
                      <span className="font-mono font-semibold">₹{cart.reduce((sum, item) => sum + item.price * item.qty, 0).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Logistics &amp; Provenance Seal</span>
                      <span className="text-emerald-700 font-bold uppercase tracking-wider text-[9px]">FREE</span>
                    </div>
                    <div className="border-t border-[#E5DEC9] my-2" />
                    <div className="flex justify-between text-sm font-bold">
                      <span>Total Valuation</span>
                      <span className="font-mono text-[#C5A880]">₹{cart.reduce((sum, item) => sum + item.price * item.qty, 0).toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full py-3 bg-[#1A1A1A] text-[#C5A880] hover:bg-[#C5A880] hover:text-[#1A1A1A] uppercase tracking-widest text-[9px] font-bold transition-all duration-300 shadow btn-premium-hover flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3 h-3" /> Secure Prestige Checkout
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE HEADER SLIDEOUT NAVIGATION DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xs bg-white h-full flex flex-col shadow-premium z-10 text-left p-6 space-y-6"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-serif text-lg tracking-widest text-[#1A1A1A] font-bold">MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Navigation links */}
              <div className="flex flex-col gap-4 text-xs font-bold uppercase tracking-wider text-gray-700">
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setActiveView({ type: 'lookbook', value: null }); }}
                  className="text-left py-2 hover:text-[#C5A880] border-b border-gray-50"
                >
                  The Editorial Edit
                </button>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setActiveView({ type: 'page', value: 'casket-info' }); }}
                  className="text-left py-2 hover:text-[#C5A880] border-b border-gray-50"
                >
                  Gift Caskets
                </button>
                <button
                  onClick={() =>
                  {
                    setIsMobileMenuOpen(false);
                    setSelectedCategoryFilter('handloom');
                    setActiveView({ type: 'storefront', value: null });
                  }}
                  className="text-left py-2 hover:text-[#C5A880] border-b border-gray-50"
                >
                  Handloom Collections
                </button>
                <button
                  onClick={() =>
                  {
                    setIsMobileMenuOpen(false);
                    setSelectedCategoryFilter('handicraft');
                    setActiveView({ type: 'storefront', value: null });
                  }}
                  className="text-left py-2 hover:text-[#C5A880] border-b border-gray-50"
                >
                  Designer Handicrafts
                </button>
                <a
                  href="#az-catalog"
                  onClick={() =>
                  {
                    setIsMobileMenuOpen(false);
                    setActiveView({ type: 'storefront', value: null });
                  }}
                  className="text-left py-2 hover:text-[#C5A880] border-b border-gray-50 block"
                >
                  Heritage Guild Directory
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE FILTERS SLIDEOUT PANEL */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xs bg-[#FAF9F6] h-full flex flex-col shadow-premium z-10 text-left p-6 space-y-6"
            >
              <div className="flex justify-between items-center border-b pb-4">
                <span className="font-serif text-lg tracking-widest text-[#1A1A1A] font-bold">FILTERS</span>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-1">
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Accordions inside mobile filter drawer */}
              <div className="flex-1 overflow-y-auto space-y-4">
                {/* Category filter */}
                <div className="border-b pb-3">
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-700 mb-2">Category</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { id: 'all', label: 'All Categories', count: products.length },
                      { id: 'handloom', label: 'Handloom Textiles', count: products.filter(p => p.category === 'handloom').length },
                      { id: 'handicraft', label: 'Designer Handicrafts', count: products.filter(p => p.category === 'handicraft').length }
                    ].map(cat => (
                      <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mobile-cat"
                          checked={selectedCategoryFilter === cat.id}
                          onChange={() => { setSelectedCategoryFilter(cat.id); setSelectedSubcategoryFilter('all'); }}
                          className="w-3.5 h-3.5 accent-[#C5A880]"
                        />
                        <span>{cat.label}</span>
                        <span className="text-[9px] text-gray-400 ml-auto">({cat.count})</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subcategory (Type) filter */}
                <div className="border-b pb-3">
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-700 mb-2">Type</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { id: 'all', label: 'All Types' },
                      { id: 'sarees', label: 'Sarees & Drapes' },
                      { id: 'shawls', label: 'Shawls & Wraps' },
                      { id: 'stoles', label: 'Stoles & Scarves' },
                      { id: 'home', label: 'Home & Living' },
                      { id: 'jewelry', label: 'Tribal Jewelry' },
                      { id: 'accessories', label: 'Accessories' }
                    ].map(sub => (
                      <label key={sub.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mobile-sub"
                          checked={selectedSubcategoryFilter === sub.id}
                          onChange={() => setSelectedSubcategoryFilter(sub.id)}
                          className="w-3.5 h-3.5 accent-[#C5A880]"
                        />
                        <span>{sub.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price range */}
                <div className="border-b pb-3">
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-700 mb-2">Price Limit</h4>
                  <input
                    type="range"
                    min="1000"
                    max="35000"
                    step="500"
                    value={priceRangeFilter}
                    onChange={(e) => setPriceRangeFilter(parseInt(e.target.value))}
                    className="w-full h-1 bg-gray-200 accent-[#C5A880]"
                  />
                  <div className="text-[10px] font-mono mt-1 text-[#C5A880]">Max: ₹{priceRangeFilter.toLocaleString()}</div>
                </div>

                {/* Sort By */}
                <div className="border-b pb-3">
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-700 mb-2">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full text-xs border border-gray-200 p-2 bg-white outline-none focus:border-[#C5A880] rounded-none"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low → High</option>
                    <option value="price-high">Price: High → Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="new">New Arrivals</option>
                  </select>
                </div>

                {/* Guilds */}
                <div className="border-b pb-3">
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-gray-700 mb-2">Guilds</h4>
                  <div className="space-y-2 text-xs">
                    {GUILD_DESIGNERS.map(guild => (
                      <label key={guild.id} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="mobile-guild"
                          checked={selectedDesignerFilter === guild.id}
                          onChange={() => setSelectedDesignerFilter(guild.id)}
                          className="w-3.5 h-3.5 accent-[#C5A880]"
                        />
                        <span>{guild.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-2 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-wider font-bold"
              >
                Apply Filters ({filteredProducts.length} items)
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==============================================
           5.6 GLOBAL FLOATING ADMINISTRATIVE CONTROL TOWER
           ============================================== */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1A1A1A]/95 backdrop-blur-md border border-white/10 px-4 py-3 rounded-2xl shadow-premium flex gap-3 items-center">
        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest hidden md:inline border-r border-white/10 pr-3 font-outfit">Ecosystem Swapper</span>

        <div className="flex gap-2 font-outfit">
          {[
            { id: 'consumer', label: 'Storefront', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
            { id: 'vendor', label: 'Vendor central', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'delivery', label: 'Rider app', icon: <MapPin className="w-3.5 h-3.5" /> },
            { id: 'admin', label: 'QA controller', icon: <ShieldAlert className="w-3.5 h-3.5" /> }
          ].map(role => (
            <button
              key={role.id}
              onClick={() =>
              {
                setCurrentRole(role.id);
                triggerToast(`Entering ${role.label} module!`, role.id === 'admin' ? '🛡️' : '✨');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[9px] uppercase tracking-wider font-semibold transition-all ${currentRole === role.id ? 'bg-[#C5A880] text-[#1A1A1A] shadow-soft' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {role.icon} <span className="hidden sm:inline">{role.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MOBILE SEARCH OVERLAY MODAL */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSearchOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full bg-[#FAF9F6] border-b border-[#E5E5E5] px-4 py-6 flex flex-col gap-4 shadow-premium text-left"
            >
              <div className="flex justify-between items-center">
                <span className="font-serif text-xs uppercase tracking-widest text-gray-400 font-bold">Search Masterpieces</span>
                <button onClick={() => setIsMobileSearchOpen(false)} className="p-1 flex items-center justify-center">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="relative flex items-center border border-[#E5E5E5] rounded-full px-4 py-2 focus-within:border-[#C5A880] bg-white transition-colors">
                <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) =>
                  {
                    setSearchQuery(e.target.value);
                    if (activeView.type !== 'storefront')
                    {
                      setActiveView({ type: 'storefront', value: null });
                    }
                    setSelectedCategoryFilter('all');
                    setSelectedDesignerFilter('all');
                    setSelectedSubcategoryFilter('all');
                  }}
                  className="bg-transparent border-none outline-none text-xs w-full placeholder:text-gray-400 font-light"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="p-0.5 hover:text-gray-700 text-gray-400 flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>



    </div>
  );
}
