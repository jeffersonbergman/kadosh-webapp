
import React from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { BarChart3, PieChart } from 'lucide-react';
import { MonthlyBarChart, CategoryPieChart } from './FinanceCharts';

interface FinancialChartsProps {
  monthlyChartData: any[];
  categoryChartData: any[];
}

const FinancialCharts: React.FC<FinancialChartsProps> = ({ 
  monthlyChartData, 
  categoryChartData 
}) => {
  return (
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
  );
};

export default FinancialCharts;
