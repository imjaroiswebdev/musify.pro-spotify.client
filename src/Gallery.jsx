import React, { Component } from 'react'
import './App.css'

class Gallery extends Component {
	constructor(props) {
		super(props)
		this.state = {
			playingUrl: '',
			playing: false,
			audio: null
		}
	}

	playAudio(previewUrl) {
		// Define audio handler
		let audio = new Audio(previewUrl)
		if (!this.state.playing) {
			// Play song if there is not songs palying
			// and update the state to playing
			audio.play()
			this.setState({
				playing: true,
				playingUrl: previewUrl,
				audio
			})
		} else {
			// If there is music playing there exist 2 escenarios
			if (this.state.playingUrl === previewUrl) {
				// Pause actual song with click on the same track 
				this.state.audio.pause()
				this.setState({
					playing: false,
				})
			} else {
					// Switch from one song to another one
					this.state.audio.pause()
					audio.play()
					this.setState({
						playing: true,
						playingUrl: previewUrl,
						audio
					})
			}
		}
	}

	render() {
		const { tracks } = this.props
		return (
			<div>
				{tracks.map((track, i) => {
					const trackImg = track.album.images[1].url
					return (
						<div
							key={i}
							className="track"
							onClick={() => this.playAudio(track.preview_url)}
						>
							<img
								src={trackImg}
								className="track-img"
								alt="track"
							 />
							 <div className="track-play">
							 	<div className="track-play-inner">
							 		{
							 			this.state.playingUrl === track.preview_url
							 				? <span>||</span>
							 				: <span>&#9654;</span>
							 		}
							 	</div>
							 </div>
							 <p className="track-title">
							 	{track.name}
							 </p>
						</div>
					)
				})

				}
			</div>
		)
	}
}

export default Gallery