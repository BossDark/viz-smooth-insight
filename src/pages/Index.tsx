import { useState, useMemo } from "react";
import { wines as initialWines } from "@/data/wines";
import { Wine } from "@/types/wine";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { WineCard } from "@/components/dashboard/WineCard";
import { EditWineDialog } from "@/components/dashboard/EditWineDialog";
import { AddWineDialog } from "@/components/dashboard/AddWineDialog";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { QuantityChart } from "@/components/dashboard/QuantityChart";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { CategoryFilter } from "@/components/dashboard/CategoryFilter";
import { Button } from "@/components/ui/button";
import { Wine as WineIcon, Sparkles, Droplets, Package, Plus } from "lucide-react";

const Index = () => {
  const [wines, setWines] = useState<Wine[]>(initialWines);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Wine["category"] | "all">("all");
  const [editingWine, setEditingWine] = useState<Wine | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredWines = useMemo(() => {
    return wines.filter((wine) => {
      const matchesSearch =
        wine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        wine.code.includes(searchQuery);
      const matchesCategory = selectedCategory === "all" || wine.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [wines, searchQuery, selectedCategory]);

  const categoryStats = useMemo(() => {
    const espumantes = wines.filter((w) => w.category === "espumantes").length;
    const brancos = wines.filter((w) => w.category === "brancos").length;
    const rose = wines.filter((w) => w.category === "rose").length;

    return [
      { category: "Espumantes", count: espumantes, color: "hsl(40, 80%, 85%)" },
      { category: "Brancos", count: brancos, color: "hsl(210, 40%, 96.1%)" },
      { category: "Rosés", count: rose, color: "hsl(350, 70%, 75%)" },
    ];
  }, [wines]);

  const handleEditWine = (wine: Wine) => {
    setEditingWine(wine);
    setEditDialogOpen(true);
  };

  const handleSaveWine = (updatedWine: Wine) => {
    setWines(wines.map((w) => (w.id === updatedWine.id ? updatedWine : w)));
  };

  const handleAddWine = (newWine: Wine) => {
    setWines([...wines, newWine]);
  };

  const handleDeleteWine = (id: string) => {
    setWines(wines.filter((w) => w.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 glass-card rounded-full">
            <WineIcon className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-wine-deep bg-clip-text text-transparent">
              Dashboard de Vinhos
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Gestão completa do inventário de espumantes, vinhos brancos e rosés
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-scale-in">
          <StatsCard
            title="Total de Produtos"
            value={wines.length}
            icon={Package}
            gradient="wine-gradient"
          />
          <StatsCard
            title="Espumantes"
            value={wines.filter((w) => w.category === "espumantes").length}
            icon={Sparkles}
            gradient="champagne-gradient"
          />
          <StatsCard
            title="Vinhos Brancos e Rosés"
            value={wines.filter((w) => w.category !== "espumantes").length}
            icon={Droplets}
            gradient="rose-gradient"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
          <CategoryChart data={categoryStats} />
          <QuantityChart wines={wines} />
        </div>

        {/* Filters */}
        <div className="space-y-4 glass-card p-6 rounded-xl animate-fade-in">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Wine Grid */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">
              Produtos {selectedCategory !== "all" && `- ${selectedCategory}`}
            </h2>
            <div className="flex items-center gap-4">
              <p className="text-muted-foreground">
                {filteredWines.length} {filteredWines.length === 1 ? "produto" : "produtos"}
              </p>
              <Button onClick={() => setAddDialogOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" />
                Adicionar Produto
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWines.map((wine) => (
              <WineCard key={wine.id} wine={wine} onEdit={handleEditWine} onDelete={handleDeleteWine} />
            ))}
          </div>
          <EditWineDialog
            wine={editingWine}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onSave={handleSaveWine}
          />
          <AddWineDialog
            open={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            onAdd={handleAddWine}
          />
          {filteredWines.length === 0 && (
            <div className="text-center py-12 glass-card rounded-xl">
              <WineIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">
                Nenhum produto encontrado com os filtros aplicados
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
