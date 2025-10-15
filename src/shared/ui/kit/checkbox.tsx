"use client"
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"
import { cn } from "@/shared/lib/css"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-2 data-[state=checked]:bg-[#CA354F] data-[state=checked]:border-[#CA354F] focus-visible:border-[#CA354F] focus-visible:ring-[#CA354F]/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-5 shrink-0 rounded-[4px] transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 hover:border-[#CA354F] cursor-pointer border-black",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-black transition-none" // белая галочка
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }