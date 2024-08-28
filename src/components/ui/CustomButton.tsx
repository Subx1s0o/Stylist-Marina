import clsx from "clsx";
import { ButtonHTMLAttributes, forwardRef, ReactNode, Ref } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "black" | "white" | "outline";
  className?: string;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const CustomButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "black", className, children, ...rest }, ref) => {
    const buttonClasses = clsx(
      "py-3 px-6  text-base font-medium w-full text-center border-none",
      {
        "bg-black text-white": variant === "black",
        "bg-white text-black ": variant === "white",
        "bg-transparent text-black border border-black": variant === "outline",
      },
      className
    );

    return (
      <button ref={ref} className={buttonClasses} {...rest}>
        {children}
      </button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export default CustomButton;
