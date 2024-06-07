export type IRegisterRequest = {
  storeName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  flagProduct: boolean;
  flagExpense: boolean;
  flagTarget: boolean;
};

export type ILoginRequest = {
  userName: string;
  password: string;
};

export type IProfileRequest = {
  storeName: string;
  userName: string;
};