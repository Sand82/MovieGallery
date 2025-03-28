import { useContext, useEffect } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.js";
import FavoriteMovie from "./FavoriteMovie/FavoriteMovie.jsx";
import { MovieContext } from "../../contexts/MovieContext.js";

const Favorite = () => {
  const {user} =  useContext(AuthContext);
  const { favMovies, favoritesHandler } = useContext(MovieContext)  

  useEffect(()=>{
    favoritesHandler(user.id);
  },[user.id])

  return (
    <>
      <section className="section-long">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title text-uppercase">Favorite collection</h2>
          </div>
          <div className="grid row">
            {
              favMovies == [] 
              ? <h2>No movies in the collection.</h2>
              : favMovies.map(x => <FavoriteMovie key={x.id} movie={x}/>)     
            }                 
          </div>
          <div className="section-bottom">
            <Link className="btn btn-theme" to="/movies">
              View All Movies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Favorite;
