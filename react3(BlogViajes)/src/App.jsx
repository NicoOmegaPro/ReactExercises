import './App.css'
import articles from './data/articles.json'
import Header from './assets/complements/Header.jsx'
import Navbar from './assets/complements/Navbar.jsx'
import Footer from './assets/complements/Footer.jsx'
import Sidebar from './assets/complements/Slidebar.jsx'
import Entrada from './assets/complements/Entrada.jsx'

function App() {

  return (
    <>
      <Header />
      <Navbar />
      <main className="main-container">
        <section className="articulos">
        {articles.map( article => (
          <Entrada key={article.id}
            img={article.img}
            title={article.title}
            desc={article.desc}
          />
        ))}
         </section>
        <Sidebar />
      </main>
        <Footer />
    </>
  )
}

export default App