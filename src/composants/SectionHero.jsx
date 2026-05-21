import photoHero from '../assets/images/photo-hero.png'
import './SectionHero.css'

function SectionHero() {
  return (
    <section className="hero">
      <div className="hero-texte">
        <span className="hero-metier">UX/UI DESIGNER</span>
        <h1 className="hero-titre">
          Hello, my name is<br />Madelyn Torff
        </h1>
        <p className="hero-description">
          Short text with details about you, what you do or your professional career.
          You can add more information on the about page.
        </p>
        <div className="hero-boutons">
          <a href="#projets" className="bouton-principal">Projects</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bouton-secondaire">LinkedIn</a>
        </div>
      </div>

      <div className="hero-image">
        <div className="blob"></div>
        <img src={photoHero} alt="Photo de profil" className="hero-photo" />
      </div>
    </section>
  )
}

export default SectionHero
