import { Request, Response } from 'express';
import { ConnectRequestRepo } from '../repo/connectRequest/connectRequestRepo';
import ConnectRequest, { IConnectRequest } from '../models/connectRequest';
import emailHandler from '../handlers/emailHandler';

export const handleConnectRequest = async (req: Request, res: Response) => {
	if(ConnectRequest){
		const connectRequest: IConnectRequest = new ConnectRequest({
			name: req.body.name,
			email: req.body.email,
			service: req.body.service,
			message: req.body.message
		});

		await ConnectRequestRepo.createOne(connectRequest);

		console.log(`connectRequestData: ${JSON.stringify(connectRequest)}`)

		emailHandler.send(req.body, res);
	}
}