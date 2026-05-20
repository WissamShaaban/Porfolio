import CarteProjet from './CarteProjet'
import './SectionProjets.css'

const projets = [
  {
    id: 1,
    titre: 'Project Name',
    description: 'I created this personal project in order to show how to create an interface in Figma using a portfolio as an example.',
    image: null,
    imageAGauche: false,
  },
  {
    id: 2,
    titre: 'Project Name',
    description: 'What was your role, your deliverables. If the project was personal, freelancing.',
    image: null,
    imageAGauche: true,
  },
  {
    id: 3,
    titre: 'Project Name',
    description: 'You can also add in this description the type of the project, if it was for web, mobile, electron.',
    image: null,
    imageAGauche: false,
  },
]

function SectionProjets() {
  return (
    <section className="section-projets" id="projets">
      <h2 className="section-projets-titre">Projects</h2>
      <div className="liste-projets">
        {projets.map((projet) => (
          <CarteProjet
            key={projet.id}
            titre={projet.titre}
            description={projet.description}
            image={projet.image}
            imageAGauche={projet.imageAGauche}
          />
        ))}
      </div>
    </section>
  )
}

export default SectionProjets
