import React from 'react';
import './FeaturedMovie.css';

interface IMovieRow {
    item:any;
}

const FeaturedMovie: React.FC<IMovieRow> = (props) => {

    let firstDate = new Date(props.item.first_air_date);
    let genres = [];
    for(let i in props.item.genres){
        genres.push(props.item.genres[i].name);
    }

    return(
       <section className='featured' style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${props.item.backdrop_path})`

       }}>
            <div className='featured--vertical'>
                <div className='featured--horizontal'>
                    <div className='featured--name'>{props.item.original_name}</div>
                    <div className='featured--info'>
                        <div className='featured--points'>{props.item.vote_average} pontos </div>
                        <div className='featured--year'> { firstDate.getFullYear()} </div>
                        <div className='featured--seasons'> { props.item.number_of_seasons} temporada{props.item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className='featured--description'>{props.item.overview.length > 500 ? props.item.overview.substring(0 , 500) + '...' : props.item.overview}</div>
                    <div className='featured--buttons'>
                        <a href={`/watch/${props.item.id}`} className='featured--watchbutton'>▶ Assistir</a>
                        <a href={`/list/add/${props.item.id}`} className='featured--mylistbutton'>+ Minha Lista</a>
                    </div>
                    <div className='featured--genres'><strong>Gêneros:</strong> {genres.join(', ')}</div>
                </div>
            </div>
       </section>
    )
}

export default FeaturedMovie;
