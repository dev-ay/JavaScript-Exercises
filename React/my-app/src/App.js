import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
    };
  }

  componentDidMount() {
    fetch('https://api.airtable.com/v0/appEHt3ETioLEdnJV/favorites?api_key=keyB5dWzkyskZW2Vr')
    .then((resp) => resp.json())
    .then(data => {
      this.setState({ movies: data.records });
    }).catch(err => {
      // Error 🙁
    });
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <div className="card-deck">
              {this.state.movies.map(movie => <MovieCard {...movie.fields} /> )}
            </div>
          </div>
        </div>
      </div>

    );
  }

}

export default App;

const MovieCard = ({ title, year, description, imageURL }) => (
  <div className="card">
    <img className="card-img-top" src={imageURL[0].url} alt="Movie Poster" />
    <div className="card-body">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{description}</p>
      <p className="card-text">
        <small className="text-muted">{year}</small>
      </p>
    </div>
  </div>
);



    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //     <button type="button" className="btn btn-primary">Primary</button>
    //   </header>
    // </div></div>






    // const movieData = [
    //   {
    //       title: 'Avengers: Infinity War',
    //       year: '2018',
    //       description: 'Iron Man, Thor, the Hulk and the rest of the Avengers unite to battle their most powerful enemy yet -- the evil Thanos. On a mission to collect all six Infinity Stones, Thanos plans to use the artifacts to inflict his twisted will on reality.',
    //       imageURL: 'https://via.placeholder.com/362x200',
    //   },
    //   {
    //       title: 'Bohemian Rhapsody',
    //       year: '2018',
    //       description: 'Bohemian Rhapsody is a foot-stomping celebration of Queen, their music and their extraordinary lead singer Freddie Mercury. Freddie defied stereotypes and shattered convention to become one of the most beloved entertainers on the planet.',
    //       imageURL: 'https://via.placeholder.com/362x200',
    //   },
    //   {
    //       title: 'The Incredibles 2',
    //       year: '2018',
    //       description: 'Everyone’s favorite family of superheroes is back in “Incredibles 2” – but this time Helen is in the spotlight, leaving Bob at home with Violet and Dash to navigate the day-to-day heroics of “normal” life.',
    //       imageURL: 'https://via.placeholder.com/362x200',
    //   },
    // ];