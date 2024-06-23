import {
  IProfileResponse,
  IStaffListResponse,
} from "@/types/responses/AuthResponse";

export const profileStaffDetail: IProfileResponse = {
  userID: "1",
  storeName: "Staff Bebek",
  userName: "user1",
  role: "staff",
};

export const profileAdminDetail: IProfileResponse = {
  userID: "2",
  storeName: "Admin Bebek",
  userName: "admin1",
  role: "admin",
};

export const staffList: IStaffListResponse[] = [
  {
    userID: "1",
    userName: "user1",
  },
  {
    userID: "2",
    userName: "user2",
  },
  {
    userID: "3",
    userName: "user3",
  },
  {
    userID: "4",
    userName: "user4",
  },
];
