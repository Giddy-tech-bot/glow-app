export const initialBeauticians = [
  {
    id: 1,
    name: "Njeri Beauty",
    specialty: "Makeup & Bridal Artistry",
    city: "Nairobi",
    area: "Kilimani, Argwings Kodhek Rd",
    rating: 4.9,
    reviewsCount: 245,
    bio: "Certified professional MUA with 7+ years of experience specializing in bridal glam, editorial looks, and natural melanated skin perfection.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
    work: [
      {
        id: "w1",
        title: "Golden Hour Glow",
        category: "Glam Makeup",
        mediaType: "image",
        url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=700&q=80",
        likes: 342
      },
      {
        id: "w2",
        title: "Classic Nairobi Bride",
        category: "Bridal",
        mediaType: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        poster: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80",
        likes: 512
      },
      {
        id: "w3",
        title: "Sunset Berry Lip & Soft Glam",
        category: "Soft Glam",
        mediaType: "image",
        url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",
        likes: 218
      },
      {
        id: "w4",
        title: "Dewy Glass Skin Tutorial",
        category: "Skincare & Makeup",
        mediaType: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
        poster: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=700&q=80",
        likes: 420
      }
    ],
    services: [
      { id: "s1", name: "Bridal Makeup & Touchup Kit", price: 6000, duration: "2h 30m", desc: "Full bridal glam, lash application, skincare prep and portable touchup kit." },
      { id: "s2", name: "Full Red Carpet Glam", price: 4500, duration: "1h 30m", desc: "Camera-ready full coverage, contouring, cut crease or smokey eye with 3D mink lashes." },
      { id: "s3", name: "Soft Matte Everyday Glam", price: 3500, duration: "1h 15m", desc: "Clean, fresh, radiant skin, defined brows, soft neutral shadows and glossy lips." },
      { id: "s4", name: "Photoshoot & Creative Concept", price: 5500, duration: "2h 00m", desc: "Tailored makeup for indoor/outdoor studio lighting and fashion portfolios." }
    ],
    reviews: [
      {
        id: "r1",
        author: "Amina K.",
        rating: 5,
        date: "2 days ago",
        text: "Njeri made me feel like an absolute queen for my ruracio! The makeup didn't budge even after dancing all night."
      },
      {
        id: "r2",
        author: "Sarah Mwangi",
        rating: 5,
        date: "1 week ago",
        text: "Punctual, super sanitary with her brushes, and knew exactly what shades suit my undertone. 10/10 recommend!"
      }
    ],
    hours: {
      weekday: "9:00 AM – 7:00 PM",
      saturday: "8:30 AM – 5:00 PM",
      sunday: "By Appointment Only"
    }
  },
  {
    id: 2,
    name: "Lilian Mua",
    specialty: "Editorial & Soft Glam",
    city: "Nairobi",
    area: "Westlands, Ring Road",
    rating: 4.8,
    reviewsCount: 132,
    bio: "Passionate about enhancing natural beauty. Highlighting facial symmetry and glass skin aesthetics for fashionistas.",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=80",
    work: [
      {
        id: "w5",
        title: "Champagne Shimmer",
        category: "Soft Glam",
        mediaType: "image",
        url: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
        likes: 198
      },
      {
        id: "w6",
        title: "High Fashion Editorial Transformation",
        category: "Editorial",
        mediaType: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
        poster: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
        likes: 640
      }
    ],
    services: [
      { id: "s5", name: "Signature Soft Glam", price: 3000, duration: "1h", desc: "Lightweight coverage, sculpted brows, fluttering lashes and neutral nude lips." },
      { id: "s6", name: "High Definition Photoshoot Makeup", price: 5000, duration: "1h 30m", desc: "Flash-proof complexion perfection designed specifically for commercial photography." },
      { id: "s7", name: "Evening Occasion Glam", price: 3800, duration: "1h 15m", desc: "Dramatic eyes, luminous highlight, long-wearing setting spray for night outings." }
    ],
    reviews: [
      {
        id: "r3",
        author: "Zawadi N.",
        rating: 5,
        date: "3 days ago",
        text: "Lilian was so sweet and created the exact look I saved on my Pinterest board!"
      }
    ],
    hours: {
      weekday: "9:30 AM – 6:30 PM",
      saturday: "9:00 AM – 6:00 PM",
      sunday: "Closed"
    }
  },
  {
    id: 3,
    name: "Zara Glam & Nails",
    specialty: "Luxury Nails & Glam",
    city: "Nairobi",
    area: "Lavington Green",
    rating: 4.7,
    reviewsCount: 98,
    bio: "Nail artist and luxury makeup maestro. Acrylic art, BIAB gel overlays, and full glam makeovers under one roof.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
    work: [
      {
        id: "w8",
        title: "French Ombre Chrome Nails",
        category: "Nails",
        mediaType: "image",
        url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80",
        likes: 412
      },
      {
        id: "w9",
        title: "Swarovski Crystal Nail Art Reel",
        category: "Nails",
        mediaType: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
        poster: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80",
        likes: 720
      }
    ],
    services: [
      { id: "s8", name: "Russian Manicure & BIAB Gel", price: 3200, duration: "1h 30m", desc: "Detailed cuticle care with Builder In A Bottle strengthener and gel gloss." },
      { id: "s9", name: "Full Glam Makeup", price: 4000, duration: "1h 20m", desc: "Smokey eyes or glitter pigments with waterproof contouring." },
      { id: "s10", name: "Deluxe Bridal & Nail Package", price: 8500, duration: "3h 00m", desc: "Complete bridal face glam + full luxury custom nail extensions." }
    ],
    reviews: [
      {
        id: "r4",
        author: "Kendi B.",
        rating: 5,
        date: "5 days ago",
        text: "The cleanest nail prep I've ever had in Nairobi. Zero lifting after 4 weeks!"
      }
    ],
    hours: {
      weekday: "9:00 AM – 6:00 PM",
      saturday: "9:00 AM – 4:00 PM",
      sunday: "Closed"
    }
  },
  {
    id: 4,
    name: "Crown & Braids Haven",
    specialty: "Knotless Braids & Natural Hair",
    city: "Nairobi",
    area: "Ngong Road, Prestige Plaza",
    rating: 4.9,
    reviewsCount: 184,
    bio: "Protective styling experts. Pain-free bohemian knotless braids, faux locs, and deep moisturizing hair spa treatments.",
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=80",
    work: [
      {
        id: "w11",
        title: "Goddess Bohemian Knotless",
        category: "Hair",
        mediaType: "image",
        url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=700&q=80",
        likes: 890
      },
      {
        id: "w12",
        title: "Boho Curls Installation Video",
        category: "Hair",
        mediaType: "video",
        url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
        poster: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=80",
        likes: 620
      }
    ],
    services: [
      { id: "s11", name: "Boho Knotless Braids (Mid-Back)", price: 4500, duration: "3h 30m", desc: "Seamless lightweight braiding with human hair curls blended in." },
      { id: "s12", name: "Silk Press & Hydration Steam", price: 3500, duration: "1h 45m", desc: "Deep conditioning, ozone steam bath, heat protectant and glass silk press." },
      { id: "s13", name: "Loc Retwist & Scalp Detox", price: 3000, duration: "2h 00m", desc: "ACV scalp rinse, palm roll styling, and peppermint oil nourishment." }
    ],
    reviews: [
      {
        id: "r5",
        author: "Wambui M.",
        rating: 5,
        date: "4 days ago",
        text: "Completely tension-free! Slept like a baby the first night. Will definitely be coming back."
      }
    ],
    hours: {
      weekday: "8:30 AM – 7:00 PM",
      saturday: "8:00 AM – 6:30 PM",
      sunday: "10:00 AM – 4:00 PM"
    }
  }
];

