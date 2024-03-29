import { Config } from 'prettier'

export const mergeOverrides = (...overrides: Config['overrides'][]) =>
  overrides.reduce((acc, override) => {
    return [...(acc ?? []), ...(override ?? [])]
  }, [])
