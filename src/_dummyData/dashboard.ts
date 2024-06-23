import {
  IDashboardSummaryMonthlyResponse,
  IDashboardSummaryOverallResponse,
} from "@/types/responses/DashboardResponse";

export const summaryDailyChart = [
  {
    label: "1",
    sale: 2400,
  },
  {
    label: "2",
    sale: 123,
  },
  {
    label: "3",
    sale: 200,
  },
  {
    label: "4",
    sale: 2344,
  },
  {
    label: "5",
    sale: 5566,
  },
  {
    label: "6",
    sale: 1222,
  },
  {
    label: "7",
    sale: 1212,
  },
  {
    label: "8",
    sale: 1246,
  },
  {
    label: "9",
    sale: 2135,
  },
  {
    label: "10",
    sale: 8565,
  },
  {
    label: "11",
    sale: 5464,
  },
  {
    label: "12",
    sale: 3473,
  },
  {
    label: "13",
    sale: 6853,
  },
  {
    label: "14",
    sale: 2356,
  },
  {
    label: "15",
    sale: 3463,
  },
  {
    label: "16",
    sale: 6899,
  },
  {
    label: "17",
    sale: 4453,
  },
  {
    label: "18",
    sale: 2346,
  },
  {
    label: "19",
    sale: 4563,
  },
  {
    label: "20",
    sale: 6785,
  },
  {
    label: "21",
    sale: 1234,
  },
  {
    label: "22",
    sale: 6273,
  },
  {
    label: "23",
    sale: 6374,
  },
  {
    label: "24",
    sale: 1234,
  },
  {
    label: "25",
    sale: 2342,
  },
  {
    label: "26",
    sale: 2342,
  },
  {
    label: "27",
    sale: 4563,
  },
  {
    label: "28",
    sale: 8906,
  },
  {
    label: "29",
    sale: 1938,
  },
  {
    label: "30",
    sale: 2345,
  },
];

export const summaryMonthlyChart = [
  {
    label: "Jan",
    sale: 2400,
  },
  {
    label: "Feb",
    sale: 123,
  },
  {
    label: "Mar",
    sale: 200,
  },
  {
    label: "Apr",
    sale: 2344,
  },
  {
    label: "May",
    sale: 5566,
  },
  {
    label: "Jun",
    sale: 1222,
  },
  {
    label: "Jul",
    sale: 1212,
  },
  {
    label: "Aug",
    sale: 1246,
  },
  {
    label: "Sep",
    sale: 2135,
  },
  {
    label: "Oct",
    sale: 8565,
  },
  {
    label: "Nov",
    sale: 5464,
  },
  {
    label: "Dec",
    sale: 3473,
  },
];

export const summaryRecentSales = [
  { name: "Product 9", quantity: 10, date: new Date() },
  { name: "Product 10", quantity: 1, date: new Date() },
  { name: "Product 15", quantity: 2, date: new Date() },
  { name: "Product 2", quantity: 7, date: new Date() },
  { name: "Product 6", quantity: 3, date: new Date() },
];

export const summaryTopProducts = [
  { name: "Product 9", quantity: 10 },
  { name: "Product 10", quantity: 1 },
  { name: "Product 15", quantity: 2 },
  { name: "Product 2", quantity: 7 },
  { name: "Product 6", quantity: 3 },
];

export const summaryOverall: IDashboardSummaryOverallResponse = {
  achievement: 7,
  averageSales: 116666,
  monthlySalesList: [
    {
      label: "2024-01-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-02-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-03-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-04-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-05-01T00:00:00+07:00",
      sales: 30000,
    },
    {
      label: "2024-06-01T00:00:00+07:00",
      sales: 430000,
    },
    {
      label: "2024-07-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-08-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-09-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-10-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-11-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-12-01T00:00:00+07:00",
      sales: 0,
    },
  ],
  topProduct: "product 1",
  topProductList: [
    {
      productName: "product 1",
      productSold: 8,
    },
    {
      productName: "product 3",
      productSold: 8,
    },
    {
      productName: "product update transaction 1",
      productSold: 1,
    },
    {
      productName: "product update transaction 2",
      productSold: 1,
    },
  ],
  totalExpense: 60000,
  totalProductSold: 18,
  totalProfit: 640000,
  totalSales: 700000,
  totalTarget: 9000000,
  totalTransaction: 7,
};

export const summaryMonthly: IDashboardSummaryMonthlyResponse = {
  achievement: 37,
  averageSales: 107500,
  lastProductSoldList: [
    {
      productDate: "2024-06-01T00:00:00Z",
      productSold: 10,
    },
    {
      productDate: "2024-05-01T00:00:00Z",
      productSold: 2,
    },
    {
      productDate: "2024-04-01T00:00:00Z",
      productSold: 0,
    },
    {
      productDate: "2024-03-01T00:00:00Z",
      productSold: 0,
    },
    {
      productDate: "2024-02-01T00:00:00Z",
      productSold: 0,
    },
  ],
  lastProfitList: [
    {
      profitDate: "2024-06-01T00:00:00Z",
      profitValue: 370000,
    },
    {
      profitDate: "2024-05-01T00:00:00Z",
      profitValue: 30000,
    },
    {
      profitDate: "2024-04-01T00:00:00Z",
      profitValue: 0,
    },
    {
      profitDate: "2024-03-01T00:00:00Z",
      profitValue: 0,
    },
    {
      profitDate: "2024-02-01T00:00:00Z",
      profitValue: 0,
    },
  ],
  lastSalesList: [
    {
      salesDate: "2024-06-01T00:00:00Z",
      salesValue: 430000,
    },
    {
      salesDate: "2024-05-01T00:00:00Z",
      salesValue: 30000,
    },
    {
      salesDate: "2024-04-01T00:00:00Z",
      salesValue: 0,
    },
    {
      salesDate: "2024-03-01T00:00:00Z",
      salesValue: 0,
    },
    {
      salesDate: "2024-02-01T00:00:00Z",
      salesValue: 0,
    },
  ],
  monthlySalesList: [
    {
      label: "2024-01-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-02-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-03-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-04-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-05-01T00:00:00+07:00",
      sales: 30000,
    },
    {
      label: "2024-06-01T00:00:00+07:00",
      sales: 430000,
    },
    {
      label: "2024-07-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-08-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-09-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-10-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-11-01T00:00:00+07:00",
      sales: 0,
    },
    {
      label: "2024-12-01T00:00:00+07:00",
      sales: 0,
    },
  ],
  topProduct: "product 1",
  topProductSold: 5,
  totalExpense: 60000,
  totalExpenseGrowth: 100,
  totalProductSold: 10,
  totalProfit: 370000,
  totalSales: 430000,
  totalSalesGrowth: 1333,
  totalTarget: 1000000,
  totalTransaction: 5,
  totalTransactionGrowth: 400,
};
