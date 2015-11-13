import * as constants from '../constants';
import update from 'react/lib/update';

export default function fields(state = [], action) {
  switch (action.type) {
    case constants.ADD_FIELD:
      return [
        ...state, {
          fieldComponent: action.fieldComponent,
          id: state.length + 1,
        }
      ]
    case constants.REMOVE_FIELD:
      return state.filter((field) => {
        return field.id != action.fieldId
      });
    case constants.FIELD_MOVE:
      const fields = state;
      const field = fields[action.fieldId];

      return update(state, {
        $splice: [
          [action.fieldId, 1],
          [action.hoverId, 0, field]
        ]
      });
    default:
      return state;
  }
}