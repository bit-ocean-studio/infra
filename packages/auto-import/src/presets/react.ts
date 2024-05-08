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
      'QueryClient',
      'QueryClientProvider',
      'useQueryClient',
      'useQuery',
      'useQueries',
      'useInfiniteQuery',
      'useSuspenseQuery',
      'useSuspenseQueries',
      'useSuspenseInfiniteQuery',
      'useMutation',
      'useIsFetching',
      'useIsMutating',
      'useMutationState',
      'keepPreviousData',
      'focusManager',
      'onlineManager',
      'queryOptions'
    ]
  },
  {
    from: '@tanstack/react-router',
    imports: [
      'Link',
      'Outlet',
      'RouterProvider',
      'createRouter',
      'createFileRoute',
      'createLazyFileRoute',
      'createRootRouteWithContext',
      'notFound',
      'redirect',
      'useNavigate',
      'useRouter',
      'useRouterState',
      'useLoaderData',
      'useParams',
      'useRouteContext',
      'useSearch',
      'useMatchRoute',
      'useMatch',
      'useMatches',
      'useParentMatches',
      'useChildMatches',
      'useBlocker',
      'LoaderContext',
      'MatchRoute',
      'NotFoundRoute',
      'getRouteApi',
      'Await',
      'Block'
    ]
  },
  {
    from: 'clsx',
    imports: [['default', 'clsx']]
  },
  {
    from: 'use-immer',
    imports: ['useImmer']
  },
  {
    from: 'framer-motion',
    imports: ['motion', 'AnimatePresence']
  },
  {
    from: '@bit-ocean/config',
    imports: ['teamConfig']
  }
]
