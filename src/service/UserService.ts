import api from '../config/api';
import IResponse from '../interface/IResponse';
import { ICreateUser, ILogin, IToken } from '../interface/IUser';

export default class UserService {
  private static baseUrl = '/v1/user';

  static async register(createUser: ICreateUser): Promise<IResponse> {
    const response = await api.post<IResponse>(this.baseUrl, createUser);
    return response.data;
  }

  static async login(login: ILogin): Promise<IToken> {
    const response = await api.post<IToken>(`${this.baseUrl}/auth`, login);
    return response.data;
  }
}
