import React, { Component } from 'react'
import './App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './Profile'
import Gallery from './Gallery'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			query: '',
			artist: null,
			tracks: [] 
		}
	}

	search() {
		const BASE_URL = 'https://api.spotify.com/v1/search'
		let FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`
		const accessToken = 'BQCreLVtdjdDXX7TIUDm0sI1xKCRPAGEtL9oCNGp7ADHdwHCTQhQ-S88FLOQeLPidZE_ZngWru--m1lxOthajJTvCkkaRRTZowoJCtIdAfeh3FXi-hJLB7KGUcXwbBYev7ClM8bQ8ZPh2eYRpIw7riQerDUi393A&refresh_token=AQCVBilenEIeTDtSGYJ5wdP439aTc09Z4bbGkJjErWGO94xKumlt8BiEf6g7YdYgKG5A9qY-Jp3a6ggi3HWXzcvvD32MPLHeX8VF0qjIHjGzHSpPSUJxCLERaN25oXiR5SA'
		const ALBUM_URL = 'https://api.spotify.com/v1/artists/'

		let fetchOptions = {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${accessToken}`
			},
			mode: 'cors',
			cache: 'default'
		}

		// Artist search
		fetch(FETCH_URL, fetchOptions)
			.then(response => response.json())
			.then(json => {
				const artist = json.artists.items[0]
				this.setState({artist})

				// Artist top 10 tracks fetch
				FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=CL`
				fetch(FETCH_URL, fetchOptions)
					.then(response => response.json())
					.then(json => {
						console.log('Artist\'s Top Tracks:', json)
						const {tracks} = json
						this.setState({tracks})
					})
			})
	}


	render() {
		return(
			<div className="app">
				<div className="app-title">Musify Pro</div>
				<FormGroup>
					<InputGroup>
						<FormControl
							type="text"
							placeholder="Search for an artist..."
							value={this.state.query}
							onChange={event => this.setState({query: event.target.value})}
							onKeyPress={event => {
								if (event.key === 'Enter') {this.search()}
							}}
							/>
							<InputGroup.Addon onClick={() => this.search()} >
								<Glyphicon glyph="search"></Glyphicon>
							</InputGroup.Addon>
					</InputGroup>
				</FormGroup>
				{
					this.state.artist !== null
					? <div>
							<Profile artist={this.state.artist} />
							<Gallery tracks={this.state.tracks} />
						</div>
					: <div></div>
				}
				
			</div>
		)
	}
}


export default App;