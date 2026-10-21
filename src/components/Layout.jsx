import React, { useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Instagram, Menu, X, ArrowRight } from "lucide-react";
const insta = "https://www.instagram.com/bellejour.crochet/";
const external = { target: "_blank", rel: "noopener noreferrer" };
function Header() {
  const [open, setOpen] = useState(false);
  const home = useLocation().pathname === "/";
  return (
    <header className={home ? "site-header header-home" : "site-header"}>
      <div className="shell header-inner">
        <Link to="/" className="wordmark" onClick={() => setOpen(false)}>
          La belle de jour<span>crochê artesanal, ponto por ponto ♡</span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          aria-label="Navegação principal"
          className={open ? "nav open" : "nav"}
          onClick={() => setOpen(false)}
        >
          <NavLink to="/" end>
            Início
          </NavLink>
          <NavLink to="/receitas">Receitas</NavLink>
          <NavLink to="/pecas">Peças do ateliê</NavLink>
          <NavLink to="/ferramentas">Ferramentas</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
          <a href={insta} {...external} className="instagram">
            <Instagram size={17} /> @bellejour.crochet
          </a>
        </nav>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div className="shell footer-inner">
        <div>
          <strong>La belle de jour</strong>
          <p>crochê artesanal, ponto por ponto ♡</p>
        </div>
        <nav aria-label="Navegação do rodapé">
          <Link to="/">Início</Link>
          <Link to="/receitas">Receitas</Link>
          <Link to="/pecas">Peças do ateliê</Link>
          <Link to="/ferramentas">Ferramentas</Link>
          <Link to="/sobre">Sobre</Link>
          <a href={insta} {...external}>
            Instagram
          </a>
        </nav>
        <small>© {new Date().getFullYear()} La belle de jour</small>
      </div>
    </footer>
  );
}
function Artwork({ kind = "flower", label }) {
  return (
    <div
      className={"artwork " + kind}
      role="img"
      aria-label={label || "Ilustração abstrata de fios de crochê"}
    ></div>
  );
}
function Card({ recipe }) {
  return (
    <article className="recipe-card">
      <div className="card-image">
        {recipe.imagem ? (
          <img
            src={import.meta.env.BASE_URL + recipe.imagem.replace(/^\//, "")}
            alt={"Peça de crochê: " + recipe.titulo}
          />
        ) : (
          <Artwork
            kind={recipe.slug === "porta-copo" ? "coaster" : "flower"}
            label={"Espaço reservado para foto de " + recipe.titulo}
          />
        )}
      </div>
      <div className="card-body">
        <div className="eyebrow">
          {recipe.categoria} <span>·</span> {recipe.nivel}
        </div>
        <h3>{recipe.titulo}</h3>
        <p>{recipe.descricao}</p>
        <div className="card-bottom">
          <span>~ {recipe.tempo}</span>
          <Link to={"/receitas/" + recipe.slug}>
            Ver receita <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export { Header, Footer, Artwork, Card, insta, external };
