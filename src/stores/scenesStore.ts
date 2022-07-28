import {writable, type Writable} from "svelte/store"

export const PREUPLOADED_VIDEO_FILES = [
   "Ibai Llanos Explaining Things", 
   "Black Man Crying"
] as const

export type PreuploadedVideoFilesType = (typeof PREUPLOADED_VIDEO_FILES)[number]

export interface TextSettings {
    text: string
    fontSize: number
}

export interface Scene {
    video: File | PreuploadedVideoFilesType
    startTime: number
    endTime: number
    speed: number
    topTextSettings: TextSettings
    bottomTextSettings: TextSettings
}

export const scenes: Writable<Scene[]> = writable([])

export function createDefaultScene(): Scene {
    return {
        startTime: 0,
        endTime: 10,
        speed: 2,
        video: "Ibai Llanos Explaining Things",
        topTextSettings: {
            fontSize: 50,
            text: ""
        },
        bottomTextSettings: {
            fontSize: 50,
            text: ""
        }
    }
}
