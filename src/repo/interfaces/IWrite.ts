import { ObjectId } from 'bson';
import { UpdateQuery } from 'mongoose';

export interface IWrite<T> {
	create(item: T): Promise<any>;
	updateOne(id: string, item: UpdateQuery<T>, session?: any): Promise<T>
	delete(id: string): Promise<T>;
}