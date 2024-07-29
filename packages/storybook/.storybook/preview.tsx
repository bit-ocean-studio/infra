import type { Preview, ReactRenderer } from '@storybook/react'
import { withThemeByClassName, withThemeByDataAttribute } from '@storybook/addon-themes'
import React, { useState, useEffect } from 'react'
import { addons } from '@storybook/preview-api'
import { DocsContainer } from '@storybook/addon-docs'
import { themes } from '@storybook/theming'

import { DARK_MODE_EVENT_NAME, UPDATE_DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'

import '../src/styles/main.scss'

const channel = addons.getChannel()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      container: (props: any) => {
        const [isDark, setDark] = useState()

        const onChangeHandler = () => channel.emit(UPDATE_DARK_MODE_EVENT_NAME)

        useEffect(() => {
          channel.on(DARK_MODE_EVENT_NAME, setDark)
          return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark)
        }, [channel, setDark])

        return <DocsContainer {...props} />
      }
    }
  },
  decorators: [
    withThemeByClassName<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark'
      },
      defaultTheme: 'light'
    }),
    withThemeByDataAttribute<ReactRenderer>({
      themes: {
        light: '',
        dark: 'dark'
      },
      defaultTheme: 'light',
      attributeName: 'data-theme'
    })
  ]
}
export default preview
