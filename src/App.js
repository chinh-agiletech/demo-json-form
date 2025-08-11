
import './App.css';
import { useState } from 'react';
import LoginForm from './components/view/form/login/login';
import RegisterForm from './components/view/form/register/register';
import ContactForm from './components/view/form/contact/contact';

function App() {
  const [currentForm, setCurrentForm] = useState('login');

  const switchForm = (formName) => {
    setCurrentForm(formName);
  };

  const renderForm = () => {
    switch(currentForm) {
      case 'register':
        return <RegisterForm onSwitchForm={switchForm} />;
      case 'contact':
        return <ContactForm onSwitchForm={switchForm} />;
      case 'login':
      default:
        return <LoginForm onSwitchForm={switchForm} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dynamic Form System</h1>
        {renderForm()}
      </header>
    </div>
  );
}

export default App;
