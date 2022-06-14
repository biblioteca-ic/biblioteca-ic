import * as nodemailer from "nodemailer"
import * as mailConfig from "./configs/mail-config";
import { MailTemplate } from "./protocols/mail-template";

export class Mail {
  public async sendMail(to: string, subject: string, template: MailTemplate): Promise<void> {
    const transporter = await this.getTransporter()
    const mailOptions = {
      from: '"' + mailConfig.mail_name + '"' + '<' + mailConfig.mail_from + '>',
      to: to,
      subject: subject,
      text: template.asText(),
    }
    await transporter.sendMail(mailOptions, (error, info) => {
      console.log(error ?? 'Email sent: ' + info.response)
    })
  }

  private async getTransporter(): Promise<nodemailer.Transporter> {
    const transporter = nodemailer.createTransport({
      host: mailConfig.mail_host,
      port: mailConfig.mail_port,
      logger: mailConfig.mail_debug,
    });
    return transporter
  }
}