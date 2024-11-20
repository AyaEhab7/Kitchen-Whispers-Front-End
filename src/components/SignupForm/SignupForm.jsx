import { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../../services/authService';
import "./SignupForm.css";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="signup-main">
      <div className="signup-card">
        <h1 className="signup-title">Sign Up</h1>
        <p className="signup-message">{message}</p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-input-group">
            <label htmlFor="username" className="signup-label">Username:</label>
            <input
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="password" className="signup-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div className="signup-input-group">
            <label htmlFor="confirm" className="signup-label">Confirm Password:</label>
            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              className="signup-input"
            />
          </div>
          <div className="signup-actions">
            <button type="submit" className="signup-button" disabled={isFormInvalid()}>Sign Up</button>
            <Link to="/">
              <button type="button" className="signup-cancel-button">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupForm;
