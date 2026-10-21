import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Header, Footer } from "./components/Layout";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Recipe from "./pages/Recipe";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Piece from "./pages/Piece";
const Tools = lazy(() => import("./pages/Tools"));
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main className="shell page" role="status">
            Preparando o ateliê…
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/receitas" element={<Library />} />
          <Route path="/receitas/:slug" element={<Recipe />} />
          <Route path="/projetos" element={<Projects />} />
          <Route path="/pecas" element={<Projects />} />
          <Route path="/pecas/:slug" element={<Piece />} />
          <Route path="/ferramentas" element={<Tools />} />
          <Route path="/sobre" element={<About />} />
          <Route
            path="*"
            element={
              <main className="shell page">
                <h1>Página não encontrada</h1>
                <Link to="/">Voltar ao início</Link>
              </main>
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
export default App;
