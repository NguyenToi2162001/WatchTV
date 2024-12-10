
import React, { useContext, useEffect, useState } from 'react';
import Slideshow from '../Slideshow/Slideshow';
import Slidestart from '../Slideshow/Slidestart';
import {  getMoviesRents } from "../../../services/ResponsitoryService";
import { ContextMovies } from "../../../context/MoviesProvider";
import { ContextPlans } from "../../../context/PlansProvider";
import SlideMain from '../Slideshow/SlideMain';
import MovieList from '../Slideshow/MovieList';
function Main(props) {
    const movies = useContext (ContextMovies);
    const plans = useContext (ContextPlans);
    const  moviesRents = getMoviesRents(plans,movies,"3");
    const  moviesVipSS = getMoviesRents(plans,movies,"4");
    const  moviesVipSSS = getMoviesRents(plans,movies,"5");

    return (
        <div>
            <Slidestart/>
            <SlideMain/>
            <MovieList data={moviesVipSSS} title="Phim Chiếu Rạp"  />
            <Slideshow data={moviesRents} title="Phim Hot Hôm Nay"/>
            <Slideshow data={moviesVipSS} title="Phim Hot Khuyến Mãi"/>
          
        </div>
    );
}

export default Main;