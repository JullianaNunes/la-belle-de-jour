import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram, BookOpen } from "lucide-react";
import { recipes } from "../data/recipes";
import { Card, insta, external } from "../components/Layout";
import { pieces } from "../data/atelier";
import { PieceCard, InstagramGallery } from "./Projects";
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
      <section className="shell atelier-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">O ateliê está de portas abertas</span>
            <h2>Para vestir, criar e se inspirar</h2>
          </div>
        </div>
        <div className="feature-grid">
          <Link className="feature-card" to="/pecas">
            <span className="eyebrow">01 · Feito à mão</span>
            <h3>Peças do ateliê</h3>
            <p>Conheça as criações e converse sobre uma peça para você.</p>
            <span className="text-link">Explorar peças →</span>
          </Link>
          <Link className="feature-card" to="/receitas">
            <span className="eyebrow">02 · Ponto por ponto</span>
            <h3>Seu próximo projeto</h3>
            <p>
              Receitas para acompanhar no seu ritmo, com contador de carreiras.
            </p>
            <span className="text-link">Encontrar uma receita →</span>
          </Link>
          <Link className="feature-card" to="/ferramentas">
            <span className="eyebrow">03 · Uma mãozinha</span>
            <h3>Fios e medidas</h3>
            <p>Estime o consumo, calcule pontos e compare seus materiais.</p>
            <span className="text-link">Abrir ferramentas →</span>
          </Link>
        </div>
        {pieces.length > 0 && (
          <>
            <div className="section-heading atelier-section">
              <h2>Saídas do ateliê</h2>
              <Link to="/pecas" className="text-link">
                Todas as peças →
              </Link>
            </div>
            <div className="card-grid">
              {pieces.slice(0, 3).map((p) => (
                <PieceCard key={p.slug} piece={p} />
              ))}
            </div>
          </>
        )}
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
      <div className="shell">
        <InstagramGallery />
      </div>
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
