export interface Wine {
  id: string;
  code: string;
  name: string;
  category: "espumantes" | "brancos" | "rose";
}

export interface CategoryStats {
  category: string;
  count: number;
  color: string;
}
