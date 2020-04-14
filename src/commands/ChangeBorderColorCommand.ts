import { Command } from "./abstract/Command";
import { IShapeEditor } from "../Editor/Editor";

export class ChangeBorderColorCommand extends Command {
  private readonly color: string;

  constructor(editor: IShapeEditor, color: string) {
    super(editor);
    this.color = color;
  }

  execute(): void {
    this.saveBackup();
    this.editor.changeBorderColor(this.color);
  }
}