export const initialPosts = [
  {
    id: "p1",
    user: "Njeri Beauty",
    userAvatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
    beauticianId: 1,
    location: "Kilimani, Nairobi",
    timeAgo: "2 hours ago",
    text: "Soft matte bridal preview for Cynthia! 💍 We focused on locked-in hydration, feathered brows, and custom flutter lashes. Booking slots for Oct-Nov are now open!",
    mediaType: "image",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    category: "Bridal",
    serviceName: "Bridal Makeup & Touchup Kit",
    servicePrice: 6000,
    likesCount: 384,
    likedByMe: false,
    savedByMe: false,
    tags: ["#BridalGlam", "#NairobiMUA", "#SoftGlow", "#MelaninMagic"],
    comments: [
      { id: "c1", user: "Grace K.", text: "The skin finish is out of this world! 😍", time: "1h ago" },
      { id: "c2", user: "Mercy_W", text: "Stunning! How far in advance do we need to book for December?", time: "30m ago" }
    ]
  },
  {
    id: "p2",
    user: "Crown & Braids Haven",
    userAvatar: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=80",
    beauticianId: 4,
    location: "Ngong Road, Nairobi",
    timeAgo: "3 hours ago",
    text: "Watch this boho knotless curl installation reel! 🌴 Lightweight, pain-free tension, and ready for any vacation. Book your slot before weekend spots fill up!",
    mediaType: "video",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80",
    category: "Hair",
    serviceName: "Boho Knotless Braids (Mid-Back)",
    servicePrice: 4500,
    likesCount: 940,
    likedByMe: true,
    savedByMe: true,
    tags: ["#BohoBraids", "#KnotlessVideo", "#HairTransformation", "#NairobiSalons"],
    comments: [
      { id: "c3", user: "Amina K.", text: "This reel convinced me! Booking right now.", time: "2h ago" }
    ]
  },
  {
    id: "p3",
    user: "Zara Glam & Nails",
    userAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80",
    beauticianId: 3,
    location: "Lavington, Nairobi",
    timeAgo: "6 hours ago",
    text: "Chrome french tip glazed donut nails 💅 4 weeks guaranteed chip-free with our Russian BIAB technique. Who's trying this next?",
    mediaType: "image",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=80",
    category: "Nails",
    serviceName: "Russian Manicure & BIAB Gel",
    servicePrice: 3200,
    likesCount: 846,
    likedByMe: false,
    savedByMe: false,
    tags: ["#NailArtNairobi", "#ChromeNails", "#BIAB", "#LavingtonSalons"],
    comments: [
      { id: "c4", user: "Kendi B.", text: "Still obsessed with my set from last week!", time: "4h ago" }
    ]
  }
];

