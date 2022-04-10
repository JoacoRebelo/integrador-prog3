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
            <div className={this.state.viewMore === false ?  'character-card hide' : 'character-card show'}>
                <img src={`https://image.tmdb.org/t/p/w342/${this.props.movieInfo.poster_path}`} alt={this.props.movieInfo.name} ></img>
                <h4>{this.props.movieInfo.title}</h4>
                <p className="cardDesc">{this.props.movieInfo.overview}</p>
                <p className="extra">Rating: {this.props.movieInfo.vote_average}</p>
                <p className="extra">Idioma original: {this.props.movieInfo.original_language}</p>
                <p className="extra">Fecha de estreno: {this.props.movieInfo.release_date}</p>
                <p onClick={() => this.verMas()} className='more'>{this.state.texto}</p>
            </div>
        )
    }
}

export default Card