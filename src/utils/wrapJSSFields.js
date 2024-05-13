import isObject from 'lodash/isObject';

class JSSField {
  constructor(field) {
    this.field = field;
  }

  get value() {
    if (this?.field?.fields?.value) {
      // for sitecore dropdowns
      return this.field.fields.value.value;
    }

    return this.field?.value;
  }

  getProp(propertyName) {
    const { value } = this;

    if (isObject(value)) {
      return value[propertyName];
    }

    return null;
  }

  hasProp(propertyName) {
    const { value } = this;

    if (isObject(value)) {
      return Object.keys(value).indexOf(propertyName) !== -1;
    }

    return false;
  }
}

export const wrapJSSFields = fields => {
  const wrappedFields = { ...fields };
  Object.keys(wrappedFields).forEach(fieldName => {
    const field = wrappedFields[fieldName];
    if (Array.isArray(field)) {
      wrappedFields[fieldName] = field.map(fieldItem => ({
        ...fieldItem,
        fields: wrapJSSFields(fieldItem.fields),
      }));
    } else {
      wrappedFields[fieldName] = new JSSField(field);
    }
  });

  return wrappedFields;
};

export default { wrapJSSFields };
