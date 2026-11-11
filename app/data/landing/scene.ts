export type SceneLayerKey = 'users' | 'orders' | 'billing' | 'osdd'

export interface SceneLayer {
  key: SceneLayerKey
  name: string
  x: number
  y: number
}

export interface SceneFile {
  label: string
  layer: SceneLayerKey
  slot: number
  messy: { x: number, y: number, r: number }
}

export const SCENE_HEIGHT = 78
export const CARD_WIDTH = 43
export const CARD_HEIGHT = 33
export const CHIP_WIDTH = 39
export const CHIP_HEIGHT = 5.8

export const sceneLayers: SceneLayer[] = [
  { key: 'billing', name: 'functional/billing', x: 2, y: 3 },
  { key: 'orders', name: 'functional/orders', x: 55, y: 3 },
  { key: 'osdd', name: 'technical/osdd', x: 2, y: 42 },
  { key: 'users', name: 'functional/users', x: 55, y: 42 }
]

export const sceneFiles: SceneFile[] = [
  { label: 'Order.php', layer: 'orders', slot: 0, messy: { x: 7, y: 10, r: -2 } },
  { label: 'InvoiceTest.php', layer: 'billing', slot: 2, messy: { x: 55, y: 11, r: 2 } },
  { label: 'osdd.php', layer: 'osdd', slot: 0, messy: { x: 4, y: 21, r: 1.5 } },
  { label: 'UserFactory.php', layer: 'users', slot: 1, messy: { x: 57, y: 20.5, r: -2.5 } },
  { label: 'SendInvoice.php', layer: 'billing', slot: 1, messy: { x: 9, y: 31.5, r: -1 } },
  { label: 'create_orders_table', layer: 'orders', slot: 2, messy: { x: 52, y: 31, r: 2.5 } },
  { label: 'User.php', layer: 'users', slot: 0, messy: { x: 5, y: 42, r: 2 } },
  { label: 'create_jobs_table', layer: 'osdd', slot: 2, messy: { x: 56, y: 41.5, r: -1.5 } },
  { label: 'OrderController.php', layer: 'orders', slot: 1, messy: { x: 8, y: 52.5, r: -2.5 } },
  { label: 'Invoice.php', layer: 'billing', slot: 0, messy: { x: 53, y: 53, r: 1 } },
  { label: 'create_cache_table', layer: 'osdd', slot: 1, messy: { x: 6, y: 63, r: 1.5 } },
  { label: 'UsersSeeder.php', layer: 'users', slot: 2, messy: { x: 55, y: 62.5, r: -2 } }
]

export function settledPosition(file: SceneFile): { x: number, y: number } {
  const layer = sceneLayers.find(candidate => candidate.key === file.layer)!

  return { x: layer.x + 2, y: layer.y + 10 + file.slot * 7.4 }
}

function messyCenter(label: string): [number, number] {
  const file = sceneFiles.find(candidate => candidate.label === label)!

  return [file.messy.x + CHIP_WIDTH / 2, file.messy.y + CHIP_HEIGHT / 2]
}

function tangle(from: string, to: string): string {
  const [x1, y1] = messyCenter(from)
  const [x2, y2] = messyCenter(to)

  return `M${x1} ${y1} Q${(x1 + x2) / 2 + 14} ${(y1 + y2) / 2 - 6} ${x2} ${y2}`
}

export const tangles: string[] = [
  ['Invoice.php', 'User.php'],
  ['OrderController.php', 'Invoice.php'],
  ['SendInvoice.php', 'UserFactory.php'],
  ['InvoiceTest.php', 'Order.php']
].map(([from, to]) => tangle(from!, to!))

export const requireEdges: { d: string, arrow: string }[] = [
  { d: 'M45 19.5 L53.6 19.5', arrow: 'M52.4 18.3 L54.6 19.5 L52.4 20.7 Z' },
  { d: 'M76.5 36 L76.5 40.6', arrow: 'M75.3 39.6 L76.5 41.8 L77.7 39.6 Z' },
  { d: 'M45 31 C53 31 61 32 61 40.6', arrow: 'M59.8 39.6 L61 41.8 L62.2 39.6 Z' }
]
