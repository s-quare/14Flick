"use client";
import { useEffect } from "react";
import { useDataStore } from "@/store/useDataStore";

export default function DataInitializer() {
  const fetchInitialData = useDataStore((state) => state.fetchInitialData);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return null;
}