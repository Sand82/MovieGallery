import Header from './component/Header.js';
import NewMovies from './component/NewMovies.js';
import AllMovies from './component/AllMovies.js';
import ComingSoonMovies from './component/ComingSoonMovies.js';
import TopRatedMovies from './component/TopRatedMovies.js';
import ContactUs from './component/ContactUs.js';
import Scroll from './component/Scroll.js';
import Footer from './component/Footer.js';

function App() {
  return (
    <div className="App">
      <Header />
      <NewMovies/>
      <AllMovies/>
      <ComingSoonMovies/>
      <TopRatedMovies/>
      <ContactUs/>
      <Scroll/>
      <Footer/>
    </div>
  );
}
export default App;
