import { useState, useEffect } from "react";
import { Wine } from "@/types/wine";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface EditWineDialogProps {
  wine: Wine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (wine: Wine) => void;
}

export const EditWineDialog = ({ wine, open, onOpenChange, onSave }: EditWineDialogProps) => {
  const [quantity, setQuantity] = useState(wine ? wine.quantity.toString() : "0");
  const [minStock, setMinStock] = useState(wine ? wine.minStock.toString() : "0");
  const [warehouse, setWarehouse] = useState<Wine["warehouse"]>(wine ? wine.warehouse : "deposito-1");

  // Update state when wine changes
  useEffect(() => {
    if (wine) {
      setQuantity(wine.quantity.toString());
      setMinStock(wine.minStock.toString());
      setWarehouse(wine.warehouse);
    }
  }, [wine]);

  const handleSave = () => {
    if (!wine) return;

    const quantityNum = parseInt(quantity);
    const minStockNum = parseInt(minStock);

    if (isNaN(quantityNum) || quantityNum < 0) {
      toast.error("Quantidade inválida");
      return;
    }

    if (isNaN(minStockNum) || minStockNum < 0) {
      toast.error("Estoque mínimo inválido");
      return;
    }

    onSave({
      ...wine,
      warehouse,
      quantity: quantityNum,
      minStock: minStockNum,
    });

    toast.success("Produto atualizado com sucesso!");
    onOpenChange(false);
  };

  if (!wine) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Atualize a quantidade e o estoque mínimo de <strong>{wine.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="warehouse">Depósito</Label>
            <Select value={warehouse} onValueChange={(value) => setWarehouse(value as Wine["warehouse"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deposito-1">Depósito 1</SelectItem>
                <SelectItem value="deposito-2">Depósito 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantidade em Estoque</Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Ex: 50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="minStock">Estoque Mínimo</Label>
            <Input
              id="minStock"
              type="number"
              min="0"
              value={minStock}
              onChange={(e) => setMinStock(e.target.value)}
              placeholder="Ex: 20"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
