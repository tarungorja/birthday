import React from 'react';
import { Button } from 'react-bootstrap';

const ToggleButtons = (props) => {
  const { val, setVal, option1, option2 } = props;
  return (
    <div className="d-flex ">
      <Button
        variant={val ? 'outline-primary' : 'primary'}
        onClick={() => setVal(0)}
        size="sm"
      >
        {option1}
      </Button>
      <Button
        onClick={() => setVal(1)}
        variant={val ? 'primary' : 'outline-primary'}
        size="sm"
      >
        {option2}
      </Button>
    </div>
  );
};

export default ToggleButtons;
