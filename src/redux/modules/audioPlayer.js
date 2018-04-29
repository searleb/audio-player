const AUDIO_UPDATE_SOURCE = 'AUDIO_UPDATE_SOURCE'
const AUDIO_MUTE = 'AUDIO_MUTE'
const AUDIO_UNMUTE = 'AUDIO_UNMUTE'
const AUDIO_PLAY = 'AUDIO_PLAY'
const AUDIO_PAUSE = 'AUDIO_PAUSE'
const AUDIO_SKIP_FORWARD = 'AUDIO_SKIP_FORWARD'
const AUDIO_SKIP_BACKWARD = 'AUDIO_SKIP_BACKWARD'
const AUDIO_UPDATE_CURRENT_TIME = 'AUDIO_UPDATE_CURRENT_TIME'

export const audioUpdateSource = sourceUrl => ({
  type: AUDIO_UPDATE_SOURCE,
  sourceUrl,
})

export const audioMute = () => ({
  type: AUDIO_MUTE,
})

export const audioUnMute = () => ({
  type: AUDIO_UNMUTE,
})

export const audioPlay = () => ({
  type: AUDIO_PLAY,
})

export const audioPause = () => ({
  type: AUDIO_PAUSE,
})

export const audioSkipForward = () => ({
  type: AUDIO_SKIP_FORWARD,
})

export const audioSkipBackward = () => ({
  type: AUDIO_SKIP_BACKWARD,
})

export const audioUpdateCurrentTime = currentTime => ({
  type: AUDIO_UPDATE_CURRENT_TIME,
  currentTime,
})

const initialState = {
  sourceUrl: '',
  volume: 1,
  playing: false,
  currentTime: 0,
  muted: false,
  seekedTime: 0,
}

export default function audioPlayer(state = initialState, action) {
  switch (action.type) {
    case 'AUDIO_UPDATE_SOURCE':
      return {
        ...state,
        sourceUrl: action.sourceUrl,
      }
    case 'AUDIO_MUTE':
      return {
        ...state,
        muted: true,
      }
    case 'AUDIO_UNMUTE':
      return {
        ...state,
        muted: false,
      }
    case 'AUDIO_PLAY':
      return {
        ...state,
        playing: true,
      }
    case 'AUDIO_PAUSE':
      return {
        ...state,
        playing: false,
      }
    case 'AUDIO_SKIP_FORWARD':
      return {
        ...state,
        seekedTime: state.currentTime + 15,
      }
    case 'AUDIO_SKIP_BACKWARD':
      return {
        ...state,
        seekedTime: state.currentTime - 15,
      }
    case 'AUDIO_UPDATE_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.currentTime,
      }
    default:
      return state
  }
}
