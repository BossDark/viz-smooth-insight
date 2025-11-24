import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Wine } from "@/types/wine";

interface QuantityChartProps {
  wines: Wine[];
}

export const QuantityChart = ({ wines }: QuantityChartProps) => {
  const data = wines.map(wine => ({
    name: wine.code,
    quantidade: wine.quantity,
    minimo: wine.minStock,
  }));

  return (
    <Card className="glass-card animate-fade-in overflow-hidden">
      <div className="p-6 pb-0">
        <h2 className="text-xl font-bold mb-6">Distribuição de Quantidades</h2>
      </div>
      <div className="px-2 pb-4">
        <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fill: 'hsl(var(--muted-foreground))' }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--background))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px'
            }}
            animationDuration={300}
            animationEasing="ease-out"
          />
          <Legend />
          <Bar 
            dataKey="quantidade" 
            fill="hsl(var(--primary))" 
            name="Quantidade Atual"
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Bar 
            dataKey="minimo" 
            fill="hsl(var(--muted))" 
            name="Estoque Mínimo"
            animationBegin={200}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </Card>
  );
};
