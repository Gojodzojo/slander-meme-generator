<script lang="ts">
	import { Button, Tile } from 'carbon-components-svelte';
	import { type FFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
	import { getMusicFile, getVideoFile } from '../../scripts/fileGetters';
	import { filmSettings } from '../../stores/filmSettingsStore';
	import { scenes } from '../../stores/scenesStore';
	import { musicSettings } from '../../stores/musicSettingsStore';
	import StepHeader from '../StepHeader.svelte';
	import { currentStep, Step } from '../../stores/stepStore';
	import { videoSrc } from '../../stores/videoSrcStore';

	export let ffmpeg: FFmpeg;
	export let isFFmpegLoaded: boolean;

	let isRendering = false;
	let percent = 0;

	ffmpeg.setProgress(({ ratio }) => {
		if (ratio > 0) {
			percent = ratio * 100;
		}
	});

	function previousStep() {
		$currentStep = Step.AdjustSettings;
	}

	function nextStep() {
		$currentStep = Step.DownloadTheVideo;
	}

	async function render() {
		if (!isFFmpegLoaded && $filmSettings.outputFileName !== '' && $scenes.length !== 0) return;
		isRendering = true;
		percent = 0;

		let inputFiles = new Array<string>($scenes.length * 2);
		let filters = new Array<string>($scenes.length);
		let concatTracks = new Array<string>($scenes.length);

		const videoWritePromises = $scenes.map(
			async ({ video, startTime, endTime, speed, bottomTextSettings, topTextSettings }, index) => {
				const videoFile = await getVideoFile(video);
				const fileExtension = videoFile.name.split('.').pop()!;
				const newFileName = `${index}.${fileExtension}`;
				ffmpeg.FS('writeFile', newFileName, await fetchFile(videoFile));
				inputFiles[index * 2] = '-i';
				inputFiles[index * 2 + 1] = newFileName;
				concatTracks[index] = `[v${index}]`;
				filters[index] = `[${index}:v]
			scale=${$filmSettings.filmWidth}:${$filmSettings.filmHeight}:force_original_aspect_ratio=decrease,
			pad=${$filmSettings.filmWidth}:${$filmSettings.filmHeight}:(ow-iw)/2:(oh-ih)/2,
			setsar=1/1,
			drawtext=fontfile=impact.ttf:text='${bottomTextSettings.text}':fontcolor=white:fontsize=${
					bottomTextSettings.fontSize
				}:borderw=5:x=(w-text_w)/2:y=(h-text_h) - ${bottomTextSettings.fontSize / 2},
			drawtext=fontfile=impact.ttf:text='${topTextSettings.text}':fontcolor=white:fontsize=${
					topTextSettings.fontSize
				}:borderw=5:x=(w-text_w)/2:y=${topTextSettings.fontSize / 2},
			trim=${startTime}:${endTime},
			setpts=${1 / speed}*(PTS-STARTPTS)[v${index}];`;
			}
		);
		await Promise.all(videoWritePromises);

		const musicFile = await getMusicFile($musicSettings.music);
		const fileExtension = musicFile.name.split('.').pop()!;
		const musicFileName = `m.${fileExtension}`;
		ffmpeg.FS('writeFile', musicFileName, await fetchFile(musicFile));
		inputFiles.push('-i', musicFileName);

		const fullOutputFileName = `${$filmSettings.outputFileName}.${$filmSettings.outputFileFormat}`;
		await ffmpeg.run(
			...inputFiles,
			'-filter_complex',
			`${filters.join(' ')}
			${concatTracks.join('')}
			concat=n=${$scenes.length}:v=1:a=0 [v]`,
			'-filter_complex',
			`[${$scenes.length}:a] atempo=${$musicSettings.speed} [a]`,
			'-map',
			'[v]',
			'-map',
			'[a]',
			'-shortest',
			fullOutputFileName
		);
		const data = ffmpeg.FS('readFile', fullOutputFileName);
		$videoSrc = URL.createObjectURL(
			new Blob([data.buffer], { type: `video/${$filmSettings.outputFileFormat}` })
		);
		isRendering = false;
	}
</script>

<div class="render-the-video">
	<StepHeader>Render the video</StepHeader>

	<Tile light class="rendering-status">
		{#if !isFFmpegLoaded}
			Loading FFmpeg
		{:else if isRendering}
			Rendering: {percent.toFixed(0)}%
		{:else if $videoSrc === ''}
			<Button on:click={render}>Start rendering</Button>
		{:else}
			<div class="render-success">Video rendered successfully!</div>
			<Button class="render-success" on:click={render}>Render agin</Button>
		{/if}
	</Tile>

	<div class="step-buttons">
		<Button kind="secondary" on:click={previousStep}>Go back</Button>
		<Button on:click={nextStep}>Next step</Button>
	</div>
</div>

<style>
	.render-the-video {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.render-the-video :global(.rendering-status) {
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.render-the-video :global(.render-success) {
		margin: 16px;
	}

	.step-buttons {
		margin-top: 16px;
		width: 100%;
		height: 64px;
	}

	.step-buttons :global(.bx--btn) {
		height: calc(100% - 2px);
		width: calc(50% - 4px);
		max-width: none;
	}
</style>
