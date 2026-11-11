export interface Point {
  x: number
  y: number
}

export interface GraphLayout {
  width: number
  height: number
  node: { w: number, h: number }
  positions: Record<string, Point>
  cycleBend: Point
}

export const graphRequires: Record<string, string[]> = {
  'functional/billing': ['functional/orders', 'functional/users', 'technical/payments'],
  'functional/catalog': [],
  'functional/orders': ['functional/catalog', 'functional/users'],
  'functional/users': [],
  'technical/osdd': [],
  'technical/payments': []
}

export const CYCLE_EDGE = { from: 'functional/users', to: 'functional/billing' }

export const graphLayouts: Record<'wide' | 'narrow', GraphLayout> = {
  wide: {
    width: 100,
    height: 56,
    node: { w: 20, h: 11 },
    positions: {
      'functional/billing': { x: 12, y: 28 },
      'functional/orders': { x: 45, y: 12 },
      'technical/payments': { x: 45, y: 44 },
      'functional/catalog': { x: 82, y: 7.5 },
      'functional/users': { x: 82, y: 28 },
      'technical/osdd': { x: 82, y: 48.5 }
    },
    cycleBend: { x: 47, y: 36 }
  },
  narrow: {
    width: 100,
    height: 84,
    node: { w: 31, h: 13 },
    positions: {
      'functional/billing': { x: 50, y: 9 },
      'functional/orders': { x: 17, y: 40 },
      'technical/payments': { x: 83, y: 40 },
      'functional/catalog': { x: 17, y: 74 },
      'functional/users': { x: 50, y: 74 },
      'technical/osdd': { x: 83, y: 74 }
    },
    cycleBend: { x: 66, y: 41 }
  }
}

export function graphNames(requires: Record<string, string[]>): string[] {
  return Object.keys(requires).sort()
}

export function dependentsOf(requires: Record<string, string[]>, layer: string): string[] {
  return graphNames(requires).filter(name => requires[name]!.includes(layer))
}

function reachable(requires: Record<string, string[]>, from: string): Set<string> {
  const reached = new Set<string>()
  const pending = [...requires[from]!]

  while (pending.length > 0) {
    const layer = pending.pop()!

    if (!reached.has(layer)) {
      reached.add(layer)
      pending.push(...requires[layer]!)
    }
  }

  return reached
}

export function transitiveRequires(requires: Record<string, string[]>, layer: string): string[] {
  return [...reachable(requires, layer)].sort()
}

/**
 * One shortest cycle per group of mutually requiring layers, from the first layer by name, like osdd:check.
 */
export function layerCycles(requires: Record<string, string[]>): string[][] {
  const seen = new Set<string>()
  const cycles: string[][] = []

  for (const start of graphNames(requires)) {
    const fromStart = reachable(requires, start)

    if (seen.has(start) || !fromStart.has(start)) {
      continue
    }

    const group = graphNames(requires).filter(name => fromStart.has(name) && reachable(requires, name).has(start))
    group.forEach(name => seen.add(name))

    const paths = [[start]]
    const visited = new Set([start])

    search: while (paths.length > 0) {
      const path = paths.shift()!

      for (const next of [...requires[path.at(-1)!]!].sort()) {
        if (next === start) {
          cycles.push([...path, start])
          break search
        }

        if (group.includes(next) && !visited.has(next)) {
          visited.add(next)
          paths.push([...path, next])
        }
      }
    }
  }

  return cycles
}

export function borderPoint(center: Point, toward: Point, node: { w: number, h: number }, gap = 0.8): Point {
  const dx = toward.x - center.x
  const dy = toward.y - center.y
  const scale = Math.min((node.w / 2 + gap) / Math.abs(dx || 1e-9), (node.h / 2 + gap) / Math.abs(dy || 1e-9))

  return { x: center.x + dx * scale, y: center.y + dy * scale }
}

export function mermaidEdges(requires: Record<string, string[]>): { from: string, to: string, text: string }[] {
  const id = (layer: string) => layer.replace(/[^A-Za-z0-9_]/g, '_')

  return graphNames(requires).flatMap(from => [...requires[from]!].sort().map(to => ({
    from,
    to,
    text: `    ${id(from)} --> ${id(to)}`
  })))
}
