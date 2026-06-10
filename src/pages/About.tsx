import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import photoAPropos from '../assets/images/photo-apropos.png'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-between px-10 lg:px-20 py-20 gap-16">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2 className="text-5xl font-bold text-gray-900">About me</h2>
          <div className="w-16 h-1 bg-yellow-400" />
          <p className="text-gray-500 leading-relaxed">
            Nisl arcu, scelerisque neque ut. Tincidunt amet, tempor duis tortor
            neque auctor dis ipsum. Pretium cras amet odio amet eleifend id sed
            cras sed. Aliquet risus posuere aliquet imperdiet sit.
          </p>
          <a
            href="/cv.pdf"
            className="self-start px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition-colors"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>
        <div className="hidden lg:block flex-shrink-0">
          <div className="relative">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-yellow-400 rounded-2xl" />
            <img
              src={photoAPropos}
              alt="À propos"
              className="relative w-72 h-96 object-cover rounded-2xl shadow-sm"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
