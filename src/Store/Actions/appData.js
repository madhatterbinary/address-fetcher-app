/* eslint-disable import/no-unused-modules */
import { LOADING_ADDRESS_DATA_SUCCESS, LOADING_ADDRESS_DATA_PENDING, API_URL, APY_KEY } from '../Constants/appData';
import axios from 'axios'


export const getAddressStart = () => {
    return {
		type: LOADING_ADDRESS_DATA_PENDING,
		loading:true
    };
};

export const getAddressSuccess = (addresses) => {
  const addArr = [addresses]
  const filtered = addArr.map(a => {
    return a.suggestions.map(a => {
      return a.address;
      })
  });
    return {
        type: LOADING_ADDRESS_DATA_SUCCESS,
        addresses: filtered
    };
}

export const fetchData = (postcode) => {
    return (dispatch) => {
        dispatch(getAddressStart())
        return axios.get(`${API_URL}${postcode}?api-key=${APY_KEY}`)
            .then(response => {
                return response.data
            })
            .then(data => {
              dispatch(getAddressSuccess(data));
            })
            .catch(error => {
                throw (error);
            });
    };
};
