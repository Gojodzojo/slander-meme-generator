<script lang="ts">
	import type { Scene } from '../../types/FilmData';
	import { ExpandableTile } from 'carbon-components-svelte';
	import VideoPreview from './VideoPreview.svelte';
	import VideoSelector from './VideoSelector.svelte';
	import SceneStartStopSelector from './SceneStartStopSelector.svelte';

	export let scene: Scene;
	export let sceneNumber: number;

	let videoFile: File | 'Loading video' | 'Loading video error' | 'Video not selected';
</script>

<div class="scene-list-element">
	<ExpandableTile light on:click={() => {}}>
		<div slot="above">Scene {sceneNumber}</div>
		<div slot="below" class="below" on:click={(e) => e.stopPropagation()} title="">
			<VideoPreview {videoFile} />
			<VideoSelector bind:video={scene.video} bind:videoFile />
			<SceneStartStopSelector bind:scene {videoFile} />
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
