import { TextField } from '@material-ui/core';
import React, { memo } from 'react';
import withField from '../../../helpers/withField';

const InputField = (props) => {
    const { children, form, field, ...rest } = props;

    return (
        <>
       <TextField {...field} {...rest} />
       </>
    )
};

export default memo(withField(InputField));