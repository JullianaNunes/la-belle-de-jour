import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { insta, external } from '../components/Layout';
function Projects(){return <main className="shell page"><span className="eyebrow">Do ateliê</span><h1>Meus projetos</h1><p className="page-intro">Este espaço vai reunir as peças feitas à mão pelo La belle de jour.</p><div className="placeholder-panel"><div className="placeholder-icon"><Heart size={34} strokeWidth={1.3}/></div><div><span className="eyebrow">Em preparação</span><h2>Os projetos estão chegando</h2><p>Adicione fotos e detalhes das suas peças reais quando estiver pronta. Nenhum projeto demonstrativo foi apresentado como peça já produzida.</p><a href={insta} {...external} className="text-link">Visitar o Instagram <ArrowRight size={16}/></a></div></div></main>}

export default Projects;
