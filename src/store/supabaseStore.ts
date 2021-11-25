import { GetState, SetState } from "zustand";
import { supabase } from "../services/supabase";
import { IStatisticsTable } from "../myTypes";
import { IStore } from "./store";

export interface ISupabaseStore {
	myStatistics: IStatisticsTable[];
	statistics: IStatisticsTable[];
	fetchStatistics(): void;
	fetchMyStatistics(): void;
}

const supabaseStore = (set: SetState<IStore>, get: GetState<IStore>): ISupabaseStore => ({
	myStatistics: [],
	statistics: [],
	fetchStatistics: async () => {
		const { body, error } = await supabase
			.from<IStatisticsTable>("statistics")
			.select("*")
			.order("grossWPM", { ascending: false })
			.limit(10);

		if (error) console.log(error);

		if (!error && body !== null) set({ statistics: body });
	},
	fetchMyStatistics: async () => {
		if (get().session?.user) {
			const { body, error } = await supabase
				.from<IStatisticsTable>("statistics")
				.select("*")
				.eq("uuid", get().session?.user?.id)
				.order("id", { ascending: false })
				.limit(10);

			if (error) console.log(error)

			if (!error && body !== null) set({ myStatistics: body });
		}
	},
});

export default supabaseStore;
