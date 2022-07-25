<script lang="ts">
	import 'carbon-components-svelte/css/g100.css';
	import { Button, ComposedModal, ModalBody, ModalHeader } from 'carbon-components-svelte';
	import { Tile } from 'carbon-components-svelte';
	import { createDefaultFilmData, type FilmData } from '../types/FilmData';
	import EditScenes from '../components/EditScenes/EditScenes.svelte';
	import AdjustSettings from '../components/AdjustSettings/AdjustSettings.svelte';
	import RenderTheVideo from '../components/RenderTheVideo/RenderTheVideo.svelte';
	import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { onMount } from 'svelte';

	enum Step {
		EditScenes,
		AdjustSettings,
		RenderTheVideo
	}

	const ffmpeg = createFFmpeg({ log: true });
	let isFFmpegLoaded = false;
	let FFmpegLoadFailed = false;

	onMount(async () => {
		try {
			await ffmpeg.load();
			ffmpeg.FS('writeFile', 'impact.ttf', await fetchFile('./fonts/impact.ttf'));
			isFFmpegLoaded = true;
		} catch {
			FFmpegLoadFailed = true;
		}
	});

	let filmData: FilmData = createDefaultFilmData();
	let currentStep: Step = Step.EditScenes;

	function setStep(newStep: Step) {
		return () => (currentStep = newStep);
	}
</script>

<svelte:head>
	<title>Slander meme generator</title>
</svelte:head>

<main>
	<ComposedModal preventCloseOnClickOutside class="load-failed-modal" open={FFmpegLoadFailed}>
		<ModalHeader title="App failed to load" />
		<ModalBody>
			Unfortunatelly your browser does not support the FFmpeg.wasm library which
			is essential for this app to work.
			<br />
			Please try using other browser on a desktop computer.
		</ModalBody>
	</ComposedModal>
	<span class="title">Slander meme generator</span>
	<div class="step-buttons">
		<Button on:click={setStep(Step.EditScenes)}>1. Edit scenes</Button>
		<Button on:click={setStep(Step.AdjustSettings)}>2. Adjust settings</Button>
		<Button on:click={setStep(Step.RenderTheVideo)}>3. Render the video</Button>
	</div>
	<div class="step-container">
		<Tile class="step">
			{#if currentStep === Step.EditScenes}
				<EditScenes bind:scenes={filmData.scenes} />
			{:else if currentStep === Step.AdjustSettings}
				<AdjustSettings
					bind:fileName={filmData.outputFileName}
					bind:outputFileFormat={filmData.outputFileFormat}
					bind:musicSettings={filmData.musicSettings}
					bind:filmWidth={filmData.filmWidth}
					bind:filmHeight={filmData.filmHeight}
				/>
			{:else}
				<RenderTheVideo {filmData} {ffmpeg} {isFFmpegLoaded} />
			{/if}
		</Tile>
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');

	:global(body) {
		margin: 0;
		height: 100vh;
		width: 100vw;
	}

	main {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.title {
		font-family: 'Playfair Display', serif;
		font-size: 8vmin;
		margin: 5vh 0;
		display: block;
	}

	.step-buttons {
		display: flex;
		width: calc(100% - 40px);
		max-width: 700px;
		justify-content: space-between;
	}

	.step-buttons > :global(button) {
		width: calc((100% - 40px) / 3);
	}

	.step-container {
		width: 100vw;
		min-height: 0; /* https://stackoverflow.com/q/36247140/3597276 */
		flex-grow: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	main :global(.step) {
		height: calc(100% - 40px);
		width: calc(100% - 40px);
		max-width: 700px;
		overflow: auto;
	}

	main :global(.step)::-webkit-scrollbar {
		width: 10px;
	}

	main :global(.step)::-webkit-scrollbar-thumb {
		background-color: #aaaaaa;
	}

	main :global(.load-failed-modal .bx--modal-close) {
		display: none;
	}
</style>
