import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { Response } from 'express';
import { connectRequestHtml } from '../emailTemplates/connectRequest';

const emailConfig = {
	address: process.env.SENDING_ADDRESS,
	password: process.env.SENDING_ADDRESS_PASSWORD,
	sendTo: process.env.RECEIVING_ADDRESS
}

class EmailHandler {
	transporter: Mail = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: emailConfig.address,
			pass: emailConfig.password,
		},
	});

	send = (
		data: any,
		res: Response
	) => {
		const mailOptions = {
			from: `VersaDev <${emailConfig.address}>`,
			to: emailConfig.sendTo,
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
