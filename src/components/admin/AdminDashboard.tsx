"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/lib/auth";
import {
  useAdminData,
  saveProduct,
  deleteProduct,
  toggleStock,
  saveBrand,
  deleteBrand,
  saveCategory,
  deleteCategory,
  addType,
  deleteType,
  deleteLead,
  slugify,
  type Product,
  type Brand,
  type Section,
} from "@/lib/store";
import { Logo } from "@/components/Logo";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
  LogoutIcon,
  BoxIcon,
  TagIcon,
  GridIcon,
  UsersIcon,
  CloseIcon,
  CheckIcon,
} from "@/components/Icons";

const inputCls =
  "w-full rounded border border-outline-variant bg-clinical-white px-3 py-2 text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

type Tab = "overview" | "products" | "categories" | "types" | "brands" | "leads";

const tabs: { id: Tab; label: string; icon: (p: { className?: string }) => JSX.Element }[] = [
  { id: "overview", label: "Vue d'ensemble", icon: GridIcon },
  { id: "products", label: "Produits", icon: BoxIcon },
  { id: "categories", label: "Catégories", icon: GridIcon },
  { id: "types", label: "Types", icon: TagIcon },
  { id: "brands", label: "Marques", icon: TagIcon },
  { id: "leads", label: "Leads", icon: UsersIcon },
];

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}

export function AdminDashboard() {
  const router = useRouter();
  const { authed, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (mounted && !authed) router.replace("/admin/login");
  }, [mounted, authed, router]);

  if (!mounted || !authed) {
    return <div className="container-max py-24 text-center text-on-surface-variant">Chargement…</div>;
  }

  return (
    <div className="container-max grid grid-cols-1 gap-8 py-10 lg:grid-cols-[240px_1fr]">
      {/* Sidebar */}
      <aside className="h-fit rounded-lg border border-outline-variant bg-surface-gray p-4 lg:sticky lg:top-24">
        <div className="mb-4 flex items-center gap-2 px-2">
          <Logo showText={false} />
          <span className="font-display font-semibold text-primary-container">Admin</span>
        </div>
        <nav className="flex flex-col gap-1">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-3 rounded px-3 py-2.5 text-left transition-colors ${
                  tab === t.id
                    ? "bg-primary-container text-clinical-white"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t.label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={() => {
            logout();
            router.replace("/admin/login");
          }}
          className="mt-4 flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-error transition-colors hover:bg-error/10"
        >
          <LogoutIcon className="h-5 w-5" />
          Déconnexion
        </button>
      </aside>

      {/* Content */}
      <section>
        {tab === "overview" && <Overview onNav={setTab} />}
        {tab === "products" && <ProductsPanel />}
        {tab === "categories" && <CategoriesPanel />}
        {tab === "types" && <TypesPanel />}
        {tab === "brands" && <BrandsPanel />}
        {tab === "leads" && <LeadsPanel />}
      </section>
    </div>
  );
}

/* ───────────────── Overview ───────────────── */
function Overview({ onNav }: { onNav: (t: Tab) => void }) {
  const data = useAdminData();
  const inStock = data.products.filter((p) => p.inStock).length;
  const cards = [
    { label: "Produits", value: data.products.length, tab: "products" as Tab, icon: BoxIcon },
    { label: "Catégories", value: data.sections.length, tab: "categories" as Tab, icon: GridIcon },
    { label: "Marques", value: data.brands.length, tab: "brands" as Tab, icon: TagIcon },
    { label: "Leads", value: data.leads.length, tab: "leads" as Tab, icon: UsersIcon },
  ];
  return (
    <div>
      <PanelHeader title="Vue d'ensemble" />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.label}
              onClick={() => onNav(c.tab)}
              className="flex flex-col items-start gap-2 rounded-lg border border-outline-variant bg-clinical-white p-5 text-left transition-shadow hover:shadow-md"
            >
              <Icon className="h-6 w-6 text-primary-container" />
              <span className="font-display text-display-md font-bold text-primary-container">{c.value}</span>
              <span className="text-sm text-on-surface-variant">{c.label}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-6 rounded-lg border border-outline-variant bg-surface-gray p-5 text-sm text-on-surface-variant">
        <strong className="text-on-surface">{inStock}</strong> produits en stock sur{" "}
        <strong className="text-on-surface">{data.products.length}</strong>. Les modifications sont
        enregistrées localement (phase front-end) — la synchronisation avec la base de données sera
        ajoutée lors de la phase back-end.
      </div>
    </div>
  );
}

