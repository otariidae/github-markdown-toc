type HookFunction = (fn: () => void) => void
type SuiteFunction = (title: string, fn: () => void) => void

declare module "kocha" {
  const before: HookFunction
  const after: HookFunction
  const beforeEach: HookFunction
  const afterEach: HookFunction
  const describe: SuiteFunction
  const it: SuiteFunction
}