export const initialBrands = [
  {
    name: "L'Oréal Paris",
    category: "Complexion & Infallible",
    tagline: "Because you're worth it · Salon Approved",
    discount: "20% OFF Salon Partners",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
    featuredProduct: "Infallible 24H Fresh Wear Foundation"
  },
  {
    name: "Maybelline New York",
    category: "Lash & Lip Essentials",
    tagline: "Make it happen · Longwear formulas",
    discount: "Buy 1 Get 1 at 30% OFF",
    image: "https://images.unsplash.com/photo-1631730486572-226d1f595b68?auto=format&fit=crop&w=700&q=80",
    featuredProduct: "Sky High Waterproof Mascara"
  },
  {
    name: "NYX Professional",
    category: "Pro Artistry & Pigments",
    tagline: "Cruelty-free high pigment makeup",
    discount: "Free Setting Spray on KSh 3,000+",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80",
    featuredProduct: "Matte Finish Long Lasting Setting Spray"
  },
  {
    name: "CeraVe & La Roche-Posay",
    category: "Dermatological Skincare",
    tagline: "Essential ceramides for glowing skin barrier",
    discount: "15% off with Facial Bookings",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
    featuredProduct: "Hydrating Hyaluronic Acid Serum"
  }
];

// 1. SERVICE APPOINTMENT BOOKINGS (20% DEPOSIT PAID TO BEAUTICIAN, 80% DUE AT SALON)
export const initialBookings = [
  {
    id: "BK-84920",
    type: "service_appointment",
    beauticianId: 1,
    beauticianName: "Njeri Beauty",
    beauticianImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
    clientName: "Grace K.",
    clientPhone: "+254 712 345 678",
    serviceName: "Full Red Carpet Glam",
    serviceCategory: "Makeup & Glam",
    duration: "1h 30m",
    price: 4500,
    deposit: 900, // 20% Paid to Beautician M-Pesa
    remaining: 3600, // 80% to pay in person
    date: "Today",
    time: "11:00 AM",
    status: "Confirmed",
    paymentMethod: "M-Pesa Express (0712***678)",
    location: "Kilimani Studio, Argwings Kodhek Rd",
    notes: "Attending evening corporate gala. Preferred warm berry lip and soft golden cut crease. Mildly sensitive skin."
  },
  {
    id: "BK-84921",
    type: "service_appointment",
    beauticianId: 1,
    beauticianName: "Njeri Beauty",
    beauticianImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80",
    clientName: "Valerie Atieno",
    clientPhone: "+254 722 987 654",
    serviceName: "Bridal Makeup & Touchup Kit",
    serviceCategory: "Bridal Beauty",
    duration: "2h 30m",
    price: 6000,
    deposit: 1200,
    remaining: 4800,
    date: "Tomorrow",
    time: "2:30 PM",
    status: "Confirmed",
    paymentMethod: "M-Pesa Express (0722***654)",
    location: "Kilimani Studio, Argwings Kodhek Rd",
    notes: "Ruracio traditional ceremony! Matte finish needed to withstand outdoor photo sessions."
  },
  {
    id: "BK-84922",
    type: "service_appointment",
    beauticianId: 4,
    beauticianName: "Crown & Braids Haven",
    beauticianImage: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=80",
    clientName: "Grace K.",
    clientPhone: "+254 712 345 678",
    serviceName: "Boho Knotless Braids (Mid-Back)",
    serviceCategory: "Hair & Braids",
    duration: "3h 30m",
    price: 4500,
    deposit: 900,
    remaining: 3600,
    date: "25 Sep 2026",
    time: "9:00 AM",
    status: "Confirmed",
    paymentMethod: "M-Pesa Express (0712***678)",
    location: "Prestige Plaza, Ngong Road",
    notes: "Honey blonde mixed with 1B. Tension-free on edges please!"
  }
];

