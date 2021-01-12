import mongoose, { Document, Schema, Model, model } from 'mongoose';

export interface IConnectRequest extends Document {
	_id: string;
	name: string;
	email: string;
	service: string;
	message: string;
}

export const ConnectRequestSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	service: { type: String, required: true },
	message: { type: String, required: true },
});

let ConnectRequest: Model<IConnectRequest> | undefined;
try {
	ConnectRequest = mongoose.model('ConnectRequest');
} catch (error) {
	ConnectRequest = model<IConnectRequest>(
		'ConnectRequest',
		ConnectRequestSchema
	);
}

export default ConnectRequest;
