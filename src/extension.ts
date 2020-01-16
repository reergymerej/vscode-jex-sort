import * as vscode from 'vscode'

const reverse = (text: string) => {
  return text.split('\n')
    .reverse()
    .join('\n')
}

const sort = (text: string) => {
  return text.split('\n')
    .sort()
    .join('\n')
}

const desc = (text: string) => {
  return reverse(sort(text))
}

const replaceText = (editor: vscode.TextEditor, text: string) => {
  const textDocument = editor.document
  const invalidRange = new vscode.Range(0, 0, textDocument.lineCount, 0)
  const fullRange = textDocument.validateRange(invalidRange)
  return editor.edit(edit => edit.replace(fullRange, text))
}

export const activate = (context: vscode.ExtensionContext) => {
  const commands = [
    vscode.commands.registerCommand('extension.jex.reverse', () => {
      const editor = vscode.window.activeTextEditor
      if (editor) {
        return replaceText(editor, reverse(editor.document.getText()))
      }
    }),

    vscode.commands.registerCommand('extension.jex.sort', () => {
      const editor = vscode.window.activeTextEditor
      if (editor) {
        return replaceText(editor, sort(editor.document.getText()))
      }
    }),

    vscode.commands.registerCommand('extension.jex.sort-desc', () => {
      const editor = vscode.window.activeTextEditor
      if (editor) {
        return replaceText(editor, desc(editor.document.getText()))
      }
    }),
  ]

  commands.forEach(command => context.subscriptions.push(command))
}

export function deactivate() {}
