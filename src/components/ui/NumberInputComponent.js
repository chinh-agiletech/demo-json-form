import React from 'react';

const NumberInputComponent = ({ 
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
    const numValue = e.target.value === '' ? '' : Number(e.target.value);
    onChange(fieldName, numValue);
  };

  const handleBlur = () => {
    if (onTouch) {
      onTouch(fieldName);
    }
  };

  const validate = (inputValue) => {
    if (uiSchema.validation.required && (inputValue === '' || inputValue === null || inputValue === undefined)) {
      return 'This field is required';
    }
    if (inputValue !== '' && inputValue !== null && inputValue !== undefined) {
      if (uiSchema.validation.minimum !== undefined && inputValue < uiSchema.validation.minimum) {
        return `Minimum value is ${uiSchema.validation.minimum}`;
      }
      if (uiSchema.validation.maximum !== undefined && inputValue > uiSchema.validation.maximum) {
        return `Maximum value is ${uiSchema.validation.maximum}`;
      }
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
        placeholder={uiSchema.placeholder}
        min={uiSchema.validation.minimum}
        max={uiSchema.validation.maximum}
      />
      {shouldShowError && (
        <div style={{ 
          color: '#dc3545', 
          fontSize: '12px', 
          marginTop: '4px' 
        }}>
          {validationError}
        </div>
      )}
    </div>
  );
};

export default NumberInputComponent;
