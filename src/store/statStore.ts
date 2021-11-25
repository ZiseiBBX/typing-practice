import { GetState, SetState } from "zustand";
import { IStore } from "./store";

export interface IStatStore {
  grossWPM: number
  accuracy: number
  calculateGrossWPM(): void
  calculateAccuracy(): void
}

const statStore = (set: SetState<IStore>, get: GetState<IStore>): IStatStore => ({
  grossWPM: 0,
  accuracy: 100,

  calculateGrossWPM: () => {
    let mins, words
    if (get().elapsedTime === 0) mins = 1 / (1000 * 60)
    else mins = get().elapsedTime / (1000 * 60)
    if (get().charactersTyped === 0) words = 1 / 5
    else words = get().charactersTyped / 5

    const res = words / 1

    set({ grossWPM: res })
  },
  calculateAccuracy: () => {
    let chars = get().charactersTyped === 0 ? 1 : get().charactersTyped
    const res = ((chars - get().errors) / chars) * 100

    set({ accuracy: res })
  }
})

export default statStore