
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";
import { 
  DollarSign, FileText, Tag, Download, Upload, PlusCircle, 
  TrendingUp, TrendingDown, BarChart3, PieChart, Search, Filter, Calendar
} from 'lucide-react';
import TransactionDialog from '@/components/financeiro/TransactionDialog';
import CategoryDialog from '@/components/financeiro/CategoryDialog';
import ImportDialog from '@/components/financeiro/ImportDialog';
import { MonthlyBarChart, CategoryPieChart } from '@/components/financeiro/FinanceCharts';
import { 
  exportToCSV, exportToExcel, exportToPDF, 
  calculateFinancialSummary, prepareMonthlyChartData, prepareCategoryChartData, 
  formatCurrency, formatDate 
} from '@/utils/financeUtils';

// Sample data - in a real app this would come from an API or database
const sampleTransactions = [
  {
    id: '1',
    date: '2025-04-14',
    description: 'Dízimos e Ofertas (Culto Domingo)',
    category: '1',
    type: 'entrada',
    amount: 2350
  },
  {
    id: '2',
    date: '2025-04-12',
    description: 'Pagamento de Água e Luz',
    category: '3',
    type: 'saida',
    amount: 570
  },
  {
    id: '3',
    date: '2025-04-10',
    description: 'Dízimos e Ofertas (Culto Quarta)',
    category: '1',
    type: 'entrada',
    amount: 1150
  },
  {
    id: '4',
    date: '2025-04-08',
    description: 'Compra de Equipamentos de Som',
    category: '5',
    type: 'saida',
    amount: 1800
  },
  {
    id: '5',
    date: '2025-04-07',
    description: 'Dízimos e Ofertas (Culto Domingo)',
    category: '1',
    type: 'entrada',
    amount: 2250
  },
  {
    id: '6',
    date: '2025-03-30',
    description: 'Dízimos e Ofertas (Culto Domingo)',
    category: '1',
    type: 'entrada',
    amount: 1950
  },
  {
    id: '7',
    date: '2025-03-28',
    description: 'Salários Funcionários',
    category: '4',
    type: 'saida',
    amount: 2500
  },
  {
    id: '8',
    date: '2025-03-20',
    description: 'Receita Evento de Páscoa',
    category: '2',
    type: 'entrada',
    amount: 1500
  }
];

const sampleCategories = [
  { id: '1', name: 'Dízimos e Ofertas', type: 'entrada', description: 'Todas as contribuições financeiras' },
  { id: '2', name: 'Eventos', type: 'entrada', description: 'Receitas de eventos especiais' },
  { id: '3', name: 'Manutenção', type: 'saida', description: 'Despesas de manutenção do templo' },
  { id: '4', name: 'Salários', type: 'saida', description: 'Pagamento de funcionários' },
  { id: '5', name: 'Equipamentos', type: 'saida', description: 'Compra de equipamentos diversos' }
];

