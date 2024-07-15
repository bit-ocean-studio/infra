import { type RefObject, useEffect, useState } from 'react'

interface Dimension {
  width: number
  height: number
}

export function useResizeObserver(ref: RefObject<HTMLDivElement>): Dimension | null {
  const [dimensions, setDimensions] = useState<Dimension | null>(null)

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setDimensions({ width, height })
    })

    observer.observe(ref.current!)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
      observer.disconnect()
    }
  }, [ref])

  return dimensions
}
