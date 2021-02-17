import * as React from 'react';
import './index.scss';

import loader from '../../img/button-loader.svg'

interface Props {
  name: string;
  onClick?(): void;
  loading?: boolean;
  disabled?: boolean
}

export const Button = (props: Props) => {
  const {name, onClick, disabled, loading} = props

  return (
      <button
          disabled={disabled} onClick={onClick}
          className={`button-component ${disabled ? "disabled" : ''} ${loading ? 'loading' : ''}`}
          type={'button'}
      >
        {!loading && <span>{name}</span>}
        {loading && <img src={loader} alt="load" className={'loading'}/>}
      </button>
  )
};

