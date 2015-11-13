import * as constants from '../constants';

export function addField(fieldComponent, fieldProps = {}) {
  return {type: constants.ADD_FIELD, fieldComponent, fieldProps}
}

export function moveFields(fieldId, hoverId) {
  return {type: constants.FIELD_MOVE, fieldId, hoverId}
}

export function setActiveField(fieldId) {
  return {type: constants.FIELD_SET_ACTIVE, fieldId}
}

export function addCheckboxToField(fieldId, label, required) {
  return {type: constants.ADD_CHECKBOX_TO_FIELD, fieldId, label, required};
}
