import { useState } from "react";
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
import { toast } from "sonner";

interface EditWineDialogProps {
  wine: Wine | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (wine: Wine) => void;
}

export const EditWineDialog = ({ wine, open, onOpenChange, onSave }: EditWineDialogProps) => {
  const [quantity, setQuantity] = useState(wine?.quantity.toString() || "0");
  const [price, setPrice] = useState(wine?.price.toString() || "0");

  const handleSave = () => {
    if (!wine) return;

    const quantityNum = parseInt(quantity);
    const priceNum = parseFloat(price);

    if (isNaN(quantityNum) || quantityNum < 0) {
      toast.error("Quantidade inválida");
      return;
    }

    if (isNaN(priceNum) || priceNum < 0) {
      toast.error("Preço inválido");
      return;
    }

    onSave({
      ...wine,
      quantity: quantityNum,
      price: priceNum,
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
            Atualize a quantidade e o preço de <strong>{wine.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 89.90"
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