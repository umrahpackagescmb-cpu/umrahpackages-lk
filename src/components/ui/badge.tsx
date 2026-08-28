import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&_svg]:size-3.5 [&_svg]:pointer-events-none transition-colors",
  {
    variants: {
      variant: {
        default: "bg-brand-navy text-white border-transparent",
        gold: "bg-brand-gold text-brand-navy border-transparent",
        goldOutline: "bg-brand-gold/10 text-brand-gold-dark border-brand-gold/30",
        success: "bg-success/10 text-success border-success/20",
        muted: "bg-muted text-muted-foreground border-transparent",
        outline: "text-foreground border-border bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
