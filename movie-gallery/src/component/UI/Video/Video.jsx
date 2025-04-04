import { useContext } from "react";
import { useParams, useSearchParams  } from "react-router-dom";

import styles from "./Video.module.css"
import { DetailContext } from "../../../contexts/DetailContext.js";
import { MovieContext } from "../../../contexts/MovieContext.js";

const Video = () => {

  const { movieId } = useParams();
	const { movie } = useContext(DetailContext);
	const { movies } = useContext(MovieContext)
	const [searchParams] = useSearchParams();
	const queryParam = searchParams.get('details');	

	let movieInfo = movie;	
	
	if (!queryParam) {
		movieInfo =  movies.find(m => Number(m.id) === Number(movieId));
	}

  return (
    <div className="container">
			<div className="row">
				<div className="col">
					<div>
						{/* <h2>{movieInfo.title}</h2> */}
					</div>
					<div className={styles["video-container"]}>
					 <iframe className={styles["video"]} src={`https://www.youtube.com/embed/${movieInfo.embededVideo}`} title="YouTube video"></iframe>
					</div>
				</div>
			</div>
		</div>
		
  )

}

export default Video;