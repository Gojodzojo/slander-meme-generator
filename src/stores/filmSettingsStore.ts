import {writable, type Writable} from "svelte/store"

export const OUTPUT_FILE_FORMATS = [
    "mp4"
] as const

export type OutputFileFormatsType = (typeof OUTPUT_FILE_FORMATS)[number]

export interface FilmSettings {
    outputFileName: string
    outputFileFormat: OutputFileFormatsType
    filmWidth: number
    filmHeight: number
}

export const filmSettings: Writable<FilmSettings> = writable({
		outputFileName: "slander-meme",
		outputFileFormat: "mp4",
        filmWidth: 640,
        filmHeight: 480,
})
