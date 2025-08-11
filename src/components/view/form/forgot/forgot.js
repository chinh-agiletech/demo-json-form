import React, { useState } from 'react';
import EmailInputComponent from '../../../ui/EmailInputComponent';

// Import schemas
import emailInputSchema from '../../../../schemas/emailInput.json';

const ForgotPasswordForm = ({ onSwitchForm }) => {
  const [forgotData, setForgotData] = useState({
    email: ''
  });

  const [touchedFields, setTouchedFields] = useState({});

  const handleInputChange = (field, value) => {
    setForgotData(prev => ({
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
    setTouchedFields({ email: true });

    // Check if form is valid
    const isEmailValid = forgotData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotData.email);

    if (isEmailValid) {
      console.log('Forgot Password Requested for:', forgotData);
      alert(`Password reset link sent to ${forgotData.email}. Please check your inbox.`);

      setForgotData({ email: '' });
      setTouchedFields({});

      // TODO: Send request to forgot password API
      // Example:
      // fetch('/api/forgot-password', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: forgotData.email })
      // });
      
      // Optionally redirect back to login after successful submission
      // onSwitchForm('login');
    } else {
      alert('Please enter a valid email address to reset your password.');
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-form">
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          color: '#fff',
          fontSize: '28px'
        }}>
          Forgot Password
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
              <p style={{ 
                fontSize: '14px', 
                color: '#666', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Enter your email address and we'll send you a link to reset your password.
              </p>
              <EmailInputComponent
                label="Email"
                value={forgotData.email}
                onChange={handleInputChange}
                schema={emailInputSchema}
                fieldName="email"
                isTouched={touchedFields.email}
                onTouch={handleFieldTouch}
              />
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
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
                Reset Password
              </button>
            </div>

            <div style={{ 
              textAlign: 'center', 
              marginTop: '20px',
              fontSize: '14px',
              color: '#666'
            }}>
              Remember your password? 
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
                Back to Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