const Financeiro = () => {
  const { toast } = useToast();
  
  // State
  const [transactions, setTransactions] = useState(sampleTransactions);
  const [categories, setCategories] = useState(sampleCategories);
  const [currentTab, setCurrentTab] = useState('movimentacoes');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  
  // Calculate financial summary
  const summary = calculateFinancialSummary(transactions);

  // Prepare data for charts
  const monthlyChartData = prepareMonthlyChartData(transactions);
  const categoryChartData = prepareCategoryChartData(transactions, categories);
  
  // Filtering transactions based on search term
  const filteredTransactions = transactions.filter(transaction => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Map category IDs to names for display
  const categoryMap = categories.reduce((map, cat) => {
    map[cat.id] = { name: cat.name, type: cat.type };
    return map;
  }, {} as Record<string, {name: string, type: string}>);
  
  // Handlers
  const handleAddTransaction = (newTransaction: any) => {
    setTransactions([newTransaction, ...transactions]);
  };
  
  const handleAddCategory = (newCategory: any) => {
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === newCategory.id ? newCategory : cat
      ));
    } else {
      // Add new category
      setCategories([...categories, newCategory]);
    }
  };
  
  const handleImportData = (importedData: any[]) => {
    setTransactions([...importedData, ...transactions]);
  };
  
  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    setIsCategoryDialogOpen(true);
  };
  
  const handleExportData = (format: 'csv' | 'excel' | 'pdf') => {
    if (transactions.length === 0) {
      toast({
        title: "Nenhum dado para exportar",
        description: "Não há transações disponíveis para exportação.",
        variant: "destructive"
      });
      return;
    }
    
    // Format transactions for export (with category names instead of IDs)
    const formattedTransactions = transactions.map(transaction => ({
      ...transaction,
      category: categoryMap[transaction.category]?.name || 'Sem categoria',
      type: transaction.type === 'entrada' ? 'Entrada' : 'Saída'
    }));
    
    try {
      switch (format) {
        case 'csv':
          exportToCSV(formattedTransactions);
          break;
        case 'excel':
          exportToExcel(formattedTransactions);
          break;
        case 'pdf':
          exportToPDF(formattedTransactions);
          break;
      }
      
      toast({
        title: "Exportação concluída",
        description: `Os dados foram exportados com sucesso no formato ${format.toUpperCase()}.`
      });
    } catch (error) {
      toast({
        title: "Erro na exportação",
        description: "Ocorreu um erro ao exportar os dados. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Módulo Financeiro</h1>
            <p className="text-gray-500">Gerencie todas as finanças da igreja em um só lugar</p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => setIsImportDialogOpen(true)}
            >
              <Upload size={18} className="mr-2" /> Importar
            </Button>
            <Button 
              variant="outline" 
              className="hidden md:flex"
              onClick={() => handleExportData('csv')}
            >
              <Download size={18} className="mr-2" /> Exportar CSV
            </Button>
            <Button onClick={() => setIsTransactionDialogOpen(true)}>
              <PlusCircle size={18} className="mr-2" /> Nova Transação
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium flex items-center">
                <DollarSign size={18} className="mr-2 text-church-primary" />
                Saldo Atual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(summary.currentBalance)}</div>
              <p className="text-xs text-gray-500 mt-1">Atualizado em {formatDate(new Date().toISOString())}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium flex items-center">
                <TrendingUp size={18} className="mr-2 text-green-600" />
                Entradas do Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(summary.currentIncome)}</div>
              <p className={`text-xs mt-1 ${summary.incomeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {summary.incomeChange >= 0 ? '+' : ''}{summary.incomeChange.toFixed(0)}% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-base font-medium flex items-center">
                <TrendingDown size={18} className="mr-2 text-red-600" />
                Saídas do Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(summary.currentExpenses)}</div>
              <p className={`text-xs mt-1 ${summary.expensesChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {summary.expensesChange >= 0 ? '+' : ''}{summary.expensesChange.toFixed(0)}% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="movimentacoes" className="mb-6" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
            <TabsTrigger value="categorias">Categorias</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="movimentacoes" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Movimentações Recentes</CardTitle>
                    <CardDescription>Visualize e gerencie todas as entradas e saídas</CardDescription>
                  </div>
                  <div className="flex w-full md:w-auto gap-2">
                    <div className="relative flex-1 md:w-64">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Buscar transações..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Categoria</TableHead>
                          <TableHead className="text-right">Valor</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTransactions.length > 0 ? (
                          filteredTransactions.map((transaction) => (
                            <TableRow key={transaction.id} className="hover:bg-muted/50">
                              <TableCell>{formatDate(transaction.date)}</TableCell>
                              <TableCell>{transaction.description}</TableCell>
                              <TableCell>
                                {categoryMap[transaction.category] && (
                                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                    categoryMap[transaction.category].type === 'entrada' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {categoryMap[transaction.category].name}
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className={`text-right ${
                                transaction.type === 'entrada' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {formatCurrency(transaction.amount)}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                              Nenhuma transação encontrada
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Button variant="outline" size="sm">Carregar Mais</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categorias" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Categorias Financeiras</CardTitle>
                    <CardDescription>Gerencie as categorias de entradas e saídas</CardDescription>
                  </div>
                  <Button size="sm" onClick={() => {
                    setEditingCategory(null);
                    setIsCategoryDialogOpen(true);
                  }}>
                    <Tag size={16} className="mr-2" /> Nova Categoria
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Nome</TableHead>
                          <TableHead>Tipo</TableHead>
                          <TableHead>Descrição</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {categories.map((category) => (
                          <TableRow key={category.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{category.name}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                category.type === 'entrada' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {category.type === 'entrada' ? 'Entrada' : 'Saída'}
                              </span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{category.description}</TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleEditCategory(category)}
                              >
                                Editar
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="relatorios" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Relatórios Financeiros</CardTitle>
                    <CardDescription>Visualize e exporte relatórios detalhados</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportData('pdf')}
                    >
                      <FileText size={16} className="mr-2" /> PDF
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleExportData('excel')}
                    >
                      <Download size={16} className="mr-2" /> Excel
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold">Entradas vs Saídas (2025)</h3>
                        <BarChart3 size={18} className="text-church-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <MonthlyBarChart data={monthlyChartData} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold">Distribuição por Categoria</h3>
                        <PieChart size={18} className="text-church-primary" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CategoryPieChart data={categoryChartData} />
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="font-semibold mb-3">Relatórios Disponíveis</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileText size={18} className="mr-3 text-church-primary" />
                      <div>
                        <p className="font-medium">Balanço Financeiro Anual</p>
                        <p className="text-xs text-gray-500">Resumo completo das movimentações de 2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Visualizar</Button>
                  </li>
                  <li className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileText size={18} className="mr-3 text-church-primary" />
                      <div>
                        <p className="font-medium">Relatório Mensal (Abril/2025)</p>
                        <p className="text-xs text-gray-500">Detalhamento das atividades no mês atual</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Visualizar</Button>
                  </li>
                  <li className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                    <div className="flex items-center">
                      <FileText size={18} className="mr-3 text-church-primary" />
                      <div>
                        <p className="font-medium">Comparativo Semestral</p>
                        <p className="text-xs text-gray-500">Análise comparativa dos últimos 6 meses</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Visualizar</Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Dialogs */}
      <TransactionDialog 
        isOpen={isTransactionDialogOpen}
        onClose={() => setIsTransactionDialogOpen(false)}
        onSave={handleAddTransaction}
        categories={categories}
      />
      
      <CategoryDialog 
        isOpen={isCategoryDialogOpen}
        onClose={() => {
          setIsCategoryDialogOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleAddCategory}
        editingCategory={editingCategory}
      />
      
      <ImportDialog 
        isOpen={isImportDialogOpen}
        onClose={() => setIsImportDialogOpen(false)}
        onImport={handleImportData}
      />
    </MainLayout>
  );
};

export default Financeiro;
