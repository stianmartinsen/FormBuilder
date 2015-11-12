import { ADD_FIELD } from '../constants';

const initialState = []

export default function canvas(state = initialState, action) {
  switch (action.type) {
    case ADD_FIELD:
      return [
        action.fieldComponent, ...state
      ]
    default:
      return state;
  }
}