import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram, BookOpen } from "lucide-react";
import { recipes } from "../data/recipes";
import { Card, insta, external } from "../components/Layout";
import lettering from "../assets/la-belle-de-jour-letreiro.png";

// Coloque sua foto em src/assets/foto-criadora.jpg (ou png/webp) para vê-la aqui.
const portraits = import.meta.glob(
  "../assets/foto-criadora.{jpg,jpeg,png,webp}",
  { eager: true, query: "?url", import: "default" },
);
const portrait = Object.values(portraits)[0];

function Home() {
  return (
    <>
      <section className="editorial-hero">
        <div className="shell editorial-hero-inner">
          <div className="editorial-copy">
            <h1 className="editorial-lettering">
              <img src={lettering} alt="La belle de jour" />
            </h1>
            <Link className="button editorial-cta" to="/receitas">
              Explorar receitas <ArrowRight size={21} />
            </Link>
          </div>
          <div className="editorial-portrait-area">
            <div className="portrait-back" aria-hidden="true" />
            <div className="portrait-frame">
              {portrait ? (
                <img src={portrait} alt="Criadora do La belle de jour" />
              ) : (
                <div className="portrait-placeholder">
                  {" "}
                  <img src={portrait} alt="Criadora do La belle de jour" />
                </div>
              )}
            </div>
            <div
              className="editorial-notes"
              aria-label="O que você encontra por aqui"
            >
              <span>
                Receitas
                <br />
                autorais
              </span>
              <span>
                Projetos
                <br />
                criativos
              </span>
              <span>
                Feito
                <br />à mão
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="home-recipes">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Biblioteca de receitas</span>
              <h2>Para criar com as próprias mãos</h2>
            </div>
            <Link to="/receitas" className="text-link">
              Todas as receitas <ArrowRight size={17} />
            </Link>
          </div>
          <div className="card-grid">
            {recipes.slice(0, 3).map((r) => (
              <Card recipe={r} key={r.slug} />
            ))}
          </div>
        </div>
      </section>
      <section className="social-band shell">
        <BookOpen size={29} strokeWidth={1.3} />
        <div>
          <h2>Acompanhe o ateliê</h2>
          <p>Receitas, projetos e pequenos detalhes do fazer artesanal.</p>
        </div>
        <a className="button button-outline" href={insta} {...external}>
          <Instagram size={17} /> @bellejour.crochet
        </a>
      </section>
    </>
  );
}
export default Home;
