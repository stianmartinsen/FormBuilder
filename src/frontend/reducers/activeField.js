import * as constants from '../constants';
import update from 'react/lib/update';

export default function field(state = null, action) {
  switch (action.type) {
    case constants.FIELD_SET_ACTIVE:
      return action.fieldId;
    default:
      return state;
  }
}