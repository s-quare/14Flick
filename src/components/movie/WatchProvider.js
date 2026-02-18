"use client";
import { useState, useMemo } from "react";
import { Listbox, Transition } from "@headlessui/react";
import SmartImage from "@/components/SmartImage";

export default function WatchProviders({ data }) {
  const countries = useMemo(
    () =>
      data
        ? Object.keys(data)
            .filter((k) => k !== "link")
            .sort()
        : [],
    [data],
  );

  const [selectedCountry, setSelectedCountry] = useState(() => {
    if (countries.includes("US")) return "US";
    return countries.length > 0 ? countries[0] : "";
  });

  const providers = data?.[selectedCountry];

  const allProviders = useMemo(() => {
    if (!providers) return [];
    const list = [
      ...(providers.flatrate || []),
      ...(providers.ads || []),
      ...(providers.rent || []),
      ...(providers.buy || []),
    ];
    return Array.from(new Map(list.map((p) => [p.provider_id, p])).values());
  }, [providers]);

  // 2. Conditional render happens AFTER hooks
  if (!data || countries.length === 0) return null;

  return (
    <div className="px-2 py-3 w-fit max-w-full">
      <div className="flex items-center gap-4 mb-5">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">
          Where to Watch
        </h3>

        {/* CUSTOM SELECT */}
        <div className="relative w-24">
          <Listbox value={selectedCountry} onChange={setSelectedCountry}>
            <Listbox.Button className="relative w-full bg-black border border-white/10 rounded-lg py-1.5 pl-3 pr-8 text-left text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-yellow-400">
              <span className="block truncate">{selectedCountry}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-yellow-400">
                ▼
              </span>
            </Listbox.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 max-h-40 w-full overflow-auto rounded-lg bg-neutral-800 py-1 text-[10px] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none scrollbar-hide">
                {countries.map((code) => (
                  <Listbox.Option
                    key={code}
                    value={code}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-4 ${
                        active ? "bg-yellow-400 text-black" : "text-white"
                      }`
                    }
                  >
                    {code}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </div>
      </div>

      {/* HORIZONTAL PROVIDERS */}
      {allProviders.length > 0 ? (
        <div className="flex gap-4 py-3 overflow-x-auto scrollbar-hide">
          {allProviders.map((provider) => (
            <div
              key={provider.provider_id}
              className="shrink-0 w-22.5 flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-gray-500 hover:scale-105 transition-transform cursor-pointer">
                <SmartImage
                  path={provider.logo_path}
                  type="poster"
                  alt={provider.provider_name}
                  overlay={"bg-transparent"}
                />
              </div>
              <p className="text-[10px] font-bold text-neutral-500 mt-3 text-center">
                {provider.provider_name}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[10px] italic uppercase">
          Unavailable in this region
        </p>
      )}

      {providers?.link && (
        <a
          href={providers.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit block text-[10px] font-bold text-yellow-400 uppercase tracking-widest transition-colors"
        >
          View on JustWatch →
        </a>
      )}
    </div>
  );
}
