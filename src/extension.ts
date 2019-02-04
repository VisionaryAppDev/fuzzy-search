import { window, ExtensionContext, OverviewRulerLane, commands, TextEditor, QuickPickItem, Position, Selection } from 'vscode';
import { Decoration } from './decoration';
import { Config } from "./config";

export function activate(context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand('extension.fuzzy-search', async () => {
        const activeEditor = window.activeTextEditor;
        if (activeEditor) {
            const originatedCursorStartPosition = activeEditor.selection.start;
            const originatedCurosorEndPosition = activeEditor.selection.end;
            const item: QuickPickItem[] = getTextLineByLine(activeEditor);


            // HOLD: can't put it to pallete :(
            // getUserSelectedText(activeEditor);


            const result = await window.showQuickPick(item, {
                onDidSelectItem: item => {
                    const selectedLine = locateSelectedItemLine(item.label);
                    const position = new Position(selectedLine, 0);
                    moveCursorToProvidedPosition(activeEditor, position, position);
                    getEditorToCenter(activeEditor);



                    // Line Decoration
                    const currentLineTextCount = activeEditor.document.lineAt(position.line).text.length;
                    lineDecoration.setDecorationType(getLineDecorator());
                    lineDecoration.setDecorationOptions(position, currentLineTextCount);
                    activeEditor.setDecorations(lineDecoration.getDecorationType(), lineDecoration.getDecorationOptions());

                    // window.showInformationMessage(item.label);
                },
                ignoreFocusOut: true
            }).then((response) => {
                if (response === undefined) {
                    moveCursorToProvidedPosition(activeEditor, originatedCursorStartPosition, originatedCurosorEndPosition);
                    getEditorToCenter(activeEditor);
                }

                lineDecoration.removeDecoration();
            });
        }
    }));
}

const lineDecoration: Decoration = new Decoration();
const config: Config = new Config();



function moveCursorToProvidedPosition(activeEditor: TextEditor, anchor: Position, active: Position) {
    activeEditor.selection = new Selection(anchor, active);
}


export function getLineDecorator() {
    return window.createTextEditorDecorationType({
        borderWidth: '1px',
        borderStyle: 'solid',
        overviewRulerColor: config.borderRulerColor,
        overviewRulerLane: OverviewRulerLane.Right,
        light: {
            borderColor: config.borderLightThemeColor
        },
        dark: {
            borderColor: config.borderDarkThemeColor
        },
        backgroundColor: {
            id: "highlight.color"
        }
    });
}

export function getEditorToCenter(activeEditor: TextEditor) {
    const currentLine = activeEditor.selection.start.line;
    commands.executeCommand("revealLine", {
        lineNumber: currentLine,
        at: config.relocation
    })

}

export function getTextLineByLine(activeEditor: TextEditor) {
    return activeEditor.document.getText().split('\n').map((text, lineNum): QuickPickItem => {
        return { label: `${lineNum}: ${text}` };
    });
}


function locateSelectedItemLine(text: string): number {
    return Number.parseInt(text.split(/\D/)[0]);
}

// function getUserSelectedText(activeEditor: TextEditor) {
//     if (!activeEditor.selection.active) {
//         return "";
//     }


//     const selectedLine = { start: activeEditor.selection.start, end: activeEditor.selection.end };
//     const isMultipleLineSelected = selectedLine.start.line !== selectedLine.end.line;
//     if (!isMultipleLineSelected) {
//         let currentLineText = activeEditor.document.lineAt(selectedLine.start.line);
//         let currentLineSelectedText = currentLineText.text.substring(selectedLine.start.character, selectedLine.end.character);

//         console.log("User Selected Text is: " + currentLineSelectedText);

//         return currentLineSelectedText;
//     }
// }



export function deactivate() { }
