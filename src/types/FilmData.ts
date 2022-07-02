export const PREUPLOADED_MUSIC_FILES = [
    "Powerpuff girls theme song"
] as const

export type PreuploadedMusicFilesType = (typeof PREUPLOADED_MUSIC_FILES)[number]

export const PREUPLOADED_VIDEO_FILES = [
    
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

export function createDefaultFilmData() {
    return {
		name: "slander-meme",
		fileFormat: "mp4",
		scenes: [],
		musicSettings: {
			music: "Powerpuff girls theme song",
			startTime: null,
			endTime: null,
		}
	}
}