import { load } from "js-yaml";

// Preencha com o número comercial, incluindo país e DDD, somente dígitos.
export const whatsapp = "";
export const hasWhatsapp = /^\d{10,15}$/.test(whatsapp);
export const instagram = "https://www.instagram.com/bellejour.crochet/";
export const assetUrl = (path) =>
  import.meta.env.BASE_URL + String(path).replace(/^\//, "");
export const safeInstagram = (url) => {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" &&
      ["instagram.com", "www.instagram.com"].includes(parsed.hostname)
      ? parsed.href
      : null;
  } catch {
    return null;
  }
};
export function orderUrl(title, details = "") {
  return hasWhatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de um orçamento para ${title}.${details ? "\n" + details : ""}`)}`
    : instagram;
}
export const money = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export function priceLabel(price) {
  if (!price || !Number.isFinite(price.min) || price.min <= 0)
    return "Valor sob consulta";
  if (price.type === "fixed") return money(price.min);
  if (price.type === "from") return `A partir de ${money(price.min)}`;
  if (
    price.type === "range" &&
    Number.isFinite(price.max) &&
    price.max >= price.min
  )
    return `${money(price.min)} a ${money(price.max)}`;
  return "Valor sob consulta";
}
const files = import.meta.glob("../../pecas/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});
export const pieces = Object.entries(files).flatMap(([path, raw]) => {
  const match = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n([\s\S]*)$/);
  if (!match) throw new Error(`Frontmatter inválido: ${path}`);
  const data = load(match[1]);
  if (data.publicado !== true) return [];
  if (
    !data.titulo ||
    !["Pronta entrega", "Sob encomenda", "Portfólio"].includes(data.status)
  )
    throw new Error(`Preencha título e status da peça: ${path}`);
  return [
    {
      ...data,
      fotos: Array.isArray(data.fotos) ? data.fotos : [],
      bastidores: Array.isArray(data.bastidores) ? data.bastidores : [],
      content: match[2],
      slug: path.split("/").pop().replace(/\.md$/, ""),
    },
  ];
});
