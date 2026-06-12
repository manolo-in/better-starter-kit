export const trys = <T>(func: () => T) => {
	try {
		const data = func() as T;
		return { error: null, data, isSuccess: true };
	} catch (e) {
		return { error: e as Error, data: null, isSuccess: false };
	}
};

export const triedAsync = <T, U = Error>(
	promise: Promise<T>,
	tag?: string,
): Promise<
	| {
			data: undefined;
			error: U;
			isSuccess: false;
	  }
	| {
			data: T;
			error: undefined;
			isSuccess: true;
	  }
> =>
	promise
		.then((data: T) => ({
			data,
			error: undefined,
			isSuccess: true as true,
		}))
		.catch((err: U) => {
			tag && console.error("Error from", tag, ":", err);

			return {
				error: err,
				data: undefined,
				isSuccess: false,
			};
		});

/**
 *
 * const [error, data] = await tryAsync(new Promise())
 */
export const tryAsync = async <D, E = Error>(
	promise: Promise<D>,
	tag?: string,
): Promise<[E, undefined] | [undefined, D]> => {
	const { data, error } = await triedAsync(promise, tag);

	return [error, data] as [E, undefined] | [undefined, D];
};
