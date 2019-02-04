import { DecorationOptions, TextEditorDecorationType, Range, Position } from "vscode";

export class Decoration {
    private _decorationOptions: DecorationOptions[] = [];

    private _decorationType: TextEditorDecorationType[] = [];


    constructor() {

    }


    getDecorationOptions(): DecorationOptions[] {
        return this._decorationOptions;
    }

    setDecorationOptions(cursorCurrentPosition: Position, currentLineTextCount: number) {
        while (this._decorationOptions.length >= 1) {
            this._decorationOptions.reverse().pop();
        }

        this._decorationOptions.push({ range: new Range(cursorCurrentPosition, new Position(cursorCurrentPosition.line, currentLineTextCount)) });
    }


    getDecorationType(): TextEditorDecorationType {
        while (this._decorationType.length >= 2) {
            this._decorationType[0].dispose();
            this._decorationType.reverse().pop();
        }

        return this._decorationType[0];
    }

    setDecorationType(decorationType: TextEditorDecorationType) {
        this._decorationType.push(decorationType);
    }

    removeDecoration() {
        while (this._decorationType.length >= 1) {
            this._decorationType[0].dispose();
            this._decorationType.reverse().pop();
        }
    }




}