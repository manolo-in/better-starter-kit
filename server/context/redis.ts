// import { triedAsync } from "@/lib/utils";
// import { Redis } from "@upstash/redis/cloudflare";

// import { env } from "@/env";

// const defauldExpire = 1 * 3600;
// const isCaching = true;

// 	const redisClient = new NewRedis({
//      url: env.UPSTASH_REDIS_URL,
// 		token: env.UPSTASH_REDIS_TOKEN,
// 	});


// export class NewRedis extends Redis {
//     async getCache<T>(key: string) {
//         return await triedAsync(this.get<T>(key));
//     }
//     async setCache(key: string, value: string, expires = defauldExpire) {
//         return await triedAsync(this.set(key, value, { ex: expires }));
//     }
//     async delCache(key: string) {
//         return await triedAsync(this.del(key));
//     }

//     async cacheFunc<T>(key: string, func: () => Promise<T>, expires?: number) {
//         if (!isCaching) {
//             return await triedAsync(func());
//         }

//         const cached = await this.getCache<T>(key);
//         if (cached.isSuccess && cached.data) {
//             return cached;
//         }

//         const called = await triedAsync(func());

//         if (called.isSuccess) {
//             this.setCache(key, JSON.stringify(called.data), expires);
//         }

//         return called;
//     }
// }
