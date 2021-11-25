export interface IStatisticsTable {
	id?: number
	inserted_at?: any
	username?: string
	email: string | undefined
	uuid: string | undefined
	grossWPM: number
	accuracy: number
}

export interface IEntry {
	word: string;
	letterEntries: ILetterEntry[];
}

export interface ILetterEntry {
	letter: string;
	correct: boolean;
	visited: boolean;
}