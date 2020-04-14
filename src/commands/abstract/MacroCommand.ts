import { Command } from "./Command";
import bind from "../../utils/bind";

export class MacroCommand {
  constructor(private readonly commands: Command[]) {}

  @bind
  execute() {
    this.commands.forEach(cmd => cmd.execute())
  }
}
