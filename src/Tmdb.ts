import React , {useCallback} from 'react';

const API_KEY:string = 'a1bda006eb7772b68285a83454a1de68';
const API_BASE:string = 'https://api.themoviedb.org/3';
const language:string = 'language=pt-BR';

/*
- Originais da Netflix
- Recomendados (trending)
- Em alta (top rated)
- Ação
- Comédia
- Terror
- Romance
- Documentários
*/

const basicFetch = async(endpoint:string) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default async function getHomeList() {
        return[
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?network/213&${language}&api_key=${API_KEY}`),
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?${language}&api_key=${API_KEY}`),
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?${language}&api_key=${API_KEY}`),
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&${language}&api_key=${API_KEY}`),
            },   
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&${language}&api_key=${API_KEY}`),
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&${language}&api_key=${API_KEY}`),
            },    
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&${language}&api_key=${API_KEY}`),
            },
            {
                slug: 'documentary',
                title: 'Documentários',
                items: await basicFetch(`/discover/movie?with_genres=99&${language}&api_key=${API_KEY}`),
            }     
        ]
    
};

export async function getMovieInfo(movieId:number , type:string) {
    let info = {};

    if(movieId){
        switch(type){
            case 'movie':
                info = await basicFetch(`/movie/${movieId}?${language}&api_key=${API_KEY}`);
            break;
            case 'tv':
                info = await basicFetch(`/tv/${movieId}?${language}&api_key=${API_KEY}`);
            break;
            default:
                info = {};
            break;
        }
    }

    return info;
}

