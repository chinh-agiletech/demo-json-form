import React from 'react';

const DateInputComponent = ({ 
  label, 
  value, 
  onChange, 
  schema, 
  fieldName,
  error,
  isTouched,
  onTouch
}) => {
  const { uiSchema } = schema;
  
  const handleChange = (e) => {
    onChange(fieldName, e.target.value);
  };

  const handleBlur = () => {
    if (onTouch) {
      onTouch(fieldName);
    }
  };

  const validate = (inputValue) => {
    if (uiSchema.validation.required && !inputValue) {
      return 'This field is required';
    }
    return null;
  };

  const validationError = validate(value);
  const shouldShowError = isTouched && validationError;

  return (
    <div style={{ flex: 1, marginRight: '20px' }}>
      <label style={uiSchema.labelStyle}>
        {label}
      </label>
      <input
        type={uiSchema.inputType}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          ...uiSchema.styling,
          borderColor: shouldShowError ? '#dc3545' : '#ccc'
        }}
      />
      {shouldShowError && (
        <div style={{ 
          color: '#dc3545', 
          fontSize: '12px', 
          marginTop: '4px',
          textAlign: 'left'
        }}>
          {validationError}
        </div>
      )}
    </div>
  );
};

export default DateInputComponent;
