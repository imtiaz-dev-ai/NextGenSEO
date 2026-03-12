// SEO Schema Markup - JSON-LD Structured Data
const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "NextGen SEO Agency - Best SEO Company",
    "alternateName": "Affordable SEO Services by Tayyab Mehmood",
    "url": "https://nextgenseo.agency/",
    "logo": "https://nextgenseo.agency/pics/logo.png",
    "description": "Top-rated SEO agency providing affordable SEO services, professional link building, local SEO, and content marketing to help businesses rank #1 on Google.",
    "founder": {
      "@type": "Person",
      "name": "Tayyab Mehmood",
      "jobTitle": "SEO Expert & Founder",
      "url": "https://www.linkedin.com/in/tayyab-mehmood-67101530b/",
      "sameAs": ["https://www.linkedin.com/in/tayyab-mehmood-67101530b/", "https://www.instagram.com/tayyab_backlinks?igsh=cnQ1cXF0OGV0cnBt"]
    },
    "areaServed": "Worldwide",
    "priceRange": "$$-$$$",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "200" },
    "sameAs": ["https://x.com/next_genseo", "https://www.linkedin.com/company/nextgenseo-official/", "https://www.instagram.com/next.genseo/"],
    "contactPoint": { "@type": "ContactPoint", "contactType": "Customer Support", "availableLanguage": ["en"], "email": "nextgenseotool@gmail.com", "telephone": "+92-348-0440402" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SEO Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Affordable SEO Services", "description": "Complete SEO packages for small businesses including on-page optimization, link building, and local SEO." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Professional Link Building Services", "description": "High-quality backlinks from authority websites to boost your Google rankings and domain authority." }},
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Local SEO Services", "description": "Get found by local customers with Google My Business optimization, local citations, and review management." }}
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://nextgenseo.agency/#organization",
    "name": "NextGen SEO Agency - Best SEO Company",
    "image": "https://nextgenseo.agency/pics/logo.png",
    "description": "Top-rated SEO agency providing affordable SEO services, professional link building, local SEO, and content marketing to help businesses rank #1 on Google.",
    "url": "https://nextgenseo.agency/",
    "telephone": "+92-348-0440402",
    "email": "nextgenseotool@gmail.com",
    "address": { "@type": "PostalAddress", "streetAddress": "123 SEO Street", "addressLocality": "New York", "addressRegion": "NY", "postalCode": "10001", "addressCountry": "US" },
    "geo": { "@type": "GeoCoordinates", "latitude": "40.7128", "longitude": "-74.0060" },
    "priceRange": "$499-$2500",
    "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "09:00", "closes": "18:00" },
    "serviceArea": { "@type": "GeoCircle", "geoMidpoint": { "@type": "GeoCoordinates", "latitude": "40.7128", "longitude": "-74.0060" }, "geoRadius": "50000" },
    "areaServed": ["US", "CA", "GB", "AU"],
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "200", "bestRating": "5", "worstRating": "1" },
    "review": [
      { "@type": "Review", "author": {"@type": "Person", "name": "Sarah Chen"}, "reviewRating": {"@type": "Rating", "ratingValue": "5"}, "reviewBody": "Best SEO agency I've worked with! Our website traffic increased 450% in 6 months. Highly recommend their affordable SEO services." },
      { "@type": "Review", "author": {"@type": "Person", "name": "David Kim"}, "reviewRating": {"@type": "Rating", "ratingValue": "5"}, "reviewBody": "Excellent link building services. Our domain authority jumped from 35 to 72. Best investment for our business." }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is SEO and why do I need it for my business?", "acceptedAnswer": { "@type": "Answer", "text": "SEO (Search Engine Optimization) helps your website rank higher on Google. It's essential because 75% of users never scroll past the first page. Higher rankings mean more customers finding your business organically without paying for ads." }},
      { "@type": "Question", "name": "How long does it take to see SEO results?", "acceptedAnswer": { "@type": "Answer", "text": "Most businesses see initial SEO improvements within 3-6 months, with significant results appearing after 6-12 months. SEO is a long-term investment that builds sustainable organic traffic, unlike paid advertising which stops when you stop paying." }},
      { "@type": "Question", "name": "How much do SEO services cost?", "acceptedAnswer": { "@type": "Answer", "text": "Affordable SEO services typically range from $499 to $2,500 per month depending on your business size and goals. NextGen SEO offers flexible packages for small businesses, ecommerce stores, and enterprises with transparent pricing and no hidden fees." }},
      { "@type": "Question", "name": "What's the difference between local SEO and regular SEO?", "acceptedAnswer": { "@type": "Answer", "text": "Local SEO focuses on ranking your business in local search results and Google Maps for customers in your area. Regular SEO targets broader keywords nationally or globally. Local SEO is perfect for restaurants, shops, and service businesses." }},
      { "@type": "Question", "name": "Do I need link building for my website?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! Link building is crucial for SEO success. Quality backlinks from reputable websites signal to Google that your site is trustworthy and authoritative. Professional link building services help you rank faster and higher in search results." }}
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://nextgenseo.agency/#website",
    "url": "https://nextgenseo.agency/",
    "name": "NextGen SEO Agency - Best SEO Company",
    "description": "Affordable SEO services for businesses worldwide. Get #1 Google rankings with our expert SEO team.",
    "publisher": {"@id": "https://nextgenseo.agency/#organization"},
    "potentialAction": { "@type": "SearchAction", "target": "https://nextgenseo.agency/search?q={search_term_string}", "query-input": "required name=search_term_string" },
    "inLanguage": "en-US"
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://nextgenseo.agency/"},
      {"@type": "ListItem", "position": 2, "name": "About Us", "item": "https://nextgenseo.agency/about"},
      {"@type": "ListItem", "position": 3, "name": "Our Team", "item": "https://nextgenseo.agency/team"},
      {"@type": "ListItem", "position": 4, "name": "Services", "item": "https://nextgenseo.agency/services"},
      {"@type": "ListItem", "position": 5, "name": "Pricing", "item": "https://nextgenseo.agency/pricing"},
      {"@type": "ListItem", "position": 6, "name": "Case Studies", "item": "https://nextgenseo.agency/case-studies"},
      {"@type": "ListItem", "position": 7, "name": "Blog", "item": "https://nextgenseo.agency/blog"},
      {"@type": "ListItem", "position": 8, "name": "Contact", "item": "https://nextgenseo.agency/contact"}
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "Service", "position": 1, "name": "Affordable SEO Services", "description": "Complete SEO packages for small businesses and startups", "offers": {"@type": "Offer", "price": "499", "priceCurrency": "USD"}},
      { "@type": "Service", "position": 2, "name": "Professional Link Building", "description": "High-quality backlinks from authority websites", "offers": {"@type": "Offer", "price": "999", "priceCurrency": "USD"}},
      { "@type": "Service", "position": 3, "name": "Local SEO Services", "description": "Google My Business optimization and local citations", "offers": {"@type": "Offer", "price": "799", "priceCurrency": "USD"}}
    ]
  }
];

// Inject schemas into page
schemas.forEach(schema => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schema);
  document.head.appendChild(script);
});
