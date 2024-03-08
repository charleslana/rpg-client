import api from '../config/api';
import GlobalError from '../shared/GlobalError';
import IResponse from '../interface/IResponse';
import { getRefreshToken } from '../utils/localStorageUtils';
import { ICreateUser, ILogin, IToken, UserMe } from '../interface/IUser';
import { isValidEmail, isValidName } from '../utils/utils';

export default class UserService {
  private static baseUrl = '/v1/user';

  static async register(createUser: ICreateUser): Promise<IResponse> {
    if (!isValidEmail(createUser.email)) {
      throw new GlobalError('E-mail inválido, o e-mail deve ser válido e conter letras minúsculas');
    }
    if (!createUser.password || createUser.password.length < 6) {
      throw new GlobalError('Senha inválida, a senha deve conter no mínimo 6 caracteres');
    }
    if (!createUser.name || !isValidName(createUser.name)) {
      throw new GlobalError('Nome inválido, o nome deve conter apenas letras');
    }
    const response = await api.post<IResponse>(this.baseUrl, createUser);
    return response.data;
  }

  static async login(login: ILogin): Promise<IToken> {
    if (!login.email || !login.password) {
      throw new GlobalError('Preencha os campos de e-mail e senha');
    }
    const response = await api.post<IToken>(`${this.baseUrl}/auth`, login);
    return response.data;
  }

  static async me(): Promise<UserMe> {
    const response = await api.get<UserMe>(`${this.baseUrl}/me`);
    return response.data;
  }

  static async refreshAccessToken(): Promise<IToken> {
    const response = await api.post<IToken>(`${this.baseUrl}/refresh-token`, {
      refreshToken: getRefreshToken(),
    });
    return response.data;
  }
}
