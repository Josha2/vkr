import { InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
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
        <FormControl className="form-group">
            <InputLabel shrink id={labelId}>
                {label}
            </InputLabel>

            <Select {...field} {...rest}>
                <MenuItem value={field.value}>
                    {field.value}
                </MenuItem>
                {items}
            </Select>
        </FormControl>
    )
};

export default memo(withField(SelectField));