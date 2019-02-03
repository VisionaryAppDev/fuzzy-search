import { window, ExtensionContext, commands, workspace, TextEditor, QuickPickItem, Position } from 'vscode';

export function activate(context: ExtensionContext) {
    context.subscriptions.push(commands.registerCommand('extension.fuzzy-search', async () => {
        let activeEditor = window.activeTextEditor;
        if (activeEditor) {


            const item: QuickPickItem[] = getTextLineByLine(activeEditor);


            // HOLD: can't put it to pallete :(
            getUserSelectedText(activeEditor);

workspace.onDidChangeTextDocument
            const result = await window.showQuickPick(item, {
                onDidSelectItem: item => {
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


function locateSelectedLine(text: string) {
    return text.split(/\D/)[0];
}

function getUserSelectedText(activeEditor: TextEditor) {
    if (activeEditor.selection.active) {
        const selectedLine = { start: activeEditor.selection.start, end: activeEditor.selection.end };
        const isMultipleLineSelected = selectedLine.start.line !== selectedLine.end.line;


        if (!isMultipleLineSelected) {
            let wholeLineText = activeEditor.document.lineAt(selectedLine.start.line);
            let selectedText = wholeLineText.text.substring(selectedLine.start.character, selectedLine.end.character);

            console.log("User Selected Text is: " + selectedText);

            return selectedText;
        }
    }

    return "";
}



export function deactivate() { }
