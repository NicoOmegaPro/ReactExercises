import './App.css'
import articles from './data/articles.json'
import Header from './assets/complements/Header.jsx'
import Navbar from './assets/complements/Navbar.jsx'
import Footer from './assets/complements/Footer.jsx'
import Sidebar from './assets/complements/Slidebar.jsx'
import Entrada from './assets/complements/Entrada.jsx'
import LandingPage from './pages/LandingPage.jsx'
import NosotrosPage from './pages/NosotrosPage.jsx'
import ContactoPage from './pages/ContactoPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import TiendaPage from './pages/TiendaPage.jsx'

 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/nosotros" element={<NosotrosPage />} />
        <Route path="/contacto" element={<ContactoPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/tienda" element={<TiendaPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
        <Footer />
    </Router>
  )
}

export default App