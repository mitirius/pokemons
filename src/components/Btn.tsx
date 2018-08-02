import * as React from 'react';
import { Button } from 'reactstrap';
import './Btn.css';
import { Link } from 'react-router-dom';

interface Props {
  link: string;
}

export default function Btn(props: Props) {
  return (
    <div>
      <Link to={props.link}>
        <Button color="warning" className="btn">
          Show Evolution Chain
        </Button>
      </Link>
    </div>
  );
}
