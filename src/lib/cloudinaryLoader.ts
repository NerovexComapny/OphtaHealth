/**
 * Custom next/image loader → Cloudinary.
 *
 * Maps local asset paths (e.g. "/catalog/os1000.jpeg") to their Cloudinary URL and
 * injects on-the-fly optimization: f_auto (AVIF/WebP), q_auto (smart quality),
 * c_limit + responsive width. Admin dataURL uploads and unknown paths pass through
 * unchanged (served locally as a fallback).
 *
 * Keyed by the asset's base filename (without extension).
 */
const CLOUD = "https://res.cloudinary.com/dbto7bnpg/image/upload";

const MAP: Record<string, string> = {
  // ── Products ──
  "acp-800": `${CLOUD}/acp-800_nyajkf.jpg`,
  "acp-1000": `${CLOUD}/v1780745101/acp-1000_dui1j8.jpg`,
  activa: `${CLOUD}/v1780745089/activa_cjs6yr.jpg`,
  "al-6600": `${CLOUD}/v1780745104/al-6600_cg42kn.jpg`,
  alino: `${CLOUD}/v1780745115/alino_c3cz6e.jpg`,
  "cfc-x": `${CLOUD}/v1780745132/cfc-x_dmt6jz.jpg`,
  "colombo-iol-ii": `${CLOUD}/v1780745114/colombo-iol-ii_cx3d5p.jpg`,
  "cv-600": `${CLOUD}/v1780745136/cv-600_ilwrgg.jpg`,
  deltaqp: `${CLOUD}/v1780745125/deltaqp_ons5to.jpg`,
  drone4: `${CLOUD}/v1780745122/drone4_qukxhd.jpg`,
  dslc200: `${CLOUD}/v1780745137/dslc200_ag9dbv.jpg`,
  "easyref-pro": `${CLOUD}/v1780745147/easyref-pro_qsqh4w.jpg`,
  elite: `${CLOUD}/v1780745162/elite_qifwr3.jpg`,
  fundusscope: `${CLOUD}/v1780745183/fundusscope_htmj1m.jpg`,
  idra: `${CLOUD}/v1780745155/idra_hpl4go.jpg`,
  "mocean-4000": `${CLOUD}/v1780745161/mocean-4000_fg9y30.jpg`,
  "nt-700": `${CLOUD}/v1780745172/nt-700_cmaaax.jpg`,
  os1000: `${CLOUD}/v1780745160/os1000_tsti3f.jpg`,
  "peristat-2": `${CLOUD}/v1780745192/peristat-2_y5r4r1.jpg`,
  "phoromat-200": `${CLOUD}/v1780745179/phoromat-200_kar9a3.jpg`,
  "pi-mabel": `${CLOUD}/v1780745184/pi-mabel_rqfael.jpg`,
  pro500: `${CLOUD}/v1780745194/pro500_ceehqk.jpg`,
  "rb-800": `${CLOUD}/v1780745211/rb-800_maxmc9.jpg`,
  "rem-4000": `${CLOUD}/v1780745233/rem-4000_t0nf2z.jpg`,
  "reticam-3100": `${CLOUD}/v1780745212/reticam-3100_rlc8kh.jpg`,
  "retiwave-1000": `${CLOUD}/v1780745216/retiwave-1000_vytvtp.jpg`,
  "rmk-700": `${CLOUD}/v1780745231/rmk-700_hqlzzg.jpg`,
  "rodachart-422": `${CLOUD}/v1780745227/rodachart-422_emcoxo.jpg`,
  rsl2600: `${CLOUD}/v1780745224/rsl2600_mw9yfs.jpg`,
  "rsl-4500-digital": `${CLOUD}/v1780745239/rsl-4500-digital_fmhlne.jpg`,
  "sl-1s": `${CLOUD}/v1780745239/sl-1s_ssifhc.jpg`,
  "svf-7000": `${CLOUD}/v1780745259/svf-7000_wdifg1.jpg`,
  "sw-21-delta": `${CLOUD}/v1780745245/sw-21-delta_jpozi3.jpg`,
  "sw-800": `${CLOUD}/v1780745282/sw-800_ukonya.jpg`,
  topascope: `${CLOUD}/v1780745272/topascope_qvaqgq.jpg`,
  "vt-700a": `${CLOUD}/v1780745291/vt-700a_qnc7bv.jpg`,
  "vt-800": `${CLOUD}/v1780745277/vt-800_e5asy8.jpg`,
  zulu3: `${CLOUD}/v1780745279/zulu3_g7lsa2.jpg`,
  // ── Brand / logo / category covers ──
  "ophtahealth-logo": `${CLOUD}/v1780745474/ophtahealth-logo_oqeowj.webp`,
  consultation: `${CLOUD}/v1780745543/consultation_k04mnp.png`,
  exploration: `${CLOUD}/v1780745576/exploration_jswuzs.png`,
  "sante-oculaire": `${CLOUD}/v1780745565/sante-oculaire_jru2ki.png`,
  // ── Sponsors ──
  mabel: `${CLOUD}/v1780745579/mabel_gbyf8w.png`,
  "main-meditech": `${CLOUD}/v1780745579/main-meditech_j47yaq.png`,
  medinstrus: `${CLOUD}/v1780745579/medinstrus_gqta5e.png`,
  "mocular-medical": `${CLOUD}/v1780745580/mocular-medical_lrpwrg.jpg`,
  moptim: `${CLOUD}/v1780745581/moptim_fnzxoa.png`,
  rodenstock: `${CLOUD}/v1780745581/rodenstock_zzxrhb.png`,
  "sbm-sistemi": `${CLOUD}/v1780745582/sbm-sistemi_vnnka8.png`,
  suoer: `${CLOUD}/v1780745581/suoer_gkzisg.png`,
  supore: `${CLOUD}/v1780745582/supore_gczlmn.jpg`,
  syseye: `${CLOUD}/v1780745583/syseye_wj5ydq.png`,
  visionstar: `${CLOUD}/v1780745583/visionstar_xc6fzu.png`,
};

interface LoaderArgs {
  src: string;
  width: number;
  quality?: number;
}

/** Insert Cloudinary transformations right after "/image/upload/". */
function withTransforms(url: string, width: number): string {
  const tx = `f_auto,q_auto,c_limit,w_${width}`;
  return url.replace("/image/upload/", `/image/upload/${tx}/`);
}

export default function cloudinaryLoader({ src, width }: LoaderArgs): string {
  // Admin uploads (base64) — serve as-is.
  if (src.startsWith("data:")) return src;

  // Already a Cloudinary URL — just add transformations.
  if (src.includes("res.cloudinary.com")) return withTransforms(src, width);

  // Local path → resolve via base filename.
  const base = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "";
  const target = MAP[base];
  if (target) return withTransforms(target, width);

  // Unknown asset — fall back to the local/public file.
  return src;
}
