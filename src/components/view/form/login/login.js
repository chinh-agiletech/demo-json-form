import React, { useState } from 'react';
import EmailInputComponent from '../../../ui/EmailInputComponent';
import TextInputComponent from '../../../ui/TextInputComponent';

// Import schemas
import emailInputSchema from '../../../../schemas/emailInput.json';
import textInputSchema from '../../../../schemas/textInput.json';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const [touchedFields, setTouchedFields] = useState({});

  const handleInputChange = (field, value) => {
    setLoginData(prev => ({
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
      email: true,
      password: true
    };
    setTouchedFields(allTouched);

    // Check if form is valid
    const isEmailValid = loginData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email);
    const isPasswordValid = loginData.password && loginData.password.length >= 6;

    if (isEmailValid && isPasswordValid) {
      console.log('Login Data Submitted:', loginData);
      alert('Login successful! Check the console for data.');
      
      // TODO: Send data to API
      // Example: 
      // fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(loginData)
      // });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  // Password schema (modified from text input for password)
  const passwordSchema = {
    ...textInputSchema,
    uiSchema: {
      ...textInputSchema.uiSchema,
      inputType: 'password',
      placeholder: 'Enter your password',
      validation: {
        required: true,
        minLength: 6
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#333',
          fontSize: '28px'
        }}>
          Login
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ 
            background: 'white', 
            padding: '40px', 
            borderRadius: '12px', 
            maxWidth: '400px',
            margin: '0 auto',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e1e5e9'
          }}>
            
            <div style={{ marginBottom: '20px' }}>
              <EmailInputComponent
                label="Email"
                value={loginData.email}
                onChange={handleInputChange}
                schema={emailInputSchema}
                fieldName="email"
                isTouched={touchedFields.email}
                onTouch={handleFieldTouch}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <TextInputComponent
                label="Password"
                value={loginData.password}
                onChange={handleInputChange}
                schema={passwordSchema}
                fieldName="password"
                isTouched={touchedFields.password}
                onTouch={handleFieldTouch}
              />
            </div>
            
            <div style={{ textAlign: 'center' }}>
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
                onMouseOver={(e) => e.target.style.background = '#0056b3'}
                onMouseOut={(e) => e.target.style.background = '#007bff'}
              >
                Login
              </button>
            </div>

            <div style={{ 
              textAlign: 'center', 
              marginTop: '20px',
              fontSize: '14px',
              color: '#666'
            }}>
              Don't have an account? 
              <a href="#" style={{ 
                color: '#007bff', 
                textDecoration: 'none',
                marginLeft: '5px'
              }}>
                Sign up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
