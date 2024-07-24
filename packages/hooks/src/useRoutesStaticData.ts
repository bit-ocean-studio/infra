import { useMatches } from '@tanstack/react-router'

export const useRoutesStaticData = () => useMatches().map((match) => match.staticData) ?? []
