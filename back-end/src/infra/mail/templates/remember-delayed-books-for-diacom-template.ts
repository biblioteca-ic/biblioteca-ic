import { MailTemplate } from "../protocols/mail-template";

export class RememberDelayedBooksForDiacomTemplate implements MailTemplate {
  public constructor(
    private readonly _name: string,
    private readonly _days: number,
  ) {}
  public asText(): string {
    return "Olá, o aluno " + this._name + "está com um livro atrasado há " + this._days + " dias."
  }
}