import type { InlinePreset } from 'unimport'
import type { ImportsMap, PresetName } from 'unplugin-auto-import/types'

export const reactPresets: (ImportsMap | PresetName | InlinePreset)[] = [
  'react',
  'react-i18next',
  {
    from: 'react',
    imports: ['Suspense', 'Fragment', 'cloneElement', 'createElement', 'createContext']
  },
  {
    from: '@tanstack/react-query',
    imports: [
      'focusManager',
      'keepPreviousData',
      'onlineManager',
      'MutationCache',
      'QueryClient',
      'QueryClientProvider',
      'queryOptions',
      'useIsFetching',
      'useIsMutating',
      'useInfiniteQuery',
      'useMutation',
      'useMutationState',
      'useQuery',
      'useQueries',
      'useSuspenseInfiniteQuery',
      'useSuspenseQuery',
      'useSuspenseQueries',
      'useQueryClient'
    ]
  },
  {
    from: '@tanstack/react-router',
    imports: [
      'Await',
      'Block',
      'createFileRoute',
      'createLazyFileRoute',
      'createRouter',
      'createRootRouteWithContext',
      'getRouteApi',
      'Link',
      'LoaderContext',
      'MatchRoute',
      'NotFoundRoute',
      'notFound',
      'Outlet',
      'redirect',
      'RouterProvider',
      'ScrollRestoration',
      'useBlocker',
      'useChildMatches',
      'useLoaderData',
      'useMatch',
      'useMatchRoute',
      'useMatches',
      'useNavigate',
      'useParentMatches',
      'useParams',
      'useRouteContext',
      'useRouter',
      'useRouterState',
      'useSearch'
    ]
  },
  { from: 'clsx', imports: [['default', 'clsx']] },
  { from: 'use-immer', imports: ['useImmer'] },
  { from: 'dayjs', imports: [['default', 'dayjs']] },
  { from: 'zod', imports: ['z'] },
  { from: 'framer-motion', imports: ['motion', 'AnimatePresence'] },
  { from: '@bit-ocean/config', imports: ['teamConfig'] },
  { from: '@bit-ocean/echarts', imports: ['ReactChart'] }
]
