import { load } from 'js-yaml';

const files = import.meta.glob('../../receitas/*.md', { query: '?raw', import: 'default', eager: true });

function parseRecipe(raw) {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!match) throw new Error('A receita precisa começar com um bloco YAML entre linhas ---');
  return { data: load(match[1]), content: match[2] };
}

export const recipes = Object.entries(files).map(([path, raw]) => {
  const { data, content } = parseRecipe(raw);
  return { ...data, content, slug: path.split('/').pop().replace(/\.md$/, '') };
}).sort((a, b) => (b.data || '').localeCompare(a.data || ''));
