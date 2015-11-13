import * as constants from '../constants';

export function addField(fieldComponent) {
  return {type: constants.ADD_FIELD, fieldComponent}
}

export function moveFields(fieldId, hoverId) {
  return {type: constants.FIELD_MOVE, fieldId, hoverId}
}

export function setActiveField(fieldId) {
  return {type: constants.FIELD_SET_ACTIVE, fieldId}
}
