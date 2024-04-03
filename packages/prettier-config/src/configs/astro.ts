import { ConfigBuilder } from '../utils'

const astroConfig = new ConfigBuilder({
  tailwind: true,
  astro: true
}).build()
export default astroConfig
