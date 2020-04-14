import { Editor, IShapeEditor, ShapeType } from "./Editor";
import { ISnapshot } from "./EditorSnapshot";
import { ILogger } from "../Logger/Logger";

export class WithLogger implements IShapeEditor {
  private editor: Editor;
  private logger: ILogger;

  private readonly shapeNames: Record<ShapeType, string> = {
    "0": "Circle",
    "3": "Triangle",
    "4": "Square",
    "5": "Pentagon",
    "6": "Hexagon",
  };
  
  constructor(editor: Editor, logger: ILogger) {
    this.editor = editor;
    this.logger = logger;
  }

  changeBorderColor(color: string): void {
    this.logger.log(`Border color changed to: ${color}`);
    this.editor.changeBorderColor(color);
  }

  changeBorderWidth(width: number): void {
    this.logger.log(`Border width changed to: ${width}`);
    this.editor.changeBorderWidth(width);
  }

  changeColor(color: string): void {
    this.logger.log(`Color changed to: ${color}`);
    this.editor.changeColor(color);
  }

  changeShape(shape: ShapeType): void {
    this.logger.log(`Shape changed to: ${this.shapeNames[shape]}`);
    this.editor.changeShape(shape);
  }

  changeSize(size: number): void {
    this.logger.log(`Size changed to: ${size}`);
    this.editor.changeSize(size);
  }

  loadFromSnapshot(snapshot: ISnapshot): void {
    this.editor.loadFromSnapshot(snapshot);
  }

  makeSnapshot(): ISnapshot {
    return this.editor.makeSnapshot();
  }

}
