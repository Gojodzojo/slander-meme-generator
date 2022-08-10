import {writable, type Writable} from "svelte/store";

export const TRANSITION_DURATION = 200
export const TRANSITION_IN_DELAY = 200
const MAX_TRANSITION_X = 100;

export enum Step {
	EditScenes = 1,
	AdjustSettings = 2,
	RenderTheVideo = 3,
	DownloadTheVideo = 4
}

const currentStep: Writable<Step> = writable(Step.EditScenes)
export const transitionX = writable(0)

export function setStep(newStep: Step) {
   currentStep.update((prevStep) => {
    const transitionDirection = newStep > prevStep ? -1 : 1
    transitionX.update(() => MAX_TRANSITION_X * transitionDirection)

    return newStep
  })
}

export {currentStep}
