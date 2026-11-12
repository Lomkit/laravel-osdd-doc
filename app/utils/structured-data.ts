// schema.org nodes of the site, rendered as JSON-LD by the home page and the docs pages

const repository = 'https://github.com/Lomkit/laravel-osdd'

export function webSiteNode(siteUrl: string) {
  return {
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    'name': 'Laravel OSDD',
    'url': siteUrl,
    'inLanguage': 'en'
  }
}

export function softwareNode(siteUrl: string) {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': `${siteUrl}/#software`,
    'name': 'Laravel OSDD',
    'codeRepository': repository
  }
}

export function softwareDetailsNode(siteUrl: string, description: string, release: string) {
  return {
    ...softwareNode(siteUrl),
    alternateName: 'lomkit/laravel-osdd',
    description,
    url: siteUrl,
    license: 'https://opensource.org/licenses/MIT',
    programmingLanguage: { '@type': 'ComputerLanguage', 'name': 'PHP' },
    runtimePlatform: ['PHP 8.3+', 'Laravel 13'],
    softwareVersion: release,
    author: { '@type': 'Organization', 'name': 'Lomkit', 'url': 'https://github.com/Lomkit' }
  }
}

export function jsonLdScript(graph: object[]) {
  return {
    key: 'structured-data',
    type: 'application/ld+json' as const,
    innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')
  }
}
