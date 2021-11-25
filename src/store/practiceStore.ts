import produce from "immer";
import { GetState, SetState } from "zustand";
import { IEntry } from "../myTypes";
import { generateWords } from "../utils/generator";
import { IStore } from "./store";

export interface IPracticeStore {
	active: boolean;
	over: boolean;
	entries: IEntry[];
	wordIndex: number;
	letterIndex: number;
	charactersTyped: number;
	elapsedTime: number;
	errors: number;

	initializePractice(count: number): void;
	generateEntries(count: number): void;
	updateEntry(keyPressed: string): void;
	startPractice(): void;
	stopPractice(): void;
	getColorVal(index: number): boolean[];
	backtrack(): void;

	setActive(val: boolean): void;
	setOver(val: boolean): void;
}

const practiceStore = (set: SetState<IStore>, get: GetState<IStore>): IPracticeStore => ({
	active: false,
	over: false,
	entries: [],
	wordIndex: 0,
	letterIndex: 0,
	charactersTyped: 0,
	elapsedTime: 0,
	errors: 0,

	setActive: (val) => {
		set({ active: val });
	},
	setOver: (val) => {
		set({ active: val });
	},
	initializePractice: (count) => {
		set({
			letterIndex: 0,
			wordIndex: 0,
			active: false,
			over: false,
			grossWPM: 0,
			accuracy: 100,
			entries: [],
			charactersTyped: 0,
			errors: 0,
			formattedTime: "1:00",
			elapsedTime: 0,
		});
		get().generateEntries(count);
	},
	generateEntries: (count) => {
		let words = generateWords(count).map((word) => {
			const obj: IEntry = {
				word: word,
				letterEntries: word.split("").map((letter) => {
					return { letter, correct: false, visited: false };
				}),
			};

			return obj;
		});

		const res = words.filter((val, idx) => {
			return words.indexOf(val) === idx;
		});

		set({ entries: [...get().entries, ...res] });
	},
	updateEntry: (keyPressed) => {
		const correct = get().entries[get().wordIndex].letterEntries[get().letterIndex].letter === keyPressed;

		if (!correct) set({ errors: get().errors + 1 });

		set(
			produce((state: IPracticeStore) => {
				state.entries[get().wordIndex].letterEntries[get().letterIndex].correct = correct;
				state.entries[get().wordIndex].letterEntries[get().letterIndex].visited = true;
				state.letterIndex = get().letterIndex + 1;
				state.charactersTyped = get().charactersTyped + 1;
			})
		);

		if (get().letterIndex >= get().entries[get().wordIndex].letterEntries.length) {
			set({ letterIndex: 0 });
			if (get().wordIndex + 1 === get().entries.length) {
				get().generateEntries(10);
			} else {
				set({ wordIndex: get().wordIndex + 1 });
			}
		}
	},
	startPractice: () => {
		set({ grossWPM: 0, accuracy: 100 });
		set({ active: true, over: false });
		get().start();
	},
	stopPractice: () => {
		set({ active: false, over: true });
		get().stop();
		get().reset();
		set({ over: false });
	},
	getColorVal: (index) => {
		return [
			get().entries[get().wordIndex].letterEntries[index].correct,
			get().entries[get().wordIndex].letterEntries[index].visited,
		];
	},
	backtrack: () => {
		if (get().letterIndex !== 0) {
			set({ letterIndex: get().letterIndex - 1 });
			set(
				produce((state: IPracticeStore) => {
					state.entries[get().wordIndex].letterEntries[get().letterIndex].visited = false;
				})
			);
		}
	},
});

export default practiceStore;
