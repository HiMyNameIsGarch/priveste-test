import { acceptHMRUpdate, defineStore } from 'pinia';
import { IRandom, IRandomCreate, IRandomUpdate } from '~/interfaces/IRandom';
import { $fetchWithCookies } from '~/utils/fetchWithCookies';

export interface IRandomState {
  randoms: Array<IRandom>;
  currentRandom?: IRandom;
  error: unknown;
}

export const useRandomStore = defineStore('random', {
  state: (): IRandomState => {
    return {
      randoms: [],
      currentRandom: undefined,
      error: null,
    };
  },
  getters: {
    getRandoms(state: IRandomState) {
      return state.randoms;
    },
    getCurrentRandom(state: IRandomState) {
      if (!state.currentRandom) {
        throw new Error('you need to fetch, create or update first');
      }

      return state.currentRandom;
    },
    getError(state: IRandomState) {
      return state.error;
    },
  },
  actions: {
    async fetchRandoms() {
      try {
        this.error = null;
        this.randoms = await $fetchWithCookies<Array<IRandom>>('/api/random');
      } catch (e) {
        this.error = e;
      }
    },
    async fetchRandom(id: string) {
      try {
        this.error = null;
        this.currentRandom = await $fetchWithCookies<IRandom>(`/api/random/${id}`);
      } catch (e) {
        this.error = e;
      }
    },
    async createRandom(random: IRandomCreate) {
      try {
        this.error = null;
        const newRandom = await $fetchWithCookies<IRandom>(`/api/random`, 'POST', random);

        this.randoms.push(newRandom);
        this.currentRandom = newRandom;
      } catch (e) {
        this.error = e;
      }
    },
    async updateRandom(random: IRandomUpdate) {
      try {
        this.error = null;
        const updatedRandom = await $fetchWithCookies<IRandom>(`/api/random/${random.id}`, 'PUT', random);
        const idx = this.randoms.findIndex((item) => item.id === updatedRandom.id);
        this.randoms.splice(idx, 1, updatedRandom);
        this.currentRandom = updatedRandom;
      } catch (e) {
        this.error = e;
      }
    },
    async deleteRandom(randomId: string) {
      try {
        this.error = null;
        await $fetchWithCookies<IRandom>(`/api/random/${randomId}`, 'DELETE');
        const idx = this.randoms.findIndex((item) => item.id === randomId);
        this.randoms.splice(idx, 1);
      } catch (e) {
        this.error = e;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useRandomStore, import.meta.hot));
}
