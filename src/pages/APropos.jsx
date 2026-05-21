import Navbar from '../composants/Navbar'
import Footer from '../composants/Footer'
import photoAPropos from '../assets/images/photo-apropos.png'
import './APropos.css'

function APropos() {
  return (
    <div className="page-apropos">
      <Navbar />
      <main className="apropos-contenu">
        <div className="apropos-texte">
          <h2 className="apropos-titre">About me</h2>
          <p className="apropos-description">
            Nisl arcu, scelerisque neque ut. Tincidunt amet, tempor duis tortor
            neque auctor dis ipsum. Pretium cras amet odio amet eleifend id sed
            cras sed. Aliquet risus posuere aliquet imperdiet sit.
          </p>
          <a href="/cv.pdf" className="apropos-bouton" target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
        <div className="apropos-image">
          <div className="apropos-fond-jaune">
            <img src={photoAPropos} alt="Photo à propos" className="apropos-photo" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default APropos
