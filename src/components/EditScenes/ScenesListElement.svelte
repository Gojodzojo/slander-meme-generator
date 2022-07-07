<script context="module" lang="ts">
	export type VideoFileType = File | 'Loading' | 'Loading error' | 'File not selected';
</script>

<script lang="ts">
	import {
		PREUPLOADED_VIDEO_FILES,
		type PreuploadedVideoFilesType,
		type Scene
	} from '../../types/FilmData';
	import { Button, ExpandableTile, NumberInput } from 'carbon-components-svelte';
	import VideoPreview from './VideoPreview.svelte';
	import SceneStartStopSelector from './SceneStartStopSelector.svelte';
	import SceneTextInput from './SceneTextInput.svelte';
	import MediaSelector, { MediaStatus } from '../MediaSelector.svelte';
	import { loadPreuploadedVideo } from '../../scripts/loadPreuploadedFile';

	export let scene: Scene;
	export let sceneNumber: number;
	export let deleteScene: () => void;

	let videoFileStatus: MediaStatus = MediaStatus.Ok;
	let videoFile: VideoFileType = 'Loading';

	$: updateVideoFile(scene.video, videoFileStatus);

	async function updateVideoFile(
		video: File | PreuploadedVideoFilesType,
		videoFileStatus: MediaStatus
	) {
		if (videoFileStatus === MediaStatus.FileNotSelected) {
			videoFile = 'File not selected';
		} else if (typeof video === 'object') {
			videoFile = video;
		} else {
			videoFile = 'Loading';
			try {
				videoFile = await loadPreuploadedVideo(video);
			} catch (error) {
				console.error(error);
				videoFile = 'Loading error';
			}
		}
	}
</script>

<div class="scene-list-element">
	<ExpandableTile light on:click={() => {}}>
		<div slot="above">Scene {sceneNumber}</div>
		<div slot="below" class="below" on:click={(e) => e.stopPropagation()} title="">
			<VideoPreview {videoFile} />
			<MediaSelector
				bind:media={scene.video}
				bind:status={videoFileStatus}
				mediaType="video"
				acceptedFileTypes={['video/*']}
				preuploadedFileNames={PREUPLOADED_VIDEO_FILES}
			/>
			<SceneStartStopSelector bind:scene {videoFile} />
			<NumberInput bind:value={scene.speed} label="Video speed" min={0.00001} step={0.1} />
			<SceneTextInput
				bind:textSettings={scene.topTextSettings}
				labelText="Top text"
				placeholder="Enter top text..."
			/>
			<SceneTextInput
				bind:textSettings={scene.bottomTextSettings}
				labelText="Bottom text"
				placeholder="Enter bottom text..."
			/>
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
</style>
