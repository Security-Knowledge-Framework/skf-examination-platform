import { writable } from "svelte/store";

export const labStore = writable({ "write-up": false, quizz: false });
