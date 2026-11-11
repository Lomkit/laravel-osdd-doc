export type TerminalLine
  = | { kind: 'command', text: string }
    | { kind: 'info' | 'success' | 'error' | 'comment' | 'added', text: string }
    | { kind: 'detail', left: string, right: string }
    | { kind: 'prompt', label: string, answer: string }
    | { kind: 'blank' }

export interface TerminalStep {
  title: string
  description: string
  lines: TerminalLine[]
}

export const terminalSteps: TerminalStep[] = [
  {
    title: 'Convert a fresh app',
    description: 'osdd:start creates the functional/users and technical/osdd layers, then removes app/ and config/.',
    lines: [
      { kind: 'command', text: 'php artisan osdd:start --force' },
      { kind: 'info', text: 'Layer functional/users created at functional/users.' },
      { kind: 'info', text: 'Layer technical/osdd created at technical/osdd.' },
      { kind: 'info', text: 'Deleted app/ directory.' },
      { kind: 'info', text: 'Deleted config/ directory.' },
      { kind: 'info', text: 'Emptied database/ directory, kept database/database.sqlite.' },
      { kind: 'info', text: 'Congratulations! Your project is ready for OSDD. Create your first layer with php artisan osdd:layer.' },
      { kind: 'prompt', label: 'Run composer update now?', answer: 'Yes' },
      { kind: 'info', text: 'Running composer update...' }
    ]
  },
  {
    title: 'Create a layer per domain',
    description: 'osdd:layer writes the package, registers it in your composer.json and runs the generators inside it.',
    lines: [
      { kind: 'command', text: 'php artisan osdd:layer functional/orders --generators=model,provider' },
      { kind: 'info', text: 'Model [functional/orders/src/Models/Order.php] created successfully.' },
      { kind: 'info', text: 'Layer functional/orders created at functional/orders.' },
      { kind: 'prompt', label: 'Run composer update now?', answer: 'Yes' },
      { kind: 'info', text: 'Running composer update...' }
    ]
  },
  {
    title: 'Check the boundaries',
    description: 'Order uses User, but functional/orders does not require functional/users. osdd:check fails until it does.',
    lines: [
      { kind: 'command', text: 'php artisan osdd:check' },
      { kind: 'error', text: 'functional/orders uses functional/users but does not require it.' },
      { kind: 'detail', left: 'functional/orders/src/Models/Order.php:7', right: 'Functional\\Users\\Models\\User' },
      { kind: 'blank' },
      { kind: 'error', text: '1 boundary violation in 3 layers.' },
      { kind: 'comment', text: '# functional/orders/composer.json' },
      { kind: 'added', text: '+ "require": { "functional/users": "*" }' },
      { kind: 'command', text: 'php artisan osdd:check' },
      { kind: 'success', text: 'No boundary violation in 3 layers.' }
    ]
  }
]

export const TYPING_SPEED = 42
export const OUTPUT_GAP = 110
export const STEP_PAUSE = 1300

export interface TimedLine {
  line: TerminalLine
  step: number
  start: number
  end: number
}

export function terminalTimeline(steps: TerminalStep[]): { lines: TimedLine[], stepStarts: number[], total: number } {
  const lines: TimedLine[] = []
  const stepStarts: number[] = []
  let cursor = 400

  steps.forEach((step, index) => {
    stepStarts.push(cursor)

    for (const line of step.lines) {
      const typed = line.kind === 'command' ? (line.text.length / TYPING_SPEED) * 1000 : 0
      const lead = line.kind === 'command' && lines.length > 0 ? 500 : 0
      const start = cursor + lead
      const pause = line.kind === 'command' ? 450 : (line.kind === 'prompt' ? 800 : OUTPUT_GAP)
      const end = start + typed + pause

      lines.push({ line, step: index, start, end })
      cursor = end
    }

    cursor += STEP_PAUSE
  })

  return { lines, stepStarts, total: cursor }
}
