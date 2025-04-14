
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, FileText, Tag, Download, PlusCircle, 
  TrendingUp, TrendingDown, BarChart3, PieChart
} from 'lucide-react';

const Financeiro = () => {
  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Módulo Financeiro</h1>
            <p className="text-gray-500">Gerencie todas as finanças da igreja em um só lugar</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="hidden md:flex">
              <Download size={18} className="mr-2" /> Exportar
            </Button>
            <Button>
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
              <div className="text-2xl font-bold">R$ 15.420,00</div>
              <p className="text-xs text-gray-500 mt-1">Atualizado em 14/04/2025</p>
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
              <div className="text-2xl font-bold">R$ 9.350,00</div>
              <p className="text-xs text-green-600 mt-1">+15% em relação ao mês anterior</p>
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
              <div className="text-2xl font-bold">R$ 5.270,00</div>
              <p className="text-xs text-red-600 mt-1">+8% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="movimentacoes" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="movimentacoes">Movimentações</TabsTrigger>
            <TabsTrigger value="categorias">Categorias</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>
          
          <TabsContent value="movimentacoes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Movimentações Recentes</CardTitle>
                <CardDescription>Visualize e gerencie todas as entradas e saídas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Descrição</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Categoria</th>
                          <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">14/04/2025</td>
                          <td className="p-4 align-middle">Dízimos e Ofertas (Culto Domingo)</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Entrada
                            </span>
                          </td>
                          <td className="p-4 align-middle text-right text-green-600">R$ 2.350,00</td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">12/04/2025</td>
                          <td className="p-4 align-middle">Pagamento de Água e Luz</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              Manutenção
                            </span>
                          </td>
                          <td className="p-4 align-middle text-right text-red-600">R$ 570,00</td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">10/04/2025</td>
                          <td className="p-4 align-middle">Dízimos e Ofertas (Culto Quarta)</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Entrada
                            </span>
                          </td>
                          <td className="p-4 align-middle text-right text-green-600">R$ 1.150,00</td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">08/04/2025</td>
                          <td className="p-4 align-middle">Compra de Equipamentos de Som</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              Equipamentos
                            </span>
                          </td>
                          <td className="p-4 align-middle text-right text-red-600">R$ 1.800,00</td>
                        </tr>
                        <tr className="transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">07/04/2025</td>
                          <td className="p-4 align-middle">Dízimos e Ofertas (Culto Domingo)</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Entrada
                            </span>
                          </td>
                          <td className="p-4 align-middle text-right text-green-600">R$ 2.250,00</td>
                        </tr>
                      </tbody>
                    </table>
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
                  <Button size="sm">
                    <Tag size={16} className="mr-2" /> Nova Categoria
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nome</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Descrição</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Dízimos e Ofertas</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Entrada
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">Todas as contribuições financeiras</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Editar</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Eventos</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              Entrada
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">Receitas de eventos especiais</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Editar</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Manutenção</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              Saída
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">Despesas de manutenção do templo</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Editar</Button>
                          </td>
                        </tr>
                        <tr className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Salários</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              Saída
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">Pagamento de funcionários</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Editar</Button>
                          </td>
                        </tr>
                        <tr className="transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">Equipamentos</td>
                          <td className="p-4 align-middle">
                            <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                              Saída
                            </span>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">Compra de equipamentos diversos</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">Editar</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                    <Button variant="outline" size="sm">
                      <FileText size={16} className="mr-2" /> PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download size={16} className="mr-2" /> Excel
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="dashboard-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Entradas vs Saídas (2025)</h3>
                      <BarChart3 size={20} className="text-church-primary" />
                    </div>
                    <div className="h-64 flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Gráfico de Barras (visualização do relatório)</p>
                    </div>
                  </div>
                  <div className="dashboard-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Distribuição por Categoria</h3>
                      <PieChart size={20} className="text-church-primary" />
                    </div>
                    <div className="h-64 flex items-center justify-center border rounded-md">
                      <p className="text-muted-foreground">Gráfico de Pizza (visualização do relatório)</p>
                    </div>
                  </div>
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
                        <p className="font-medium">Comparativo Trimestral</p>
                        <p className="text-xs text-gray-500">Análise comparativa dos últimos 3 meses</p>
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
    </MainLayout>
  );
};

export default Financeiro;
