interface Options {
  /**
   * The prefix of the component name.
   */
  prefix?: string
  /**
   * The Function to process the component name.
   */
  nameProcessor?: (name: string) => string
}

/**
 *
 * @param components Array of the components' names.
 * @param options
 * @returns
 */
export function getComponentsMap(components: string[], options?: Options): Map<string, string> {
  const { prefix, nameProcessor } = options ?? {}
  return components.reduce(
    (map, name) =>
      map.set(
        `${prefix ?? ''}${typeof nameProcessor === 'function' ? nameProcessor(name) : name}`,
        name
      ),
    new Map()
  )
}
