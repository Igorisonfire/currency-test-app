import * as React from 'react'
import './index.scss'
import spinner from '../../img/preloader.svg'

interface IProps {
}

export const PreloaderMain = ({}: IProps) => (
  <div className={`preloader`}>
    <img src={spinner} alt="spinner"/>
  </div>
)