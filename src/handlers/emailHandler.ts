import nodemailer from 'nodemailer';
import { Response } from 'express';
import { connectRequestHtml } from '../emailTemplates/connectRequest';

class EmailHandler {
	get transporter(){
		return nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: process.env.SENDING_ADDRESS,
				pass: process.env.SENDING_ADDRESS_PASSWORD,
			},
		});
	}

	send = (
		data: any,
		res: Response
	) => {

		const mailOptions = {
			from: `VersaDev <${process.env.SENDING_ADDRESS}>`,
			to: process.env.RECEIVING_ADDRESS,
			subject: `Portfolio Connection Request - ${data.name}`,
			html: this.getEmailTemplateHtml(data),
		};

		this.transporter.sendMail(mailOptions);
		res.send({ emailSent: true });
	};

	getEmailTemplateHtml = (data: any) => {
		let html = connectRequestHtml.replace(/{name}/g, data.name);
		html = html.replace(/{email}/g, data.email);
		html = html.replace(/{service}/g, data.service);
		html = html.replace(/{message}/g, data.message);

		return html;
	};
}

const emailHandler = new EmailHandler();
export default emailHandler;
