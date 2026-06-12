import { cn } from "@/lib/utils";

export const Container = ({
	children,
	containerClassName,
	className,
}: Readonly<{
	children: React.ReactNode;
	containerClassName?: string;
	className?: string;
}>) => {
	return (
		<div
			className={cn(
				"self-center justify-self-center p-3 md:py-8",
				containerClassName,
			)}
		>
			<div className={cn("min-w-sm md:min-w-md", className)}>{children}</div>
		</div>
	);
};
