import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { projects } from '../data/projects'

import './Work.css'

/*
  Homepage highlights — pulls these specific projects (by slug) out of
  the shared data file in src/data/projects.js. To swap which projects
  show here, just edit the slugs below; the slug must exist there.
*/
const featuredSlugs = [
  'full-stack-seo',
  'google-ads-campaign',
  'social-media-growth',
  'web-development',
  'graphic-design',
  'meta-ads-optimization',
]

const works = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean)


export default function Work(){


return(

<section className="work-section" id="work">


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

key={work.slug}

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
{work.categoryLabel}
</span>


<h3>
{work.title}
</h3>


<p>
{work.summary}
</p>


{/*
  No individual project pages anymore — this now goes to the
  full portfolio page instead of /portfolio/<slug>.
*/}
<Link to="/portfolio">
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