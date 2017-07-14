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
		const accessToken = 'BQAJUQeM7izABYOfx3rqADQS8PQ8Y2vOCe4sc7USSVPek11WyPCWf8aLQnX_D6kSH22GL75zVCrwSWg0AKbQWcysqj8cSDhAfr0xiQY9WuRwr8im4lsPwvWxpin2Fz7c2jxZuvbsazIVG3oOPzqnUgpTkZOAkzIT&refresh_token=AQCoSKCA6suYcBfD1JJxUlX3lyIrEukeHihY__zPWqCgUWgPar9SIRufqV6ivTJ46qakZhSZg_7LsHSIacYr3g5m7u4Tt6jgiHdnYwlj3rpYSrEwEtOy8CykFdrx30a20pg'
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