import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const trys = <T>(func: () => T) => {
    try {
        const data = func() as T
        return { error: null, data, isSuccess: true }
    }
    catch (e) {
        return { error: e as Error, data: null, isSuccess: false }
    }
}

export const triedAsync = <T, U = Error>(
    promise: Promise<T>,
    errorExt?: object
): Promise<{
    data: undefined;
    error: U;
    isSuccess: false;
} | {
    data: T;
    error: undefined;
    isSuccess: true;
}> => promise
    .then((data: T) => ({
        data,
        error: undefined,
        isSuccess: true as true,
    }))
    .catch((err: U) => {
        if (errorExt) {
            const parsedError = Object.assign({}, err, errorExt);
            return {
                error: parsedError,
                data: undefined,
                isSuccess: false as false,
            }
        }

        return {
            error: err,
            data: undefined,
            isSuccess: false,
        }
    });
