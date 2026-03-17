"use client";

import { useState, useEffect, useRef, FC } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  query: string;
  setQuery: (value: string) => void;
  data?: string[];
  onSelect?: (item: string) => void;
  delay?: number;
  navigateToServices?: boolean;
}

const SearchBar: FC<SearchBarProps> = ({
  query,
  setQuery,
  data = [],
  onSelect,
  delay = 300,
  navigateToServices = false,
}) => {
  const router = useRouter();
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Remove duplicates before filtering
  const uniqueData = Array.from(new Set(data));

  useEffect(() => {
    const handler = setTimeout(() => {
      const safeQuery = query ?? "";
      if (!safeQuery.trim()) {
        setFiltered([]);
        setShowDropdown(false);
        return;
      }

      const matches = uniqueData.filter((item) =>
        item.toLowerCase().includes(safeQuery.toLowerCase())
      );
      setFiltered(matches);
      setShowDropdown(matches.length > 0);
    }, delay);

    return () => clearTimeout(handler);
  }, [query, uniqueData, delay]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    if (navigateToServices) {
      router.push(`/services?query=${encodeURIComponent(item)}`);
    } else {
      setQuery(item);
      onSelect?.(item);
    }
    setShowDropdown(false);
  };

  const highlightMatch = (item: string) => {
    const safeQuery = query ?? "";
    if (!safeQuery) return item;

    const index = item.toLowerCase().indexOf(safeQuery.toLowerCase());
    if (index === -1) return item;

    const start = item.slice(0, index);
    const match = item.slice(index, index + safeQuery.length);
    const end = item.slice(index + safeQuery.length);

    return (
      <>
        {start}
        <span className="font-bold bg-yellow-100">{match}</span>
        {end}
      </>
    );
  };

  return (
    <div className="py-4 relative" ref={dropdownRef}>
      <div className="mx-auto max-w-7xl px-4">
        <input
          type="text"
          placeholder="What services are you looking for?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(filtered.length > 0)}
          className="w-full rounded-lg border px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        {showDropdown && (
          <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filtered.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(item)}
                className="cursor-pointer px-4 py-2 hover:bg-blue-100"
              >
                {highlightMatch(item)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;