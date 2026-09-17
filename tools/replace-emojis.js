/* Replaces emoji icons in templates with professional SVG icons, then regenerates all pages. */
const icon = require("./icons");
const { fs, path, ROOT } = require("./build");

/* Emoji -> icon name mapping (used by detail-icon, value-icon, service-icon,
   mini-icon, wedo-badge, ind-icon, cr-icon, sol-card .service-icon, model cards) */
const MAP = {
  "🗄️": "data-engineering", "📊": "data-science", "🤖": "ai", "📋": "product",
  "💬": "consulting", "👥": "team", "☁️": "cloud", "🚀": "rocket", "🧩": "puzzle",
  "⏱️": "clock", "💰": "money", "🌐": "globe", "🔬": "flask", "🛡️": "shield",
  "💗": "heart", "🎯": "target", "🔭": "eye", "💎": "gem",
  "💼": "briefcase", "🏥": "hospital", "🚚": "truck", "🛒": "cart",
  "🎓": "graduation", "🐄": "cow", "🏭": "factory", "🆘": "life-buoy",
  "🏢": "building", "⚡": "zap", "📡": "tv",
  "✉️": "mail", "☎️": "phone", "📞": "phone", "📍": "map-pin",
  "🔌": "zap", "🔄": "refresh", "🧠": "cpu", "🧭": "compass",
  "📈": "trending", "📉": "bar-chart", "🧪": "flask", "🔒": "lock",
  "🔑": "lock", "🧱": "layers", "💬 ": "consulting", "⚙️": "settings",
  "📤": "send", "🏆": "award", "🗣️": "message", "⭐": "star", "🍽️": "package",
  "🛎️": "bell", "🧾": "file-text", "🩺": "activity", "👀": "eye",
  "🌟": "star", "🧑‍💼": "user", "🧑‍🤝‍🧑": "users", "🧮": "bar-chart",
  "📐": "compass", "🏘️": "building", "🔑": "lock", "🛠️": "settings",
  "🎓": "graduation", "🖥️": "monitor", "📱": "smartphone", "📦": "package",
  "🧮": "bar-chart", "📜": "file-text", "🏷️": "tag", "🌱": "trending",
  "🌾": "layers", "🚨": "alert", "📅": "calendar", "📄": "file-text",
  "🛍️": "cart", "🚛": "truck", "🚢": "send", "🖥": "monitor",
  "🛒": "cart", "🏭": "factory", "🐄": "cow", "📡": "tv", "🏛️": "building",
  "🏨": "building", "🏫": "building", "📚": "layers", "🛡": "shield",
  "👤": "user", "🔍": "compass", "🔐": "lock", "📡": "tv",
  "🧳": "briefcase", "🛩️": "send", "✈️": "send", "🖥️": "monitor",
  "🎬": "tv", "🎥": "tv", "💡": "zap", "📈": "trending", "💰": "money",
};

/* Icon rendering per container class — sizes & stroke color come from CSS */
function replacer(html) {
  return html
    .replace(/<div class="mini-icon">([^<]+)<\/div>/g, (m, e) => `<div class="mini-icon">${icon(MAP[e] || "activity")}</div>`)
    .replace(/<div class="wedo-badge([^"]*)">([^<]+)<\/div>/g, (m, cls, e) => `<div class="wedo-badge${cls}">${icon(MAP[e] || "activity")}</div>`)
    .replace(/<div class="value-icon">([^<]+)<\/div>/g, (m, e) => `<div class="value-icon">${icon(MAP[e] || "activity")}</div>`)
    .replace(/<div class="service-icon">([^<]+)<\/div>/g, (m, e) => `<div class="service-icon">${icon(MAP[e] || "activity")}</div>`)
    .replace(/<span class="ind-icon">([^<]+)<\/span>/g, (m, e) => `<span class="ind-icon">${icon(MAP[e] || "activity", 22)}</span>`)
    .replace(/<div class="detail-icon">([^<]+)<\/div>/g, (m, e) => `<div class="detail-icon">${icon(MAP[e] || "activity")}</div>`)
    .replace(/<span class="cr-icon">([^<]+)<\/span>/g, (m, e) => `<span class="cr-icon">${icon(MAP[e] || "activity", 20)}</span>`)
    .replace(/<div class="cr-icon">([^<]+)<\/div>/g, (m, e) => `<div class="cr-icon">${icon(MAP[e] || "activity", 20)}</div>`)
    .replace(/<div class="model-num">([^<]+)<\/div>/g, (m, n) => `<div class="model-num">${n}</div>`);
}
module.exports = { replacer, MAP };
