export type ILoginResponse = {
  expiresAt: string;
  token: string;
};

export type IProfileResponse = {
  id: string;
  image: string;
  storeName: string;
  userName: string;
};
