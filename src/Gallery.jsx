import React, { Component } from 'react'
import './App.css'

class Gallery extends Component {
	render() {
		console.log('tracks...', this.props)
		const { tracks } = this.props
		return (
			<div>
				{tracks.map((track, i) => {
					const trackImg = track.album.images[1].url
					return (
						<div
							key={i}
							className="track"
						>
							<img
								src={trackImg}
								className="track-img"
								alt="track"
							 />
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