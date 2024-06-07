export const apiPath = {
  auth: {
    login: "/login",
    register: "/register",
    profile: "/profile",
  },
  product: {
    list: "/products",
    detail: "/products/{}",
    add: "/products",
    image: "/products/image",
    edit: "/products/{}",
    delete: "/products/{}",
  },
  transaction: {
    list: "/transactions",
    detail: "/transactions/{}",
    add: "/transactions",
    edit: "/transactions/{}",
    delete: "/transactions/{}",
  },
  expenses: {
    list: "/expenses",
    detail: "/expenses/{}",
    add: "/expenses",
    edit: "/expenses/{}",
    delete: "/expenses/{}",
  },
  target: {
    list: "/targets",
    detail: "/targets/{}",
    add: "/targets",
    edit: "/targets/{}",
    delete: "/targets/{}",
  },
  options: {
    product: "/products/options",
    targetYear: "/targets/years/options",
  },
};
