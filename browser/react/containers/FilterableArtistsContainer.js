import React from 'react';
import Artists from '../components/Artists';
import FilterInput from '../components/FilterInput';
import axios from 'axios';

export default class FilterableArtistsContainer extends React.Component {
    constructor (props){
        super(props);
        this.state = {
            artists: this.props.artists
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // purely for the edge case where you refresh this page
    componentDidMount(){
        console.log('Now running FilterableArtistsContainer componentDidMount.');
        axios.get('/api/artists/')
        .then(response => response.data)
        .then(artists => {
            console.log('Now setting post-Promise state in FilterableArtistsContainer.')
            this.setState({artists});
        });
    }

    handleChange (event){
        let inputValue = event.target.value;
        let artists = this.props.artists;

        let filteredArtists = artists.filter((artist) => {
            return artist.name.toLowerCase().includes(inputValue.toLowerCase());
        })

        this.setState({artists: filteredArtists});   
    }

    render (){
        console.log('Now running FilterableArtistsContainer render.');
        return (
            <div>
                <FilterInput handleChange={this.handleChange}/>
                <Artists artists={this.state.artists} />
            </div>
        )

    }
}