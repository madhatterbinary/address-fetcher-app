/* eslint-disable import/no-unused-modules */
import {
  LOADING_ADDRESS_DATA_PENDING,
  LOADING_ADDRESS_DATA_SUCCESS,
  LOADING_ADDRESS_DATA_FAIL
} from '../Constants/appData';

export const initialState = {
  addresses: [],
};

export const getAddressStart = ( state ) => {
    return {
      ...state,
      isLoading: true,
    };
};

export const getAddressSuccess = ( state, action ) => {
    const { addresses } = action;
    return {
      ...state,
      addresses: addresses,
      isLoading: false,
    };
};

export const getAddressFail = ( state, action ) => {
    return {
      ...state,
      isLoading: false,
    };
};

export default function reducer( state = initialState, action ) {
    switch ( action.type ) {
        case LOADING_ADDRESS_DATA_PENDING: return getAddressStart( state );
        case LOADING_ADDRESS_DATA_SUCCESS: return getAddressSuccess( state, action );
		    case LOADING_ADDRESS_DATA_FAIL: return getAddressFail( state );
        default: return state;
    }
};
