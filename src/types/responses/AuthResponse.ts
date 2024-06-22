export type ILoginResponse = {
  token: string;
  expiresAt: string;
  role: string;
  flagTarget: boolean;
  flagExpense: boolean;
  flagproduct: boolean;
};

export type IProfileResponse = {
  userID: string;
  storeName: string;
  userName: string;
  role: string;
};
