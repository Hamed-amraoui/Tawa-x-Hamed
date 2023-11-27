// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { signup } from '../../services/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/authActions';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', formData);
            console.log('User created successfully: ', response);
            toast.success('User created successfully');
            navigate('/login');
            dispatch(setUser(formData));
            toast.success('User created successfully');
            navigate('/login'); 
        } catch (error) {
            console.error('Error creating user: ', error.response.data);
            toast.error(error.response.data);  
        }
    }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