/* ───────────────── Products ───────────────── */
function ProductsPanel() {
  const data = useAdminData();
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <PanelHeader
        title="Produits"
        action={
          <button onClick={() => setCreating(true)} className="btn-solid">
            <PlusIcon className="h-5 w-5" /> Ajouter un produit
          </button>
        }
      />
      <div className="overflow-x-auto rounded-lg border border-outline-variant">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-surface-gray font-mono text-label-caps uppercase text-on-surface-variant">
            <tr>
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Marque</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {data.products.map((p) => {
              const brand = data.brands.find((b) => b.slug === p.brand);
              return (
                <tr key={p.slug} className="bg-clinical-white">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-surface-container-low">
                        <Image src={p.image} alt={p.name} fill className="object-contain p-1" />
                      </div>
                      <span className="font-medium text-on-surface">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{brand?.name ?? p.brand}</td>
                  <td className="px-4 py-3 text-on-surface-variant capitalize">{p.section}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStock(p.slug)}
                      title="Basculer la disponibilité"
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-label-caps uppercase ${
                        p.inStock ? "bg-status-success/10 text-status-success" : "bg-error/10 text-error"
                      }`}
                    >
                      {p.inStock ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
                      {p.inStock ? "En stock" : "Hors stock"}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <IconBtn label="Modifier" onClick={() => setEditing(p)}>
                        <PencilIcon className="h-4 w-4" />
                      </IconBtn>
                      <IconBtn
                        label="Supprimer"
                        danger
                        onClick={() => {
                          if (confirm(`Supprimer "${p.name}" ?`)) deleteProduct(p.slug);
                        }}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconBtn>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {(creating || editing) && (
        <ProductForm
          product={editing}
          onClose={() => {
            setCreating(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function ProductForm({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const data = useAdminData();
  const isEdit = !!product;
  const [form, setForm] = useState<Product>(
    product ?? {
      slug: "",
      name: "",
      brand: data.brands[0]?.slug ?? "",
      section: data.sections[0]?.slug ?? "consultation",
      subcategory: data.sections[0]?.subcategories[0]?.slug ?? "",
      image: "",
      inStock: true,
      featured: false,
      taglineFr: "",
      taglineEn: "",
      descriptionFr: "",
      descriptionEn: "",
      specs: [{ label: "", value: "" }],
    }
  );

  const section = data.sections.find((s) => s.slug === form.section);

  const set = <K extends keyof Product>(k: K, v: Product[K]) => setForm((f) => ({ ...f, [k]: v }));

  const handleImage = async (file?: File) => {
    if (file) set("image", await readFileAsDataURL(file));
  };
  const handleBrochure = async (file?: File) => {
    if (file) set("brochure", await readFileAsDataURL(file));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = isEdit ? form.slug : slugify(form.name);
    const cleanSpecs = form.specs.filter((s) => s.label.trim() || s.value.trim());
    saveProduct({ ...form, slug, specs: cleanSpecs.length ? cleanSpecs : [{ label: "—", value: "—" }] }, product?.slug);
    onClose();
  };

  return (
    <Modal title={isEdit ? `Modifier ${product?.name}` : "Nouveau produit"} onClose={onClose} wide>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nom du produit">
            <input className={inputCls} required value={form.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <Field label="Marque">
            <select className={inputCls} value={form.brand} onChange={(e) => set("brand", e.target.value)}>
              {data.brands.map((b) => (
                <option key={b.slug} value={b.slug}>{b.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Section">
            <select
              className={inputCls}
              value={form.section}
              onChange={(e) => {
                const sec = data.sections.find((s) => s.slug === e.target.value);
                setForm((f) => ({
                  ...f,
                  section: e.target.value as Product["section"],
                  subcategory: sec?.subcategories[0]?.slug ?? "",
                }));
              }}
            >
              {data.sections.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Type (catégorie)">
            <select className={inputCls} value={form.subcategory} onChange={(e) => set("subcategory", e.target.value)}>
              {section?.subcategories.map((sc) => (
                <option key={sc.slug} value={sc.slug}>{sc.name}</option>
              ))}
            </select>
          </Field>
        </div>

        {/* Image */}
        <Field label="Image du produit">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded border border-outline-variant bg-surface-container-low">
              {form.image && <Image src={form.image} alt="" fill className="object-contain p-1" />}
            </div>
            <div className="flex flex-col gap-2">
              <input type="file" accept="image/*" onChange={(e) => handleImage(e.target.files?.[0])} className="text-sm" />
              <input
                className={inputCls}
                placeholder="/catalog/exemple.jpeg"
                list="catalog-images"
                value={form.image.startsWith("data:") ? "" : form.image}
                onChange={(e) => set("image", e.target.value)}
              />
              <datalist id="catalog-images">
                {Array.from(new Set(data.products.map((p) => p.image)))
                  .filter((i) => !i.startsWith("data:"))
                  .map((i) => (
                    <option key={i} value={i} />
                  ))}
              </datalist>
            </div>
          </div>
        </Field>

        {/* Brochure */}
        <Field label="Brochure (PDF)">
          <div className="flex flex-wrap items-center gap-3">
            <input type="file" accept="application/pdf" onChange={(e) => handleBrochure(e.target.files?.[0])} className="text-sm" />
            {form.brochure ? (
              <span className="inline-flex items-center gap-1 text-sm text-status-success">
                <CheckIcon className="h-4 w-4" /> Brochure attachée
              </span>
            ) : (
              <span className="text-sm text-on-surface-variant">Aucune brochure (la brochure par défaut sera utilisée)</span>
            )}
          </div>
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Accroche (FR)">
            <input className={inputCls} value={form.taglineFr} onChange={(e) => set("taglineFr", e.target.value)} />
          </Field>
          <Field label="Tagline (EN)">
            <input className={inputCls} value={form.taglineEn} onChange={(e) => set("taglineEn", e.target.value)} />
          </Field>
        </div>
        <Field label="Description (FR)">
          <textarea className={inputCls} rows={3} value={form.descriptionFr} onChange={(e) => set("descriptionFr", e.target.value)} />
        </Field>
        <Field label="Description (EN)">
          <textarea className={inputCls} rows={3} value={form.descriptionEn} onChange={(e) => set("descriptionEn", e.target.value)} />
        </Field>

        {/* Specs */}
        <Field label="Spécifications">
          <div className="flex flex-col gap-2">
            {form.specs.map((spec, i) => (
              <div key={i} className="flex gap-2">
                <input
                  className={inputCls}
                  placeholder="Libellé"
                  value={spec.label}
                  onChange={(e) => {
                    const specs = [...form.specs];
                    specs[i] = { ...specs[i], label: e.target.value };
                    set("specs", specs);
                  }}
                />
                <input
                  className={inputCls}
                  placeholder="Valeur"
                  value={spec.value}
                  onChange={(e) => {
                    const specs = [...form.specs];
                    specs[i] = { ...specs[i], value: e.target.value };
                    set("specs", specs);
                  }}
                />
                <IconBtn label="Retirer" danger onClick={() => set("specs", form.specs.filter((_, j) => j !== i))}>
                  <CloseIcon className="h-4 w-4" />
                </IconBtn>
              </div>
            ))}
            <button
              type="button"
              onClick={() => set("specs", [...form.specs, { label: "", value: "" }])}
              className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary-container hover:text-primary"
            >
              <PlusIcon className="h-4 w-4" /> Ajouter une spécification
            </button>
          </div>
        </Field>

        <div className="flex flex-wrap gap-6">
          <Toggle label="En stock" checked={form.inStock} onChange={(v) => set("inStock", v)} />
          <Toggle label="Produit en vedette (accueil)" checked={!!form.featured} onChange={(v) => set("featured", v)} />
        </div>

        <div className="mt-2 flex justify-end gap-3 border-t border-outline-variant pt-4">
          <button type="button" onClick={onClose} className="btn-outline">Annuler</button>
          <button type="submit" className="btn-solid">{isEdit ? "Enregistrer" : "Créer le produit"}</button>
        </div>
      </form>
    </Modal>
  );
}

/* ───────────────── Categories ───────────────── */
function CategoriesPanel() {
  const data = useAdminData();
  const [editing, setEditing] = useState<Section | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <PanelHeader
        title="Catégories (sections)"
        action={
          <button onClick={() => setCreating(true)} className="btn-solid">
            <PlusIcon className="h-5 w-5" /> Ajouter une catégorie
          </button>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.sections.map((s) => (
          <div key={s.slug} className="rounded-lg border border-outline-variant bg-clinical-white p-5">
            <p className="font-mono text-label-caps uppercase text-on-surface-variant">{s.label}</p>
            <h3 className="mb-1 font-display text-lg font-semibold text-on-surface">{s.name}</h3>
            <p className="mb-3 text-sm text-on-surface-variant">{s.subcategories.length} types · {data.products.filter((p) => p.section === s.slug).length} produits</p>
            <div className="flex gap-2">
              <IconBtn label="Modifier" onClick={() => setEditing(s)}><PencilIcon className="h-4 w-4" /></IconBtn>
              <IconBtn label="Supprimer" danger onClick={() => { if (confirm(`Supprimer la catégorie "${s.name}" ?`)) deleteCategory(s.slug); }}>
                <TrashIcon className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>
        ))}
      </div>

      {(creating || editing) && (
        <CategoryForm section={editing} onClose={() => { setCreating(false); setEditing(null); }} />
      )}
    </div>
  );
}

function CategoryForm({ section, onClose }: { section: Section | null; onClose: () => void }) {
  const isEdit = !!section;
  const [form, setForm] = useState<Section>(
    section ?? {
      slug: "" as Section["slug"],
      label: "",
      name: "",
      description: "",
      cover: "/brand/consultation.png",
      subcategories: [] as Section["subcategories"],
    }
  );
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = isEdit ? form.slug : (slugify(form.name) as Section["slug"]);
    saveCategory({ ...form, slug }, section?.slug);
    onClose();
  };
  return (
    <Modal title={isEdit ? `Modifier ${section?.name}` : "Nouvelle catégorie"} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Nom"><input className={inputCls} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Libellé (ex: Section A)"><input className={inputCls} value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} /></Field>
        <Field label="Description"><textarea className={inputCls} rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></Field>
        <Field label="Image de couverture (chemin)"><input className={inputCls} value={form.cover} onChange={(e) => setForm({ ...form, cover: e.target.value })} /></Field>
        <div className="flex justify-end gap-3 border-t border-outline-variant pt-4">
          <button type="button" onClick={onClose} className="btn-outline">Annuler</button>
          <button type="submit" className="btn-solid">{isEdit ? "Enregistrer" : "Créer"}</button>
        </div>
      </form>
    </Modal>
  );
}

/* ───────────────── Types (subcategories) ───────────────── */
function TypesPanel() {
  const data = useAdminData();
  const [sectionSlug, setSectionSlug] = useState<string>(data.sections[0]?.slug ?? "");
  const [name, setName] = useState("");
  const section = data.sections.find((s) => s.slug === sectionSlug);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !section) return;
    addType(section.slug, { slug: slugify(name), name: name.trim() });
    setName("");
  };

  return (
    <div>
      <PanelHeader title="Types (sous-catégories)" />
      <div className="mb-5 max-w-sm">
        <Field label="Catégorie">
          <select className={inputCls} value={sectionSlug} onChange={(e) => setSectionSlug(e.target.value)}>
            {data.sections.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </Field>
      </div>

      <form onSubmit={add} className="mb-6 flex gap-2">
        <input className={inputCls} placeholder="Nom du nouveau type" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit" className="btn-solid shrink-0"><PlusIcon className="h-5 w-5" /> Ajouter</button>
      </form>

      <div className="overflow-hidden rounded-lg border border-outline-variant">
        <ul className="divide-y divide-outline-variant">
          {section?.subcategories.map((sc) => (
            <li key={sc.slug} className="flex items-center justify-between bg-clinical-white px-4 py-3">
              <div>
                <span className="text-on-surface">{sc.name}</span>
                <span className="ml-2 text-xs text-on-surface-variant">
                  {data.products.filter((p) => p.subcategory === sc.slug).length} produit(s)
                </span>
              </div>
              <IconBtn label="Supprimer" danger onClick={() => deleteType(section.slug, sc.slug)}>
                <TrashIcon className="h-4 w-4" />
              </IconBtn>
            </li>
          ))}
          {section && section.subcategories.length === 0 && (
            <li className="bg-clinical-white px-4 py-6 text-center text-sm text-on-surface-variant">Aucun type.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

/* ───────────────── Brands ───────────────── */
function BrandsPanel() {
  const data = useAdminData();
  const [editing, setEditing] = useState<Brand | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div>
      <PanelHeader
        title="Marques"
        action={
          <button onClick={() => setCreating(true)} className="btn-solid">
            <PlusIcon className="h-5 w-5" /> Ajouter une marque
          </button>
        }
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.brands.map((b) => (
          <div key={b.slug} className="flex flex-col items-center gap-3 rounded-lg border border-outline-variant bg-clinical-white p-4 text-center">
            <div className="flex h-16 items-center justify-center">
              {b.logo ? (
                <Image src={b.logo} alt={b.name} width={120} height={56} className="max-h-14 w-auto object-contain" />
              ) : (
                <span className="font-mono text-label-caps uppercase text-primary-container">{b.name}</span>
              )}
            </div>
            <span className="text-sm font-medium text-on-surface">{b.name}</span>
            <div className="flex gap-2">
              <IconBtn label="Modifier" onClick={() => setEditing(b)}><PencilIcon className="h-4 w-4" /></IconBtn>
              <IconBtn label="Supprimer" danger onClick={() => { if (confirm(`Supprimer "${b.name}" ?`)) deleteBrand(b.slug); }}>
                <TrashIcon className="h-4 w-4" />
              </IconBtn>
            </div>
          </div>
        ))}
      </div>

      {(creating || editing) && <BrandForm brand={editing} onClose={() => { setCreating(false); setEditing(null); }} />}
    </div>
  );
}

function BrandForm({ brand, onClose }: { brand: Brand | null; onClose: () => void }) {
  const isEdit = !!brand;
  const [form, setForm] = useState<Brand>(brand ?? { slug: "", name: "", logo: "" });

  const handleLogo = async (file?: File) => {
    if (!file) return;
    const dataUrl = await readFileAsDataURL(file);
    setForm((f) => ({ ...f, logo: dataUrl }));
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = isEdit ? form.slug : slugify(form.name);
    saveBrand({ ...form, slug }, brand?.slug);
    onClose();
  };
  return (
    <Modal title={isEdit ? `Modifier ${brand?.name}` : "Nouvelle marque"} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Nom"><input className={inputCls} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
        <Field label="Logo">
          <div className="flex items-center gap-4">
            <div className="relative flex h-16 w-24 items-center justify-center overflow-hidden rounded border border-outline-variant bg-white">
              {form.logo && <Image src={form.logo} alt="" fill className="object-contain p-1" />}
            </div>
            <div className="flex flex-col gap-2">
              <input type="file" accept="image/*" onChange={(e) => handleLogo(e.target.files?.[0])} className="text-sm" />
              <input className={inputCls} placeholder="/sponsors/exemple.png" value={form.logo?.startsWith("data:") ? "" : form.logo ?? ""} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
            </div>
          </div>
        </Field>
        <div className="flex justify-end gap-3 border-t border-outline-variant pt-4">
          <button type="button" onClick={onClose} className="btn-outline">Annuler</button>
          <button type="submit" className="btn-solid">{isEdit ? "Enregistrer" : "Créer"}</button>
        </div>
      </form>
    </Modal>
  );
}

/* ───────────────── Leads ───────────────── */
function LeadsPanel() {
  const data = useAdminData();
  const fmt = (iso: string) => new Date(iso).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" });

  const exportCsv = () => {
    const head = ["Nom", "Email", "Téléphone", "Établissement", "Produit", "Date"];
    const rows = data.leads.map((l) => [l.name, l.email, l.phone, l.organization, l.productName, l.date]);
    const csv = [head, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-ophtahealth.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PanelHeader
        title="Leads — téléchargements de brochures"
        action={
          data.leads.length > 0 ? (
            <button onClick={exportCsv} className="btn-outline">Exporter CSV</button>
          ) : undefined
        }
      />
      {data.leads.length === 0 ? (
        <div className="rounded-lg border border-dashed border-outline-variant bg-surface-gray p-12 text-center text-on-surface-variant">
          Aucun lead pour le moment. Les contacts ayant téléchargé une brochure apparaîtront ici.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-outline-variant">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-surface-gray font-mono text-label-caps uppercase text-on-surface-variant">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Établissement</th>
                <th className="px-4 py-3">Produit</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {data.leads.map((l) => (
                <tr key={l.id} className="bg-clinical-white">
                  <td className="px-4 py-3 font-medium text-on-surface">{l.name}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{l.email}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{l.phone}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{l.organization}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{l.productName}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{fmt(l.date)}</td>
                  <td className="px-4 py-3 text-right">
                    <IconBtn label="Supprimer" danger onClick={() => deleteLead(l.id)}>
                      <TrashIcon className="h-4 w-4" />
                    </IconBtn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ───────────────── Shared UI ───────────────── */
function PanelHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="font-display text-headline-lg text-primary-container">{title}</h1>
      {action}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-label-caps uppercase text-on-surface-variant">{label}</label>
      {children}
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded border transition-colors ${
        danger
          ? "border-error/30 text-error hover:bg-error/10"
          : "border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="flex items-center gap-2">
      <span
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-status-success" : "bg-outline-variant"}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${checked ? "left-[22px]" : "left-0.5"}`}
        />
      </span>
      <span className="text-sm text-on-surface">{label}</span>
    </button>
  );
}

function Modal({ title, children, onClose, wide }: { title: string; children: React.ReactNode; onClose: () => void; wide?: boolean }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-on-surface/50 p-4" onClick={onClose}>
      <div
        className={`my-8 w-full animate-fadeIn rounded-lg border border-outline-variant bg-clinical-white p-6 shadow-xl ${wide ? "max-w-2xl" : "max-w-md"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-headline-md text-primary-container">{title}</h2>
          <button onClick={onClose} aria-label="Fermer" className="text-on-surface-variant hover:text-primary">
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
