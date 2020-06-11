import { InputLabel, MenuItem, Select, FormControl, FormHelperText } from '@material-ui/core';
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
        initialValue,
        ...rest 
    } = props;

    const renderInitialValue = () => {
        if (initialValue) {
            return (
                <MenuItem value={field.value}>
                    {field.value}
                </MenuItem>
            );
        } else {
            return null;
        }
    };

    const error = form.errors[field.name];
    return (
        <FormControl className="form-group" error={!!error}>
            <InputLabel id={labelId}>
                {label}
            </InputLabel>

            <Select {...field} {...rest}>
                { renderInitialValue() }
                {items}
            </Select>
            <FormHelperText>{error}</FormHelperText>
        </FormControl>
    )
};

export default memo(withField(SelectField));