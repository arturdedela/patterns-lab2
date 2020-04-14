import TwoJs from 'two.js';
import { EditorSnapshot, ISnapshot } from "./EditorSnapshot";

export enum ShapeType {
  Circle,
  Triangle = 3,
  Square,
  Pentagon,
  Hexagon,
}

export interface IShapeOptions {
  type: ShapeType;
  size: number;
  color: string;
  borderWidth: number;
  borderColor: string;
}

export interface IShapeEditor {
  changeShape(shape: ShapeType): void;
  changeSize(size: number): void;
  changeColor(color: string): void;
  changeBorderWidth(width: number): void;
  changeBorderColor(color: string): void;
  loadFromSnapshot(snapshot: ISnapshot): void;
  makeSnapshot(): ISnapshot;
}

export class Editor implements IShapeEditor {
  private two: TwoJs;
  private readonly centerX: number;
  private readonly centerY: number;

  private shapeOptions: IShapeOptions = {
    type: ShapeType.Circle,
    color: "#fff",
    size: 50,
    borderWidth: 1,
    borderColor: "#000"
  };

  constructor(elem: HTMLElement, width: number, height: number) {
    this.two = new TwoJs({ width, height }).appendTo(elem);
    this.centerX = width / 2;
    this.centerY = height / 2;

    this.render();
  }
  
  private render() {
    this.two.clear();

    const { type, size, color, borderColor, borderWidth } = this.shapeOptions;
    let shape;

    if (type === ShapeType.Circle) {
      shape = this.two.makeCircle(this.centerX, this.centerY, size);
    } else {
      shape = this.two.makePolygon(this.centerX, this.centerY, size, type);
    }

    shape.fill = color;
    shape.stroke = borderColor;
    shape.linewidth = borderWidth;

    this.two.update();
  }

  changeShape(shape: ShapeType) {
    this.shapeOptions.type = shape;
    this.render();
  }

  changeSize(size: number) {
    this.shapeOptions.size = size;
    this.render();
  }

  changeColor(color: string) {
    this.shapeOptions.color = color;
    this.render();
  }

  changeBorderWidth(width: number) {
    this.shapeOptions.borderWidth = width;
    this.render();
  }

  changeBorderColor(color: string) {
    this.shapeOptions.borderColor = color;
    this.render();
  }

  loadFromSnapshot(snapshot: ISnapshot) {
    const editorSnapshot = snapshot as EditorSnapshot;
    this.shapeOptions = editorSnapshot.getState();
    this.render();
  }

  makeSnapshot(): ISnapshot {
    return new EditorSnapshot({ ...this.shapeOptions });
  }
}
