<script lang="ts">
	import DoubleRangeSlider from './DoubleRangeSlider.svelte';

	export let start: number;
	export let end: number;
	export let duration: number;

	let rangeStart = 0;
	let rangeEnd = 1;

	$: changeDuration(duration);
	$: start = rangeStart * duration;
	$: end = rangeEnd * duration;

	function changeDuration(duration: number) {
		rangeStart = start / duration;
		rangeEnd = end / duration;

		if (rangeStart > 1) rangeStart = 1;
		if (rangeEnd > 1) rangeEnd = 1;
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
	{secsToMinsAndSecs(start)}
	<div class="slider-container">
		<DoubleRangeSlider bind:start={rangeStart} bind:end={rangeEnd} />
	</div>
	{secsToMinsAndSecs(end)}
</div>

<style>
	.scene-start-stop-selector {
		width: 100%;
		display: flex;
		margin-bottom: 16px;
	}

	.slider-container {
		flex-grow: 1;
		margin: 0 16px;
	}

	label {
		margin-top: 16px;
	}
</style>
