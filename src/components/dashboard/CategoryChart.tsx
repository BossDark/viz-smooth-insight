import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { CategoryStats } from "@/types/wine";

interface CategoryChartProps {
  data: CategoryStats[];
}

export const CategoryChart = ({ data }: CategoryChartProps) => {
  return (
    <Card className="glass-card p-6 animate-fade-in">
      <h2 className="text-xl font-bold mb-6 text-black dark:text-white">Distribuição por Categoria</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="count"
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            animationDuration={300}
            animationEasing="ease-out"
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};
