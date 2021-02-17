import React, { Component } from 'react';
import { Field } from 'redux-form';
import TextField from './TextField';
import { required } from '../../Validation';

class Address extends Component {
    render() {
        return <div>
            <h3>Address line 1*</h3>
            <Field name='line_1' component={TextField} type='text' value='' validate={ [required] } />
            <h3>Address line 2</h3>
            <Field name='line_2' component={TextField} type='text' value='' />
            <h3>City*</h3>
            <Field name='town' component={TextField} type='text' value='' validate={ [required] } />
            <h3>Postcode*</h3>
            <Field name='postcode' component={TextField} type='text' value='' validate={ [required] } />
        </div>
    }
}

export default Address;
