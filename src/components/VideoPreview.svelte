<script lang="ts">
	export let videoSrc: string;
</script>

<div class="video-preview">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video src={videoSrc} controls />
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
