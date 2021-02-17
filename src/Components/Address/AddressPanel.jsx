import React, { useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../Components/Hooks/useActions.jsx';
import * as actionsApp from '../../Store/Actions/appData';
import { reduxForm, formValueSelector } from 'redux-form';
import AddressForm from '../Forms/AddressForm.jsx';

  const AddressFormWrapped = reduxForm({
    form: 'formAddress',
    enableReinitialize: true,
  })(AddressForm);

const options =  [
          { "id": 2, "value": "Homeowner" },
          { "id": 3, "value": "Private Tenant" },
          { "id": 4, "value": "Living with Parents" },
          { "id": 5, "value": "Council tenant" }
        ];

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
