
import { Document, Model, UpdateQuery } from 'mongoose';
import { IRead } from '../interfaces/IRead';
import { IWrite } from '../interfaces/IWrite';

export interface QueryParams {
	[key: string]: any
}

export abstract class BaseRepository<T extends Document> implements IRead<T>, IWrite<T> {
	public readonly collection: Model<T>;

	constructor(coll: Model<T>) {
		this.collection = coll;
	}
	async find(query: any, session?: any): Promise<T[]> {
		return await this.collection.find(query, null, {session}).exec() as T[];
	}
	async findOne(query: any, session?: any): Promise<T> {
		return await this.collection.findOne(query).session(session).exec() as T;
	}
	async findById(id: string, session?: any): Promise<T> {
		return await this.collection.findById(id).session(session).exec() as T;
	}
	async createOne(item: T, session?: any): Promise<T> {
		return (await this.create(item, session))[0] as T;
	}
	async create(item: T, session?: any): Promise<any> {
		return await this.collection.create([item], {session});
	}
	async updateOne(id: string, item: UpdateQuery<T>, session?: any): Promise<T> {
		return await this.collection.findByIdAndUpdate(id, item, {session, new: true, useFindAndModify: false}).exec() as T;
	}
	async delete(id: string, session?: any): Promise<any> {
		return await this.collection.findByIdAndDelete(id, {session}).exec() as T;
	}
}