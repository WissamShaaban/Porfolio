import Navbar from './Navbar'
import photoHero from '../assets/images/photo-hero.png'

const BLOB_PATH =
  'M426.755 -247.339C526.01 -242.623 630.416 -205.737 691.019 -128.942C747.053 -57.9359 709.403 42.8884 725.408 131.114C738.276 202.044 786.302 264.961 775.404 336.204C763.332 415.132 724.842 490.453 662.532 542.186C597.271 596.368 510.835 641.895 426.755 625.671C345.261 609.947 319.875 506.823 250.249 462.635C174.069 414.287 41.2528 440.785 6.43092 358.913C-27.6816 278.71 83.9568 208.257 106.308 124.209C131.067 31.1084 79.6085 -81.3667 143.094 -154.976C208.865 -231.236 324.689 -252.189 426.755 -247.339Z'

export default function SectionHero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: '#FFFDE7' }}
    >
      {/* Navbar flottante au-dessus de tout */}
      <Navbar transparent />

      {/* Blob : colle en haut à droite, pleine hauteur */}
      <div className="hidden lg:block absolute right-0 top-0 w-[55%] h-full">
        <svg
          viewBox="0 0 720 629"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <clipPath id="hero-blob-clip" clipPathUnits="userSpaceOnUse">
              <path fillRule="evenodd" clipRule="evenodd" d={BLOB_PATH} />
            </clipPath>
          </defs>
          <g clipPath="url(#hero-blob-clip)">
            <rect width="720" height="629" fill="#FFC637" />
            <image
              href={photoHero}
              x="79"
              y="-170"
              width="590"
              height="992"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>

      {/* Contenu gauche centré verticalement */}
      <div className="flex items-center min-h-screen px-10 lg:px-20">
        <div className="flex flex-col gap-6 max-w-lg">
          <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
            UX/UI DESIGNER
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            Hello, my name is<br />Madelyn Torff
          </h1>
          <p className="text-base text-gray-500 leading-relaxed">
            Short text with details about you, what you do or your professional career.
            You can add more information on the about page.
          </p>
          <div className="flex gap-4 mt-2">
            <a
              href="#projets"
              className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors"
            >
              Projects
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-white/50 transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
