import { action, observable } from "mobx";
import dayjs from "dayjs";

export interface ILogger {
  log(message: string): void;
  getLogs(): string[];
}

export class Logger implements ILogger {
  @observable private logs: string[] = [];

  getLogs(): string[] {
    return this.logs;
  }

  @action.bound
  clear() {
    this.logs = [];
  }

  @action.bound
  save() {
    const blob = new Blob(this.logs, { type: 'text/plain' });
    const anchor = document.createElement('a');

    anchor.download = "logs.txt";
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();
  }

  log(message: string): void {
    this.logs.push(`[${dayjs().format("HH:mm:ss")}] ${message}\n`);
  }
}
