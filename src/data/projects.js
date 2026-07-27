export const categories = [
  {
    label: 'All Projects',
    value: 'all',
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
    label: 'Content',
    value: 'content',
  },
  {
    label: 'Branding',
    value: 'branding',
  },
]

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
    'An SEO backlink project focused on improving website authority and organic visibility.',

  overview:
    'This project includes backlink research, competitor analysis and link-building opportunities.',

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
      'A Google Ads campaign structured around relevant keywords, focused landing pages and conversion tracking.',

    overview:
      'This project shows the process of organizing paid-search campaigns and improving them using performance data.',

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
    ],
  },

  {
    id: 4,
    slug: 'meta-ads-optimization',
    title: 'Meta Ads Optimization',
    subtitle: 'Social Advertising',
    category: 'paid-ads',
    categoryLabel: 'Paid Ads',
    image: '/images/portfolio/PaidAds/MetaAds.png',

    summary:
      'A Meta advertising project focused on audience structure, creative testing and campaign optimization.',

    overview:
      'This project presents how campaign data can be used to improve targeting, creative performance and budget allocation.',

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
    ],
  },

  {
    id: 6,
    featured: true,
    slug: 'instagram-growth-strategy',
    title: 'Instagram Growth Strategy',
    subtitle: 'Social Media Marketing',
    category: 'social-media',
    categoryLabel: 'Social Media',
    image: '/images/portfolio/SocialMedia/Instagram.png',

    summary:
      'An Instagram strategy combining content planning, profile optimization and community engagement.',

    overview:
      'This project shows how consistent content and audience-focused planning can improve a brand’s social presence.',

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
    ],
  },

  {
    id: 10,
    featured: true,
    slug: 'content-marketing-strategy',
    title: 'Content Marketing Strategy',
    subtitle: 'Strategic Content Creation',
    category: 'content',
    categoryLabel: 'Content',
    image: '/images/portfolio/Content/Content.png',

    summary:
      'A content marketing project covering topic planning, article production and organic visibility.',

    overview:
      'This project demonstrates how content can be organized around audience questions and marketing objectives.',

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
    ],
  },

  {
    id: 11,
    slug: 'email-marketing-campaign',
    title: 'Email Marketing Campaign',
    subtitle: 'Email and Automation',
    category: 'content',
    categoryLabel: 'Content',
    image: '/images/portfolio/Content/Email.png',

    summary:
      'An email marketing project covering campaign design, segmentation and scheduled communication.',

    overview:
      'The project presents how email content can be organized for different audience groups and campaign stages.',

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
    ],
  },

  {
    id: 12,
    featured: true,
    slug: 'logo-collateral-design',
    title: 'Logo and Collateral Design',
    subtitle: 'Logo Design and Branding',
    category: 'branding',
    categoryLabel: 'Branding',
    image: '/images/portfolio/Branding/Logo.png',

    summary:
      'A visual branding project covering logo development and supporting marketing materials.',

    overview:
      'This project demonstrates how a central visual identity can be applied across practical brand materials.',

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
    ],
  },

  {
    id: 13,
    slug: 'brand-identity-redesign',
    title: 'Complete Brand Identity Redesign',
    subtitle: 'Brand Design and Strategy',
    category: 'branding',
    categoryLabel: 'Branding',
    image:
      '/images/portfolio/Branding/BrandGuidelines.png',

    summary:
      'A brand identity redesign covering visual consistency, logo presentation and brand guidelines.',

    overview:
      'This project presents the rules and visual components needed to keep a brand consistent across platforms.',

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
    ],
  },
]