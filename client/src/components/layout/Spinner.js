import React, { Fragment } from 'react';
import spinner from '../../img/spinner.gif';

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{
        width: '50px',
        margin: 'auto',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      alt='Loading...'
    />
  </Fragment>
);

export default Spinner;
