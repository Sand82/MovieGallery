import TopRated from "./TopRated/TopRated.js";

const Movies = ({movies}) => {       

  return (
    <section className="section-long">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title text-uppercase">Top rated</h2>
          <p className="section-text">date</p>
        </div>        
       {movies.map(x => < TopRated key={x.id} movie={x}/>)}
      </div>
    </section>
  );
};

export default Movies;
