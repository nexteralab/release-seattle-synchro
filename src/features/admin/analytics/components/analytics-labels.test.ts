import { describe, expect, it } from 'vitest'
import { COUNTRY_CENTROIDS, countryFlag, countryName } from './country-centroids'
import { sourceHost, sourceLabel } from './source-icons'

describe('sourceHost', () => {
  it('normaliza URLs, tokens utm y dominios sueltos', () => {
    expect(sourceHost('https://www.google.com/search?q=x')).toBe('google.com')
    expect(sourceHost('instagram')).toBe('instagram.com')
    expect(sourceHost('FB')).toBe('facebook.com')
    expect(sourceHost('ejemplo.com')).toBe('ejemplo.com')
  })

  it('colapsa subdominios de redirección al dominio de marca', () => {
    expect(sourceHost('https://l.instagram.com/')).toBe('instagram.com')
    expect(sourceHost('https://search.google.com/')).toBe('google.com')
    expect(sourceHost('https://lm.facebook.com/l.php')).toBe('facebook.com')
    expect(sourceHost('https://www.bing.com/')).toBe('bing.com')
    // Sufijo de segundo nivel: conserva las tres etiquetas.
    expect(sourceHost('https://www.google.co.uk/')).toBe('google.co.uk')
  })

  it('devuelve null cuando la fuente no es un sitio web', () => {
    expect(sourceHost('newsletter')).toBeNull()
    expect(sourceHost('no-es-un-dominio')).toBeNull()
    expect(sourceHost('http://[')).toBeNull() // URL inválida, no debe tirar
    expect(sourceLabel('newsletter')).toBe('newsletter')
  })
})

describe('countries', () => {
  it('resuelve nombre y bandera desde el ISO-2', () => {
    expect(countryName('US')).toBe('United States')
    expect(countryFlag('CO')).toBe('🇨🇴')
  })

  it('deja pasar valores que no son ISO-2', () => {
    expect(countryName('unknown')).toBe('unknown')
    expect(countryFlag('unknown')).toBe('')
  })

  it('tiene centroide para los países más frecuentes', () => {
    for (const code of ['US', 'CO', 'MX', 'ES', 'CA', 'GB', 'BR']) {
      expect(COUNTRY_CENTROIDS[code]).toHaveLength(2)
    }
  })
})
