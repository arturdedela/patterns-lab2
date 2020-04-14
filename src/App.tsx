import React, { ChangeEvent, createRef, PureComponent } from "react";
import "./App.css";
import { Editor, IShapeEditor, ShapeType } from "./Editor/Editor";
import { ChangeShapeCommand } from "./commands/ChangeShapeCommand";
import { CommandsHistory } from "./CommandsHistory/CommandsHistory";
import { Command } from "./commands/abstract/Command";
import { ChangeSizeCommand } from "./commands/ChangeSizeCommand";
import bind from "./utils/bind";
import { WithLogger } from "./Editor/WithLogger";
import { Logger } from "./Logger/Logger";
import { ChangeBorderWidthCommand } from "./commands/ChangeBorderWidthCommand";
import { observer } from "mobx-react";
import { ChangeColorCommand } from "./commands/ChangeColorCommand";
import { ChangeBorderColorCommand } from "./commands/ChangeBorderColorCommand";
import { MacroCommand } from "./commands/abstract/MacroCommand";

interface IState {
  shapeType: ShapeType;
  size: number;
  color: string;
  borderWidth: number;
  borderColor: string;
}

@observer
class App extends PureComponent<{}, IState> {
  private twoJsContainerRef = createRef<HTMLDivElement>();

  state: IState = {
    shapeType: ShapeType.Circle,
    size: 50,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#000"
  };

  private editor!: IShapeEditor;
  private history: CommandsHistory = new CommandsHistory();
  private logger: Logger = new Logger();
  private macroCommands: MacroCommand[] = [];

  componentDidMount(): void {
    const container = this.twoJsContainerRef.current;
    if (!container) {
      return;
    }

    this.editor = new WithLogger(
      new Editor(container, container.clientWidth, container.clientHeight),
      this.logger
    );
  }

  private executeCommand(command: Command) {
    command.execute();
    this.history.push(command);
  }

  @bind
  private changeShape() {
    this.executeCommand(
      new ChangeShapeCommand(this.editor, this.state.shapeType)
    );
  }

  @bind
  private changeSize() {
    this.executeCommand(new ChangeSizeCommand(this.editor, this.state.size));
  }

  @bind
  private changeColor() {
    this.executeCommand(new ChangeColorCommand(this.editor, this.state.color));
  }

  @bind
  private changeBorderWidth() {
    this.executeCommand(
      new ChangeBorderWidthCommand(this.editor, this.state.borderWidth)
    );
  }

  @bind
  private changeBorderColor() {
    this.executeCommand(
      new ChangeBorderColorCommand(this.editor, this.state.borderColor)
    );
  }

  @bind
  private handleSelectShape(e: ChangeEvent<HTMLSelectElement>) {
    this.setState({
      ...this.state,
      shapeType: Number(e.target.value) as ShapeType
    });
  }

  @bind
  private handleInputSize(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      size: Number(e.target.value)
    });
  }

  @bind
  private handleInputColor(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      color: e.target.value
    });
  }

  @bind
  private handleInputBorderWidth(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      borderWidth: Number(e.target.value)
    });
  }

  @bind
  private handleInputBorderColor(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      borderColor: e.target.value
    });
  }

  @bind
  private undo() {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.logger.log("Undo");
    }
  }

  @bind
  private handleMacroRecordClick() {
    if (this.history.isMacroRecording) {
      const macroCommand = this.history.endMacroRecord();
      if (macroCommand) {
        this.macroCommands.push(macroCommand);
      }
    } else {
      this.history.startMacroRecord();
    }
  }

  render() {
    return (
      <div className="app">
        <div className="macro-commands">
          Macro commands
          {this.macroCommands.map((cmd, i) => (
            <button onClick={cmd.execute}>Macro {i}</button>
          ))}
        </div>
        <div ref={this.twoJsContainerRef} className="twojs-container" />
        <div className="log">
          {this.logger.getLogs().map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </div>
        <div className="controls">
          <div>
            <select
              value={this.state.shapeType}
              onChange={this.handleSelectShape}
            >
              <option value={ShapeType.Circle}>Circle</option>
              <option value={ShapeType.Triangle}>Triangle</option>
              <option value={ShapeType.Square}>Square</option>
              <option value={ShapeType.Pentagon}>Pentagon</option>
              <option value={ShapeType.Hexagon}>Hexagon</option>
            </select>
            <button onClick={this.changeShape}>Change shape</button>
          </div>

          <div>
            <p>{this.state.size}</p>
            <input
              type="range"
              value={this.state.size}
              min={5}
              max={100}
              onChange={this.handleInputSize}
            />
            <button onClick={this.changeSize}>Change size</button>
          </div>

          <div>
            <input value={this.state.color} onChange={this.handleInputColor} />
            <button onClick={this.changeColor}>Change color</button>
          </div>

          <div>
            <p>{this.state.borderWidth}</p>
            <input
              type="range"
              value={this.state.borderWidth}
              min={1}
              max={30}
              onChange={this.handleInputBorderWidth}
            />
            <button onClick={this.changeBorderWidth}>
              Change border width
            </button>
          </div>

          <div>
            <input
              value={this.state.borderColor}
              onChange={this.handleInputBorderColor}
            />
            <button onClick={this.changeBorderColor}>
              Change border color
            </button>
          </div>

          <div>
            <button disabled={!this.history.length} onClick={this.undo}>
              Undo
            </button>
            <button
              onClick={this.handleMacroRecordClick}
            >
              {this.history.isMacroRecording ? "Stop record" : "Record macro"}
            </button>
            <button onClick={this.logger.clear}>Clear logs</button>
            <button onClick={this.logger.save}>Save logs</button>
          </div>
        </div>

        <div className="about">
          <div className="about-popup">
            <p>Group: 8T30-402Б-16</p>
            <p>Student: Dedela Artur</p>
            <p>
              Task: Реализовать оконное приложение, позволяющее модифицировать
              параметры фигуры: тип (круг, правильный треугольник, квадрат,
              правильный пятиугольник, правильный шестиугольник), размер
              (расстояние от центра масс до вершины – в пределах от 5 до 100 пикселей),
              цвет границы, цвет заливки, толщину границы (в пределах от 1 до 30
              пикселей). Каждое действие должно представлять собой объект,
              реализующий паттерн “команда”. Реализовать возможность записи
              макрокоманд (максимум – 5 действий) с возможностью последующего
              исполнения. Все действия (в том числе и макрокоманда) должны быть
              отменяемыми (паттерн “хранитель”). Действия над фигурой должны
              сохраняться в журнал действий при помощи применения паттерна
              “заместитель”. Журнал действий должен отображаться в
              пользовательском интерфейсе; реализовать опции очистки журнала и
              сохранения журнала в файл.
            </p>
          </div>
          About
        </div>
      </div>
    );
  }
}

export default App;
