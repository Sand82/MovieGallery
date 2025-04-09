import { useContext } from "react";
import { useParams, useSearchParams, Link  } from "react-router-dom";

import styels from "./Video.module.css"
import { DetailContext } from "../../../contexts/DetailContext.js";
import { MovieContext } from "../../../contexts/MovieContext.js";

const Video = () => {

  const { movieId } = useParams();
  const { movie } = useContext(DetailContext);
  const { movies } = useContext(MovieContext)
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('details');	  
  let movieInfo = movie;
  let linkTo = `/movies/details/${movieId}`;
	
  if (!queryParam) {
  	movieInfo =  movies.find(m => Number(m.id) === Number(movieId));
  linkTo = "/";
  }

  return (
    <div className="container">
	  	<div className="row">
	  		<div className="col">
          <div className="mt-5 mb-4 section-head">
            <h2 className={`section-title text-uppercase ${styels["video-title"]}`}>{movieInfo.title}</h2>
          </div>					
	  			<div className={styels["video-container"]}>
	  			 <iframe className={styels["video"]} src={`https://www.youtube.com/embed/${movieInfo.embededVideo}`} title="YouTube video" allowFullScreen={true}></iframe>
	  			</div>
          <div>
            <Link className="btn btn-theme mb-5" to={linkTo}>
              Back
            </Link>
          </div>
	  		</div>
	  	</div>
	  </div>		
  )
}

export default Video;