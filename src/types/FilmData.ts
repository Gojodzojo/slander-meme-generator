export const PREUPLOADED_MUSIC_FILES = [
    "The Powerpuff Girls theme song"
] as const

export type PreuploadedMusicFilesType = (typeof PREUPLOADED_MUSIC_FILES)[number]

export const PREUPLOADED_VIDEO_FILES = [
   "Ibai Llanos Explaining Things", 
   "Black Man Crying"
] as const

export type PreuploadedVideoFilesType = (typeof PREUPLOADED_VIDEO_FILES)[number]

export const OUTPUT_FILE_FORMATS = [
    "mp4"
] as const

export type OutputFileFormatsType = (typeof OUTPUT_FILE_FORMATS)[number]

export interface TextSettings {
    text: string
    font: string
    fontSize: number
}

export interface Scene {
    video: File | PreuploadedVideoFilesType
    startTime: string | null
    endTime: string | null
    topTextSettings: TextSettings
    bottomTextSettings: TextSettings
}

export interface MusicSettings {
    music: File | PreuploadedMusicFilesType
    startTime: string | null
    endTime: string | null
}

export interface FilmData {
    name: string
    outputFileFormat: OutputFileFormatsType
    musicSettings: MusicSettings
    scenes: Scene[]
}

export function createDefaultFilmData(): FilmData {
    return {
		name: "slander-meme",
		outputFileFormat: "mp4",
		scenes: [],
		musicSettings: {
			music: "The Powerpuff Girls theme song",
			startTime: null,
			endTime: null,
		}
	}
}

export function createDefaultScene(): Scene {
    return {
        startTime: null,
        endTime: null,
        video: "Ibai Llanos Explaining Things",
        topTextSettings: {
            font: "",
            fontSize: 12,
            text: ""
        },
        bottomTextSettings: {
            font: "",
            fontSize: 12,
            text: ""
        }
    }
}