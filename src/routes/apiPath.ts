export const apiPath = {
  auth: {
    login: "/login",
    register: "/register",
    profile: "/profile",
    edit: "/profile",
  },
  dashboard: {
    daily: "/dashboard/daily",
    monthly: "/dashboard/monthly",
    yearly: "/dashboard/yearly",
    period: "/dashboard/period",
  },
  staff: {
    list: "/staff",
    add: "/staff",
    edit: "/staff/{}",
    delete: "/staff/{}",
  },
  product: {
    list: "/product",
    detail: "/product/{}",
    add: "/product",
    image: "/product/image",
    edit: "/product/{}",
    delete: "/product/{}",
  },
  transaction: {
    list: "/transaction",
    detail: "/transaction/{}",
    add: "/transaction",
    edit: "/transaction/{}",
    delete: "/transaction/{}",
  },
  expense: {
    list: "/expense",
    detail: "/expense/{}",
    add: "/expense",
    edit: "/expense/{}",
    delete: "/expense/{}",
  },
  target: {
    list: "/target",
    detail: "/target/{}",
    add: "/target",
    edit: "/target/{}",
    delete: "/target/{}",
  },
  options: {
    product: "/products/options",
    targetYear: "/target/years/options",
  },
};
