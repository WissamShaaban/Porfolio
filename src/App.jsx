import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Accueil from './pages/Accueil'
import APropos from './pages/APropos'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/a-propos" element={<APropos />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
