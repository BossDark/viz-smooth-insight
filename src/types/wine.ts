export interface Wine {
  id: string;
  code: string;
  name: string;
  category: "espumantes" | "brancos" | "rose" | "tintos";
  quantity: number;
  minStock: number;
}

export interface CategoryStats {
  category: string;
  count: number;
  color: string;
}
