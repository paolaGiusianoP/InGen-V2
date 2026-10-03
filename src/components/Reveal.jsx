import React, { useEffect, useRef, useState } from 'react'

export const Reveal = ({ as: Tag = 'div', delay = 0, variant = '', className = '', children }) => {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${variant ? `reveal-${variant}` : ''} ${shown ? 'is-in' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
