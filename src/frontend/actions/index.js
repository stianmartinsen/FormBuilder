import { ADD_FIELD, FIELD_MOVE } from '../constants';

export function addField(fieldComponent) {
  return {
    type: ADD_FIELD,
    fieldComponent
  }
}

export function moveFields(fieldId, hoverId) {
  return {
    type: FIELD_MOVE,
    fieldId,
    hoverId
  }
}
