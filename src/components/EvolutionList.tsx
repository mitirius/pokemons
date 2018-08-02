import * as React from 'react';
import { EVOL_URL } from '../App';
import { match } from 'react-router-dom';
import './EvolutionList.css';

interface Props {
  match: match<{ id: number }>;
}

interface State {
  evoList: any[];
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
          this.isActive && this.setState({ evoList: json.chain.evolves_to })
      )
      .catch(e => console.log(e));
  };

  renderItem = (item: { species: { name: string } }, idx: number) => {
    return (
      <li className="evo-list__item item" key={idx}>
        <h4 className="item__name">{item.species.name}</h4>
        {console.log(item)}
      </li>
    );
  };

  render() {
    return (
      <ul className="evo-list">{this.state.evoList.map(this.renderItem)}</ul>
    );
  }
}
