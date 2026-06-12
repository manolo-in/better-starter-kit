declare global {
	interface ObjectConstructor {
		keys<T>(obj: T): Array<keyof T>;
		values<T>(obj: T): Array<T[keyof T]>;
		entries<T>(obj: T): Array<[keyof T, T[keyof T]]>;
	}
}

declare module "*.svg" {
	import type { FC, SVGProps } from "react";

	const content: FC<SVGProps<SVGElement>>;
	export default content;
}

declare module "*.svg?url" {
	const content: any;
	export default content;
}

export {};
