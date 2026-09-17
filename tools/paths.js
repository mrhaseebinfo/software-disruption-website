/* Central path map for the folder-per-page structure.
   Every page = <folder>/index.html. Pages are 1 level deep, so all
   internal links are root-relative and prefixed with "../" inside folders. */
const MAP = {
  home:        { dir: "" },
  about:       { dir: "about" },
  services:    { dir: "services" },
  industries:  { dir: "industries" },
  blog:        { dir: "blog" },
  contact:     { dir: "contact" },
  testimonials:{ dir: "testimonials" },
  why:         { dir: "why-us" },
  team:        { dir: "team" },
  careers:     { dir: "careers" },
  caseStudies: { dir: "case-studies" },
  howWeWork:   { dir: "how-we-work" },
  faq:         { dir: "faq" },
  privacy:     { dir: "privacy" },
  terms:       { dir: "terms" },
  // services
  "data-engineering":          { dir: "services/data-engineering" },
  "data-science-services":     { dir: "services/data-science" },
  "ai-machine-learning-services": { dir: "services/ai-machine-learning" },
  "product-management-services":  { dir: "services/product-management" },
  "software-consulting-services": { dir: "services/software-consulting" },
  "resource-augmentation-services": { dir: "services/resource-augmentation" },
  "devops-cloud-services":     { dir: "services/devops-cloud" },
  "digital-transformation-services": { dir: "services/digital-transformation" },
  "odoo-partner":              { dir: "services/odoo-partner" },
  // industry pages
  "i-business-accounting": { dir: "industries/business-accounting" },
  "i-disaster-relief":     { dir: "industries/disaster-relief" },
  "i-energy-utilities":    { dir: "industries/energy-utilities" },
  "i-government":          { dir: "industries/government" },
  "i-healthcare":          { dir: "industries/healthcare" },
  "i-higher-education":    { dir: "industries/higher-education" },
  "i-hotel-management":    { dir: "industries/hotel-management" },
  "i-logistics":           { dir: "industries/logistics" },
  "i-livestock":           { dir: "industries/livestock" },
  "i-manufacturing":       { dir: "industries/manufacturing" },
  "i-real-estate":         { dir: "industries/real-estate" },
  "i-retail-ecommerce":    { dir: "industries/retail-ecommerce" },
  "i-telecom-media":       { dir: "industries/telecom-media" },
  // blog posts
  "blog-e-invoicing-penalties-saudi-arabia": { dir: "blog/e-invoicing-penalties-saudi-arabia" },
  "blog-it-staff-augmentation-saudi-arabia": { dir: "blog/it-staff-augmentation-saudi-arabia" },
  "blog-rust-vs-cpp":                        { dir: "blog/rust-vs-cpp" },
};
// url(key) → path as linked from a page in the given depth (0 = root, 1 = one folder deep)
/* url(key, depth): depth 0 = root page, 1 = one folder deep, 2 = two folders deep */
function url(key, depth) {
  const entry = MAP[key];
  if (!entry) throw new Error("Unknown path key: " + key);
  const base = entry.dir ? entry.dir + "/index.html" : "index.html";
  const px = depth === 2 ? "../../" : depth ? "../" : "";
  return px + base;
}
module.exports = { MAP, url };
