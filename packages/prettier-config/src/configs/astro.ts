import { ConfigBuilder } from '../config-builder'

const astroConfig = new ConfigBuilder({
  tailwind: true,
  astro: true
}).build()
export default astroConfig
