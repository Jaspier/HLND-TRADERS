import axios from 'axios';
import {
  JOIN_ITEM,
  JOIN_CANCEL,
  JOIN_SAVE_DISCORD_DETAILS,
  JOIN_SAVE_PAYMENT_METHOD,
} from '../constants/joinConstants';

export const join = id => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: JOIN_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
    },
  });

  localStorage.setItem('joinItems', JSON.stringify(getState().join.joinItems));
};

export const joinCancel = id => (dispatch, getState) => {
  dispatch({
    type: JOIN_CANCEL,
    payload: id,
  });

  localStorage.setItem('joinItems', JSON.stringify(getState().join.joinItems));
};

export const saveDiscordDetails = data => dispatch => {
  dispatch({
    type: JOIN_SAVE_DISCORD_DETAILS,
    payload: data,
  });

  localStorage.setItem('discordDetails', JSON.stringify(data));
};

export const savePaymentMethod = data => dispatch => {
  dispatch({
    type: JOIN_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
