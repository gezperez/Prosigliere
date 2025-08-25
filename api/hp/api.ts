import { Colors } from '@/app/ds/components/Text/enums/Colors';
import { ApiBase } from '../BaseService';
import { Character, House, Spell } from './types';

const houses: House[] = [
  {
    id: 'gryffindor',
    name: 'Gryffindor',
    color: Colors.GRYFFINDOR,
    lightColor: Colors.GRYFFINDOR_LIGHT,
    image: require('@/assets/images/gryffindor.png'),
    description: 'Bravery, courage, and determination',
  },
  {
    id: 'slytherin',
    name: 'Slytherin',
    color: Colors.SLYTHERIN,
    lightColor: Colors.SLYTHERIN_LIGHT,
    image: require('@/assets/images/slytherin.png'),
    description: 'Ambition, cunning, and resourcefulness',
  },
  {
    id: 'ravenclaw',
    name: 'Ravenclaw',
    color: Colors.RAVENCLAW,
    lightColor: Colors.RAVENCLAW_LIGHT,
    image: require('@/assets/images/ravenclaw.png'),
    description: 'Intelligence, creativity, and learning',
  },
  {
    id: 'hufflepuff',
    name: 'Hufflepuff',
    color: Colors.HUFFLEPUFF,
    lightColor: Colors.HUFFLEPUFF_LIGHT,
    image: require('@/assets/images/hufflepuff.png'),
    description: 'Hard work, dedication, and loyalty',
  },
];

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

  async getHouses(): Promise<House[]> {
    return houses;
  }
}

export const createHPService = (baseURL: string): HPService => {
  return new HPService(baseURL);
};
