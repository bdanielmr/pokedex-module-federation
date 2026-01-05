import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      user: null,
      login: (name) => set({ user: { name } }),
      logout: () => set({ user: null }),
      theme: "light",
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
      history: [],
      lastVisited: null,
      toastDismissedFor: null,
      trackVisit: ({ name, image }) => {
        const curr = get().history;
        const idx = curr.findIndex((p) => p.name === name);

        let next;
        if (idx >= 0) {
          next = curr.map((p, i) =>
            i === idx ? { ...p, visits: p.visits + 1 } : p
          );
        } else {
          next = [{ name, image, visits: 1 }, ...curr];
        }

        set({
          history: next,
          lastVisited: { name, image },
          toastDismissedFor: null,
        });
      },
      dismissToast: () => {
        const last = get().lastVisited;
        set({ toastDismissedFor: last?.name ?? "__none__" });
      },

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "pokedex_store_v1",
      partialize: (s) => ({
        user: s.user,
        theme: s.theme,
        history: s.history,
        lastVisited: s.lastVisited,
        toastDismissedFor: s.toastDismissedFor,
      }),
    }
  )
);
