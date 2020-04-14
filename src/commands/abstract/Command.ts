import { IShapeEditor } from "../../Editor/Editor";
import { ISnapshot } from "../../Editor/EditorSnapshot";

export abstract class Command {
  protected editor: IShapeEditor;
  protected backup?: ISnapshot;

  protected constructor(editor: IShapeEditor) {
    this.editor = editor;
  }

  undo() {
    if (!this.backup) {
      throw new Error("No backup was saved");
    }

    this.editor.loadFromSnapshot(this.backup);
  }

  saveBackup() {
    this.backup = this.editor.makeSnapshot();
  }

  abstract execute(): unknown;
}
