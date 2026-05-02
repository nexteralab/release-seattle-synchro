import { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react'

type Theme = 'dark' | 'light' | 'system'
type ResolvedTheme = Exclude<Theme, 'system'>

const DEFAULT_THEME = 'system'
const THEME_STORAGE_KEY = 'vite-ui-theme'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string  // se ignora — siempre usa THEME_STORAGE_KEY para coincidir con el script
}

type ThemeProviderState = {
  defaultTheme: Theme
  resolvedTheme: ResolvedTheme
  theme: Theme
  setTheme: (theme: Theme) => void
  resetTheme: () => void
}

const initialState: ThemeProviderState = {
  defaultTheme: DEFAULT_THEME,
  resolvedTheme: 'light',
  theme: DEFAULT_THEME,
  setTheme: () => null,
  resetTheme: () => null,
}

const ThemeContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = DEFAULT_THEME,
  ...props
}: ThemeProviderProps) {
  // SSR y primer render CSR arrancan con defaultTheme — sin mismatch de hidratación
  const [theme, _setTheme] = useState<Theme>(defaultTheme)

  // true mientras no se haya leído localStorage — evita que el efecto de DOM
  // sobreescriba la clase que el THEME_INIT_SCRIPT ya aplicó correctamente
  const isFirstMount = useRef(true)

  const resolvedTheme = useMemo((): ResolvedTheme => {
    if (theme === 'system') {
      if (typeof window === 'undefined') return 'light'
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme as ResolvedTheme
  }, [theme])

  // Paso 1: leer localStorage después de hidratar y actualizar el estado
  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      _setTheme(stored)
    }
  }, [])

  // Paso 2: aplicar clase al <html> — se salta el primer run (ya lo hizo el script)
  // y solo actúa en cambios posteriores (toggle manual, cambio de sistema)
  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const applyTheme = (resolved: ResolvedTheme) => {
      root.classList.remove('light', 'dark')
      root.classList.add(resolved)
      root.style.colorScheme = resolved
    }

    const handleSystemChange = () => {
      if (theme === 'system') {
        applyTheme(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    if (isFirstMount.current) {
      // El script ya aplicó la clase correcta — no tocar el DOM aquí
      isFirstMount.current = false
    } else {
      applyTheme(resolvedTheme)
    }

    mediaQuery.addEventListener('change', handleSystemChange)
    return () => mediaQuery.removeEventListener('change', handleSystemChange)
  }, [theme, resolvedTheme])

  const setTheme = (theme: Theme) => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
    _setTheme(theme)
  }

  const resetTheme = () => {
    window.localStorage.removeItem(THEME_STORAGE_KEY)
    _setTheme(DEFAULT_THEME)
  }

  const contextValue = {
    defaultTheme,
    resolvedTheme,
    resetTheme,
    theme,
    setTheme,
  }

  return (
    <ThemeContext value={contextValue} {...props}>
      {children}
    </ThemeContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
