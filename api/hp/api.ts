import { ApiBase } from '../BaseService';
import { Character, Spell } from './types';

export class HPService extends ApiBase {
  constructor(baseURL: string) {
    super({
      baseURL,
    });
  }

  protected async handleResponse<T>(response: any): Promise<T> {
    return response.data;
  }

  async getCharacters(): Promise<Character[]> {
    const response = await this.get<Character[]>('/characters');
    return this.handleResponse(response);
  }

  async getSpells(): Promise<Spell[]> {
    const response = await this.get<Spell[]>('/spells');
    return this.handleResponse(response);
  }
}

export const createHPService = (baseURL: string): HPService => {
  return new HPService(baseURL);
};
