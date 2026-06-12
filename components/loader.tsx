import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export default function ({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"flex h-full w-full items-center justify-center",
				className,
			)}
		>
			<Loader2Icon className="animate-spin" />
		</div>
	);
}
