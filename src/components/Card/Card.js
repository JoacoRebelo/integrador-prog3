import React, {Component} from 'react';
import './card.css';

class Card extends Component {
    constructor(props){
        super(props)
        this.state = {
            texto: 'Ver más',
            viewMore: false,
            img: /* this.props.modoVista === "modoCuadro" ?  */this.props.movieInfo.poster_path/*  :this.props.movieInfo.backdrop_path */
        }  
    }

    

    verMas(){
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
        this.imgSelector()
    }

/*     INTENTE QUE CAMBIE LA IMAGEN SEGUN EL FORMATO DE VISTA PERO AUN NO PUDE EL LUNES LO CHECKEO CON ALE
##########################################################################################################

        imgSelector(){
        if (this.props.modoVista==="modoCuadro") {
            this.setState({
                img: this.props.movieInfo.poster_path
            })
        } else{
            if (this.state.viewMore) {
                this.setState({
                    img: this.props.movieInfo.backdrop_path
                })
            }else{
                this.setState({
                    img: this.props.movieInfo.poster_path
                })
            }
        }
    } */

    render(){
        console.log(this.state.img);
        return(
            <div className={(this.state.viewMore === false ?  'character-card hide' : 'character-card show') + " " + this.props.modoVista}>
                <img src={"https://image.tmdb.org/t/p/w342/" + this.state.img} alt={this.props.movieInfo.name} ></img>
                <div className="cardContainer">
                    <h4>{this.props.movieInfo.title}</h4>
                    <p className="cardDesc">{this.props.movieInfo.overview}</p>
                    <p className="extra">Rating: {this.props.movieInfo.vote_average}</p>
                    <p className="extra">Idioma original: {this.props.movieInfo.original_language}</p>
                    <p className="extra">Fecha de estreno: {this.props.movieInfo.release_date}</p>
                    <p onClick={() => this.verMas()} className='more'>{this.state.texto}</p>
                </div>

            </div>
        )
    }
}

export default Card