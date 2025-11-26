export interface Wine {
  id: string;
  code: string;
  name: string;
  category: "espumantes" | "brancos" | "rose" | "tintos";
  warehouse: "deposito-1" | "deposito-2";
  quantity: number;
  minStock: number;
}

export interface CategoryStats {
  category: string;
  count: number;
  color: string;
}
