import React, {Component} from 'react';

class Card extends Component {
    constructor(props){
        super(props)
        this.state=''  
    }
    render(){
        console.log(this.props);
        return(
            <div className='character-card'>
                <img src={this.props.movieInfo.image} alt={this.props.movieInfo.name} ></img>
                <h4>{this.props.movieInfo.title}</h4>
                <p>{this.props.movieInfo.overview}</p>
            </div>
        )
    }
}

export default Card