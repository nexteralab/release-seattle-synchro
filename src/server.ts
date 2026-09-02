// Entry de servidor propio, en lugar del que trae @tanstack/react-start.
//
// El entry por defecto del paquete hace:
//   import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
// y ese símbolo llega ahí por dos `export *` encadenados:
//   react-start/server → react-start-server → start-server-core
//
// Vite compila `export *` a `exportAll()`, que recorre las claves del módulo
// fuente UNA vez, en el momento de evaluarlo, y define un getter por cada una.
// Las claves que todavía no existen en ese instante no se agregan nunca.
//
// Y hay un ciclo: start-server-core → server-functions-handler → getServerFnById
// → '#tanstack-start-server-fn-resolver' (virtual) → todos los *.service.ts de
// la app → de vuelta a los paquetes de TanStack. En arranque en frío el orden
// sale bien; cuando HMR reevalúa parte de la cadena, start-server-core sigue a
// medio inicializar cuando corre el `exportAll` y la clave se pierde:
//   TypeError: (0 , __vite_ssr_import_0__.createStartHandler) is not a function
//
// Importar cada símbolo del paquete que lo exporta POR NOMBRE saltea los dos
// `export *`: los named exports se registran como getters al tope del módulo,
// así que existen aunque el ciclo esté a medio resolver.
import { defaultStreamHandler } from '@tanstack/react-start-server'
import { createStartHandler } from '@tanstack/start-server-core'

// El handler se arma en el primer request, no al evaluar el módulo: para
// entonces el ciclo ya cerró y los getters devuelven el valor real.
let handler: ReturnType<typeof createStartHandler> | undefined

export default {
  fetch(request: Request, ...rest: Array<unknown>) {
    handler ??= createStartHandler(defaultStreamHandler)
    return (handler as (...args: Array<unknown>) => Response | Promise<Response>)(
      request,
      ...rest,
    )
  },
}
