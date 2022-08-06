import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import type { FilmSettings } from '../stores/filmSettingsStore';
import type { MusicSettings } from '../stores/musicSettingsStore';
import type { Scene } from '../stores/scenesStore';
import { getMusicFile, getVideoFile } from './fileGetters';

export class Renderer {
	ffmpeg = createFFmpeg({ log: true });

	async load() {
		await this.ffmpeg.load();
		this.ffmpeg.FS('writeFile', 'impact.ttf', await fetchFile('./fonts/impact.ttf'));
	}

	setProgress(callback: (d: { ratio: number }) => void) {
		this.ffmpeg.setProgress(callback);
	}

	async render(scenes: Scene[], filmSettings: FilmSettings, musicSettings: MusicSettings) {
		const { filmWidth, filmHeight, outputFileFormat } = filmSettings;

		const inputFiles = new Array<string>(scenes.length * 2);
		const filters = new Array<string>(scenes.length);
		const concatTracks = new Array<string>(scenes.length);

		const videoWritePromises = scenes.map(
			async ({ video, startTime, endTime, speed, bottomTextSettings, topTextSettings }, index) => {
				const videoFile = await getVideoFile(video);
				const fileExtension = videoFile.name.split('.').pop();
				const newFileName = `${index}.${fileExtension}`;

				this.ffmpeg.FS('writeFile', newFileName, await fetchFile(videoFile));
        
				inputFiles[index * 2] = '-i';
				inputFiles[index * 2 + 1] = newFileName;
				concatTracks[index] = `[v${index}]`;

				filters[index] = `[${index}:v]
			scale=${filmWidth}:${filmSettings.filmHeight}:force_original_aspect_ratio=decrease,
			pad=${filmWidth}:${filmHeight}:(ow-iw)/2:(oh-ih)/2,
			setsar=1/1,
			drawtext=fontfile=impact.ttf:text='${bottomTextSettings.text}':fontcolor=white:fontsize=${
					bottomTextSettings.fontSize
				}:borderw=${bottomTextSettings.borderWidth}:x=(w-text_w)/2:y=(h-text_h) - ${
					bottomTextSettings.fontSize / 2
				},
			drawtext=fontfile=impact.ttf:text='${topTextSettings.text}':fontcolor=white:fontsize=${
					topTextSettings.fontSize
				}:borderw=${topTextSettings.borderWidth}:x=(w-text_w)/2:y=${topTextSettings.fontSize / 2},
			drawtext=fontfile=impact.ttf:text='gojodzojo.github.io/slander-meme-generator':fontsize=10 * (${filmSettings.filmHeight} / 480):fontcolor=black:box=1:boxcolor=white@0.5:boxborderw=2:x=w-text_w - 2:y=h-text_h - 2,
			trim=${startTime}:${endTime},
			setpts=${1 / speed}*(PTS-STARTPTS)[v${index}];`;
			}
		);

		await Promise.all(videoWritePromises);

		const musicFile = await getMusicFile(musicSettings.music);
		const fileExtension = musicFile.name.split('.').pop();
		const musicFileName = `m.${fileExtension}`;
		this.ffmpeg.FS('writeFile', musicFileName, await fetchFile(musicFile));
		inputFiles.push('-i', musicFileName);

		const fullOutputFileName = `${Math.random()}.${outputFileFormat}`;
		await this.ffmpeg.run(
			...inputFiles,
			'-filter_complex',
			`${filters.join(' ')}
			${concatTracks.join('')}
			concat=n=${scenes.length}:v=1:a=0 [v]`,
			'-filter_complex',
			`[${scenes.length}:a] atempo=${musicSettings.speed} [a]`,
      '-vsync',
      'vfr',
			'-map',
			'[v]',
			'-map',
			'[a]',
			'-shortest',
			fullOutputFileName
		);

		const data = this.ffmpeg.FS('readFile', fullOutputFileName);

		return URL.createObjectURL(new Blob([data.buffer], { type: `video/${outputFileFormat}` }));
	}
}
