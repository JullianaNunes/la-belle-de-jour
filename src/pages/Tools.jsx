import React, { useState } from "react";
import {
  estimateYarn,
  convertBalls,
  gaugeCount,
  yarnMetrics,
} from "../lib/calculations";
import { useSavedState } from "../lib/storage";
import { money } from "../data/atelier";
const fmt = (n) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(n);
function NumberField({
  name,
  label,
  value,
  onChange,
  min = "0.01",
  max,
  step = "any",
}) {
  return (
    <label htmlFor={name}>
      {label}
      <input
        id={name}
        name={name}
        type="number"
        inputMode="decimal"
        min={min}
        max={max}
        step={step}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
function YarnEstimate() {
  const [form, setForm] = useState({
    sampleWidth: "",
    sampleHeight: "",
    sampleGrams: "",
    area: "",
    ballGrams: "",
    ballMeters: "",
    margin: "15",
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const fields = [
    ["sampleWidth", "Largura da amostra (cm)"],
    ["sampleHeight", "Altura da amostra (cm)"],
    ["sampleGrams", "Peso da amostra (g)"],
    ["area", "Área total das partes da peça (cm²)"],
    ["ballGrams", "Peso de um novelo (g)"],
    ["ballMeters", "Metragem de um novelo (m)"],
    ["margin", "Margem adicional (%)"],
  ];
  return (
    <section className="tool-panel">
      <span className="eyebrow">Planeje seus materiais</span>
      <h2>Quanto fio vou usar?</h2>
      <p>
        Faça e pese uma amostra com o mesmo fio, ponto e agulha da peça. A
        estimativa compara o consumo por área.
      </p>
      <details className="instructions">
        <summary>Como calcular a área da peça?</summary>
        <p>
          Some as áreas de todas as partes. Para um retângulo, multiplique
          largura por altura. Exemplo: frente de 40 × 50 cm e costas de 40 × 50
          cm somam 4.000 cm². Some mangas e outras partes, quando houver.
        </p>
        <p>
          A amostra deve representar o ponto e a tensão do trabalho. Modelagem,
          acabamentos e pontos diferentes podem alterar o consumo.
        </p>
      </details>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const next = estimateYarn(form);
          setResult(next);
          setError(
            next
              ? ""
              : "Confira as medidas: use valores positivos e margem de 0 a 100%.",
          );
        }}
      >
        <div className="form-grid">
          {fields.map(([name, label]) => (
            <NumberField
              key={name}
              name={name}
              label={label}
              value={form[name]}
              min={name === "margin" ? "0" : "0.01"}
              max={name === "margin" ? "100" : undefined}
              onChange={(value) => {
                setForm({ ...form, [name]: value });
                setResult(null);
                setError("");
              }}
            />
          ))}
        </div>
        <button className="button" type="submit">
          Estimar consumo
        </button>
      </form>
      {error && <p role="alert">{error}</p>}
      {result && (
        <div className="result-panel" role="status">
          <span className="eyebrow">
            Estimativa com margem de {form.margin}%
          </span>
          <div className="result-grid">
            <p>
              <strong>{fmt(result.grams)} g</strong>de fio
            </p>
            <p>
              <strong>{fmt(result.meters)} m</strong>de fio
            </p>
            <p>
              <strong>{result.balls}</strong>novelos inteiros
            </p>
          </div>
          <p className="help-text">
            A margem já está incluída. O número de novelos é arredondado para
            cima; confira o consumo durante a execução.
          </p>
        </div>
      )}
    </section>
  );
}
function Converters() {
  const [meters, setMeters] = useState("");
  const [ballMeters, setBallMeters] = useState("");
  const [balls, setBalls] = useState(null);
  const [form, setForm] = useState({
    stitches: "",
    rows: "",
    width: "",
    height: "",
    targetWidth: "",
    targetHeight: "",
  });
  const [gauge, setGauge] = useState(null);
  const fields = [
    ["stitches", "Pontos na amostra"],
    ["rows", "Carreiras na amostra"],
    ["width", "Largura da amostra (cm)"],
    ["height", "Altura da amostra (cm)"],
    ["targetWidth", "Largura desejada (cm)"],
    ["targetHeight", "Altura desejada (cm)"],
  ];
  return (
    <div className="tool-stack">
      <section className="tool-panel">
        <h2>De metros para novelos</h2>
        <p>
          Já sabe a metragem necessária? Converta usando os dados do rótulo.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setBalls(convertBalls(meters, ballMeters));
          }}
        >
          <div className="form-grid">
            <NumberField
              name="convert-meters"
              label="Metragem necessária (m)"
              value={meters}
              onChange={(v) => {
                setMeters(v);
                setBalls(null);
              }}
            />
            <NumberField
              name="convert-ball"
              label="Metragem por novelo (m)"
              value={ballMeters}
              onChange={(v) => {
                setBallMeters(v);
                setBalls(null);
              }}
            />
          </div>
          <button type="submit" className="button">
            Converter
          </button>
        </form>
        {balls !== null && (
          <p className="result-panel" role="status">
            Você precisará de{" "}
            <strong>
              {balls} {balls === 1 ? "novelo inteiro" : "novelos inteiros"}
            </strong>
            . Inclua sua margem na metragem informada.
          </p>
        )}
      </section>
      <section className="tool-panel">
        <h2>Pontos e carreiras pela amostra</h2>
        <p>
          Descubra a quantidade aproximada para atingir suas medidas com a mesma
          tensão e o mesmo ponto.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setGauge({
              stitches: gaugeCount(form.stitches, form.width, form.targetWidth),
              rows: gaugeCount(form.rows, form.height, form.targetHeight),
            });
          }}
        >
          <div className="form-grid">
            {fields.map(([name, label]) => (
              <NumberField
                key={name}
                name={`gauge-${name}`}
                label={label}
                value={form[name]}
                min={["stitches", "rows"].includes(name) ? "1" : "0.01"}
                step={["stitches", "rows"].includes(name) ? "1" : "any"}
                onChange={(v) => {
                  setForm({ ...form, [name]: v });
                  setGauge(null);
                }}
              />
            ))}
          </div>
          <button className="button" type="submit">
            Calcular pontos
          </button>
        </form>
        {gauge && (
          <div className="result-panel" role="status">
            <p>
              <strong>
                {gauge.stitches} pontos × {gauge.rows} carreiras
              </strong>
              , arredondados para o inteiro mais próximo.
            </p>
            <p>
              Ajuste ao múltiplo exigido pelo desenho do ponto e acrescente
              bordas ou correntinhas de subida conforme a receita.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
const validYarns = (list) =>
  Array.isArray(list) &&
  list.every(
    (y) =>
      y &&
      typeof y.id === "string" &&
      typeof y.name === "string" &&
      typeof y.composition === "string" &&
      yarnMetrics(y),
  );
function YarnGuide() {
  const blank = {
    name: "",
    composition: "",
    grams: "",
    meters: "",
    price: "",
    hook: "",
    notes: "",
  };
  const [yarns, setYarns, error] = useSavedState(
    "lbj:yarns:v1",
    [],
    validYarns,
  );
  const [form, setForm] = useState(blank);
  const [notice, setNotice] = useState("");
  return (
    <section className="tool-panel">
      <span className="eyebrow">Seu caderno de materiais</span>
      <h2>Guia e comparativo de fios</h2>
      <p>
        Cadastre os dados do rótulo e o preço que você encontrou. Compare
        composição, metragem, TEX aproximado e custo por 100 metros.
      </p>
      <details className="instructions">
        <summary>O que esses números significam?</summary>
        <p>
          TEX é a massa em gramas de 1.000 metros de fio. Aqui, calculamos peso
          ÷ metragem × 1.000; os valores arredondados do rótulo podem produzir
          uma pequena diferença em relação ao TEX declarado pelo fabricante.
        </p>
        <p>
          Fios com TEX parecido podem ter construção, elasticidade e caimento
          diferentes. Faça uma amostra antes de substituir o fio de uma receita.
          Consulte o rótulo para composição, agulha e cuidados.
        </p>
      </details>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!form.name.trim() || !yarnMetrics(form)) return;
          const id =
            crypto.randomUUID?.() ||
            `${Date.now()}-${Math.random().toString(36).slice(2)}`;
          setYarns((previous) => [
            ...previous,
            { ...form, name: form.name.trim(), id },
          ]);
          setForm(blank);
          setNotice("Fio adicionado ao comparativo.");
        }}
      >
        <div className="form-grid">
          <label>
            Nome do fio
            <input
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </label>
          <label>
            Composição
            <input
              maxLength={150}
              placeholder="Conforme o rótulo"
              value={form.composition}
              onChange={(e) =>
                setForm({ ...form, composition: e.target.value })
              }
            />
          </label>
          {[
            ["grams", "Peso do novelo (g)"],
            ["meters", "Metragem do novelo (m)"],
            ["price", "Preço do novelo (R$)"],
          ].map(([name, label]) => (
            <NumberField
              key={name}
              name={`yarn-${name}`}
              label={label}
              value={form[name]}
              onChange={(v) => setForm({ ...form, [name]: v })}
            />
          ))}
          <label>
            Agulha indicada
            <input
              maxLength={100}
              placeholder="Conforme o rótulo"
              value={form.hook}
              onChange={(e) => setForm({ ...form, hook: e.target.value })}
            />
          </label>
          <label className="full-width">
            Suas observações
            <textarea
              maxLength={1000}
              placeholder="Caimento, toque, experiência de uso…"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </label>
        </div>
        <button type="submit" className="button">
          Adicionar ao comparativo
        </button>
      </form>
      <p className="help-text">
        Seus fios ficam salvos apenas neste navegador, sem sincronização entre
        dispositivos.
      </p>
      <p role="status">{error || notice}</p>
      {yarns.length ? (
        <div
          className="table-scroll"
          tabIndex={0}
          aria-label="Comparativo de fios, role horizontalmente para ver todas as colunas"
        >
          <table>
            <caption>Seus fios lado a lado</caption>
            <thead>
              <tr>
                {[
                  "Fio",
                  "Composição / agulha",
                  "Novelo",
                  "TEX aprox.",
                  "Custo / 100 m",
                  "Observações",
                  "Ações",
                ].map((h) => (
                  <th key={h} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {yarns.map((y) => {
                const metrics = yarnMetrics(y);
                return (
                  <tr key={y.id}>
                    <th scope="row">{y.name}</th>
                    <td>
                      {y.composition || "—"}
                      <br />
                      {y.hook || "—"}
                    </td>
                    <td>
                      {y.grams} g / {y.meters} m<br />
                      {money(Number(y.price))}
                    </td>
                    <td>{fmt(metrics.tex)}</td>
                    <td>{money(metrics.cost100m)}</td>
                    <td>{y.notes || "—"}</td>
                    <td>
                      <button
                        type="button"
                        className="small-button"
                        aria-label={`Remover ${y.name}`}
                        onClick={() => {
                          setYarns(yarns.filter((item) => item.id !== y.id));
                          setNotice(`${y.name} removido.`);
                        }}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="soft-panel">
          <p>
            Seu comparativo começa com o primeiro fio. Pegue um rótulo e
            preencha os dados acima.
          </p>
        </div>
      )}
    </section>
  );
}
export default function Tools() {
  const [tab, setTab] = useState("fio");
  return (
    <main className="shell page">
      <span className="eyebrow">Uma ajuda entre um ponto e outro</span>
      <h1>Ferramentas de crochê</h1>
      <p className="page-intro">
        Planeje o consumo, adapte as medidas e conheça melhor seus materiais.
      </p>
      <div className="tool-tabs" aria-label="Escolher ferramenta">
        {[
          ["fio", "Consumo de fio"],
          ["medidas", "Novelos e medidas"],
          ["guia", "Comparar fios"],
        ].map(([id, label]) => (
          <button
            type="button"
            key={id}
            aria-pressed={tab === id}
            aria-controls={`tool-${id}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>
      <div id="tool-fio" hidden={tab !== "fio"}>
        <YarnEstimate />
      </div>
      <div id="tool-medidas" hidden={tab !== "medidas"}>
        <Converters />
      </div>
      <div id="tool-guia" hidden={tab !== "guia"}>
        <YarnGuide />
      </div>
    </main>
  );
}
