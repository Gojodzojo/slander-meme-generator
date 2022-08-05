import {writable, type Writable} from "svelte/store"

export const PREUPLOADED_MUSIC_FILES = [
  "The Powerpuff Girls theme song",   // https://youtu.be/f7MiaSr-0ug
  "Industry Baby"                     // https://youtu.be/-IudP7eYVLc
] as const

export type PreuploadedMusicFilesType = (typeof PREUPLOADED_MUSIC_FILES)[number]

export interface MusicSettings {
  music: File | PreuploadedMusicFilesType
  speed: number
}

export function defaultMusicSettings(): MusicSettings {
  return {
	  music: "The Powerpuff Girls theme song",
    speed: 1
  }
}

export const musicSettings: Writable<MusicSettings> = writable(defaultMusicSettings())
