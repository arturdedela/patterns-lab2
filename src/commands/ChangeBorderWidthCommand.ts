import { Command } from "./abstract/Command";
import { IShapeEditor } from "../Editor/Editor";

export class ChangeBorderWidthCommand extends Command {
  private readonly width: number;

  constructor(editor: IShapeEditor, width: number) {
    super(editor);
    this.width = width;
  }

  execute(): void {
    this.saveBackup();
    this.editor.changeBorderWidth(this.width);
  }
}

