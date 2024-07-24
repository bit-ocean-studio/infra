import { useMatches } from '@tanstack/react-router'

export const useRouteStaticData = () => useMatches().at(-1)?.staticData ?? {}
