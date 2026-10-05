// Web Audio API Procedural Ambient Sound Engine
// Creates high-end cinematic drone & soft harmonic pulses with zero external audio assets

let ctx = null;
let masterGain = null;
let droneOsc = null;
let subOsc = null;
let isPlaying = false;
let pulseInterval = null;

export function initAudio() {
  if (isPlaying) return true;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;
    
    ctx = new AudioCtx();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);

    // Deep warm cinematic sub drone (A1 = 55Hz)
    subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(55, ctx.currentTime);
    
    const subGain = ctx.createGain();
    subGain.gain.value = 0.15;
    subOsc.connect(subGain);
    subGain.connect(masterGain);

    // Harmonic ambient drone (E2 = 82.41Hz)
    droneOsc = ctx.createOscillator();
    droneOsc.type = 'triangle';
    droneOsc.frequency.setValueAtTime(82.41, ctx.currentTime);

    // Filter for warmth
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.08;
    
    droneOsc.connect(filter);
    filter.connect(droneGain);
    droneGain.connect(masterGain);

    subOsc.start();
    droneOsc.start();

    // Fade in master gain smoothly
    masterGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 2);

    // Soft ambient chime pulse every 6 seconds
    pulseInterval = setInterval(() => {
      triggerChime();
    }, 6000);

    isPlaying = true;
    return true;
  } catch (err) {
    console.warn('Audio initialization notice:', err);
    return false;
  }
}

export function triggerChime() {
  if (!ctx || !isPlaying) return;
  try {
    const freqs = [220, 329.63, 440, 554.37, 659.25]; // A major pentatonic notes
    const note = freqs[Math.floor(Math.random() * freqs.length)];

    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(note, ctx.currentTime);

    g.gain.setValueAtTime(0.01, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.1);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

    osc.connect(g);
    g.connect(masterGain);

    osc.start();
    osc.stop(ctx.currentTime + 3.6);
  } catch (e) {
    // Silently ignore audio context timing glitches
  }
}

export function stopAudio() {
  if (!isPlaying || !ctx) return;
  try {
    masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1);
    setTimeout(() => {
      if (subOsc) subOsc.stop();
      if (droneOsc) droneOsc.stop();
      if (ctx) ctx.close();
      if (pulseInterval) clearInterval(pulseInterval);
      ctx = null;
      isPlaying = false;
    }, 1000);
  } catch (e) {
    isPlaying = false;
  }
}

export function toggleAudioState() {
  if (isPlaying) {
    stopAudio();
    return false;
  } else {
    return initAudio();
  }
}
