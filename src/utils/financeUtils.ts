
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Helper function to format currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR').format(date);
};

// Export transactions to CSV
export const exportToCSV = (data: any[], filename: string = 'transacoes'): void => {
  // Convert data to CSV format
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(','));
  const csvContent = [headers, ...rows].join('\n');
  
  // Create a blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${filename}_${formatDateForFilename(new Date())}.csv`);
};

// Export transactions to Excel
export const exportToExcel = (data: any[], filename: string = 'transacoes'): void => {
  // Format data for Excel
  const formattedData = data.map(item => ({
    Data: formatDate(item.date),
    Descrição: item.description,
    Categoria: item.category,
    Tipo: item.type === 'entrada' ? 'Entrada' : 'Saída',
    Valor: formatCurrency(item.amount)
  }));
  
  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(formattedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transações');
  
  // Generate Excel file
  XLSX.writeFile(workbook, `${filename}_${formatDateForFilename(new Date())}.xlsx`);
};

// Export transactions to PDF
export const exportToPDF = (data: any[], filename: string = 'transacoes'): void => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Relatório Financeiro', 14, 22);
  
  // Add date
  doc.setFontSize(11);
  doc.text(`Gerado em: ${formatDate(new Date().toISOString())}`, 14, 30);
  
  // Format data for table
  const tableData = data.map(item => [
    formatDate(item.date),
    item.description,
    item.category,
    item.type === 'entrada' ? 'Entrada' : 'Saída',
    formatCurrency(item.amount)
  ]);
  
  // Add table
  (doc as any).autoTable({
    startY: 40,
    head: [['Data', 'Descrição', 'Categoria', 'Tipo', 'Valor']],
    body: tableData,
    theme: 'grid',
    styles: { fontSize: 9 },
    headStyles: { fillColor: [66, 66, 66] }
  });
  
  // Save PDF
  doc.save(`${filename}_${formatDateForFilename(new Date())}.pdf`);
};

// Helper to format date for filenames
const formatDateForFilename = (date: Date): string => {
  return date.toISOString().split('T')[0].replace(/-/g, '');
};

// Calculate financial summary data
export const calculateFinancialSummary = (transactions: any[]) => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  // Filter transactions for current month
  const currentMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate.getMonth() === currentMonth && 
           transactionDate.getFullYear() === currentYear;
  });
  
  // Calculate totals
  const income = currentMonthTransactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = currentMonthTransactions
    .filter(t => t.type === 'saida')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = income - expenses;
  
  // Calculate previous month for comparison
  const prevMonthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return transactionDate.getMonth() === prevMonth && 
           transactionDate.getFullYear() === prevYear;
  });
  
  const prevIncome = prevMonthTransactions
    .filter(t => t.type === 'entrada')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const prevExpenses = prevMonthTransactions
    .filter(t => t.type === 'saida')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Calculate percentage change
  const incomeChange = prevIncome > 0 ? ((income - prevIncome) / prevIncome) * 100 : 100;
  const expensesChange = prevExpenses > 0 ? ((expenses - prevExpenses) / prevExpenses) * 100 : 100;
  
  return {
    currentBalance: balance,
    currentIncome: income,
    currentExpenses: expenses,
    incomeChange,
    expensesChange
  };
};

// Prepare chart data by month
export const prepareMonthlyChartData = (transactions: any[]) => {
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  // Initialize data structure
  const chartData = months.map(name => ({
    name,
    entrada: 0,
    saida: 0
  }));
  
  // Group transactions by month
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthIndex = date.getMonth();
    
    if (transaction.type === 'entrada') {
      chartData[monthIndex].entrada += transaction.amount;
    } else {
      chartData[monthIndex].saida += transaction.amount;
    }
  });
  
  return chartData;
};

// Prepare pie chart data for category distribution
export const prepareCategoryChartData = (transactions: any[], categories: any[]) => {
  // Create a map for quick category lookups
  const categoryMap = categories.reduce((map, cat) => {
    map[cat.id] = cat.name;
    return map;
  }, {} as Record<string, string>);
  
  // Group by category
  const categoryTotals: Record<string, number> = {};
  
  transactions.forEach(transaction => {
    const categoryName = categoryMap[transaction.category] || 'Sem categoria';
    if (!categoryTotals[categoryName]) {
      categoryTotals[categoryName] = 0;
    }
    categoryTotals[categoryName] += transaction.amount;
  });
  
  // Convert to array format for charts
  return Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));
};
