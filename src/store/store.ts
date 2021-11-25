import create from "zustand";
import practiceStore, { IPracticeStore } from "./practiceStore";
import statStore, { IStatStore } from "./statStore";
import stopwatchStore, { IStopwatchStore } from "./stopwatchStore";
import supabaseStore, { ISupabaseStore } from "./supabaseStore";
import userStore, { IUserStore } from "./userStore";

export interface IStore extends IUserStore, IPracticeStore, IStatStore, IStopwatchStore, ISupabaseStore {}

const useStore = create<IStore>((set, get) => ({
	...practiceStore(set, get),
	...userStore(set, get),
  ...statStore(set, get),
  ...stopwatchStore(set, get),
  ...supabaseStore(set, get)
}));

export default useStore;
