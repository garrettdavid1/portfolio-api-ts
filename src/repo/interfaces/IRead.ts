
import { QueryParams } from '../base/BaseRepository';

export interface IRead<T> {
	find(query: Pick<T, any>): Promise<T[]>;
	findOne(query: Pick<T, any>): Promise<T | null>;
	findById(id: string): Promise<T | null>;
}