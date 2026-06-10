import SectionHero from '../components/SectionHero'
import SectionProjects from '../components/SectionProjects'
import SectionTestimonials from '../components/SectionTestimonials'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <SectionHero />
      <main>
        <SectionProjects />
        <SectionTestimonials />
      </main>
      <Footer />
    </div>
  )
}
