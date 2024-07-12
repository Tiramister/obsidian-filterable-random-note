import { EMPTY_FILTER_CONFIG, FilterConfig } from "./filterConfig";

// The number of filter configs (fixed)
export const CONFIG_COUNT = 10;

export interface RandomNotePluginSettings {
	filters: FilterConfig[];
	currentFilterIndex: number;
}

export const EMPTY_SETTINGS: RandomNotePluginSettings = {
	filters: [...Array(CONFIG_COUNT)].map(() => structuredClone(EMPTY_FILTER_CONFIG)),
	currentFilterIndex: 0,
}

