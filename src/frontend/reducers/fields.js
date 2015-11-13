import * as constants from '../constants';
import update from 'react/lib/update';

export default function fields(state = [], action) {
  switch (action.type) {
    case constants.ADD_FIELD:
      return [
        ...state, {
          fieldComponent: action.fieldComponent,
          id: state.length + 1,
          fieldProps: Object.assign({}, action.fieldProps)
        }
      ]
    case constants.FIELD_MOVE:
      const fields = state;
      const field = fields[action.fieldId];

      return update(state, {
        $splice: [
          [action.fieldId, 1],
          [action.hoverId, 0, field]
        ]
      });

    case constants.ADD_CHECKBOX_TO_FIELD:
      const { label, required } = action;
      return state.map((field) => {
        if (field.id === action.fieldId) {
          console.log('ADD TO', field.id);

          field.fieldProps.checkboxes = [...field.fieldProps.checkboxes, {label, required}];
        }
        return field;
      });

    default:
      return state;
  }
}