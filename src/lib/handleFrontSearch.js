"use client";

import { useRouter, usePathname } from 'next/navigation';

export function useSearch() {
  const router = useRouter();
  const pathname = usePathname();

  const search = (text) => {
    if (!text?.trim()) return;

    const url = `/search?q=${encodeURIComponent(text.trim())}`;

    if (pathname === '/search') {
      router.replace(url, { scroll: false });
    } else {
      router.push(url);
    }
  };

  return search;
}