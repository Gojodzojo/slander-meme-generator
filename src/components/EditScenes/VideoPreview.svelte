<script lang="ts">
	import type { PreuploadedVideoFilesType } from '../../types/FilmData';

	export let video: File | PreuploadedVideoFilesType;
	export let selectedVideo: PreuploadedVideoFilesType | 'Custom video';

	let selectedFiles: FileList | null | undefined;

	// Do not show video element if user is in 'Custom video' mode but the video file has not been picked yet
	$: shouldShowVideoElement = selectedVideo !== 'Custom video' || typeof video === 'object';

	$: if (selectedVideo !== 'Custom video') {
		video = selectedVideo;
		selectedFiles = null;
	} else if (selectedFiles && selectedFiles[0]) {
		video = selectedFiles[0];
	}

	$: videoSrc =
		typeof video === 'string'
			? `/video/${video.split(' ').join('_')}.mp4`
			: URL.createObjectURL(video);
</script>

<div class="video-preview">
	{#if shouldShowVideoElement}
		<!-- svelte-ignore a11y-media-has-caption -->
		<video src={videoSrc} controls />
	{/if}

	{#if selectedVideo === 'Custom video'}
		<label>
			<div class="file-input-text">Pick a custom video</div>
			<input type="file" accept="video/*" bind:files={selectedFiles} />
		</label>
	{/if}
</div>

<style>
	.video-preview {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 400px;
	}

	video {
		max-width: 100%;
		max-height: calc(100% - 2em);
	}

	input[type='file'] {
		display: none;
	}

	.file-input-text {
		cursor: pointer;
		margin: 0.5em;
	}
</style>
