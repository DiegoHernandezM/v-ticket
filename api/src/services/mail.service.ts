import nodemailer from 'nodemailer';

interface SendMailDTO {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export class MailService {
  private transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === 'true',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async sendMail(data: SendMailDTO) {
    if (!data.to) {
      return;
    }

    return this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });
  }
}