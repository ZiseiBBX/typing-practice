import { GetState, SetState } from "zustand";
import { IStore } from "./store";

const time = 60000

const formatTime = (milliseconds: number) => {
	milliseconds = time - milliseconds;

	const mins = Math.floor(milliseconds / (1000 * 60)).toString().padStart(2, "0");
	const seconds = ((milliseconds / 1000) % 60).toString().padStart(2, "0");

	return `${mins}:${seconds}`;
};

export interface IStopwatchStore {
	elapsedTime: number;
	interval: any;
	formattedTime: string;

	start(): void;
	stop(): void;
	reset(): void;
	clear(): void;
}

const stopwatchStore = (set: SetState<IStore>, get: GetState<IStore>): IStopwatchStore => ({
	elapsedTime: 0,
	interval: 0,
	formattedTime: "1:00",

	start: () => {
		let i = setInterval(() => {
			set({ elapsedTime: get().elapsedTime + 1000 });
			get().calculateGrossWPM();
			get().calculateAccuracy();
			set({ formattedTime: formatTime(get().elapsedTime) });
			if (get().elapsedTime === time) {
				get().stopPractice();
			}
		}, 1000);

		set({ interval: i });
	},
	stop: () => {
		clearInterval(get().interval);
	},
	reset: () => {
		clearInterval(get().interval);
		set({ elapsedTime: 0 });
	},
	clear: () => {},
});

export default stopwatchStore;
