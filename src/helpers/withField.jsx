import { Field } from 'formik';
import React from 'react';

function withField(Component) {
    return (props) => {
        return <Field {...props} component={Component} />
    };
}

export default withField;