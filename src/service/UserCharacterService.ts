import api from '../config/api';
import { IUserCharacter } from '../interface/IUserCharacter';

export default class UserCharacterService {
  private static baseUrl = '/v1/user-character';

  static async getAll(): Promise<IUserCharacter[]> {
    const response = await api.get<IUserCharacter[]>(this.baseUrl);
    return response.data;
  }
}
