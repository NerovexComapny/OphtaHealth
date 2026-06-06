"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Logo } from "@/components/Logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const { authed, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (authed) router.replace("/admin");
  }, [authed, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      router.replace("/admin");
    } else {
      setError(true);
    }
  };

  return (
    <div className="container-max flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-md rounded-lg border border-outline-variant bg-clinical-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-4 text-center">
          <Logo showText={false} />
          <div>
            <h1 className="font-display text-headline-md text-primary-container">Espace administrateur</h1>
            <p className="mt-1 text-sm text-on-surface-variant">Connectez-vous pour gérer le catalogue.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="mb-1 block font-mono text-label-caps uppercase text-on-surface-variant">
              Identifiant
            </label>
            <input
              id="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
              }}
              className="w-full rounded border border-outline-variant bg-clinical-white px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block font-mono text-label-caps uppercase text-on-surface-variant">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className="w-full rounded border border-outline-variant bg-clinical-white px-3 py-2.5 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {error && (
            <p className="rounded bg-error/10 px-3 py-2 text-sm text-error">
              Identifiant ou mot de passe incorrect.
            </p>
          )}

          <button type="submit" className="btn-solid mt-2 w-full">
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-on-surface-variant">
          Démo : <span className="font-mono">admin</span> / <span className="font-mono">ophtahealth2024</span>
        </p>
      </div>
    </div>
  );
}
