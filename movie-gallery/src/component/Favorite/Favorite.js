import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as favoriteService from '../../services/CommentService.js'

import { AuthContext } from "../../contexts/AuthContext.js";
import FavoriteMovie from "./FavoriteMovie/FavoriteMovie.js";

const Favorite = () => {
  const {user} =  useContext(AuthContext);
  const [favMovies, setFavMovies] = useState([])
  const navigate = useNavigate();  

    console.log(favMovies);

  useEffect(()=>{
    favoriteService.getFavoriteMovies(user.id)
    .then((result) => {       
        if (result === "Bad response") {
          return navigate("/notfound");
        }
        setFavMovies(result);        
      })
      .catch((error) => {
        throw console.error(error);
      });
  },[user.id], navigate)

  return (
    <>
      <section className="section-long">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title text-uppercase">Favorite collection</h2>
          </div>
          <div className="grid row">
            {
                favMovies === [] 
                ? <h1>No movies in the collection.</h1>
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
