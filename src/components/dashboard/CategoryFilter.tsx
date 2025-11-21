import { Button } from "@/components/ui/button";
import { Wine } from "@/types/wine";

interface CategoryFilterProps {
  selected: Wine["category"] | "all";
  onSelect: (category: Wine["category"] | "all") => void;
}

const categories = [
  { value: "all" as const, label: "Todos", color: "wine-gradient" },
  { value: "espumantes" as const, label: "Espumantes", color: "champagne-gradient" },
  { value: "brancos" as const, label: "Brancos", color: "white-wine-gradient" },
  { value: "rose" as const, label: "Rosés", color: "rose-gradient" },
];

export const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={selected === category.value ? "default" : "outline"}
          onClick={() => onSelect(category.value)}
          className={`smooth-transition ${
            selected === category.value ? category.color : ""
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
};
