import seedrandom from "seedrandom";

export const generateBezierCurveSVG = (seed: string, amplitude: number, waveCount: number, waveLength: number, invert: boolean): {dPath: string, height: number} => {
    const points: {x: number, y: number}[] = [];
    let bezierCurve = "";
    let waveHeight = 0;

    // Use the seed value to initialize the random number generator
    const rng = seedrandom(seed);

    // Calculate the time step for each point along the wave
    const timeStep = 2 * Math.PI / waveCount;

    // Generate the points for the wave shape
    for (let i = 0; i < waveCount; i++) {
        const time = timeStep * i;

        // Add variation to the height and width of the wave using multiple sine waves
        let y = 120;
        if(!invert){
            y += amplitude * 0.5 * rng.quick() * Math.sin(time * 1.5);
            y += amplitude * 0.3 * rng.quick() * Math.sin(time * 3.0);
            y += amplitude * 0.2 * rng.quick() * Math.sin(time * 4.5);
        }else {
            y += amplitude * 0.5 * rng.quick() * Math.sin(time * 1.5);
            y += amplitude * 0.3 * rng.quick() * Math.sin(time * 3.0);
            y += amplitude * 0.2 * rng.quick() * Math.sin(time * 4.5);
            y = amplitude/y
        }


        // Ensure that the y-coordinate is never less than 0
        y = Math.min(180, y);

        let x = i * waveLength;
        x += waveLength * 0.5 * rng.quick() * Math.sin(time * 2.0);
        x += waveLength * 0.3 * rng.quick() * Math.sin(time * 3.5);
        x += waveLength * 0.2 * rng.quick() * Math.sin(time * 5.0);

        points.push({x, y});
    }

    // Update the maximum height of the wave
    waveHeight = Math.max(...points.map(p => p.y));

    // Use map() and join() to generate the bezier curve string
    bezierCurve = points.map((p, i) => {
        if (i === 0) {
            return `M ${p.x} ${p.y}`;
        } else {
            const prev = points[i - 1];
            const cp1 = {
                x: (prev.x + p.x) / 2,
                y: prev.y
            };
            const cp2 = {
                x: (prev.x + p.x) / 2,
                y: p.y
            };
            return `C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p.x} ${p.y}`;
        }
    }).join('');
    bezierCurve += " V 194.3 H 0 V 0";

    return {
        dPath: bezierCurve,
        height: waveHeight,
    }
}



export const generateZigZagSVG = (seed: string, amplitude: number, waveCount: number, waveLength: number, invert: boolean): {dPath: string, height: number} => {
    const points: {x: number, y: number}[] = [];
    let zigZag = "";
    let waveHeight = 0;

    // Use the seed value to initialize the random number generator
    const rng = seedrandom(seed);

    // Calculate the time step for each point along the zigzag
    const timeStep = 2 * Math.PI / waveCount;

    // Generate the points for the zigzag shape
    for (let i = 0; i < waveCount; i++) {
        const time = timeStep * i;

        // Add variation to the height and width of the zigzag using multiple sine waves
        let y = 120;
        if(!invert){
            y += amplitude * 0.5 * rng.quick() * Math.sin(time * 1.5);
            y += amplitude * 0.3 * rng.quick() * Math.sin(time * 3.0);
            y += amplitude * 0.2 * rng.quick() * Math.sin(time * 4.5);
        }else{
            y += amplitude * 0.5 * rng.quick() * Math.sin(time * 1.5);
            y += amplitude * 0.3 * rng.quick() * Math.sin(time * 3.0);
            y += amplitude * 0.2 * rng.quick() * Math.sin(time * 4.5);

            y = amplitude/y
        }


        // Ensure that the y-coordinate is never less than 0
        y = Math.min(180, y);

        let x = i * waveLength;
        x += waveLength * 0.5 * rng.quick() * Math.sin(time * 2.0);
        x += waveLength * 0.3 * rng.quick() * Math.sin(time * 3.5);
        x += waveLength * 0.2 * rng.quick() * Math.sin(time * 5.0);

        points.push({x, y});
    }

    console.error("Points", points)
    // Update the maximum height of the zigzag
    waveHeight = Math.max(...points.map(p => p.y));

    // Use map() and join() to generate the zigzag string
    zigZag = points.map((p, i) => {
        if (i === 0) {
            return `M ${p.x} ${p.y}`;
        } else {
            const prev = points[i - 1];
            // Change the direction of the line depending on the sign of the y-coordinate of the current point
            return p.y >= 0 ? `L ${p.x} ${p.y}` : `L ${prev.x} ${p.y}`;
        }
    }).join('');
    zigZag += " V 194.3 H 0 V 0";

    return {
        dPath: zigZag,
        height: waveHeight,
    }
}
