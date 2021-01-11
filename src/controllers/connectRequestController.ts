import { Request, Response } from 'express';
import { ConnectRequestRepo } from '../repo/connectRequest/connectRequestRepo';
import ConnectRequest, { IConnectRequest } from '../models/connectRequest';
import emailHandler from '../handlers/emailHandler';
import { emailConfig } from '../config/emailConfig';

export const handleConnectRequest = async (req: Request, res: Response) => {
	if(ConnectRequest){
		const connectRequest: IConnectRequest = new ConnectRequest({
			name: req.body.name,
			email: req.body.email,
			service: req.body.service,
			message: req.body.message
		});

		await ConnectRequestRepo.createOne(connectRequest);

		emailHandler.send(emailConfig.sendTo, 'connectRequest', req.body, res);
	}
}