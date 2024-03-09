import api from '../config/api';

export default class PublicService {
  private static baseUrl = '/v1/public';

  static async getVersion(): Promise<string> {
    const response = await api.get<string>(`${this.baseUrl}/version`);
    return response.data;
  }
}
