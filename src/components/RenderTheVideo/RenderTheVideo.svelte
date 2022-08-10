<script lang="ts">
	import { Button, Tile } from 'carbon-components-svelte';
	import { filmSettings } from '../../stores/filmSettingsStore';
	import { scenes } from '../../stores/scenesStore';
	import { musicSettings } from '../../stores/musicSettingsStore';
	import StepHeader from '../StepHeader.svelte';
	import {
		setStep,
		Step,
		transitionX,
		TRANSITION_DURATION,
		TRANSITION_IN_DELAY
	} from '../../stores/stepStore';
	import { videoSrc } from '../../stores/videoSrcStore';
	import type { ProgressCallbackType, Renderer } from '../../scripts/renderer';
	import { onDestroy } from 'svelte';
	import { fly } from 'svelte/transition';

	export let renderer: Renderer;
	export let isRendererLoaded: boolean;

	let isRendering = false;
	let isError = false;
	let percent = 0;
	let remainingRenderingTime = 0;

	$: canGoToNextStep = $videoSrc !== '';

	const onProgress: ProgressCallbackType = (p) => {
		percent = p.percent;
		remainingRenderingTime = p.remainingRenderingTime;
	};

	renderer.setProgress(onProgress);
	onDestroy(() => renderer.unsetProgress(onProgress));

	function msToTime(s: number) {
		function pad(n: number) {
			return ('00' + n).slice(-2);
		}

		const ms = s % 1000;
		s = (s - ms) / 1000;
		const secs = s % 60;
		s = (s - secs) / 60;
		const mins = s;

		return pad(mins) + ':' + pad(secs);
	}

	function previousStep() {
		setStep(Step.AdjustSettings);
	}

	function nextStep() {
		setStep(Step.DownloadTheVideo);
	}

	async function render() {
		isRendering = true;
		isError = false;
		percent = 0;
		$videoSrc = '';

		try {
			$videoSrc = await renderer.render($scenes, $filmSettings, $musicSettings);
		} catch (err) {
			isError = true;
		}
		isRendering = false;
	}
</script>

<div
	class="render-the-video"
	in:fly={{ delay: TRANSITION_IN_DELAY, duration: TRANSITION_DURATION, x: -$transitionX }}
	out:fly={{ duration: TRANSITION_DURATION, x: $transitionX }}
>
	<StepHeader>Render the video</StepHeader>

	<Tile light class="rendering-status">
		{#if !isRendererLoaded}
			Loading FFmpeg
		{:else if isRendering}
			<div class="marg">Rendering: {Math.floor(percent)}%</div>
			<div class="marg">Remaining time: {msToTime(remainingRenderingTime)}</div>
		{:else if isError}
			<div class="marg">An error occurred while rendering your video</div>
			<Button class="marg" on:click={render}>Try agin</Button>
		{:else if $videoSrc === ''}
			<Button on:click={render}>Start rendering</Button>
		{:else}
			<div class="marg">Video rendered successfully!</div>
			<Button class="marg" on:click={render}>Render agin</Button>
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

	.render-the-video :global(.marg) {
		margin: 16px;
	}

	.step-buttons {
		margin-top: 16px;
		width: 100%;
		height: 64px;
	}

	.step-buttons :global(.bx--btn) {
		height: calc(100% - 2px);
		width: calc(50% - 2px);
		max-width: none;
	}
</style>
