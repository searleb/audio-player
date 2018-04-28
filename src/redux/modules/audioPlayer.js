const AUDIO_UPDATE_SOURCE = 'AUDIO_UPDATE_SOURCE'
const AUDIO_MUTE = 'AUDIO_MUTE'
const AUDIO_UNMUTE = 'AUDIO_UNMUTE'
const AUDIO_PLAY = 'AUDIO_PLAY'
const AUDIO_PAUSE = 'AUDIO_PAUSE'

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

export
const initialState = {
  sourceUrl: '',
  volume: 1,
  playing: false,
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
        volume: 0,
      }
    case 'AUDIO_UNMUTE':
      return {
        ...state,
        volume: 1,
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
    default:
      return state
  }
}
