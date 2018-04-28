import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { audioUpdateSource } from 'redux/modules/audioPlayer'

class UploadTrack extends Component {
  static propTypes = {
    audioUpdateSource: PropTypes.func.isRequired,
  }

  onUpload = (e) => {
    const audioFile = e.target.files[0]
    const source = URL.createObjectURL(audioFile)
    this.props.audioUpdateSource(source)
  }

  render() {
    return (
      <input type='file' onChange={this.onUpload} />
    )
  }
}

function mapStateToProps() {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ audioUpdateSource }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadTrack)

