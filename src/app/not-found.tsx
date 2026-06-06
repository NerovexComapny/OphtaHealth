import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-max flex flex-col items-center justify-center py-32 text-center">
      <p className="font-mono text-label-caps uppercase tracking-widest text-primary-container/70">
        Erreur 404
      </p>
      <h1 className="mt-3 font-display text-display-md font-bold text-primary-container">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-on-surface-variant">
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link href="/" className="btn-solid mt-8">
        Retour à l'accueil
      </Link>
    </div>
  );
}
