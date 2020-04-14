import { Command } from "./abstract/Command";
import { IShapeEditor } from "../Editor/Editor";

export class ChangeSizeCommand extends Command {
  private readonly size: number;

  constructor(editor: IShapeEditor, size: number) {
    super(editor);
    this.size = size
  }
  execute(): void {
    this.saveBackup();
    this.editor.changeSize(this.size);
  }
}
