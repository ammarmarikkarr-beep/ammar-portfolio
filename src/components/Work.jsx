import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import './Work.css'


const works = [

{
image:"/images/portfolio/SEO/Backlink.png",

slug:"full-stack-seo",

category:"SEO",

title:"Full Stack SEO",

description:
"Comprehensive SEO strategy covering on-page, off-page, and technical optimization across fashion, events, jewellery, and electronics brands"
},

{
image:"/images/google-ads.jpg",
category:"Paid Ads",
title:"Google Ads Campaign",
description:
"Developed and optimized Google Ads campaigns driving quality traffic, consistent lead generation, and measurable ROI"
},

{
image:"/images/social-media.jpg",
category:"Social Media",
title:"Social Media Growth",
description:
"Instagram growth strategies combining content optimization, influencer partnerships, and engagement tactics"
},

{
image:"/images/content.jpg",
category:"Content",
title:"Content Marketing Strategy",
description:
"Data-driven content marketing strategies improving brand authority, organic reach and engagement"
},

{
image:"/images/design.jpg",
category:"Brand Design",
title:"Logo & Collateral Design",
description:
"Brand-aligned logos and collateral crafted for fashion, tech, and retail clients"
},

{
image:"/images/meta-ads.jpg",
category:"Meta Ads",
title:"Meta Ads Optimization",
description:
"Optimized Meta campaigns with audience segmentation, creative testing and conversion tracking"
}


]


export default function Work(){


return(

<section className="work-section" id="portfolio">


<div className="container work-container">


<div className="work-heading">

<p className="work-eyebrow">
Selected Work
</p>


<h2>
My Portfolio
</h2>


<span className="work-title-line"/>


</div>



<div className="work-grid">


{
works.map((work,index)=>(


<motion.article

className="work-card"

key={index}

initial={{
opacity:0,
y:30
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:.5,
delay:index*.1
}}

>


<img 
src={work.image}
alt={work.title}
/>



<div className="work-overlay">


<span>
{work.category}
</span>


<h3>
{work.title}
</h3>


<p>
{work.description}
</p>


<Link to={`/portfolio/${work.slug}`}>
View Project →
</Link>


</div>



</motion.article>


))
}



</div>



<div className="work-button-wrapper">

<Link 
to="/portfolio"
className="work-load-button"
>

Load My Portfolio →

</Link>

</div>



</div>


</section>


)

}