<script lang="ts">
	import { Select, SelectItem, FileUploaderButton } from 'carbon-components-svelte';
	import { PREUPLOADED_VIDEO_FILES, type PreuploadedVideoFilesType } from '../../types/FilmData';

	export let video: File | PreuploadedVideoFilesType;
	export let videoFile: File | 'Loading video' | 'Loading video error' | 'Video not selected';

	if (typeof video === 'object') {
		videoFile = video;
	} else {
		loadPreuploadedVideo(video);
	}

	let selectedVideo: PreuploadedVideoFilesType | 'Custom video' =
		typeof video === 'string' ? video : 'Custom video';

	function handleSelectionChange() {
		if (selectedVideo === 'Custom video') {
			videoFile = 'Video not selected';
		} else {
			video = selectedVideo;
			loadPreuploadedVideo(selectedVideo);
		}
	}

	function handleFileChange(e: CustomEvent<readonly File[]>) {
		videoFile = e.detail[0];
		video = videoFile;
	}

	async function loadPreuploadedVideo(preuploadedVideo: PreuploadedVideoFilesType) {
		videoFile = 'Loading video';
		try {
			const fileName = `${preuploadedVideo.split(' ').join('_')}.mp4`;
			const resp = await fetch(`/video/${fileName}`);
			const blob = await resp.blob();
			videoFile = new File([blob], fileName, { type: 'video/mp4' });
		} catch (err) {
			console.error(err);
			videoFile = 'Loading video error';
		}
	}
</script>

<div class="video-selector">
	<Select labelText="Select video" bind:selected={selectedVideo} on:change={handleSelectionChange}>
		<SelectItem value="Custom video" text="Custom video" />
		{#each PREUPLOADED_VIDEO_FILES as videoName}
			<SelectItem value={videoName} text={videoName} />
		{/each}
	</Select>
	{#if selectedVideo === 'Custom video'}
		<FileUploaderButton labelText="Select file" accept={['video/*']} on:change={handleFileChange} />
	{/if}
</div>

<style>
	.video-selector {
		display: flex;
		align-items: flex-end;
	}

	.video-selector :global(.bx--btn) {
		margin-top: 24px;
		margin-left: 16px;
		height: 40px;
		max-width: 50%;
		overflow: hidden;
	}
</style>
