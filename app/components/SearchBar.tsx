"use client";

import { useState, useEffect, useRef, FC } from "react";

interface SearchBarProps {
  data?: string[];
  onSelect?: (item: string) => void;
  delay?: number;
}

const SearchBar: FC<SearchBarProps> = ({ data = [], onSelect, delay = 300 }) => {
  const [query, setQuery] = useState<string>("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!query.trim()) {
        setFiltered([]);
        setShowDropdown(false);
        return;
      }
      const matches = data.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(matches);
      setShowDropdown(matches.length > 0);
    }, delay);

    return () => clearTimeout(handler);
  }, [query, data, delay]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item: string) => {
    setQuery(item);
    setShowDropdown(false);
    onSelect?.(item);
  };

  const highlightMatch = (item: string) => {
    const index = item.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return item;
    const start = item.slice(0, index);
    const match = item.slice(index, index + query.length);
    const end = item.slice(index + query.length);
    return (
      <>
        {start}
        <span className="font-bold bg-yellow-100">{match}</span>
        {end}
      </>
    );
  };

  return (
    <div className="border-t bg-gray-50 py-4 relative" ref={dropdownRef}>
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