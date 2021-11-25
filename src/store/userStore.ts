import { Session } from "@supabase/gotrue-js";
import { GetState, SetState } from "zustand";
import { IStore } from "./store";

export interface IUserStore {
	session: Session | null;
	setSession(session: Session | null): void;
}

const userStore = (set: SetState<IStore>, get: GetState<IStore>): IUserStore => ({
	session: null,
	setSession: (session) => {
		set({ session });
	},
});

export default userStore;
