import React, {Component} from 'react';
import './card.css';

class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            texto: 'Ver más',
            viewMore: false
        }  
    }

    verMas(){
        console.log('Cambiando viewMore');
        if(this.state.viewMore === false){
            this.setState({
                viewMore: true,
                texto: 'Ver menos'
            })
        } else {
            this.setState({
                viewMore: false,
                texto: 'Ver más'
            })
        }
        
    }

    render(){
        console.log(this.props);
        return(
            <div className='character-card'>
                <img src={`https://image.tmdb.org/t/p/w342/${this.props.movieInfo.poster_path}`} alt={this.props.movieInfo.name} ></img>
                <h4>{this.props.movieInfo.title}</h4>
                <p>{this.props.movieInfo.overview}</p>
                <p className={this.state.viewMore === false ?  'hide' : 'show'}>Rating: {this.props.movieInfo.vote_average}</p>
                <p className={this.state.viewMore === false ?  'hide' : 'show'}>Idioma original: {this.props.movieInfo.original_language}</p>
                <p className={this.state.viewMore === false ?  'hide' : 'show'}>Fecha de estreno: {this.props.movieInfo.release_date}</p>
                <p onClick={() => this.verMas()} className='more'>{this.state.texto}</p>
            </div>
        )
    }
}

export default Card