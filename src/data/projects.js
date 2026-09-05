export const categories = [
  {
    label: 'All Projects',
    value: 'all',
  },
  {
    label: 'Web Development',
    value: 'web-development',
  },
  {
    label: 'SEO',
    value: 'seo',
  },
  {
    label: 'Paid Ads',
    value: 'paid-ads',
  },
  {
    label: 'Social Media',
    value: 'social-media',
  },
  {
    label: 'Graphic Design',
    value: 'graphic-design',
  },
]

/*
  PLACEHOLDER CONTENT NOTICE:
  `stats` values (percentages, counts, timelines) are clearly-marked
  placeholders — swap in your real numbers before this goes live.
  `gallery` holds the 2–3 images that slide inside each card — drop
  matching files into public/images/portfolio/... or update the paths.
*/

export const projects = [
{
  id: 1,
  featured: true,
  slug: 'full-stack-seo',
  title: 'Full Stack SEO',
  subtitle: 'Search Engine Optimization',
  category: 'seo',
  categoryLabel: 'SEO',

  image: '/images/portfolio/SEO/Backlink.png',

  summary:
    'End-to-end SEO strategy focused on improving search visibility, organic traffic, keyword rankings, and website performance through technical, on-page, and content optimization.',

  overview:
    'This project includes backlink research, competitor analysis and link-building opportunities.',

  stats: [
    { label: 'Organic Traffic', value: 'Add %' },
    { label: 'Keywords Ranked', value: 'Add #' },
    { label: 'Timeline', value: 'Add mo' },
  ],

  tags: ['On-Page SEO', 'Technical SEO', 'Link Building'],

  services: [
    'Competitor backlink research',
    'Link opportunity research',
    'Backlink planning',
    'SEO performance review',
  ],

  tools: [
    'Google Search Console',
    'Google Analytics',
    'SEMrush',
  ],

  gallery: [
    '/images/portfolio/SEO/Backlink.png',
    '/images/portfolio/SEO/Backlink-2.png',
    '/images/portfolio/SEO/Backlink-3.png',
  ],
},

{
  id: 2,
  slug: 'comprehensive-seo-audit',
  title: 'Comprehensive SEO Audit',
  subtitle: 'Technical and On-Page Analysis',
  category: 'seo',
  categoryLabel: 'SEO',

  image: '/images/portfolio/SEO/Dashboard.png',

  summary:
    'A structured SEO audit covering website performance, technical issues, content and search visibility.',

  overview:
    'The audit was created to identify SEO problems and provide prioritized recommendations.',

  stats: [
    { label: 'Issues Found', value: 'Add #' },
    { label: 'Fixes Implemented', value: 'Add #' },
    { label: 'Traffic Gain', value: 'Add %' },
  ],

  tags: ['SEO Audit', 'Technical Analysis', 'Recommendations'],

  services: [
    'Website health analysis',
    'Indexing and crawl review',
    'Page-level SEO analysis',
    'Priority recommendation report',
  ],

  tools: [
    'SEMrush',
    'Google Search Console',
    'Google Analytics',
    'PageSpeed Insights',
  ],

  gallery: [
    '/images/portfolio/SEO/Dashboard.png',
    '/images/portfolio/SEO/Dashboard-2.png',
    '/images/portfolio/SEO/Dashboard-3.png',
  ],
},

  {
    id: 3,
    featured: true,
    slug: 'google-ads-campaign',
    title: 'Google Ads Campaign',
    subtitle: 'Search Engine Marketing',
    category: 'paid-ads',
    categoryLabel: 'Paid Ads',
    image: '/images/portfolio/PaidAds/GoogleAds.png',

    summary:
      'High-intent search campaigns focused on generating qualified enquiries, increasing website traffic, and improving conversion performance through continuous optimization.',

    overview:
      'This project shows the process of organizing paid-search campaigns and improving them using performance data.',

    stats: [
      { label: 'ROAS', value: 'Add x' },
      { label: 'Leads Generated', value: 'Add #' },
      { label: 'CPA Reduced', value: 'Add %' },
    ],

    tags: ['Search Ads', 'A/B Testing', 'Bid Strategy'],

    services: [
      'Keyword planning',
      'Campaign structure',
      'Ad copy creation',
      'Performance optimization',
    ],

    tools: [
      'Google Ads',
      'Google Analytics',
      'Google Tag Manager',
      'Looker Studio',
    ],

    gallery: [
      '/images/portfolio/PaidAds/GoogleAds.png',
      '/images/portfolio/PaidAds/GoogleAds-2.png',
      '/images/portfolio/PaidAds/GoogleAds-3.png',
    ],
  },

  {
    id: 4,
    featured: true,
    slug: 'meta-ads-optimization',
    title: 'Meta Ads Optimization',
    subtitle: 'Social Advertising',
    category: 'paid-ads',
    categoryLabel: 'Paid Ads',
    image: '/images/portfolio/PaidAds/MetaAds.png',

    summary:
      'Paid social campaigns managed for different brands and businesses, using audience targeting, creative testing, campaign optimization, and conversion tracking to improve results.',

    overview:
      'This project presents how campaign data can be used to improve targeting, creative performance and budget allocation.',

    stats: [
      { label: 'CPA Reduction', value: 'Add %' },
      { label: 'ROAS', value: 'Add x' },
      { label: 'Conversions', value: 'Add #' },
    ],

    tags: ['Meta Ads', 'Audience Targeting', 'Creative Testing'],

    services: [
      'Audience research',
      'Campaign setup',
      'Creative testing',
      'Conversion tracking',
    ],

    tools: [
      'Meta Ads Manager',
      'Meta Business Suite',
      'Google Analytics',
      'Canva',
    ],

    gallery: [
      '/images/portfolio/PaidAds/MetaAds.png',
      '/images/portfolio/PaidAds/MetaAds-2.png',
      '/images/portfolio/PaidAds/MetaAds-3.png',
    ],
  },

  {
    id: 5,
    slug: 'tiktok-ads-optimization',
    title: 'TikTok Ads Optimization',
    subtitle: 'Short-Form Video Advertising',
    category: 'paid-ads',
    categoryLabel: 'Paid Ads',
    image: '/images/portfolio/PaidAds/TikTokAds.png',

    summary:
      'A TikTok advertising project using short-form video creatives, audience testing and campaign monitoring.',

    overview:
      'The project focuses on creating advertising that matches the platform while maintaining clear campaign objectives.',

    stats: [
      { label: 'Cost Per Result', value: 'Add %' },
      { label: 'Campaign ROAS', value: 'Add x' },
      { label: 'Results Generated', value: 'Add #' },
    ],

    tags: ['TikTok Ads', 'Video Creative', 'Trend Optimization'],

    services: [
      'Campaign planning',
      'Audience targeting',
      'Creative testing',
      'Performance reporting',
    ],

    tools: [
      'TikTok Ads Manager',
      'CapCut',
      'Google Analytics',
      'Canva',
    ],

    gallery: [
      '/images/portfolio/PaidAds/TikTokAds.png',
      '/images/portfolio/PaidAds/TikTokAds-2.png',
      '/images/portfolio/PaidAds/TikTokAds-3.png',
    ],
  },

  {
    id: 6,
    featured: true,
    slug: 'social-media-growth',
    title: 'Social Media Growth',
    subtitle: 'Social Media Marketing',
    category: 'social-media',
    categoryLabel: 'Social Media',
    image: '/images/portfolio/SocialMedia/Instagram.png',

    summary:
      'Social media strategies developed for multiple brands and businesses, combining content planning, creative optimization, audience engagement, and consistent platform growth.',

    overview:
      'This project shows how consistent content and audience-focused planning can improve a brand\u2019s social presence across platforms.',

    stats: [
      { label: 'Followers Growth', value: 'Add #' },
      { label: 'Engagement Rate', value: 'Add %' },
      { label: 'Timeline', value: 'Add mo' },
    ],

    tags: ['Content Strategy', 'Community Management', 'Influencer Outreach'],

    services: [
      'Profile optimization',
      'Content planning',
      'Audience engagement',
      'Performance review',
    ],

    tools: [
      'Instagram',
      'Meta Business Suite',
      'Canva',
      'CapCut',
    ],

    gallery: [
      '/images/portfolio/SocialMedia/Instagram.png',
      '/images/portfolio/SocialMedia/Instagram-2.png',
      '/images/portfolio/SocialMedia/Instagram-3.png',
    ],
  },

  {
    id: 7,
    slug: 'linkedin-b2b-strategy',
    title: 'LinkedIn B2B Strategy',
    subtitle: 'Professional Networking',
    category: 'social-media',
    categoryLabel: 'Social Media',
    image: '/images/portfolio/SocialMedia/LinkedIn.png',

    summary:
      'A LinkedIn content strategy designed to strengthen professional visibility and support B2B communication.',

    overview:
      'The strategy combines company-page optimization, industry-focused content and consistent engagement.',

    stats: [
      { label: 'Network Growth', value: 'Add %' },
      { label: 'Monthly Views', value: 'Add #' },
      { label: 'Lead Quality', value: 'Add %' },
    ],

    tags: ['B2B Marketing', 'Thought Leadership', 'Lead Generation'],

    services: [
      'LinkedIn page review',
      'B2B content planning',
      'Thought-leadership content',
      'Performance reporting',
    ],

    tools: [
      'LinkedIn',
      'Canva',
      'Google Analytics',
      'Buffer',
    ],

    gallery: [
      '/images/portfolio/SocialMedia/LinkedIn.png',
      '/images/portfolio/SocialMedia/LinkedIn-2.png',
      '/images/portfolio/SocialMedia/LinkedIn-3.png',
    ],
  },

  {
    id: 8,
    slug: 'tiktok-growth-strategy',
    title: 'TikTok Growth Strategy',
    subtitle: 'Short-Form Video Marketing',
    category: 'social-media',
    categoryLabel: 'Social Media',
    image: '/images/portfolio/SocialMedia/TikTok.png',

    summary:
      'A TikTok content strategy based on short-form video, platform trends and audience engagement.',

    overview:
      'This project demonstrates how content ideas can be adapted into consistent, platform-appropriate videos.',

    stats: [
      { label: 'Followers', value: 'Add #' },
      { label: 'Engagement Rate', value: 'Add %' },
      { label: 'Video Views', value: 'Add #' },
    ],

    tags: ['Short-Form Video', 'Trend Leveraging', 'Viral Content'],

    services: [
      'Content research',
      'Video planning',
      'Trend research',
      'Channel optimization',
    ],

    tools: [
      'TikTok',
      'CapCut',
      'Canva',
      'TikTok Analytics',
    ],

    gallery: [
      '/images/portfolio/SocialMedia/TikTok.png',
      '/images/portfolio/SocialMedia/TikTok-2.png',
      '/images/portfolio/SocialMedia/TikTok-3.png',
    ],
  },

  {
    id: 9,
    slug: 'youtube-channel-growth',
    title: 'YouTube Channel Growth',
    subtitle: 'Video Content Marketing',
    category: 'social-media',
    categoryLabel: 'Social Media',
    image: '/images/portfolio/SocialMedia/YouTube.png',

    summary:
      'A YouTube strategy covering video topics, channel presentation, thumbnails and content optimization.',

    overview:
      'The project focuses on creating a consistent channel structure that makes content easier to discover and watch.',

    stats: [
      { label: 'Subscribers', value: 'Add %' },
      { label: 'Monthly Views', value: 'Add #' },
      { label: 'Avg Watch Time', value: 'Add min' },
    ],

    tags: ['Video Production', 'Channel Optimization', 'Content Series'],

    services: [
      'Channel review',
      'Content planning',
      'Thumbnail direction',
      'Video SEO',
    ],

    tools: [
      'YouTube Studio',
      'Canva',
      'CapCut',
      'Google Trends',
    ],

    gallery: [
      '/images/portfolio/SocialMedia/YouTube.png',
      '/images/portfolio/SocialMedia/YouTube-2.png',
      '/images/portfolio/SocialMedia/YouTube-3.png',
    ],
  },

  {
    id: 10,
    slug: 'content-marketing-strategy',
    title: 'Content Marketing Strategy',
    subtitle: 'Strategic Content Creation',
    category: 'web-development',
    categoryLabel: 'Web Development',
    image: '/images/portfolio/Content/Content.png',

    summary:
      'A content marketing project covering topic planning, article production and organic visibility.',

    overview:
      'This project demonstrates how content can be organized around audience questions and marketing objectives.',

    stats: [
      { label: 'Blog Posts', value: 'Add #' },
      { label: 'Monthly Reach', value: 'Add #' },
      { label: 'Topics Covered', value: 'Add #' },
    ],

    tags: ['Blog Strategy', 'SEO Writing', 'Editorial Calendar'],

    services: [
      'Topic research',
      'Editorial planning',
      'SEO content writing',
      'Content performance review',
    ],

    tools: [
      'WordPress',
      'Google Search Console',
      'Google Analytics',
      'Grammarly',
    ],

    gallery: [
      '/images/portfolio/Content/Content.png',
      '/images/portfolio/Content/Content-2.png',
      '/images/portfolio/Content/Content-3.png',
    ],
  },

  {
    id: 11,
    slug: 'email-marketing-campaign',
    title: 'Email Marketing Campaign',
    subtitle: 'Email and Automation',
    category: 'web-development',
    categoryLabel: 'Web Development',
    image: '/images/portfolio/Content/Email.png',

    summary:
      'An email marketing project covering campaign design, segmentation and scheduled communication.',

    overview:
      'The project presents how email content can be organized for different audience groups and campaign stages.',

    stats: [
      { label: 'Open Rate', value: 'Add %' },
      { label: 'Click Rate', value: 'Add %' },
      { label: 'ROI', value: 'Add %' },
    ],

    tags: ['Email Automation', 'Segmentation', 'Personalization'],

    services: [
      'Campaign planning',
      'Email copywriting',
      'Audience segmentation',
      'Performance reporting',
    ],

    tools: [
      'Mailchimp',
      'Zoho Campaigns',
      'Canva',
      'Google Analytics',
    ],

    gallery: [
      '/images/portfolio/Content/Email.png',
      '/images/portfolio/Content/Email-2.png',
      '/images/portfolio/Content/Email-3.png',
    ],
  },

  {
    id: 12,
    featured: true,
    slug: 'web-development',
    title: 'Web Development',
    subtitle: 'Websites & Landing Pages',
    category: 'web-development',
    categoryLabel: 'Web Development',

    // TODO: replace with a real screenshot once you have one
    image: '/images/portfolio/WebDevelopment/WebDevelopment.png',

    summary:
      'Modern and responsive websites developed for businesses and service-based clients, with a focus on user experience, performance, mobile responsiveness, and conversions.',

    overview:
      'This project covers the end-to-end process of planning, designing and building fast, responsive websites for service-based businesses — from wireframes to a live, conversion-focused site.',

    stats: [
      { label: 'Pages Built', value: 'Add #' },
      { label: 'Load Time', value: 'Add s' },
      { label: 'Timeline', value: 'Add wks' },
    ],

    tags: ['Responsive Design', 'UX/UI', 'Performance'],

    services: [
      'Website planning & wireframing',
      'Responsive front-end development',
      'Performance optimization',
      'Conversion-focused UX',
    ],

    tools: [
      'React',
      'Figma',
      'Vercel',
      'Google PageSpeed Insights',
    ],

    // TODO: add 2–3 real screenshots here for the card slider
    gallery: [
      '/images/portfolio/WebDevelopment/WebDevelopment.png',
      '/images/portfolio/WebDevelopment/WebDevelopment-2.png',
      '/images/portfolio/WebDevelopment/WebDevelopment-3.png',
    ],
  },

  {
    id: 13,
    slug: 'logo-collateral-design',
    title: 'Logo and Collateral Design',
    subtitle: 'Logo Design and Branding',
    category: 'graphic-design',
    categoryLabel: 'Graphic Design',
    image: '/images/portfolio/Branding/Logo.png',

    summary:
      'A visual branding project covering logo development and supporting marketing materials.',

    overview:
      'This project demonstrates how a central visual identity can be applied across practical brand materials.',

    stats: [
      { label: 'Logos Designed', value: 'Add #' },
      { label: 'Industries', value: 'Add #' },
      { label: 'Client Approval', value: 'Add %' },
    ],

    tags: ['Logo Design', 'Brand Mark', 'Visual Identity'],

    services: [
      'Logo concept development',
      'Visual direction',
      'Brand collateral',
      'Presentation mockups',
    ],

    tools: [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Canva',
      'Figma',
    ],

    gallery: [
      '/images/portfolio/Branding/Logo.png',
      '/images/portfolio/Branding/Logo-2.png',
      '/images/portfolio/Branding/Logo-3.png',
    ],
  },

  {
    id: 14,
    slug: 'brand-identity-redesign',
    title: 'Complete Brand Identity Redesign',
    subtitle: 'Brand Design and Strategy',
    category: 'graphic-design',
    categoryLabel: 'Graphic Design',
    image:
      '/images/portfolio/Branding/BrandGuidelines.png',

    summary:
      'A brand identity redesign covering visual consistency, logo presentation and brand guidelines.',

    overview:
      'This project presents the rules and visual components needed to keep a brand consistent across platforms.',

    stats: [
      { label: 'Design Elements', value: 'Add #' },
      { label: 'Brand Touchpoints', value: 'Multi-platform' },
      { label: 'Client Satisfaction', value: 'Add %' },
    ],

    tags: ['Logo Redesign', 'Brand Guidelines', 'Visual Systems'],

    services: [
      'Brand identity review',
      'Logo refinement',
      'Color and typography system',
      'Brand-guideline creation',
    ],

    tools: [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Figma',
      'Canva',
    ],

    gallery: [
      '/images/portfolio/Branding/BrandGuidelines.png',
      '/images/portfolio/Branding/BrandGuidelines-2.png',
      '/images/portfolio/Branding/BrandGuidelines-3.png',
    ],
  },

  {
    id: 15,
    featured: true,
    slug: 'graphic-design',
    title: 'Graphic Design',
    subtitle: 'Visual & Marketing Design',
    category: 'graphic-design',
    categoryLabel: 'Graphic Design',

    // TODO: replace with a real screenshot once you have one
    image: '/images/portfolio/GraphicDesign/GraphicDesign.png',

    summary:
      'Creative visual solutions for brands, businesses, and marketing campaigns, including social media designs, promotional banners, brochures, and digital marketing materials.',

    overview:
      'This project rounds up visual design work produced across brands and campaigns — social creative, promotional banners, brochures and other digital marketing assets built to a consistent visual standard.',

    stats: [
      { label: 'Assets Delivered', value: 'Add #' },
      { label: 'Campaigns Supported', value: 'Add #' },
      { label: 'Client Approval', value: 'Add %' },
    ],

    tags: ['Social Creative', 'Banner Design', 'Brochure Design'],

    services: [
      'Social media creative',
      'Promotional banner design',
      'Brochure & print collateral',
      'Digital marketing assets',
    ],

    tools: [
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Canva',
      'Figma',
    ],

    // TODO: add 2–3 real screenshots here for the card slider
    gallery: [
      '/images/portfolio/GraphicDesign/GraphicDesign.png',
      '/images/portfolio/GraphicDesign/GraphicDesign-2.png',
      '/images/portfolio/GraphicDesign/GraphicDesign-3.png',
    ],
  },
]