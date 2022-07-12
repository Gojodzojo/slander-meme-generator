<svelte:options immutable />

<script lang="ts">
	import { Loading } from 'carbon-components-svelte';
	import { getMusicAndDuration } from '../../scripts/fileGetters';
	import { PREUPLOADED_MUSIC_FILES, type PreuploadedMusicFilesType } from '../../types/FilmData';
	import MediaSelector, { MediaStatus } from '../MediaSelector.svelte';
	import SceneStartStopSelector from '../SceneStartStopSelector.svelte';
	import MusicPreview from './MusicPreview.svelte';

	export let music: File | PreuploadedMusicFilesType;
	export let startTime: number;
	export let endTime: number;

	let musicFileStatus: MediaStatus = MediaStatus.Ok;
</script>

<div class="music-settings">
	<MediaSelector
		bind:media={music}
		bind:status={musicFileStatus}
		mediaType="music"
		acceptedFileTypes={['audio/*']}
		preuploadedFileNames={PREUPLOADED_MUSIC_FILES}
	/>
	<div class="music-controls">
		{#if musicFileStatus === MediaStatus.FileNotSelected}
			Please select a file
		{:else}
			{#await getMusicAndDuration(music)}
				<Loading withOverlay={false} />
			{:then [musicFile, musicDuration]}
				<div style="width:100%; height: 100%;">
					<MusicPreview {musicFile} />
					<SceneStartStopSelector
						bind:start={startTime}
						bind:end={endTime}
						duration={musicDuration}
					/>
				</div>
			{/await}
		{/if}
	</div>
</div>

<style>
	.music-controls {
		width: 100%;
		height: 132px;
		margin-top: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
