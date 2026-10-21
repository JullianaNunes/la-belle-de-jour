import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { recipes } from "../data/recipes";
import { Artwork } from "../components/Layout";
import RecipeProgress from "../components/RecipeProgress";
function Recipe({ slug }) {
  const recipe = recipes.find((r) => r.slug === slug);
  const [message, setMessage] = useState("");
  if (!recipe)
    return (
      <main className="shell page">
        <h1>Receita não encontrada</h1>
        <Link to="/receitas">Voltar para receitas</Link>
      </main>
    );
  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ title: recipe.titulo, url: location.href });
        return;
      }
      await navigator.clipboard.writeText(location.href);
      setMessage("Link copiado!");
    } catch (e) {
      if (e.name !== "AbortError")
        setMessage("Não foi possível copiar. Copie o endereço do navegador.");
    }
  }
  return (
    <main className="shell recipe-page">
      <Link to="/receitas" className="back-link">
        <ArrowLeft size={17} /> Voltar para receitas
      </Link>
      <div className="recipe-header">
        <div>
          <span className="eyebrow">
            {recipe.categoria} · {recipe.nivel}
          </span>
          <h1>{recipe.titulo}</h1>
          <p>{recipe.descricao}</p>
        </div>
        <button onClick={share} className="button button-outline">
          <Share2 size={17} /> Compartilhar
        </button>
      </div>
      {message && (
        <p role="status" className="share-status">
          {message}
        </p>
      )}
      <div className="recipe-layout">
        <aside>
          <div className="recipe-image">
            {recipe.imagem ? (
              <img
                src={
                  import.meta.env.BASE_URL + recipe.imagem.replace(/^\//, "")
                }
                alt={"Peça de crochê: " + recipe.titulo}
              />
            ) : (
              <Artwork
                label={"Espaço reservado para foto de " + recipe.titulo}
              />
            )}
          </div>
          <dl className="facts">
            <div>
              <dt>Dificuldade</dt>
              <dd>{recipe.nivel}</dd>
            </div>
            <div>
              <dt>Tempo estimado</dt>
              <dd>{recipe.tempo}</dd>
            </div>
            <div>
              <dt>Fio</dt>
              <dd>{recipe.fio}</dd>
            </div>
            <div>
              <dt>Agulha</dt>
              <dd>{recipe.agulha}</dd>
            </div>
          </dl>
        </aside>
        <article className="markdown">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {recipe.content}
          </ReactMarkdown>
          <RecipeProgress key={recipe.slug} recipe={recipe} />
        </article>
      </div>
    </main>
  );
}

export default function RecipeRoute() {
  return <Recipe slug={useParams().slug} />;
}
