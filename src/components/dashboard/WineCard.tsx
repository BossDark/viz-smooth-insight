import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wine as WineIcon, Edit } from "lucide-react";
import { Wine } from "@/types/wine";

interface WineCardProps {
  wine: Wine;
  onEdit: (wine: Wine) => void;
}

const categoryColors = {
  espumantes: "champagne-gradient",
  brancos: "bg-secondary",
  rose: "rose-gradient",
};

const categoryLabels = {
  espumantes: "Espumante",
  brancos: "Vinho Branco",
  rose: "Vinho Rosé",
};

export const WineCard = ({ wine, onEdit }: WineCardProps) => {
  return (
    <Card className="glass-card hover-lift smooth-transition p-5 group">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-lg ${categoryColors[wine.category]} flex-shrink-0`}>
          <WineIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {wine.name}
            </h3>
            <Badge variant="outline" className="flex-shrink-0 text-xs">
              {wine.code}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            {categoryLabels[wine.category]}
          </p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Qtd: </span>
                <span className="font-medium">{wine.quantity}</span>
              </div>
              <div>
                <span className="text-muted-foreground">R$ </span>
                <span className="font-medium">{wine.price.toFixed(2)}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(wine)}
              className="h-7 px-2"
            >
              <Edit className="h-3 w-3 mr-1" />
              Editar
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
