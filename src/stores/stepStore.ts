import {writable, type Writable} from "svelte/store";

export enum Step {
	EditScenes,
	AdjustSettings,
	RenderTheVideo
}

export const currentStep: Writable<Step> = writable(Step.EditScenes)
