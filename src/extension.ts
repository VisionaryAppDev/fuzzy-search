import { window, ExtensionContext, commands, TextEditor, QuickPickItem, Position, Selection } from 'vscode';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand('extension.fuzzy-search', async () => {
        let activeEditor = window.activeTextEditor;
        if (activeEditor) {
            const item: QuickPickItem[] = getTextLineByLine(activeEditor);


            // HOLD: can't put it to pallete :(
            getUserSelectedText(activeEditor);




            const result = await window.showQuickPick(item, {
                onDidSelectItem: item => {
                    const selectedLine = locateSelectedLine(item.label);
                    const position = new Position(selectedLine, 2);
                    activeEditor.selection = new Selection(position, position);


                    window.showInformationMessage(item.label)
                },
                placeHolder: "place holder",
                ignoreFocusOut: true
            });
        }
    }));
}



export function getTextLineByLine(activeEditor: TextEditor) {
    return activeEditor.document.getText().split('\n').map((text, lineNum): QuickPickItem => {
        return { label: `${lineNum}: ${text}` };
    });
}


function locateSelectedLine(text: string) : number{
    return Number.parseInt( text.split(/\D/)[0]);
}

function getUserSelectedText(activeEditor: TextEditor) {
    if (!activeEditor.selection.active){
        return "";
    }

    
    const selectedLine = { start: activeEditor.selection.start, end: activeEditor.selection.end };
    const isMultipleLineSelected = selectedLine.start.line !== selectedLine.end.line;
    if (!isMultipleLineSelected) {
        let currentLineText = activeEditor.document.lineAt(selectedLine.start.line);
        let currentLineSelectedText = currentLineText.text.substring(selectedLine.start.character, selectedLine.end.character);

        console.log("User Selected Text is: " + currentLineSelectedText);

        return currentLineSelectedText;
    }
}



export function deactivate() { }
