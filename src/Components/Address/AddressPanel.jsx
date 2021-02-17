import React, { Fragment } from 'react';
import { reduxForm } from 'redux-form';
import AddressForm from '../Forms/AddressForm.jsx';

const AddressFormWrapped = reduxForm({
  form: 'formAddress',
  enableReinitialize: true,
})(AddressForm);

const AddressPanel = (props) => {
    const onSubmitAddress = (values) => {
    };

    return (
      <Fragment>
        <section className="main-header">
          <h1>Address Search</h1>
          <h2>Please enter your address</h2>
          <hr />
        </section>
        <AddressFormWrapped onSubmit={ (values) => onSubmitAddress(values) }/>
      </Fragment>
    )
}

export default AddressPanel;
