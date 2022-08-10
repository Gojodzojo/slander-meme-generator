<script lang="ts">
	import {
		PREUPLOADED_VIDEO_FILES,
		type PreuploadedVideoFilesType,
		type TextSettings
	} from '../../stores/scenesStore';
	import { Button, ExpandableTile, Loading, NumberInput } from 'carbon-components-svelte';
	import VideoPreview from '../VideoPreview.svelte';
	import SceneStartStopSelector from '../SceneStartStopSelector.svelte';
	import SceneTextInput from './SceneTextInput.svelte';
	import MediaSelector, { MediaStatus } from '../MediaSelector.svelte';
	import { getVideoAndDuration } from '../../scripts/fileGetters';

	export let video: File | PreuploadedVideoFilesType;
	export let videoSpeed: number;
	export let videoStartTime: number;
	export let videoEndTime: number;
	export let topTextSettings: TextSettings;
	export let bottomTextSettings: TextSettings;
	export let sceneNumber: number;
	export let deleteScene: () => void;
	export let hasError: boolean;

	let videoFileStatus: MediaStatus = MediaStatus.Ok;
</script>

<div class="scene-list-element">
	<ExpandableTile light on:click={() => {}}>
		<div slot="above" style={hasError ? 'color: #fa4d56;' : ''}>
			Scene {sceneNumber}
		</div>
		<div slot="below" class="below" on:click={(e) => e.stopPropagation()} title="">
			<MediaSelector
				bind:media={video}
				bind:status={videoFileStatus}
				mediaType="video"
				acceptedFileTypes={['video/*']}
				preuploadedFileNames={PREUPLOADED_VIDEO_FILES}
			/>
			<div class="scene-controls">
				{#if videoFileStatus === MediaStatus.FileNotSelected}
					Please select a file
				{:else}
					{#await getVideoAndDuration(video)}
						<Loading withOverlay={false} />
					{:then [videoFile, videoDuration]}
						<div style="width: 100%; height: 100%;">
							<VideoPreview videoSrc={URL.createObjectURL(videoFile)} />
							<SceneStartStopSelector
								bind:start={videoStartTime}
								bind:end={videoEndTime}
								duration={videoDuration}
							/>
							<NumberInput bind:value={videoSpeed} label="Video speed" min={0.00001} step={0.1} />
							<SceneTextInput
								bind:fontSize={topTextSettings.fontSize}
								bind:text={topTextSettings.text}
								bind:borderWidth={topTextSettings.borderWidth}
								labelText="Top text"
								placeholder="Enter top text..."
							/>
							<SceneTextInput
								bind:fontSize={bottomTextSettings.fontSize}
								bind:text={bottomTextSettings.text}
								bind:borderWidth={bottomTextSettings.borderWidth}
								labelText="Bottom text"
								placeholder="Enter bottom text..."
							/>
						</div>
					{:catch}
						Could not load the video
					{/await}
				{/if}
			</div>
			<div class="delete-scene-button-container">
				<Button kind="danger-ghost" on:click={deleteScene}>Delete scene</Button>
			</div>
		</div>
	</ExpandableTile>
</div>

<style>
	.scene-list-element {
		margin-bottom: 16px;
	}

	.scene-list-element :global(.bx--form-item) {
		margin-bottom: 16px;
	}

	.below {
		padding-bottom: 30px;
		padding-top: 16px;
		cursor: default;
	}

	.scene-list-element :global(.delete-scene-button-container) {
		margin-top: 16px;
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.scene-controls {
		width: 100%;
		height: 1036px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
