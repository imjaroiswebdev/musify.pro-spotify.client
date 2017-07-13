import React, { Component } from 'react'
import './App.css'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import Profile from './Profile'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			query: '',
			artist: null // 
		}
	}

	search() {
		const BASE_URL = 'https://api.spotify.com/v1/search'
		const FETCH_URL = `${BASE_URL}?q=${this.state.query}&type=artist&limit=1`
		const accessToken = 'BQBpUGfyZA_lOv7tbDpF6Lq19FaEydALqurkVuwUXEMrCfecZ7YpNQFO0xXzAVjHlHgYZiMUdXcf8oN_p2bVmrJeuJ7ABaVb2mk0npCz0JnGF1y1-xsf6gRxyYgTfUYf_3emFAq_0cogqrABozJ_Iwx0TAtLvRJF&refresh_token=AQCQGi-3AHFRvGl7vH2vdixyTpJEcWjUrMiIa3hlyRj5CzS2Jo4qIADfWXkP5HWEO6cDpAzahQUvYQxJUJw_mlYebeYz8sVQ9iXzbefQrDLDONYM4nDkjhGgcSH4z75y4ow'

		let fetchOptions = {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${accessToken}`
			},
			mode: 'cors',
			cache: 'default'
		}

		fetch(FETCH_URL, fetchOptions)
			.then(response => response.json())
			.then(json => {
				const artist = json.artists.items[0]
				this.setState({artist})
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
				<Profile
					artist={this.state.artist}
				/>
				<div className="gallery">
					Gallery
				</div>
			</div>
		)
	}
}


export default App;