import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as audioActions from 'redux/modules/audioPlayer'

class AudioPlayer extends Component {
  static propTypes = {
    // audioPlay: PropTypes.func.isRequired,
    audioMute: PropTypes.func.isRequired,
    audioUnMute: PropTypes.func.isRequired,
    audioUpdateCurrentTime: PropTypes.func.isRequired,
    muted: PropTypes.bool.isRequired,
    playing: PropTypes.bool.isRequired,
    seekedTime: PropTypes.number.isRequired,
    sourceUrl: PropTypes.string.isRequired,
    volume: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
    this.player = React.createRef()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.volume !== this.props.volume) {
      this.updatePlayerVolume(this.props.volume)
    }

    if (prevProps.playing !== this.props.playing) {
      this.updatePlayingStatus()
    }

    if (prevProps.seekedTime !== this.props.seekedTime) {
      this.updateSeekCurrentTime()
    }
  }

  getCurrentVolume = () => this.player.current.volume

  handleTimeUpdate = (e) => {
    this.props.audioUpdateCurrentTime(e.target.currentTime)
  }

  updatePlayerVolume(volume) {
    this.player.current.volume = volume
  }

  updateSeekCurrentTime() {
    this.player.current.currentTime = this.props.seekedTime
  }

  updatePlayingStatus() {
    if (this.props.playing) {
      this.playAudio()
    } else {
      this.pauseAudio()
    }
  }

  mutePlayer() {
    this.props.audioMute()
  }

  unMutePlayer() {
    this.props.audioUnMute()
  }

  playAudio() {
    this.player.current.play()
  }

  pauseAudio() {
    this.player.current.pause()
  }

  render() {
    const {
      sourceUrl,
      muted,
    } = this.props

    return (
      <div>
        <h1>AudioPlayer</h1>
        <video
          autoPlay
          controls
          onTimeUpdate={this.handleTimeUpdate}
          ref={this.player}
          src={sourceUrl}
          muted={muted}
        >
          <track kind='captions' />
        </video>
      </div>
    )
  }
}

function mapStateToProps({ audioPlayer }) {
  return {
    currentTime: audioPlayer.currentTime,
    muted: audioPlayer.muted,
    playing: audioPlayer.playing,
    seekedTime: audioPlayer.seekedTime,
    sourceUrl: audioPlayer.sourceUrl,
    volume: audioPlayer.volume,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(audioActions, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayer)
