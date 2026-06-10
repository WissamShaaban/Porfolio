import Navbar from './Navbar'
import photoHero from '../assets/images/photo-hero.png'

export default function SectionHero() {
  return (
    <section className="relative min-h-screen bg-white flex flex-col overflow-hidden">
      <Navbar transparent />

      <div className="flex flex-1 items-center justify-between px-10 lg:px-20 pt-24 pb-12">
        <div className="flex flex-col gap-6 max-w-lg z-10">
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
            <a href="#projets"
              className="px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors">
              Projects
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"
              className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hidden lg:block flex-shrink-0 w-[45%] h-screen absolute right-0 top-0">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="blob-clip">
                <path d="M 100,0 L 100,100 L 14,100 C -2,96 -6,84 12,73 C 30,61 4,51 7,40 C 10,29 -5,16 14,6 C 21,1 27,0 37,0 Z" />
              </clipPath>
            </defs>
            <g clipPath="url(#blob-clip)">
              <rect x="-10" y="0" width="120" height="100" fill="#f5c842" />
              <image
                href={photoHero}
                x="12"
                y="-5"
                width="90"
                height="108"
                preserveAspectRatio="xMidYMax meet"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  )
}
