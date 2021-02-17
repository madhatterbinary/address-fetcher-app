import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Field, change, FormSection, reset } from 'redux-form';
import { required } from '../../Validation';
import { years, months } from '../../Store/LocalData/data';
import * as actions from '../../Store/Actions/appData';
import { useActions } from '../Hooks/useActions.jsx';
import { useSelector, useDispatch } from 'react-redux';
import Address from './Address';
import "./AddressForm.scss";

const AddressForm = (props) => {
    const { invalid, handleSubmit, submitting, pristine } = props;
    const { fetchData } = useActions(actions);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();
    const [validPostcode, setValidPostcode] = useState(false);
    const [timeAtAddress, setTimeAtAddress] = useState({});
    const [showAddressBox, setShowAddressBox] = useState(false);
    const [addressBoxText, setAddressBoxText] = useState({});
    const [showAddressDetails, setShowAddressDetails] = useState(false);
    const { isLoading } = props;
    const { selectedAddress, formAddress, formTimeAtAddress, addressData } = useSelector(state => {
    return ({
      addressData: state.appData.addresses,
      formAddress: ((state.form.formAddress || {}).values || {}).address,
      selectedAddress: ((state.form.formAddress || {}).values || {}).addressSelect,
      formTimeAtAddress: ((state.form.formAddress || {}).values || {}).timeAtAddress,
   })
  });
    const status = isLoading ? <span className='is-loading'>Loading...</span> : '';

    const onChange = (e) => {
      setSearchValue(e.target.value);
      const valid = /[A-Za-z]{1,2}[0-9]{1,2}[A-Za-z]? ?[0-9][A-Za-z]{2}/.test(e.target.value);
      if (valid) {
        if (!isLoading) {
          setValidPostcode(true)
          searchAddress(e.target.value);
          dispatch(change('formAddress', 'address.postcode', `${e.target.value}`));
        }
      } else {
        setValidPostcode(false);
      }
      if(e.target.value === ''){
        dispatch(reset('formAddress'));
      }
    }

    const searchAddress = (pstcode) => {
    fetchData(pstcode);
    dispatch(change('formAddress', 'address.postcode', pstcode));
    setShowAddressBox(false);
    setShowAddressDetails(true);
    };

    const createFieldAddress = () => {
      setShowAddressBox(true);
      setShowAddressDetails(false);
      setTimeAtAddress({years: formTimeAtAddress.years, months: formTimeAtAddress.months});
      setAddressBoxText({line_1:formAddress.line_1, line_2:formAddress.line_2, town:formAddress.town, postcode: searchValue});
      dispatch(reset('formAddress'));
      setSearchValue('');
    }
    const handleDeleteAddress = () => {
      dispatch(reset('formAddress'));
      setShowAddressBox(false);
      setTimeAtAddress({});
      setAddressBoxText({});
    }

    useEffect(() => {
      if(selectedAddress && selectedAddress.split(',')[0] !== '') {
          dispatch(change('formAddress', 'address.line_1', `${selectedAddress.split(',')[0]}`));
          dispatch(change('formAddress', 'address.line_2', `${selectedAddress.split(',')[1]}`));
          dispatch(change('formAddress', 'address.town', `${selectedAddress.split(',')[3]}`));
      }
    },[dispatch, selectedAddress, timeAtAddress])

    return (
        <form className='address-form form-container' onSubmit={ handleSubmit }>
            {showAddressBox && 
            <section className='saved-address'>
              <div className='address-box'>
                <div className='text-container'>
                  <div className='address-line'>{`${addressBoxText.line_1}, ${addressBoxText.line_2}, ${addressBoxText.town}, ${addressBoxText.postcode.toUpperCase()}`}</div>
                  <div className='address-line'>{`Time at address: ${timeAtAddress.years}, ${timeAtAddress.months}`}</div>
                </div>
                <button className='text-box-delete-icon' onClick={ handleDeleteAddress}/>
              </div>
            </section>
            }
            <h3>How long have you lived at your current address?</h3>
            <div>
              <FormSection className='select-wrapper-year-month' name="timeAtAddress">
                  <Field name="years" component="select" validate={ [required] }>
                      <option value="">Select years</option>
                      {years.map(yearOption => (
                          <option value={yearOption} key={yearOption}>
                          {yearOption}
                      </option>
                      ))}
                  </Field>
                  <Field name="months" component="select" validate={ [required]}>
                      <option value="">Select months</option>
                      {months.map(monthOption => (
                          <option value={monthOption} key={monthOption}>
                          {monthOption}
                      </option>
                      ))}
                  </Field>
              </FormSection>
            </div>
          <section className="postcode-search">
            <h3>Postcode search</h3>
            <input value={searchValue}
              className='search-input' 
              type='text'
              placeholder="Enter postcode"
              onChange={(e)=>onChange(e)}
            />
            <div className='status'>
              {status}
              <span className='poscode-error' data-cy='info-postcode-error'>{ validPostcode  ? '' : searchValue !== '' ? 'Your postcode is not valid.' : ''}</span>
            </div>
          </section>
          {showAddressDetails  && (
          <section className="address-select">
          <h3>Address</h3>
          <div className='select-wrapper addresses'>
            <Field name="addressSelect" component="select">
                <option value="">Select address</option>
                {addressData.map(option =>  option)
                .map((option) => (Object.entries(option).map(([key, val]) => (
                    <option value={val} key={key}>{val}</option>))))
                }
            </Field>
          </div>
          </section>
          )}
    {showAddressDetails  &&
    <>
      <div className='arrow-icon-divider' />
      <section className="address-details">
        <div className="address-details">
            <FormSection name="address">
              <Address/>
            </FormSection>
            <button className='btn btn-primary' type='button' disabled={invalid|| submitting || pristine} onClick={ createFieldAddress }>Add address</button>
          </div>
      </section>
      <div className='warning-box'>
      <div className='warning-text'><label htmlFor='submit-warning' className='warning'>{ invalid ? 'form incomplete, check above.' : ''}</label></div>
      </div>
    </>
    }
  </form>)
}

AddressForm.propTypes = {
  options: PropTypes.object,
  invalid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AddressForm.defaultProps = {
  options: {},
};

export default AddressForm;