// 2. SHOP OWNER'S LISTED BEAUTY PRODUCTS
export const initialProducts = [
  {
    id: "prod-1",
    shopId: "shop-1",
    shopName: "Nairobi Glam Beauty Supplies",
    title: "NYX Matte Finish Setting Spray (Longwear 16H)",
    category: "Makeup",
    price: 1950,
    stock: 24,
    rating: 4.9,
    salesCount: 142,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80",
    desc: "Weightless setting spray with a matte, shine-free finish. Ideal for humid Kenyan weather and bridal longevity."
  },
  {
    id: "prod-2",
    shopId: "shop-1",
    shopName: "Nairobi Glam Beauty Supplies",
    title: "Raw Human Hair Bulk French Curls (For Boho Braids)",
    category: "Hair Care",
    price: 3800,
    stock: 15,
    rating: 4.8,
    salesCount: 89,
    image: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&w=700&q=80",
    desc: "100% human hair curls for bohemian knotless braiding. Tangle-free, bleachable, and reusable up to 1 year."
  },
  {
    id: "prod-3",
    shopId: "shop-2",
    shopName: "AfroLuxe Organic Skincare & Hair",
    title: "CeraVe Hydrating Hyaluronic Acid Serum 30ml",
    category: "Skincare",
    price: 2600,
    stock: 18,
    rating: 5.0,
    salesCount: 210,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80",
    desc: "Restores protective skin barrier and provides instant all-day hydration with 3 essential ceramides."
  },
  {
    id: "prod-4",
    shopId: "shop-1",
    shopName: "Nairobi Glam Beauty Supplies",
    title: "Professional BIAB Builder Gel & LED Flash Lamp Kit",
    category: "Nails",
    price: 4200,
    stock: 8,
    rating: 4.7,
    salesCount: 54,
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80",
    desc: "Salon-grade builder gel kit with mini UV/LED curer. Perfect for natural nail growth reinforcement."
  }
];

// 3. SEPARATED PRODUCT MARKETPLACE ORDERS (100% PAID TO SHOP OWNER MERCHANT)
export const initialProductOrders = [
  {
    id: "ORD-9102",
    type: "product_order",
    shopId: "shop-1",
    shopName: "Nairobi Glam Beauty Supplies",
    productId: "prod-1",
    productTitle: "NYX Matte Finish Setting Spray (Longwear 16H)",
    productImage: "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=700&q=80",
    quantity: 1,
    itemPrice: 1950,
    deliveryFee: 250,
    totalPaid: 2200, // 100% paid upfront to Shop Merchant
    paymentMethod: "M-Pesa Buy Goods Till (654321)",
    customerName: "Grace K.",
    customerPhone: "+254 712 345 678",
    deliveryAddress: "Kilimani, Chania Ave, Apt 4B, Nairobi",
    orderDate: "Yesterday at 3:15 PM",
    status: "Out for Delivery",
    trackingCode: "GLOW-EXPRESS-9102"
  }
];

export const quickCategories = [
  { id: "all", label: "All Looks", icon: "Sparkles" },
  { id: "makeup", label: "Makeup", icon: "Scissors" },
  { id: "hair", label: "Hair & Braids", icon: "Gem" },
  { id: "nails", label: "Nails & BIAB", icon: "Sparkles" },
  { id: "skincare", label: "Skincare", icon: "Heart" },
  { id: "bridal", label: "Bridal", icon: "Gem" },
  { id: "brands", label: "Brands & Products", icon: "ShoppingBag" }
];

export const money = (num) => {
  if (num === undefined || num === null) return "KSh 0";
  return `KSh ${Number(num).toLocaleString()}`;
};
