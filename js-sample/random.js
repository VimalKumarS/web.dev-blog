export default function randomGenerator(seed) {
    let state = seed;

    const next = () => {
        state |= 0;
        state = (state + 0x6d2b79f5) | 0;
        var t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    return {
        next,
        nextBetween: (from, to) => next() * (to - from) + from,
        fork: () => randomGenerator(next() * 2 ** 32),
    };
}
// refer - web.dev gist