import type {  PreuploadedMusicFilesType, PreuploadedVideoFilesType } from "../types/FilmData"

async function getPreuploadedFile(preuploadedFileName: string, fileDirectory: string, fileExtension: string, fileType: string) {
    const fileName = `${preuploadedFileName.split(' ').join('_')}.${fileExtension}`;
    const resp = await fetch(`/${fileDirectory}/${fileName}`);
    const blob = await resp.blob();
    return new File([blob], fileName, { type: fileType });
}

async function getPreuploadedVideo(preuploadedVideoName: PreuploadedVideoFilesType) {
    return await getPreuploadedFile(preuploadedVideoName, 'video', 'mp4', 'video/mp4')
}

async function getPreuploadedMusic(preuploadedMusicName: PreuploadedMusicFilesType) {
    return await getPreuploadedFile(preuploadedMusicName, 'music', 'mp3', 'audio/mpeg')
}

async function getMediaFile<T extends string>(
    media: File | T,
    preuploadedMediaGetter: (fileName: T) => Promise<File>
): Promise<File> {
    if (typeof media === 'object') {
        return media;
    } 
    
    return await preuploadedMediaGetter(media);    
}

export async function getVideoFile(video: File | PreuploadedVideoFilesType) {
    return await getMediaFile(video, getPreuploadedVideo)
}

export async function getMusicFile(music: File | PreuploadedMusicFilesType, ) {
    return await getMediaFile(music, getPreuploadedMusic)
}

function getMediaFileDuration(mediaFile: File, mediaType: 'video' | 'audio') {
    return new Promise<number>((resolve) => {
        const mediaElement = document.createElement(mediaType);
        mediaElement.preload = 'metadata';

        mediaElement.onloadedmetadata = function () {
            resolve(mediaElement.duration);
        };

        mediaElement.src = URL.createObjectURL(mediaFile);
	})
}

async function getMediaFileAndDuration<T extends string>(
    media: File | T,
    mediaFileGetter: (media: File | T) => Promise<File>,
    mediaType: 'video' | 'audio'
): Promise<[File, number]> {
    const mediaFile = await mediaFileGetter(media)
    const mediaDuration = await getMediaFileDuration(mediaFile, mediaType)

    return [mediaFile, mediaDuration]
}

export async function getVideoAndDuration(media: File | PreuploadedVideoFilesType) {
    return await getMediaFileAndDuration(media, getVideoFile, 'video')
}

export async function getMusicAndDuration(media: File | PreuploadedMusicFilesType) {
    return await getMediaFileAndDuration(media, getMusicFile, 'audio')
}