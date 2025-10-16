import { cn } from "@/shared/lib/css";
import { Button } from "@/shared/ui/kit/button";
import React from "react"

export type ChangeTypeButtonProps = {
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>
}

export const LoginButton = ({
  state,
  setState
} : ChangeTypeButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "hover:bg-transparent cursor-pointer font-semibold border-b-2 py-0 w-[45%] transition-colors duration-200",
        !state
          ? "text-[rgb(130,130,130)] hover:text-[rgb(50,50,50)] border-[rgb(130,130,130)] hover:border-[rgb(70,70,70)]"
          : "text-[var(--coral)] hover:text-[var(--coralDarker)] border-[var(--coral)] hover:border-[var(--coralDarker)]"
      )}
      onClick={() => setState(true)}
    >
      Вход
    </Button>
  );
};
