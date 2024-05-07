import UserModel from "src/models/user.model";

export default class UserPayload implements Partial<UserModel> {
  userId: string;
  name: string;
  email: string;

  constructor (model: UserModel) {
    this.userId = model.userId
    this.name = model.name
    this.email = model.email
  }
}