<script lang="ts">
  import Chart from "chart.js/auto";
  import type { ChartConfiguration, ChartData, Plugin } from "chart.js/auto";
  import { onMount } from "svelte";

  type ChartConfigurationWithPlugins = ChartConfiguration & {
    options: {
      plugins: { [key: string]: unknown };
    };
  };

  let chart: HTMLCanvasElement;

  function randomNumber() {
    return Math.floor(Math.random() * 100);
  }

  const labels = [
    "Module 1",
    "Module 2",
    "Module 3",
    "Module 4",
    "Module 5",
    "Module 6",
    "Module 7",
  ];

  const data: ChartData = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: [
          randomNumber(),
          randomNumber(),
          randomNumber(),
          randomNumber(),
          randomNumber(),
          randomNumber(),
          randomNumber(),
        ],
        borderColor: "#20223b",
        // backgroundColor: "#fff",
      },
    ],
  };

  const customBackgroundPlugin: Plugin = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart, args, options: { color: string }) => {
      const { ctx } = chart;
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = options.color || "#99ffff";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const config: ChartConfigurationWithPlugins = {
    type: "radar",
    data: data,
    options: {
      plugins: {
        customCanvasBackgroundColor: {
          color: "#313359",
        },
        percentageSuffix: {
          suffix: "%",
        },
        legend: {
          display: false,
        },
        filler: {
          propagate: false,
        },
      },
      interaction: {
        intersect: false,
      },
      layout: {
        padding: {
          // top: 16,
          // bottom: 16,
          left: 40,
          right: 40,
        },
      },
      scales: {
        r: {
          grid: {
            color: "#fff",
            circular: false,
          },
          pointLabels: {
            color: "#fff",
          },
          ticks: {
            // display: false,
            backdropColor: "#313359",
            color: "#fff",
          },
          max: 100,
          min: 0,
        },
      },
    },
    plugins: [customBackgroundPlugin],
  };
  onMount(() => {
    new Chart(chart, config);
  });
</script>

<div class="wrapper">
  <h3>Your progress</h3>
  <canvas id="myChart" bind:this={chart} />
</div>

<style>
  .wrapper {
    margin-bottom: 2rem;
  }

  h3 {
    text-align: left;
    margin-bottom: 2rem;
  }

  canvas {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.1);
  }
</style>
