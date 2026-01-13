import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const mockSuggestions = {
  recent: ["Vintage Pokemon Cards", "Rare Holographic", "First Edition"],
  popular: ["Charizard", "Pikachu", "Mewtwo", "Blastoise"],
  categories: ["Trading Cards", "Collectibles", "Sealed Products", "Accessories"],
};

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    setQuery(value);
    setIsOpen(false);
  };

  const filteredSuggestions = {
    recent: mockSuggestions.recent.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    ),
    popular: mockSuggestions.popular.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    ),
    categories: mockSuggestions.categories.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    ),
  };

  const hasResults =
    filteredSuggestions.recent.length > 0 ||
    filteredSuggestions.popular.length > 0 ||
    filteredSuggestions.categories.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="h-10 w-full rounded-full border-border/50 bg-muted/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-lg border border-border bg-popover shadow-lg">
          <Command className="bg-transparent">
            <CommandList>
              {!hasResults && query && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}

              {filteredSuggestions.recent.length > 0 && (
                <CommandGroup heading="Recent Searches">
                  {filteredSuggestions.recent.map((item) => (
                    <CommandItem
                      key={item}
                      onSelect={() => handleSelect(item)}
                      className="cursor-pointer text-foreground hover:bg-accent"
                    >
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {filteredSuggestions.popular.length > 0 && (
                <CommandGroup heading="Popular">
                  {filteredSuggestions.popular.map((item) => (
                    <CommandItem
                      key={item}
                      onSelect={() => handleSelect(item)}
                      className="cursor-pointer text-foreground hover:bg-accent"
                    >
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {filteredSuggestions.categories.length > 0 && (
                <CommandGroup heading="Categories">
                  {filteredSuggestions.categories.map((item) => (
                    <CommandItem
                      key={item}
                      onSelect={() => handleSelect(item)}
                      className="cursor-pointer text-foreground hover:bg-accent"
                    >
                      {item}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};