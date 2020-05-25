import { InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { memo } from 'react';
import withField from '../../../helpers/withField';

const SelectField = (props) => {
    const { 
        children, 
        form, 
        field, 
        items,
        label,
        labelId,
        ...rest 
    } = props;

    return (
        <>
            <InputLabel shrink id={labelId}>
                {label}
            </InputLabel>

            <Select {...field} {...rest}>
                <MenuItem value={field.value}>
                    {field.value}
                </MenuItem>
                {items}
            </Select>
        </>
    )
};

export default memo(withField(SelectField));