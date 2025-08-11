import React, { useState } from 'react';
import TextInputComponent from '../../../ui/TextInputComponent';
import EmailInputComponent from '../../../ui/EmailInputComponent';
import NumberInputComponent from '../../../ui/NumberInputComponent';
import ComponentFactory from '../../../ui/ComponentFactory';

// Import schemas
import textInputSchema from '../../../../schemas/textInput.json';
import emailInputSchema from '../../../../schemas/emailInput.json';
import numberInputSchema from '../../../../schemas/numberInput.json';

const ContactForm = ({ onSwitchForm }) => {
  const [contactData, setContactData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [touchedFields, setTouchedFields] = useState({});

  const handleInputChange = (field, value) => {
    setContactData(prev => ({
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
      fullName: true,
      email: true,
      phone: true,
      subject: true,
      message: true
    };
    setTouchedFields(allTouched);

    // Check if form is valid
    const isNameValid = contactData.fullName && contactData.fullName.trim() !== '';
    const isEmailValid = contactData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email);
    const isSubjectValid = contactData.subject && contactData.subject.trim() !== '';
    const isMessageValid = contactData.message && contactData.message.trim() !== '';

    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      console.log('Contact Data Submitted:', contactData);
      alert('Your message has been sent! We will get back to you soon.');
      
      // Reset form after successful submission
      setContactData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setTouchedFields({});
      
      // TODO: Send data to API
      // Example: 
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(contactData)
      // });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  };

  // Message schema (modified from text input for textarea)
  const messageSchema = {
    ...textInputSchema,
    uiSchema: {
      ...textInputSchema.uiSchema,
      inputType: 'textarea',
      placeholder: 'Type your message here...',
      rows: 5,
      validation: {
        required: true,
        minLength: 10
      }
    }
  };

  // Phone schema (modified from number input)
  const phoneSchema = {
    ...numberInputSchema,
    uiSchema: {
      ...numberInputSchema.uiSchema,
      placeholder: 'Enter your phone number',
      validation: {
        required: false
      }
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '20px',
          color: '#333',
          fontSize: '28px'
        }}>
          Contact Us
        </h2>
        
        <p style={{
          textAlign: 'center',
          marginBottom: '30px',
          color: '#666',
          maxWidth: '400px',
          margin: '0 auto 30px'
        }}>
          We'd love to hear from you! Please fill out the form below and we'll get back to you as soon as possible.
        </p>
        
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
              <TextInputComponent
                label="Full Name"
                value={contactData.fullName}
                onChange={handleInputChange}
                schema={textInputSchema}
                fieldName="fullName"
                isTouched={touchedFields.fullName}
                onTouch={handleFieldTouch}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <EmailInputComponent
                label="Email Address"
                value={contactData.email}
                onChange={handleInputChange}
                schema={emailInputSchema}
                fieldName="email"
                isTouched={touchedFields.email}
                onTouch={handleFieldTouch}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <NumberInputComponent
                label="Phone Number (Optional)"
                value={contactData.phone}
                onChange={handleInputChange}
                schema={phoneSchema}
                fieldName="phone"
                isTouched={touchedFields.phone}
                onTouch={handleFieldTouch}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <TextInputComponent
                label="Subject"
                value={contactData.subject}
                onChange={handleInputChange}
                schema={textInputSchema}
                fieldName="subject"
                isTouched={touchedFields.subject}
                onTouch={handleFieldTouch}
              />
            </div>

            <div style={{ marginBottom: '30px' }}>
              <div style={{ marginBottom: '8px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#333'
                }}>
                  Message
                </label>
                <textarea
                  value={contactData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onBlur={() => handleFieldTouch('message')}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '16px'
                  }}
                  placeholder="Type your message here..."
                />
                {touchedFields.message && !contactData.message && (
                  <div style={{ color: 'red', fontSize: '14px', marginTop: '5px', textAlign: 'left' }}>
                    Message is required
                  </div>
                )}
                {touchedFields.message && contactData.message && contactData.message.length < 10 && (
                  <div style={{ color: 'red', fontSize: '14px', marginTop: '5px', textAlign: 'left' }}>
                    Message must be at least 10 characters
                  </div>
                )}
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <button 
                type="submit" 
                style={{
                  background: '#4CAF50',
                  color: 'white',
                  padding: '14px 30px',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  width: '100%',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = '#388E3C'}
                onMouseOut={(e) => e.target.style.background = '#4CAF50'}
              >
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
