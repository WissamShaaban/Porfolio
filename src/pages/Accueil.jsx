import Navbar from '../composants/Navbar'
import SectionHero from '../composants/SectionHero'
import SectionProjets from '../composants/SectionProjets'

function Accueil() {
  return (
    <div>
      <Navbar />
      <main>
        <SectionHero />
        <SectionProjets />
      </main>
    </div>
  )
}

export default Accueil
