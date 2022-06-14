import { MailTemplate } from "../protocols/mail-template";

export class RememberDelayedBooksForUserTemplate implements MailTemplate {
  public constructor(
    private readonly _name: string,
  ) {}
  public asText(): string {
    return "Prezado " + this._name + ", você possui um livro em atraso que deverá ser entregue hoje."
  }
}