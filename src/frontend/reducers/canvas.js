import { ADD_FIELD, FIELD_MOVE } from '../constants';
import update from 'react/lib/update';

const initialState = []

export default function canvas(state = initialState, action) {
  switch (action.type) {
    case ADD_FIELD:
      return [
        ...state,
        {
          fieldComponent: action.fieldComponent,
          id: state.length + 1,
        }
      ]
    case FIELD_MOVE:
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