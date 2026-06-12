import {
	type DefaultError,
	type UseMutationOptions,
	type UseMutationResult,
	useMutation,
} from "@tanstack/react-query";

export const MutationButton = <
	TData = unknown,
	TError = DefaultError,
	TVariables = void,
	TOnMutateResult = unknown,
>({
	api,
	success,
	onSuccess,
	...props
}: {
	api: UseMutationOptions<TData, TError, TVariables, TOnMutateResult>;
	isSuccess?: React.ReactNode;
	isPending?: React.ReactNode;
	isError?: React.ReactNode;
	mutate: (
		mutate: UseMutationResult<
			TData,
			TError,
			TVariables,
			TOnMutateResult
		>["mutate"],
	) => React.ReactNode;
	success?: boolean;
	reTry?: (
		mutate: UseMutationResult<
			TData,
			TError,
			TVariables,
			TOnMutateResult
		>["mutate"],
	) => React.ReactNode;
	onSuccess?: (data: TData) => Promise<void> | void;
}) => {
	const { isError, isPending, isSuccess, mutate } = useMutation({
		...api,
		onSuccess,
	});

	if ((success || isSuccess) && props.isSuccess) return props.isSuccess;

	if (isPending && props.isPending) return props.isPending;

	if (isError && props.reTry) return props.reTry(mutate);
	if (isError && props.isError) return props.isError;

	return props.mutate(mutate);
};
