<script lang="ts">
	import { Button, Tile } from 'carbon-components-svelte';
	import { type FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { getMusicFile, getVideoFile } from '../../scripts/fileGetters';
	import VideoPreview from '../VideoPreview.svelte';
	import { filmSettings } from '../../stores/filmSettingsStore';
	import { scenes } from '../../stores/scenesStore';
	import { musicSettings } from '../../stores/musicSettingsStore';

	export let ffmpeg: FFmpeg;
	export let isFFmpegLoaded: boolean;

	let videoSrc = '';
	let isRendering = false;
	let percent = 0;

	ffmpeg.setProgress(({ ratio }) => {
		if (ratio > 0) {
			percent = ratio * 100;
		}
	});

	async function render() {
		if (!isFFmpegLoaded && $filmSettings.outputFileName !== '' && $scenes.length !== 0)
			return;
		isRendering = true;
		percent = 0;

		let inputFiles = new Array<string>($scenes.length * 2);
		let filters = new Array<string>($scenes.length);
		let concatTracks = new Array<string>($scenes.length);

		const videoWritePromises = $scenes.map(
			async (
				{
					video,
					startTime,
					endTime,
					speed,
					bottomTextSettings,
					topTextSettings
				},
				index
			) => {
				const videoFile = await getVideoFile(video);
				const fileExtension = videoFile.name.split('.').pop()!;
				const newFileName = `${index}.${fileExtension}`;
				ffmpeg.FS('writeFile', newFileName, await fetchFile(videoFile));
				inputFiles[index * 2] = '-i';
				inputFiles[index * 2 + 1] = newFileName;
				concatTracks[index] = `[v${index}]`;
				filters[index] = `[${index}:v]
			scale=${$filmSettings.filmWidth}:${$filmSettings.filmHeight}:force_original_aspect_ratio=decrease,
			pad=${$filmSettings.filmWidth}:${$filmSettings.filmHeight}:(ow-iw)/2:(oh-ih)/2,
			setsar=1/1,
			drawtext=fontfile=impact.ttf:text='${bottomTextSettings.text}':fontcolor=white:fontsize=${
					bottomTextSettings.fontSize
				}:borderw=5:x=(w-text_w)/2:y=(h-text_h) - ${
					bottomTextSettings.fontSize / 2
				},
			drawtext=fontfile=impact.ttf:text='${topTextSettings.text}':fontcolor=white:fontsize=${
					topTextSettings.fontSize
				}:borderw=5:x=(w-text_w)/2:y=${topTextSettings.fontSize / 2},
			trim=${startTime}:${endTime},
			setpts=${1 / speed}*(PTS-STARTPTS)[v${index}];`;
			}
		);
		await Promise.all(videoWritePromises);

		const musicFile = await getMusicFile($musicSettings.music);
		const fileExtension = musicFile.name.split('.').pop()!;
		const musicFileName = `m.${fileExtension}`;
		ffmpeg.FS('writeFile', musicFileName, await fetchFile(musicFile));
		inputFiles.push('-i', musicFileName);

		const fullOutputFileName = `${$filmSettings.outputFileName}.${$filmSettings.outputFileFormat}`;
		await ffmpeg.run(
			...inputFiles,
			'-filter_complex',
			`${filters.join(' ')}
			${concatTracks.join('')}
			concat=n=${$scenes.length}:v=1:a=0 [v]`,
			'-filter_complex',
			`[${$scenes.length}:a] atempo=${$musicSettings.speed} [a]`,
			'-map',
			'[v]',
			'-map',
			'[a]',
			'-shortest',
			fullOutputFileName
		);
		const data = ffmpeg.FS('readFile', fullOutputFileName);
		videoSrc = URL.createObjectURL(
			new Blob([data.buffer], { type: `video/${$filmSettings.outputFileFormat}` })
		);
		isRendering = false;
	}
</script>

<div class="render-the-video">
	<Tile light>
		<Button class="render-btn" on:click={render} disabled={isRendering}>
			Render the video
		</Button>

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

		<Button
			class="download-btn"
			href={videoSrc}
			disabled={isRendering || videoSrc === ''}
			download="{$filmSettings.outputFileName}.{$filmSettings.outputFileFormat}"
		>
			Download the video
		</Button>
	</Tile>
</div>

<style>
	.render-the-video :global(.render-btn) {
		width: 100%;
		max-width: none;
		margin-bottom: 16px;
	}

	.render-the-video :global(.download-btn) {
		width: 100%;
		max-width: none;
		margin-top: 16px;
	}

	.video-container {
		width: 100%;
		height: 400px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
