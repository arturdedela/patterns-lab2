import { Command } from "../commands/abstract/Command";
import { MacroCommand } from "../commands/abstract/MacroCommand";
import { action, observable } from "mobx";

export class CommandsHistory {
  private history: Command[] = [];
  private macroStartIndex: number = 0;
  @observable isMacroRecording: boolean = false;

  get length() {
    return this.history.length;
  }

  push(command: Command) {
    this.history.push(command);
  }

  pop(): Command | undefined {
    return this.history.pop();
  }

  @action.bound
  startMacroRecord() {
    this.isMacroRecording = true;

    this.macroStartIndex = this.history.length;
  }

  @action.bound
  endMacroRecord(): MacroCommand | undefined {
    this.isMacroRecording = false;

    const macroCmd = this.history.slice(this.macroStartIndex);
    if (macroCmd.length === 0) {
      return;
    }

    return new MacroCommand(macroCmd);
  }
}
