import React, { useState } from 'react';
import ComponentFactory from '../../../ui/ComponentFactory';

// Import form schema
import formSchema from '../../../../schemas/formSchema.json';

const RegisterForm = ({ onSwitchForm }) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    birthDate: '',
    age: ''
  });

  const [touchedFields, setTouchedFields] = useState({});

  const handleInputChange = (field, value) => {
    setRegisterData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFieldTouch = (field) => {
    setTouchedFields(prev => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submit
    const allTouched = {
      name: true,
      email: true,
      birthDate: true,
      age: true
    };
    setTouchedFields(allTouched);

    // Check if form is valid
    const isNameValid = registerData.name && registerData.name.trim().length > 0;
    const isEmailValid = registerData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email);
    const isBirthDateValid = !formSchema.formSchema.required.includes('birthDate') || 
                           (registerData.birthDate && registerData.birthDate.length > 0);
    const isAgeValid = !formSchema.formSchema.required.includes('age') || 
                      (registerData.age && !isNaN(registerData.age) && registerData.age > 0);

    if (isNameValid && isEmailValid && isBirthDateValid && isAgeValid) {
      console.log('Registration Data Submitted:', registerData);
      alert('Registration successful! Check the console for data.');
      
      // TODO: Send data to API
      // Example: 
      // fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(registerData)
      // });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  const renderFormFields = () => {
    // Use the vertical layout from the form schema
    const elements = formSchema.uiSchemaVertical.elements;
    
    return elements.map((element) => {
      const fieldName = element.scope.split('/').pop();
      const value = registerData[fieldName] || '';
      const isTouched = touchedFields[fieldName] || false;
      
      return (
        <div key={fieldName} style={{ marginBottom: '20px' }}>
          {ComponentFactory.renderComponent(
            element,
            value,
            handleInputChange,
            registerData,
            isTouched,
            handleFieldTouch
          )}
        </div>
      );
    });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#fff',
          fontSize: '28px'
        }}>
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ 
            background: 'white', 
            padding: '40px', 
            borderRadius: '12px', 
            width: '400px',
            margin: '0 auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e1e5e9'
          }}>
            
            {renderFormFields()}
            
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                type="submit" 
                style={{
                  background: '#007bff',
                  color: 'white',
                  padding: '12px 30px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#2b81ddff'}
                onMouseOut={(e) => e.target.style.background = '#2286f1ff'}
              >
                Register
              </button>
            </div>

            <div style={{ 
              textAlign: 'center', 
              marginTop: '20px',
              fontSize: '14px',
              color: '#666'
            }}>
              Already have an account? 
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  onSwitchForm('login');
                }}
                style={{ 
                  color: '#007bff', 
                  textDecoration: 'none',
                  marginLeft: '5px',
                  cursor: 'pointer'
                }}
              >
                Log in
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
