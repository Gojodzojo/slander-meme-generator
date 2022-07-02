export interface TextSettings {
    text: string
    font: string
    fontSize: number
}

export interface Scene {
    film: File | string
    startTime: string
    endTime: string
    topTextSettings: TextSettings
    bottomTextSettings: TextSettings
}

export interface MusicSettings {
    music: File | string
    startTime: string
    endTime: string
}

export interface FilmData {
    name: string
    musicSettings: MusicSettings
    scenes: Scene[]
}