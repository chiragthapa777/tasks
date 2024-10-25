import { userType } from "./user.type";

export type loginResponseType = {
  user: userType;
  accessToken: string;
};
