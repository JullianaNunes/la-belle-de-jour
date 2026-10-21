import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ImagePlus, Instagram } from "lucide-react";
import {
  pieces,
  priceLabel,
  assetUrl,
  safeInstagram,
  instagram,
} from "../data/atelier";
import { external } from "../components/Layout";
export function PieceCard({ piece }) {
  return (
    <article className="recipe-card">
      <Link to={`/pecas/${piece.slug}`} className="piece-cover">
        {piece.fotos[0] ? (
          <img
            loading="lazy"
            src={assetUrl(piece.fotos[0].caminho)}
            alt={piece.fotos[0].legenda || piece.titulo}
          />
        ) : (
          <span>Foto em preparação</span>
        )}
      </Link>
      <div className="card-body">
        <span className="eyebrow">
          {piece.categoria} · {piece.status}
        </span>
        <h2 className="card-title">
          <Link to={`/pecas/${piece.slug}`}>{piece.titulo}</Link>
        </h2>
        <p>{piece.descricao}</p>
        <strong className="piece-price">{priceLabel(piece.preco)}</strong>
        <Link className="text-link" to={`/pecas/${piece.slug}`}>
          Conhecer a peça <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
export function InstagramGallery() {
  const posts = pieces.filter(
    (p) => safeInstagram(p.instagram) && p.fotos.length,
  );
  return (
    <section className="atelier-section">
      <div className="section-heading">
        <div>
          {/* <span className="eyebrow">Do Instagram para o ateliê</span> */}
          <h2>Do Instagram para o ateliê</h2>
        </div>
        <a className="text-link" href={instagram} {...external}>
          <Instagram size={17} /> Ver perfil
        </a>
      </div>
      {posts.length ? (
        <div className="card-grid">
          {posts.map((p) => (
            <article className="recipe-card" key={p.slug}>
              <a href={safeInstagram(p.instagram)} {...external}>
                <img
                  className="social-photo"
                  src={assetUrl(p.fotos[0].caminho)}
                  alt={p.titulo}
                  loading="lazy"
                />
              </a>
              <div className="card-body">
                <h3>{p.titulo}</h3>
                <p>{priceLabel(p.preco)}</p>
                <Link className="text-link" to={`/pecas/${p.slug}`}>
                  Ver peça e detalhes <ArrowRight size={16} />
                </Link>
                <a
                  className="text-link post-link"
                  href={safeInstagram(p.instagram)}
                  {...external}
                >
                  Abrir post no Instagram ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="soft-panel">
          <p>
            As novidades e os bastidores do ateliê estão no Instagram. Em breve,
            suas peças favoritas também estarão por aqui.
          </p>
          <a className="text-link" href={instagram} {...external}>
            Acompanhar @bellejour.crochet ↗
          </a>
        </div>
      )}
    </section>
  );
}
export default function Projects() {
  const [term, setTerm] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const shown = pieces.filter(
    (p) =>
      (!category || p.categoria === category) &&
      (!status || p.status === status) &&
      `${p.titulo} ${p.descricao}`
        .toLocaleLowerCase("pt-BR")
        .includes(term.toLocaleLowerCase("pt-BR")),
  );
  return (
    <main className="shell page">
      <span className="eyebrow">
        Feito à mão, para fazer parte da sua história
      </span>
      <h1>Peças do ateliê</h1>
      <p className="page-intro">
        Conheça as criações, explore os detalhes e converse comigo sobre uma
        peça para você.
      </p>
      {pieces.length > 0 ? (
        <>
          <div className="filters catalog-filters">
            <label className="search-field">
              Buscar peça
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Nome ou descrição"
              />
            </label>
            <label>
              Categoria
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Todas</option>
                {[...new Set(pieces.map((p) => p.categoria))]
                  .filter(Boolean)
                  .map((c) => (
                    <option key={c}>{c}</option>
                  ))}
              </select>
            </label>
            <label>
              Disponibilidade
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="">Todas</option>
                {["Pronta entrega", "Sob encomenda", "Portfólio"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>
          <p aria-live="polite">
            {shown.length}{" "}
            {shown.length === 1 ? "peça encontrada" : "peças encontradas"}
          </p>
          {shown.length ? (
            <div className="card-grid">
              {shown.map((p) => (
                <PieceCard piece={p} key={p.slug} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <h2>Nenhuma peça encontrada</h2>
              <p>Experimente outro termo ou ajuste os filtros.</p>
              <button
                className="button button-outline"
                onClick={() => {
                  setTerm("");
                  setCategory("");
                  setStatus("");
                }}
              >
                Limpar filtros
              </button>
            </div>
          )}
        </>
      ) : (
        <section className="catalog-preview" aria-label="Próximas criações do ateliê">
          <div className="card-grid">
            {Array.from({ length: 6 }, (_, index) => (
              <article className="recipe-card piece-placeholder" key={index}>
                <div className="piece-cover piece-photo-placeholder">
                  <ImagePlus size={40} strokeWidth={1} aria-hidden="true" />
                  <span>Foto em breve</span>
                </div>
                <div className="card-body">
                  <span className="eyebrow">Feito à mão · {String(index + 1).padStart(2, "0")}</span>
                  <h2 className="card-title">Uma nova criação</h2>
                  <p>Em breve, uma peça feita por mim, com seus detalhes e sua história.</p>
                </div>
              </article>
            ))}
          </div>
          <div className="soft-panel catalog-welcome">
            <span className="eyebrow">O catálogo está florescendo</span>
            <h2>Cada peça tem seu tempo</h2>
            <p>
              Estou preparando as fotos e os detalhes das criações. Enquanto isso,
              conheça meu trabalho e converse comigo pelo Instagram.
            </p>
            <a className="button" href={instagram} {...external}>
              <Instagram size={18} /> Conhecer o ateliê
            </a>
          </div>
        </section>
      )}
      <InstagramGallery />
    </main>
  );
}
