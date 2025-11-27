import { Button } from "@/components/ui/button";
import { Wine } from "@/types/wine";
import { Warehouse } from "lucide-react";

interface WarehouseFilterProps {
  selected: Wine["warehouse"] | "all";
  onSelect: (warehouse: Wine["warehouse"] | "all") => void;
}

export const WarehouseFilter = ({ selected, onSelect }: WarehouseFilterProps) => {
  const warehouses: { value: Wine["warehouse"] | "all"; label: string }[] = [
    { value: "all", label: "Todos os Depósitos" },
    { value: "deposito-1", label: "Rancho/Ondas" },
    { value: "deposito-2", label: "Vitória" },
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Warehouse className="h-4 w-4" />
        <span>Depósito:</span>
      </div>
      {warehouses.map((warehouse) => (
        <Button
          key={warehouse.value}
          variant={selected === warehouse.value ? "default" : "outline"}
          size="sm"
          onClick={() => onSelect(warehouse.value)}
          className="transition-all hover:scale-105"
        >
          {warehouse.label}
        </Button>
      ))}
    </div>
  );
};
