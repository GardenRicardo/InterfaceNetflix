import React, { useEffect, useState , useCallback } from "react";
import getHomeList , {getMovieInfo} from "./Tmdb";
import MovieRow from "./components/MovieRow";
import "./App.css";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import Gif from "./components/imgs/Netflix_LoadTime.gif";

export default () => {

  const [movieList, setMovieList] = useState<any>([]);
  const [featuredData, setFeatureData] = useState<any>(null);
  const [blackHeader , setBlackHeader] = useState<any>(false);

  useEffect(() => {
    const loadAll = async () => {
      //Pegando a lista TOTAL
      let lista = await getHomeList();
      setMovieList(lista);

      //Pegando o Feature
      let originals = lista.filter(i=>i.slug === 'originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosen = originals[0].items.results[randomChosen];

      let chosenInfo = await getMovieInfo(chosen.id,'tv');
      
      setFeatureData(chosenInfo);
    }

    loadAll();
  } , []);

  useEffect(()=>{
    const scrollListener = () => {
      if(window.scrollY > 10){
        setBlackHeader(true);
      }
      else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll' , scrollListener);

    return () => {
      window.removeEventListener('scroll' , scrollListener);
    }
  },[])

  type ItemLista = {
    slug: string,
    title: string,
    items: any,
  }

  return (
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData &&
        <FeaturedMovie item={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item:ItemLista, key:string)=>(
          <MovieRow key={key} title={item.title} items={item.items}/>
        ))}
      </section>

      <footer>
        Criado por Ricardo Garden <br />
        Direitos de imagem para Netflix <br />
        Dados do site Themoviedb.org
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src={Gif} alt="Gif de carregamento da Netflix" width="50%"/>
        </div>
      }
    </div>
  )
}