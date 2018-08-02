import * as React from 'react';
import Btn from './Btn';
import { Species } from './SpeciesList';
import './SpeciesItem.css';

interface Props {
  key: number;
  species: Species;
}

interface State {
  detail: {
    capture_rate: number;
    color: {
      name: string;
    };
    id: string;
  };
}

export default class SpeciesItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.getDetails();
  }

  isActive = true;

  state = {
    detail: {
      capture_rate: 0,
      color: {
        name: ''
      },
      id: ''
    }
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  getDetails = () => {
    fetch(this.props.species.url)
      .then(res => res.json())
      .then(json => this.isActive && this.setState({ detail: json }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <li className="species-list">
        <h4 className="species-list__name">{this.props.species.name}</h4>
        <div className="species-list__details details">
          <h6 className="details__capture">
            Capture Rate: {this.state.detail.capture_rate}
          </h6>
          <h6 className="details__color">
            Color: {this.state.detail.color.name}
          </h6>
        </div>
        <Btn link={`/evolution/${this.state.detail.id}`} />
      </li>
    );
  }
}
