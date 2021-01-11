import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { emailConfig } from '../config/emailConfig';
import { Response } from 'express';
import { connectRequestHtml } from '../emailTemplates/connectRequest';

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
		recipientEmail: string,
		templateName: string,
		data: any,
		res: Response
	) => {
		const templateConfig: any = emailConfig.templates[templateName];
		const self = this;
		const html = this.getEmailTemplateHtml(
			templateConfig.htmlFileName,
			data
		);

		const mailOptions = {
			from: `VersaDev <${emailConfig.address}>`,
			to: recipientEmail,
			subject: `${templateConfig.subject} - ${data.name}`,
			html,
		};

		const info = self.transporter.sendMail(mailOptions);
		res.send({ emailSent: true });
	};

	getEmailTemplateHtml = (templateName: string, data: any) => {
		let html = '';
		switch (templateName) {
			case 'connectRequest':
				html = connectRequestHtml.replace(/{name}/g, data.name);
				html = html.replace(/{email}/g, data.email);
				html = html.replace(/{service}/g, data.service);
				html = html.replace(/{message}/g, data.message);
				break;
			default:
				break;
		}

		return html;
	};
}

const emailHandler = new EmailHandler();
export default emailHandler;
