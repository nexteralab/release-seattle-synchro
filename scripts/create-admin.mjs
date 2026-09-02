// Crea un usuario en D1 (Better Auth no expone signup: disableSignUp).
// Uso: node scripts/create-admin.mjs <email> <password> "<Nombre>" [--role=admin|user] [--remote]
// Sin --role crea un admin (que es para lo que suele usarse este script).
import { hashPassword } from 'better-auth/crypto'
import { execFileSync } from 'node:child_process'

const [email, password, name = 'Admin'] = process.argv.slice(2)
const remote = process.argv.includes('--remote')
const role = (process.argv.find((a) => a.startsWith('--role='))?.split('=')[1] ?? 'admin')
if (!email || !password) throw new Error('uso: node scripts/create-admin.mjs <email> <password> "<Nombre>" [--role=admin|user] [--remote]')
if (!['admin', 'user'].includes(role)) throw new Error(`rol inválido: ${role} (admin | user)`)

const hash = await hashPassword(password)
const uid = crypto.randomUUID()
const now = Math.floor(Date.now() / 1000) // drizzle sqlite mode:'timestamp' = segundos
const q = (s) => `'${String(s).replaceAll("'", "''")}'`

const sql = [
  `INSERT INTO user (id, name, email, email_verified, role, created_at, updated_at) VALUES (${q(uid)}, ${q(name)}, ${q(email)}, 1, ${q(role)}, ${now}, ${now});`,
  `INSERT INTO account (id, account_id, provider_id, issuer, user_id, password, created_at, updated_at) VALUES (${q(crypto.randomUUID())}, ${q(uid)}, 'credential', 'local:credential', ${q(uid)}, ${q(hash)}, ${now}, ${now});`,
].join(' ')

execFileSync('npx', ['wrangler', 'd1', 'execute', 'seattle-synchro-db', remote ? '--remote' : '--local', '--command', sql], { stdio: 'inherit' })
console.log(`\n✅ ${role} ${email} creado (${remote ? 'remote' : 'local'})`)
