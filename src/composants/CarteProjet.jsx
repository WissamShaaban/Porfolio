import './CarteProjet.css'

function CarteProjet({ titre, description, image, imageAGauche = false }) {
  return (
    <article className={`carte-projet ${imageAGauche ? 'inverse' : ''}`}>
      <div className="carte-texte">
        <h3 className="carte-titre">{titre}</h3>
        <p className="carte-description">{description}</p>
        <button className="carte-bouton">View Project</button>
      </div>
      <div className="carte-image">
        {image
          ? <img src={image} alt={titre} />
          : <div className="carte-image-placeholder">Image</div>
        }
      </div>
    </article>
  )
}

export default CarteProjet
