import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  audioMute,
  audioUnMute,
  audioPlay,
  audioPause,
} from 'redux/modules/audioPlayer'

class AudioPlayer extends Component {
  static propTypes = {
    sourceUrl: PropTypes.string.isRequired,
    audioMute: PropTypes.func.isRequired,
    audioUnMute: PropTypes.func.isRequired,
    volume: PropTypes.number.isRequired,
    playing: PropTypes.bool.isRequired,
    audioPlay: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.player = React.createRef()
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props)

    if (prevProps.sourceUrl !== this.props.sourceUrl) {
      this.updateSourceUrl()
    }

    if (prevProps.volume !== this.props.volume) {
      this.updatePlayerVolume(this.props.volume)
    }

    if (prevProps.playing !== this.props.playing) {
      this.updatePlayingStatus()
    }
  }

  getCurrentVolume = () => this.player.current.volume

  updateSourceUrl() {
    const player = this.player.current
    player.src = this.props.sourceUrl
    this.props.audioPlay()
  }

  updatePlayerVolume(volume) {
    this.player.current.volume = volume
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
    return (
      <div>
        <h1>AudioPlayer</h1>
        <video ref={this.player} controls>
          <track kind='captions' />
        </video>
      </div>
    )
  }
}

function mapStateToProps({ audioPlayer }) {
  return {
    sourceUrl: audioPlayer.sourceUrl,
    volume: audioPlayer.volume,
    playing: audioPlayer.playing,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    audioMute,
    audioUnMute,
    audioPlay,
    audioPause,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayer)
