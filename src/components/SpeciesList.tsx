import * as React from 'react';
import './SpeciesList.css';
import SpeciesItem from './SpeciesItem';

export interface Species {
  name: string;
  url: string;
}
export interface Props {
  speciesList: Species[];
}

export default function SpeciesList(props: Props) {
  return (
    <ul className="species">
      {props.speciesList.map((species, i) => (
        <SpeciesItem key={i} species={species} />
      ))}
    </ul>
  );
}
