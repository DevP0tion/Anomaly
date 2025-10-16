<script lang="ts">
	import { onMount } from 'svelte';
	import type { StageClient } from '$lib/client/game/stage';
	import { NodeTypes } from '$lib/types/game/stage';

	let { stage }: { stage: StageClient } = $props();

	const nodeInfo: {
		[key in NodeTypes]: {
			name: string;
			title: string;
			icon: string;
			imgSrc: string;
		};
	} = {
		[NodeTypes.Blank]: {
			name: 'Blank',
			title: '빈 노드',
			icon: '⬜',
			imgSrc: '/tiles/tile_0009.png',
		},
		[NodeTypes.Normal]: {
			name: 'Normal',
			title: '일반 노드',
			icon: '⬛',
			imgSrc: '/tiles/tile_0009.png',
		},
		[NodeTypes.Event]: {
			name: 'Event',
			title: '이벤트 노드',
			icon: '🟫',
			imgSrc: '/tiles/tile_0009.png',
		},
		[NodeTypes.Elite]: {
			name: 'Elite',
			title: '정예 노드',
			icon: '🟩',
			imgSrc: '/tiles/tile_0009.png',
		},
		[NodeTypes.Shop]: {
			name: 'Shop',
			title: '상점 노드',
			icon: '🟥',
			imgSrc: '/tiles/tile_0009.png',
		},
		[NodeTypes.Start]: {
			name: 'Start',
			title: '시작 노드',
			icon: '🟦',
			imgSrc: '/tiles/tile_0009.png',
		},
		[NodeTypes.Boss]: {
			name: 'Boss',
			title: '보스 노드',
			icon: '🟨',
			imgSrc: '/tiles/tile_0009.png',
		},
	};

	onMount(() => {});
</script>

<svelte:head>
	<title>Field View</title>
</svelte:head>

<table>
	<tbody>
		{#each stage.nodes as line}
			<tr>
				{#each line as node}
					<td>
						{#if node}
							<span
								title={nodeInfo[node].title}
								style:background-image={`url(${nodeInfo[node].imgSrc})`}
								>{nodeInfo[node].icon}</span
							>
						{:else}
							<span title="빈 노드">❔</span>
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	table {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 20px;
		background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
		border: 3px solid #4a5568;
		border-radius: 12px;
		box-shadow:
			0 10px 25px rgba(0, 0, 0, 0.3),
			0 20px 40px rgba(0, 0, 0, 0.1),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);

		&:before {
			content: '';
			position: absolute;
			top: -2px;
			left: -2px;
			right: -2px;
			bottom: -2px;
			background: linear-gradient(
				45deg,
				rgba(99, 102, 241, 0.3) 0%,
				rgba(168, 85, 247, 0.3) 25%,
				rgba(236, 72, 153, 0.3) 50%,
				rgba(245, 101, 101, 0.3) 75%,
				rgba(251, 191, 36, 0.3) 100%
			);
			border-radius: 14px;
			z-index: -1;
			animation: borderGlow 3s ease-in-out infinite alternate;
		}

		tbody {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2px;
		}

		tr {
			display: flex;
			gap: 2px;
		}

		td {
			width: 64px;
			height: 64px;
			text-align: center;
			vertical-align: middle;
			border: none;
			outline: none;
			display: flex;
			justify-content: center;
			align-items: center;
			margin: 1px;
			padding: 0;
			position: relative;
			transition: all 0.2s ease-in-out;
			overflow: hidden;

			&:hover {
				transform: translateY(-2px) scale(1.05);
				box-shadow:
					0 8px 16px rgba(0, 0, 0, 0.2),
					0 0 20px rgba(255, 255, 255, 0.1);
			}

			&:hover span:before {
				opacity: 0.9;
			}

			span {
				image-rendering: pixelated;
				user-select: none;
				font-size: 24px;
				line-height: 1;
				filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
				transition: transform 0.2s ease-in-out;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				background-size: cover;
				background-position: center;
				background-repeat: no-repeat;
				position: relative;

				&:before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					background-image: inherit;
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;
					opacity: 0.7;
					z-index: -1;
				}
			}

			&:hover span {
				transform: scale(1.1);
			}
		}
	}

	@keyframes borderGlow {
		0% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 0.8;
		}
		100% {
			opacity: 1;
			transform: scale(1.02);
		}
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.05);
		}
	}
</style>
