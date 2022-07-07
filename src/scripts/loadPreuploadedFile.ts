import type { PreuploadedMusicFilesType, PreuploadedVideoFilesType } from "src/types/FilmData"

async function loadPreuploadedFile(preuploadedFileName: string, fileDirectory: string, fileExtension: string, fileType: string) {
    const fileName = `${preuploadedFileName.split(' ').join('_')}.${fileExtension}`;
    const resp = await fetch(`/${fileDirectory}/${fileName}`);
    const blob = await resp.blob();
    return new File([blob], fileName, { type: fileType });
}

export async function loadPreuploadedVideo(preuploadedVideoName: PreuploadedVideoFilesType) {
    return await loadPreuploadedFile(preuploadedVideoName, 'video', 'mp4', 'video/mp4')
}

export async function loadPreuploadedMusic(preuploadedMusicName: PreuploadedMusicFilesType) {
    return await loadPreuploadedFile(preuploadedMusicName, 'music', 'mp3', 'audio/mpeg')
}