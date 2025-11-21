export interface Wine {
  id: string;
  code: string;
  name: string;
  category: "espumantes" | "brancos" | "rose";
  quantity: number;
  price: number;
}

export interface CategoryStats {
  category: string;
  count: number;
  color: string;
}
