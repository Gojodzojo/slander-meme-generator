<script lang="ts">
	export let musicFile: File;

	$: musicSrc = URL.createObjectURL(musicFile);
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<audio src={musicSrc} controls />

<style>
	audio {
		width: 100%;
	}
</style>
