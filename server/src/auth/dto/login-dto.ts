import UserModel from "src/models/user.model";

export default class LoginDto implements Partial<UserModel> {
  email: string;
  password: string;
}