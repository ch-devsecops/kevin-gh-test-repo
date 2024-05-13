import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ fields = {}, action, children }) => {
  if (Object.keys(fields).length === 0) return null;

  return (
    <form target="_blank" action={action} id="webpropertiesPayment" method="post" style={{ textAlign: 'center' }}>
      {Object.keys(fields).map(key => (
        <input key={key} type="hidden" name={key} value={fields[key]} />
      ))}
      {children}
    </form>
  );
};

Form.propTypes = {
  fields: PropTypes.shape({}),
  action: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.element),
};

export default Form;
