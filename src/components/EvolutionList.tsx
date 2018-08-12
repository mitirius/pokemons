import * as React from 'react';
import { EVOL_URL } from '../App';
import { match } from 'react-router-dom';
import './EvolutionList.css';
import SpeciesItem from './SpeciesItem';
import { Species } from './SpeciesList';

interface Props {
  match: match<{ id: number }>;
}

interface State {
  evoList: Species[];
}

export default class EvolutionList extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getEvolutions();
    this.state = {
      evoList: []
    };
  }

  isActive = true;

  componentWillUnmount() {
    this.isActive = false;
  }

  getEvolutions = () => {
    fetch(EVOL_URL + this.props.match.params.id)
      .then(res => res.json())
      .then(
        json =>
          this.isActive &&
          this.setState({ evoList: this.getEvolist(json.chain, []) })
      )
      .catch(e => console.log(e));
  };

  getEvolist(json: any, array: Species[]): Species[] {
    array.push(json.species);
    if (json.evolves_to.length === 0) {
      return array;
    } else {
      return this.getEvolist(json.evolves_to[0], array);
    }
  }

  render() {
    return (
      <ul className="evo-list">
        {this.state.evoList.map((item, idx) => (
          <SpeciesItem key={idx} species={item} />
        ))}
      </ul>
    );
  }
}
