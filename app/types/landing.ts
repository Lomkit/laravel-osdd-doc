export type TerminalLineKind = 'command' | 'comment' | 'output' | 'success' | 'error' | 'warning'

export interface TerminalLine {
  kind: TerminalLineKind
  text: string
}
