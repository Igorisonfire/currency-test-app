import * as React from 'react';
import "./index.scss";
import {useState} from 'react'

interface IProps {
  id?: string,
  name: string,
  value: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const Input = (props: IProps) => {

  const {id, onChange, value, name} = props
  const className = [
    'input-component',
  ].join(' ').trim()

  return(
      <div className={className}>
        <label>{name}</label>
        <input id={id} type={'text'} value={value} onChange={onChange}/>
      </div>
  )
}

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return{
    value,
    onChange,
    clear
  }
}