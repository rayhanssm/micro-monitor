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

export type IStaffRequest = {
  userName: string;
  password: string;
  confirmPassword: string;
};

export type IStaffEditRequest = {
  userName: string;
};
