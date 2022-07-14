<script lang="ts">
	import { Button, Tile } from 'carbon-components-svelte';
	import type { FilmData } from '../../types/FilmData';
	import { type FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { getVideoFile } from '../../scripts/fileGetters';
	import VideoPreview from '../VideoPreview.svelte';

	export let filmData: FilmData;
	export let ffmpeg: FFmpeg;
	export let isFFmpegLoaded: boolean;

	let videoSrc = '';
	let isRendering = false;
	let percent = 0;

	ffmpeg.setProgress(({ ratio }) => (percent = ratio * 100));

	async function render() {
		const { outputFileName, outputFileFormat, musicSettings, scenes, filmWidth, filmHeight } =
			filmData;

		if (!isFFmpegLoaded && outputFileName !== '' && scenes.length !== 0) return;
		isRendering = true;
		percent = 0;

		let inputFiles = new Array<string>(scenes.length * 2);
		let filters = new Array<string>(scenes.length);
		let concatTracks = new Array<string>(scenes.length);

		const videoWritePromises = scenes.map(
			async ({ video, startTime, endTime, speed, bottomTextSettings, topTextSettings }, index) => {
				const videoFile = await getVideoFile(video);
				const fileExtension = videoFile.name.split('.').pop()!;
				const newFileName = `${index}.${fileExtension}`;
				ffmpeg.FS('writeFile', newFileName, await fetchFile(videoFile));
				inputFiles[index * 2] = '-i';
				inputFiles[index * 2 + 1] = newFileName;
				concatTracks[index] = `[v${index}]`;
				filters[index] = `[${index}:v]
			scale=${filmWidth}:${filmHeight}:force_original_aspect_ratio=decrease,
			pad=${filmWidth}:${filmHeight}:(ow-iw)/2:(oh-ih)/2,
			setsar=1/1,
			drawtext=fontfile=impact.ttf:text='${bottomTextSettings.text}':fontcolor=white:fontsize=${
					bottomTextSettings.fontSize
				}:borderw=5:x=(w-text_w)/2:y=(h-text_h) - ${bottomTextSettings.fontSize / 2},
			drawtext=fontfile=impact.ttf:text='${topTextSettings.text}':fontcolor=white:fontsize=${
					topTextSettings.fontSize
				}:borderw=5:x=(w-text_w)/2:y=${topTextSettings.fontSize / 2},
			trim=${startTime}:${endTime},
			setpts=${1 / speed}*(PTS-STARTPTS)[v${index}];`;
			}
		);
		await Promise.all(videoWritePromises);

		const fullOutputFileName = `${outputFileName}.${outputFileFormat}`;
		await ffmpeg.run(
			...inputFiles,
			'-filter_complex',
			`${filters.join(' ')}
			${concatTracks.join('')}
			concat=n=${filmData.scenes.length}:v=1:a=0 [v]`,
			'-map',
			'[v]',
			fullOutputFileName
		);
		const data = ffmpeg.FS('readFile', fullOutputFileName);
		videoSrc = URL.createObjectURL(new Blob([data.buffer], { type: `video/${outputFileFormat}` }));
		isRendering = false;
	}
</script>

<div class="render-the-video">
	<Tile light>
		<Button class="render-btn" on:click={render}>Render the video</Button>
		<div class="video-container">
			{#if !isFFmpegLoaded}
				Loading FFmpeg
			{:else if isRendering}
				{percent.toFixed(0)}%
			{:else if videoSrc === ''}
				Waiting for rendering
			{:else}
				<VideoPreview {videoSrc} />
			{/if}
		</div>
	</Tile>
</div>

<style>
	.render-the-video :global(.render-btn) {
		width: 100%;
		max-width: none;
	}
</style>
