<script lang="ts">
	import 'carbon-components-svelte/css/g100.css';
	import { ComposedModal, ModalBody, ModalHeader } from 'carbon-components-svelte';
	import { Tile } from 'carbon-components-svelte';
	import EditScenes from '../components/EditScenes/EditScenes.svelte';
	import AdjustSettings from '../components/AdjustSettings/AdjustSettings.svelte';
	import RenderTheVideo from '../components/RenderTheVideo/RenderTheVideo.svelte';
	import { onMount } from 'svelte';
	import { currentStep, Step } from '../stores/stepStore';
	import DownloadTheVideo from '../components/DownloadTheVideo/DownloadTheVideo.svelte';
	import { Renderer } from '../scripts/renderer';

	let renderer = new Renderer();
	let isRendererLoaded = false;
	let rendererLoadFailed = false;

	onMount(async () => {
		try {
			await renderer.load();
			isRendererLoaded = true;
		} catch {
			rendererLoadFailed = true;
		}
	});
</script>

<svelte:head>
	<title>Slander meme generator</title>
</svelte:head>

<main>
	<ComposedModal preventCloseOnClickOutside class="load-failed-modal" open={rendererLoadFailed}>
		<ModalHeader title="App failed to load" />
		<ModalBody>
			Unfortunatelly your browser does not support the FFmpeg.wasm library which is essential for
			this app to work.
			<br />
			Please try using other browser on a desktop computer.
		</ModalBody>
	</ComposedModal>

	<span class="title">Slander meme generator</span>
	<div class="step-container">
		<Tile class="step">
			{#if $currentStep === Step.EditScenes}
				<EditScenes />
			{:else if $currentStep === Step.AdjustSettings}
				<AdjustSettings />
			{:else if $currentStep === Step.RenderTheVideo}
				<RenderTheVideo {renderer} {isRendererLoaded} />
			{:else}
				<DownloadTheVideo />
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
		max-width: 900px;
	}

	main :global(.load-failed-modal .bx--modal-close) {
		display: none;
	}
</style>
