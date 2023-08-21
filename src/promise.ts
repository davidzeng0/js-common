export const Promises = {
	resolveAfter(delay: number){
		return new Promise<void>((resolve) => setTimeout(resolve, delay));
	},

	rejectAfter(delay: number){
		return new Promise<void>((_, reject) => setTimeout(reject, delay));
	}
};