import { random } from "faker";

export const generateWords = (count = 10) => {
	return new Array(count).fill("").map(() => random.word().toLowerCase());
};
