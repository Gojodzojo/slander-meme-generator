<script lang="ts">
	import {
		PREUPLOADED_VIDEO_FILES,
		type PreuploadedVideoFilesType,
		type Scene
	} from '../../types/FilmData';
	import { ExpandableTile, Select, SelectItem } from 'carbon-components-svelte';
	import VideoPreview from './VideoPreview.svelte';

	export let scene: Scene;
	export let sceneNumber: number;

	let selectedVideo: PreuploadedVideoFilesType | 'Custom video' =
		typeof scene.video === 'string' ? scene.video : 'Custom video';
</script>

<div class="scene-list-element">
	<ExpandableTile light on:click={() => {}}>
		<div slot="above">Scene {sceneNumber}</div>
		<div slot="below" class="below" on:click={(e) => e.stopPropagation()} title="">
			<VideoPreview bind:video={scene.video} {selectedVideo} />
			<Select labelText="Select video" bind:selected={selectedVideo}>
				<SelectItem value="Custom video" text="Custom video" />
				{#each PREUPLOADED_VIDEO_FILES as videoName}
					<SelectItem value={videoName} text={videoName} />
				{/each}
			</Select>
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
</style>
