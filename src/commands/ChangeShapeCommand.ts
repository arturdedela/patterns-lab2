import { Command } from "./abstract/Command";
import { IShapeEditor, ShapeType } from "../Editor/Editor";

export class ChangeShapeCommand extends Command {
  private readonly shape: ShapeType;

  constructor(editor: IShapeEditor, shape: ShapeType) {
    super(editor);
    this.shape = shape;
  }

  execute(): void {
    this.saveBackup();
    this.editor.changeShape(this.shape);
  }
}
