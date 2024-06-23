export type ILoginResponse = {
  token: string;
  expiresAt: string;
  role: string;
  flagTarget: boolean;
  flagExpense: boolean;
  flagProduct: boolean;
};

export type IProfileResponse = {
  userID: string;
  storeName: string;
  userName: string;
  role: string;
};

export type IStaffListResponse = {
  userID: string;
  userName: string;
};
