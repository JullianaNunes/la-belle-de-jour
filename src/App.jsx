import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Header, Footer } from './components/Layout';
import Home from './pages/Home';
import Library from './pages/Library';
import Recipe from './pages/Recipe';
import Projects from './pages/Projects';
import About from './pages/About';
function App(){return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/receitas" element={<Library/>}/><Route path="/receitas/:slug" element={<Recipe/>}/><Route path="/projetos" element={<Projects/>}/><Route path="/sobre" element={<About/>}/><Route path="*" element={<main className="shell page"><h1>Página não encontrada</h1><Link to="/">Voltar ao início</Link></main>}/></Routes><Footer/></>}
export default App;
