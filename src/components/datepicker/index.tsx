import * as React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import './index.scss'
import {useState} from 'react'

interface IProps {
    name: string
    selected: Date | null
    onChange: (date: Date) => void
}

export const DatePickerComponent = (props: IProps) => {
    const {name, selected, onChange} = props

    return(
        <div className={'datepicker-custom-component'}>
            <label>{name}</label>
            <DatePicker
                dateFormat={"dd.MM.yyyy"}
                popperPlacement={'auto'}
                selected={selected}
                onChange={onChange}
                onChangeRaw={(e) => {e.preventDefault()}}
                maxDate={new Date()}
            />
        </div>
    )
}

export const useDatePicker = (initialValue: Date | null) => {
    const [selected, setSelected] = useState(initialValue)

    const onChange = (date: Date) => {
        setSelected(date)
    }

    const clear = () => {
        setSelected(null)
    }

    return{
        selected,
        onChange,
        clear
    }
}
