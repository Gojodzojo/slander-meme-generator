<script lang="ts">
	import type { Scene } from 'src/types/FilmData';
	import { ExpandableTile } from 'carbon-components-svelte';

	export let scene: Scene;
	export let sceneNumber: number;
</script>

<div class="scene-list-element">
	<ExpandableTile light>
		<div slot="above">Scene {sceneNumber}</div>
		<div slot="below">Below the fold content here</div>
	</ExpandableTile>
</div>

<style>
	.scene-list-element {
		margin-bottom: 16px;
	}
</style>
