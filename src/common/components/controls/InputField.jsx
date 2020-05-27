import React, { memo } from 'react';
import { TextField } from '@material-ui/core';
import withField from '../../../helpers/withField';

const InputField = (props) => {
    const { children, form, field, errors, ...rest } = props;

    const error = form.errors[field.name];

    return (
        <>
            <TextField 
                {...field} 
                {...rest} 
                error={!!error}
                helperText={error}
             />
       </>
    )
};

export default memo(withField(InputField));