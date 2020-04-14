import { IShapeOptions } from "./Editor";

export interface ISnapshot {
  getDate(): Date;
}

export class EditorSnapshot implements ISnapshot {
  private readonly state: IShapeOptions;
  private readonly date: Date;

  constructor(state: IShapeOptions) {
    this.state = state;
    this.date = new Date();
  }

  getDate(): Date {
    return this.date;
  }

  getState(): IShapeOptions {
    return this.state;
  }
}
