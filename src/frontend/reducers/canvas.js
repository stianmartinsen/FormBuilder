import { ADD_FIELD, FIELD_INCREMENT_PRIORITY, FIELD_DECREMENT_PRIORITY, FIELD_MOVE } from '../constants';
import Field from '../components/Field';
import update from 'react/lib/update';

const initialState = [
  {
    fieldComponent: Field,
    id: 1
  },
  {
    fieldComponent: Field,
    id: 2
  }
]

export default function canvas(state = initialState, action) {
  switch (action.type) {
    case ADD_FIELD:
      return [
        {
          fieldComponent: action.fieldComponent,
          id: state.length + 1,
        }, ...state
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