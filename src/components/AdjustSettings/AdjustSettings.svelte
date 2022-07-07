<script lang="ts">
	import { PREUPLOADED_MUSIC_FILES, type FilmData } from '../../types/FilmData';
	import MediaSelector, { MediaStatus } from '../MediaSelector.svelte';

	export let filmData: FilmData;

	let musicFileStatus: MediaStatus = MediaStatus.Ok;
</script>

<div class="adjust-settings">
	<MediaSelector
		bind:media={filmData.musicSettings.music}
		bind:status={musicFileStatus}
		mediaType="music"
		acceptedFileTypes={['audio/*']}
		preuploadedFileNames={PREUPLOADED_MUSIC_FILES}
	/>
</div>

<style>
	.adjust-settings {
		width: 100%;
		height: 100%;
	}
</style>
