<script lang="ts">
	import { Button, Tile } from 'carbon-components-svelte';
	import type { FilmData } from '../../types/FilmData';
	import { type FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { getVideoFile } from '../../scripts/fileGetters';

	export let filmData: FilmData;
	export let ffmpeg: FFmpeg;
	export let isFFmpegLoaded: boolean;

	let videoSrc = '';
	let isRendering = false;
	let percent = 0;

	ffmpeg.setProgress(({ ratio }) => (percent = ratio * 100));

	async function render() {
		if (!isFFmpegLoaded) return;
		isRendering = true;

		const { outputFileName, outputFileFormat, musicSettings, scenes } = filmData;
		const fullOutputFileName = `${outputFileName}.${outputFileFormat}`;

		const vid = await getVideoFile(scenes[0].video);
		ffmpeg.FS('writeFile', vid.name, await fetchFile(vid));
		await ffmpeg.run('-i', vid.name, fullOutputFileName);
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
				<!-- svelte-ignore a11y-media-has-caption -->
				<video src={videoSrc} controls />
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
