const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = window.audioContext || new AudioContext();

const createGainNode = (audioCtx) => {
  if (audioCtx.createGain && audioCtx.createGain()) {
    return audioCtx.createGain();
  }

  if (audioCtx.createGainNode && audioCtx.createGainNode()) {
    return audioCtx.createGainNode();
  }

  return null;
};

export default audioContext;

export {
  audioContext,
  createGainNode
}
