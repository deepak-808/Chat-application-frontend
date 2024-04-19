import React, { useState } from 'react'
import { CiLock, CiUser } from 'react-icons/ci';
import Input from '../../Layout/input/Input';
import './login.scss'
import { Link } from 'react-router-dom';
import { useAuth } from '../../../auth/authProvider';
import Loading from '../../Layout/Loading';

const LoginAndRegister = () => {
  const {login, loading} = useAuth()

  const [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const {email,password} = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }
    const handleSubmit = async (e) => {
      e.preventDefault();
      let form = e.target;
      let formData = new FormData(form);
      let formObj = Object.fromEntries(formData.entries())
      console.log('formObj', formObj)
      login(formObj);
    };
  
  return (
    <div className='login-container'>
      <div className="login-form">
        <form className='form-input'  onSubmit={handleSubmit}>
          <h1 className='mx-auto text-2xl font-bold	'>Login</h1><br/>
          <Input
            icon={<CiUser/>}
            title="Username"
            id="email"
            name="email"
            inputType="underline"
            placeholder="Type your email"
            value={email}
            onChange={handleChange}/>
            <br/>
            <Input
            icon={<CiLock/>}
            title="Password"
            name="password"
            inputType="underline"
            type="password"
            value={password}
            passwordIcon
            placeholder="Type your password"
            onChange={handleChange}/>
            <Link to='/' className='forgot-password'>Forgot password</Link>
            {loading && <Loading height="40px" />}
            {!loading && <button className="p-2 submit-button" type="submit">Login</button>}
        </form>
      </div>
    </div>
  )
}

export default LoginAndRegister;