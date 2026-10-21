import React from "react";
import { Instagram } from "lucide-react";
import { insta, external } from "../components/Layout";

// Coloque sua foto em src/assets/foto-criadora.jpg (ou png/webp) para vê-la aqui.
const portraits = import.meta.glob(
  "../assets/creator-photo.{jpg,jpeg,png,webp}",
  { eager: true, query: "?url", import: "default" },
);
const portrait = Object.values(portraits)[0];


function About() {
  return (
    <main className="shell page about-page">
      <span className="eyebrow">A história por trás dos pontos</span>
      <h1>Sobre o La belle de jour</h1>
      <div className="about-grid">
        <div>
          <p className="lead">
            Um espaço para reunir receitas, projetos e o prazer de criar com as
            mãos.
          </p>
          <section>
            <h2>A história da marca</h2>
            <p>
              Comecei a fazer crochê um pouco depois de perder minha prima Alice.
              Ela tinha uma lojinha de crochê na cidade onde morava e sempre fazia
              roupas e biquínis para mim. Foi só depois que ela partiu que comecei
              a me interessar por aprender também.
            </p>
            <p>
              Comecei com peças pequenas e, aos poucos, fui me aperfeiçoando. Mas
              o crochê já fazia parte da minha família: além da Alice, minha avó
              materna também amava fazer crochê.
            </p>
          </section>
          <section>
            <h2>O significado do nome</h2>
            <p>
              O nome veio da música <em>La Belle de Jour</em>, de Alceu Valença.
              Sempre que meu pai escuta essa música, ele diz que ela é minha.
              Eu sempre amo ela e essa ligação que meu pai fez comigo.
            </p>
            <p>
              Na hora de escolher um nome para a marca, La belle de jour pareceu
              uma forma bonita de trazer essa lembrança para algo criado por mim.
            </p>
          </section>
          <a href={insta} {...external} className="button">
            <Instagram size={17} /> Acompanhar no Instagram
          </a>
        </div>
        <div
          className="creator-photo"
          role="img"
          aria-label="Espaço reservado para foto da criadora"
        >
           {portrait ? (
                <img src={portrait} alt="Criadora do La belle de jour" />
              ) : (
                <div className="portrait-placeholder">
                  {" "}
                  <img src={portrait} alt="Criadora do La belle de jour" />
                </div>
              )}
        </div>
      </div>
    </main>
  );
}

export default About;
