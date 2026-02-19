import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getSearchInitialData } from "@/app/actions";

export const useDataStore = create(
  persist(
    (set, get) => ({
      trending: [],
      topRated: [],
      lastFetched: null,

      fetchInitialData: async () => {
        const now = Date.now();
        const sixHours = 6 * 60 * 60 * 1000;

        // Only fetch if empty OR if 6 hours have passed
        if (get().trending.length > 0 && now - get().lastFetched < sixHours) {
          return;
        }

        try {
          const data = await getSearchInitialData();
          set({
            trending: data.trending,
            topRated: data.topRated,
            lastFetched: now,
          });
        } catch (error) {
          console.error("Store fetch failed", error);
        }
      },
    }),
    {
      name: "movie-storage", // Key for LocalStorage
    },
  ),
);
