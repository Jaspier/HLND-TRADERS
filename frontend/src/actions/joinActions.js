import axios from 'axios';
import { JOIN_ITEM, JOIN_CANCEL } from '../constants/joinConstants';

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
