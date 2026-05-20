import Navbar from '../composants/Navbar'
import SectionHero from '../composants/SectionHero'
import SectionProjets from '../composants/SectionProjets'
import Footer from '../composants/Footer'

function Accueil() {
  return (
    <div>
      <Navbar />
      <main>
        <SectionHero />
        <SectionProjets />
      </main>
      <Footer />
    </div>
  )
}

export default Accueil
