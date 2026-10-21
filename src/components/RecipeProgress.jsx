import React from "react";
import { useSavedState } from "../lib/storage";
const valid = (v) =>
  v &&
  Number.isInteger(v.rows) &&
  v.rows >= 0 &&
  v.rows <= 999999 &&
  Array.isArray(v.done) &&
  v.done.every((s) => typeof s === "string");
export default function RecipeProgress({ recipe }) {
  const steps = [...recipe.content.matchAll(/^\d+\.\s+(.+)$/gm)].map(
    (m) => m[1],
  );
  const [progress, setProgress, error] = useSavedState(
    `lbj:recipe:${recipe.slug}:v1`,
    { rows: 0, done: [] },
    valid,
  );
  const checked = steps.filter((step) => progress.done.includes(step)).length;
  return (
    <section className="progress-panel" aria-label="Acompanhar receita">
      <span className="eyebrow">No seu ritmo</span>
      <h2>Meu progresso</h2>
      <p className="help-text">
        Salvo apenas neste navegador. Você pode sair e continuar depois.
      </p>
      <div className="row-counter">
        <button
          type="button"
          className="small-button"
          aria-label="Diminuir uma carreira"
          disabled={progress.rows === 0}
          onClick={() => setProgress((p) => ({ ...p, rows: p.rows - 1 }))}
        >
          −
        </button>
        <output aria-live="polite">
          <strong>{progress.rows}</strong>{" "}
          {progress.rows === 1 ? "carreira" : "carreiras"}
        </output>
        <button
          type="button"
          className="small-button"
          aria-label="Adicionar uma carreira"
          disabled={progress.rows >= 999999}
          onClick={() => setProgress((p) => ({ ...p, rows: p.rows + 1 }))}
        >
          +
        </button>
      </div>
      {steps.length > 0 && (
        <>
          <label className="progress-label" htmlFor={`progress-${recipe.slug}`}>
            {checked} de {steps.length} etapas concluídas
          </label>
          <progress
            id={`progress-${recipe.slug}`}
            value={checked}
            max={steps.length}
          />
          <div className="step-checklist">
            {steps.map((step, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={progress.done.includes(step)}
                  onChange={(e) => {
                    const done = e.target.checked;
                    setProgress((p) => ({
                      ...p,
                      done: done
                        ? [...new Set([...p.done, step])]
                        : p.done.filter((s) => s !== step),
                    }));
                  }}
                />
                <span>
                  {index + 1}. {step}
                </span>
              </label>
            ))}
          </div>
        </>
      )}
      <button
        type="button"
        className="small-button"
        disabled={!progress.rows && !progress.done.length}
        onClick={() => {
          if (
            window.confirm(
              "Zerar o contador e desmarcar todas as etapas desta receita?",
            )
          )
            setProgress({ rows: 0, done: [] });
        }}
      >
        Recomeçar receita
      </button>
      {error && <p role="status">{error}</p>}
    </section>
  );
}
