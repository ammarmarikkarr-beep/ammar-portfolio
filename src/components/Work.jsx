import { useState } from 'react'
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
  'web-development',
  'meta-ads-optimization',
]

const works = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean)


export default function Work(){

  // Touch devices have no real :hover, so tapping a card toggles the
  // same "revealed" look the mouse gets on desktop hover — tap once
  // to show the overlay + zoom, tap again (or the link) to proceed.
  const [activeIndex, setActiveIndex] = useState(null)

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

className={`work-card${activeIndex === index ? ' is-active' : ''}`}

key={work.slug}

onClick={() =>
  setActiveIndex((current) => (current === index ? null : index))
}

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
  Lands on the Portfolio page with this project's category
  already selected — e.g. /portfolio?category=seo opens the
  Portfolio page filtered to SEO. No individual project pages.
*/}
<Link to={`/portfolio?category=${work.category}`}>
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