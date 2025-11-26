import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wine } from "@/types/wine";

interface AddWineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (wine: Wine) => void;
}

export const AddWineDialog = ({ open, onOpenChange, onAdd }: AddWineDialogProps) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [category, setCategory] = useState<Wine["category"]>("brancos");
  const [warehouse, setWarehouse] = useState<Wine["warehouse"]>("deposito-1");
  const [quantity, setQuantity] = useState("");
  const [minStock, setMinStock] = useState("");

  const handleSave = () => {
    if (!name || !code || !quantity || !minStock) return;

    const newWine: Wine = {
      id: Date.now().toString(),
      name,
      code,
      category,
      warehouse,
      quantity: parseInt(quantity),
      minStock: parseInt(minStock),
    };

    onAdd(newWine);
    
    // Reset form
    setName("");
    setCode("");
    setCategory("brancos");
    setWarehouse("deposito-1");
    setQuantity("");
    setMinStock("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Vinho</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do vinho"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">Código</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Código do produto"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={(value) => setCategory(value as Wine["category"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="espumantes">Espumante</SelectItem>
                <SelectItem value="brancos">Vinho Branco</SelectItem>
                <SelectItem value="rose">Vinho Rosé</SelectItem>
                <SelectItem value="tintos">Vinho Tinto</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
            <Label htmlFor="quantity">Quantidade</Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="minStock">Estoque Mínimo</Label>
            <Input
              id="minStock"
              type="number"
              value={minStock}
              onChange={(e) => setMinStock(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
