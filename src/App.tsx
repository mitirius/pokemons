import * as React from 'react';
import './App.css';
import SpeciesList, { Species } from './components/SpeciesList';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import EvolutionList from './components/EvolutionList';

interface State {
  speciesList: Species[];
}

const BASE_URL = 'https://pokeapi.co/api/v2/';
const INIT_URL = BASE_URL + 'pokemon-species/?limit=10';
export const EVOL_URL = BASE_URL + 'evolution-chain/';

export default class App extends React.PureComponent<{}, State> {
  constructor(props: {}) {
    super(props);
    this.speciesList();
  }

  state = {
    speciesList: []
  };

  speciesList = () => {
    fetch(INIT_URL)
      .then(res => res.json())
      .then(json => this.setState({ speciesList: json.results }))
      .catch(err => console.log(err));
  };

  renderSpecies = () => <SpeciesList speciesList={this.state.speciesList} />;

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Link to="/">
              <h1 className="App-title">Pokemon</h1>
            </Link>
          </header>
          <Route path="/" exact={true} render={this.renderSpecies} />
          <Route path="/evolution/:id" component={EvolutionList} />
        </div>
      </BrowserRouter>
    );
  }
}
