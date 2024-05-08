import { User } from "@prisma/client";
import RefreshTokenModel from "./token.model";
import TaskModel from "./task.model";

export default class UserModel implements User {
  userId: string;
  name: string;
  email: string;
  password: string;
  refreshToken?: RefreshTokenModel;
  tasks?: TaskModel[];
}