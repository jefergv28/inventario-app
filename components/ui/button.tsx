import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80",
        destructive:
          "bg-[#FF0A0E] hover:bg-[#FF0A0E]/80  dark:bg-destructive text-destructive-foreground shadow-sm dark:hover:bg-destructive/90 dark:bg-red-600 dark:text-white dark:hover:bg-red-500",
        outline:
          "border border-input bg-[#3050B0] shadow-sm hover:bg-accent hover:text-white dark:border-white/10 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700",
        secondary: "bg-[#0D0221] text-white shadow-sm hover:bg-[#3050B0] dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-gray-700 dark:hover:text-white",
        link: "text-primary underline-offset-4 hover:underline dark:text-blue-400 dark:hover:text-blue-300",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
