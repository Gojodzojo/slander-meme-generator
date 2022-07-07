<script lang="ts">
	import { Loading } from 'carbon-components-svelte';
	export let videoFile: File | 'Loading' | 'Loading error' | 'File not selected';

	$: videoSrc = typeof videoFile === 'object' ? URL.createObjectURL(videoFile) : '';
</script>

<div class="video-preview">
	{#if typeof videoFile !== 'string'}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video src={videoSrc} controls />
	{:else if videoFile === 'Loading'}
		<Loading withOverlay={false} />
	{:else if videoFile === 'Loading error'}
		Could not load the video
	{:else}
		Select a video file
	{/if}
</div>

<style>
	.video-preview {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 400px;
	}

	video {
		max-width: 100%;
		max-height: 100%;
	}
</style>
