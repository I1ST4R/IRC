import * as React from "react"

import { cn } from "@/shared/lib/css"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex-1 p-6 border border-[#e0e0e0] rounded-4xl text-sm ml-0 mb-2.5 min-w-30 block bg-[rgba(0,0,0,0.05)] font-normal uppercase text-black outline-0 focus:border-[var(--coral)] focus:outline-none transition-colors",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
