import { MailTemplate } from "../protocols/mail-template";

export class RememberToReturnTodayTemplate implements MailTemplate {
  public constructor(
    private readonly _name: string,
  ) {}
  public asText(): string {
    return "Prezado " + this._name + ", você possui um livro que deverá ser renovado/entregue hoje."
  }
}