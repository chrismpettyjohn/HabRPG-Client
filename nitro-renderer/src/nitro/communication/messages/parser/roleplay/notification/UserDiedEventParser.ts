import { IMessageDataWrapper, IMessageParser } from "../../../../../../api";

export interface UserDiedEvent {
  victimUserId: number;
  victimUserName: string;
  victimUserFigure: string;
  attackerUserId: number;
  attackerUserName: string;
  attackerUserFigure: string;
}

export class UserDiedEventParser implements IMessageParser {
  private _victimUserId: number;
  private _victimUserName: string;
  private _victimUserFigure: string;
  private _attackerUserId: number;
  private _attackerUserName: string;
  private _attackerUserFigure: string;

  public flush(): boolean {
    this._victimUserId = -1;
    this._victimUserName = "";
    this._victimUserFigure = "";
    this._attackerUserId = -1;
    this._attackerUserName = "";
    this._attackerUserFigure = "";
    return true;
  }

  public parse(wrapper: IMessageDataWrapper): boolean {
    if (!wrapper) return false;

    this._victimUserId = wrapper.readInt();
    this._victimUserName = wrapper.readString();
    this._victimUserFigure = wrapper.readString();
    this._attackerUserId = wrapper.readInt();
    this._attackerUserName = wrapper.readString();
    this._attackerUserFigure = wrapper.readString();

    return true;
  }

  public get data(): UserDiedEvent {
    return {
      victimUserId: this._victimUserId,
      victimUserName: this._victimUserName,
      victimUserFigure: this._victimUserFigure,
      attackerUserId: this._attackerUserId,
      attackerUserName: this._attackerUserName,
      attackerUserFigure: this._attackerUserFigure,
    };
  }
}
