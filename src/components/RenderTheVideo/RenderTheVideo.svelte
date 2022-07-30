<script lang="ts">
	import { Button, Tile } from 'carbon-components-svelte';
	import { filmSettings } from '../../stores/filmSettingsStore';
	import { scenes } from '../../stores/scenesStore';
	import { musicSettings } from '../../stores/musicSettingsStore';
	import StepHeader from '../StepHeader.svelte';
	import { currentStep, Step } from '../../stores/stepStore';
	import { videoSrc } from '../../stores/videoSrcStore';
	import type { Renderer } from '../../scripts/renderer';

	export let renderer: Renderer;
	export let isRendererLoaded: boolean;

	let isRendering = false;
	let percent = 0;

  $:canGoToNextStep = $videoSrc !== '' 

	renderer.setProgress(({ ratio }) => {
		if (ratio > 0) {
			percent = ratio * 100;
		}
	});

	function previousStep() {
		$currentStep = Step.AdjustSettings;
	}

	function nextStep() {
		$currentStep = Step.DownloadTheVideo;
	}

	async function render() {
		isRendering = true;
		percent = 0;

		$videoSrc = await renderer.render($scenes, $filmSettings, $musicSettings);
		isRendering = false;
	}
</script>

<div class="render-the-video">
	<StepHeader>Render the video</StepHeader>

	<Tile light class="rendering-status">
		{#if !isRendererLoaded}
			Loading FFmpeg
		{:else if isRendering}
			Rendering: {percent.toFixed(0)}%
		{:else if $videoSrc === ''}
			<Button on:click={render}>Start rendering</Button>
		{:else}
			<div class="render-success">Video rendered successfully!</div>
			<Button class="render-success" on:click={render}>Render agin</Button>
		{/if}
	</Tile>

	<div class="step-buttons">
		<Button kind="secondary" on:click={previousStep}>Go back</Button>
		<Button disabled={!canGoToNextStep} on:click={nextStep}>Next step</Button>
	</div>
</div>

<style>
	.render-the-video {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.render-the-video :global(.rendering-status) {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.render-the-video :global(.render-success) {
		margin: 16px;
	}

	.step-buttons {
		margin-top: 16px;
		width: 100%;
		height: 64px;
	}

	.step-buttons :global(.bx--btn) {
		height: calc(100% - 2px);
		width: calc(50% - 4px);
		max-width: none;
	}
</style>
