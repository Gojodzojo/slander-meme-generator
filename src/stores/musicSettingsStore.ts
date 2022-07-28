import {writable, type Writable} from "svelte/store"

export const PREUPLOADED_MUSIC_FILES = [
    "The Powerpuff Girls theme song"
] as const

export type PreuploadedMusicFilesType = (typeof PREUPLOADED_MUSIC_FILES)[number]

export interface MusicSettings {
    music: File | PreuploadedMusicFilesType
    speed: number
}

export const musicSettings: Writable<MusicSettings> = writable({
	music: "The Powerpuff Girls theme song",
    speed: 1
})
