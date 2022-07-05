<script lang="ts">
	import type { Scene } from '../../types/FilmData';
	import DoubleRangeSlider from './DoubleRangeSlider.svelte';

	export let scene: Scene;
	export let videoFile: File | 'Loading video' | 'Loading video error' | 'Video not selected';

	let videoDuration = 0;
	$: updateVideoDuration(videoFile);

	let rangeStart = 0;
	let rangeEnd = 1;

	$: scene.startTime = rangeStart * videoDuration;
	$: scene.endTime = rangeEnd * videoDuration;

	function updateVideoDuration(
		videoFile: File | 'Loading video' | 'Loading video error' | 'Video not selected'
	) {
		rangeStart = 0;
		rangeEnd = 1;

		if (typeof videoFile !== 'object') {
			videoDuration = 0;
			return;
		}

		const videoElement = document.createElement('video');
		videoElement.preload = 'metadata';

		videoElement.onloadedmetadata = function () {
			videoDuration = videoElement.duration;
		};

		videoElement.src = URL.createObjectURL(videoFile);
	}

	function secsToMinsAndSecs(s: number) {
		const minutes = Math.floor(s / 60);
		let seconds = Math.floor(s % 60).toString();

		if (seconds.length === 1) {
			seconds = '0' + seconds;
		}

		return `${minutes}:${seconds}`;
	}
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="bx--label">Pick start and end time of video</label>
<div class="scene-start-stop-selector">
	{secsToMinsAndSecs(scene.startTime)}
	<div class="slider-container">
		<DoubleRangeSlider bind:start={rangeStart} bind:end={rangeEnd} />
	</div>
	{secsToMinsAndSecs(scene.endTime)}
</div>

<style>
	.scene-start-stop-selector {
		width: 100%;
		display: flex;
	}

	.slider-container {
		flex-grow: 1;
		margin: 0 16px;
	}

	label {
		margin-top: 16px;
	}
</style>
