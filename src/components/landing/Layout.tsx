import { ReactNode } from 'react'
import { Squares } from "./squares-background"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="h-screen overflow-hidden bg-black relative flex flex-col">
      <div className="absolute inset-0 z-10">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="#1a1a1a"
          hoverFillColor="#111"
        />
      </div>
      <div className="relative z-20 h-full flex flex-col">
        {children}
      </div>
    </div>
  )
}
