import {  ADD_FIELD } from '../constants';

export function addField(fieldComponent) {
  return {
    type: ADD_FIELD,
    fieldComponent
  }
}
