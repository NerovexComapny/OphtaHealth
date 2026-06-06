"use client";

import { useSyncExternalStore } from "react";

/**
 * Front-end-only admin auth (demo). Replace with real backend auth (e.g. Supabase) later.
 * Credentials are intentionally simple for the prototype phase.
 */
const SESSION_KEY = "oh-admin-session";

// Demo credentials — change before any real deployment, and move to the backend.
const ADMIN_USER = "admin";
const ADMIN_PASS = "ophtahealth2024";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "1";
}

export function login(username: string, password: string): boolean {
  if (username.trim() === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem(SESSION_KEY, "1");
    emit();
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  emit();
}

/** Reactive auth state. */
export function useAuth() {
  const authed = useSyncExternalStore(subscribe, getSnapshot, () => false);
  return { authed, login, logout };
}
