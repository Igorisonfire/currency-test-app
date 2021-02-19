import * as React from 'react';
import Select, {ValueType} from 'react-select'
import "./index.scss";

interface IProps {
    id: string
    value: ISelectOption | null
    onChange(value: ValueType<ISelectOption, boolean>, id: string): void
    options: ISelectOption[],
}

export interface ISelectOption {
    label: string
    value: string
}

export const SelectComponent = (props: IProps) => {
    const {onChange, value, id, options} = props

    const onChangeSelect = (value: ValueType<ISelectOption, boolean>) => {
        onChange && onChange(value, id)
    }

    return (
        <div className={'select-component'}>
            <Select
                options={options}
                classNamePrefix={'custom'}
                onChange={onChangeSelect}
                value={value}
                captureMenuScroll={false}
                theme={theme => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: '#ECEFF1',
                        primary: '#DD2C00',
                        neutral20: '#ECEFF1'
                    },
                })}
            />
        </div>
    )
}