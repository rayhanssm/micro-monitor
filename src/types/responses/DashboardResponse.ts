export type IDashboardSummaryOverallResponse = {
  achievement: number;
  averageSales: number;
  monthlySalesList: { label: Date | string; sales: number }[];
  topProduct: string;
  topProductList: {
    productName: string;
    productSold: number;
  }[];
  totalExpense: number;
  totalProductSold: number;
  totalProfit: number;
  totalSales: number;
  totalTarget: number;
  totalTransaction: number;
};

export type IDashboardSummaryMonthlyResponse = {
  achievement: number;
  averageSales: number;
  lastProductSoldList: { productDate: Date | string; productSold: number }[];
  lastProfitList: { profitDate: Date | string; profitValue: number }[];
  lastSalesList: { salesDate: Date | string; salesValue: number }[];
  monthlySalesList: { label: Date | string; sales: number }[];
  topProduct: string;
  topProductSold: number;
  totalExpense: number;
  totalExpenseGrowth: number;
  totalProductSold: number;
  totalProfit: number;
  totalSales: number;
  totalSalesGrowth: number;
  totalTarget: number;
  totalTransaction: number;
  totalTransactionGrowth: number;
};

export type IDashboardSummaryDailyResponse = {
  achievement: number;
  averageSales: number;
  lastProductSoldList: { productDate: Date | string; productSold: number }[];
  lastProfitList: { profitDate: Date | string; profitValue: number }[];
  lastSalesList: { salesDate: Date | string; salesValue: number }[];
  dailySalesList: { label: Date | string; sales: number }[];
  topProduct: string;
  topProductSold: number;
  totalExpense: number;
  totalExpenseGrowth: number;
  totalProductSold: number;
  totalProfit: number;
  totalSales: number;
  totalSalesGrowth: number;
  totalTarget: number;
  totalTransaction: number;
  totalTransactionGrowth: number;
};
