import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import {
  pieces,
  priceLabel,
  assetUrl,
  safeInstagram,
  orderUrl,
  hasWhatsapp,
} from "../data/atelier";
import { recipes } from "../data/recipes";
import { external } from "../components/Layout";
function PieceDetails({ piece }) {
  const [photo, setPhoto] = useState(0);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const related = recipes.find((r) => r.slug === piece.receita);
  return (
    <>
      <div className="recipe-header">
        <div>
          <span className="eyebrow">
            {piece.categoria} · {piece.status}
          </span>
          <h1>{piece.titulo}</h1>
          <p>{piece.descricao}</p>
        </div>
        <strong className="piece-price">{priceLabel(piece.preco)}</strong>
      </div>
      <div className="piece-layout">
        <section aria-label="Fotografias da peça">
          {piece.fotos.length ? (
            <>
              <figure className="piece-main-photo">
                <img
                  src={assetUrl(piece.fotos[photo].caminho)}
                  alt={piece.fotos[photo].legenda || piece.titulo}
                />
                <figcaption>{piece.fotos[photo].legenda}</figcaption>
              </figure>
              <div className="photo-thumbnails">
                {piece.fotos.map((f, i) => (
                  <button
                    key={f.caminho}
                    aria-label={`Ver foto ${i + 1}: ${f.legenda || piece.titulo}`}
                    aria-pressed={photo === i}
                    onClick={() => setPhoto(i)}
                  >
                    <img src={assetUrl(f.caminho)} alt="" />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="soft-panel">Fotos em preparação.</div>
          )}
        </section>
        <section>
          <h2>Os detalhes fazem a peça</h2>
          <dl className="facts">
            {[
              ["Fio", piece.fio],
              ["Tamanhos", piece.tamanhos?.join(", ")],
              ["Cores", piece.cores?.join(", ")],
              ["Medidas", piece.medidas],
              ["Prazo de produção", piece.prazo],
              ["Cuidados", piece.cuidados],
            ]
              .filter(([, v]) => v)
              .map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
          </dl>
          <p>{piece.variacao_preco}</p>
          {piece.status !== "Portfólio" && (
            <div className="soft-panel order-panel">
              <h3>Uma peça para você</h3>
              {Boolean(piece.tamanhos?.length) && (
                <label>
                  Tamanho de interesse
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <option value="">Quero conversar sobre as medidas</option>
                    {piece.tamanhos.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              )}
              {Boolean(piece.cores?.length) && (
                <label>
                  Cor de interesse
                  <select
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="">Quero conhecer as opções</option>
                    {piece.cores.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
              )}
              <a
                className="button"
                href={orderUrl(
                  piece.titulo,
                  [size && `Tamanho: ${size}`, color && `Cor: ${color}`]
                    .filter(Boolean)
                    .join("\n"),
                )}
                {...external}
              >
                {hasWhatsapp
                  ? "Pedir orçamento no WhatsApp ↗"
                  : "Conversar pelo Instagram ↗"}
              </a>
              <p className="help-text">
                {hasWhatsapp
                  ? "A mensagem leva a peça e suas preferências. Envie para confirmar o orçamento e a disponibilidade."
                  : "Na conversa, me conte a peça, o tamanho e a cor que você imaginou."}
              </p>
            </div>
          )}
          {safeInstagram(piece.instagram) && (
            <p>
              <a
                className="text-link"
                href={safeInstagram(piece.instagram)}
                {...external}
              >
                Ver publicação no Instagram ↗
              </a>
            </p>
          )}
          {related && (
            <Link className="text-link" to={`/receitas/${related.slug}`}>
              Quero fazer: ver receita →
            </Link>
          )}
        </section>
      </div>
      {piece.content.trim() && (
        <article className="markdown atelier-section">
          <ReactMarkdown>{piece.content}</ReactMarkdown>
        </article>
      )}
      {piece.bastidores.length > 0 && (
        <section className="atelier-section">
          <span className="eyebrow">Bastidores</span>
          <h2>Da ideia aos últimos pontos</h2>
          <div className="card-grid">
            {piece.bastidores.map((step, index) => (
              <article className="recipe-card" key={index}>
                {step.imagem && (
                  <img
                    className="social-photo"
                    src={assetUrl(step.imagem)}
                    alt={step.titulo}
                    loading="lazy"
                  />
                )}
                <div className="card-body">
                  <span className="eyebrow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.titulo}</h3>
                  <p>{step.texto}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
export default function Piece() {
  const { slug } = useParams();
  const piece = pieces.find((p) => p.slug === slug);
  return (
    <main className="shell page">
      <Link className="back-link" to="/pecas">
        ← Voltar para peças
      </Link>
      {piece ? (
        <PieceDetails key={slug} piece={piece} />
      ) : (
        <>
          <h1>Peça não encontrada</h1>
          <p>Explore as outras criações do ateliê.</p>
        </>
      )}
    </main>
  );
}
