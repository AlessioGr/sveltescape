<script lang="ts">
    import {generateBezierCurveSVG, generateZigZagSVG} from "$components/standard/SVGGenerator";

    let dPath = "";
    let height = 0;

    function makeCurve(seed: string, amplitude: number, waveCount: number, waveLength: number) {
        const result = generateBezierCurveSVG(seed, amplitude, waveCount, waveLength);
        dPath = result.dPath;
        height = result.height;
    }

    function makeZigZag(seed: string, amplitude: number, waveCount: number, waveLength: number) {
        const result = generateZigZagSVG(seed, amplitude, waveCount, waveLength);
        dPath = result.dPath;
        height = result.height;
    }

    makeCurve("someseed", 300, 5, 400);

</script>
<svg style="height: 400px;" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 1200 ${height}`} preserveAspectRatio="none" on:click={() => makeCurve(Math.random().toString(), 100, 4, 400)}>
    <path d={dPath}></path>
</svg>
