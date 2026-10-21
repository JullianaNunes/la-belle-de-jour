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
            <p className="placeholder-text">
              [Conte aqui como o La belle de jour começou e o que o crochê
              representa para você.]
            </p>
          </section>
          <section>
            <h2>O significado do nome</h2>
            <p className="placeholder-text">
              [Conte por que você escolheu o nome La belle de jour.]
            </p>
          </section>
          <section>
            <h2>O fazer artesanal</h2>
            <p className="placeholder-text">
              [Descreva sua filosofia e seu processo de criação.]
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
