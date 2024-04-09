import Input from '../../components/layout/Input';
import Button from '../../components/layout/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authProvider';
import { RegisterUser } from '../../utils/api';

const Login = ({ isSignInPage = true }) => {
  const navigate = useNavigate();
  const {login} = useAuth()

  const authType = isSignInPage;
  const handleSubmit = (e) => {
    e.preventDefault();
    let form = e.target;
    console.log(form)
    let formData = new FormData(form);
    let formObj = Object.fromEntries(formData.entries())
    console.log("formData",formObj)
    authType ? login(formObj) : RegisterUser(formObj, navigate);
  }

  const  toggleForm = () => {
    navigate(`${authType ?  '/register' : '/login'}`)
  }

  return (
    <div className="bg-white w-full h-screen flex justify-center items-center">
      <div className="w-[500px] shadow-lg flex flex-col items-center p-8">
        <h2 className="text-4xl font-extrabold">Welcome {authType ? 'Back' : null}</h2>
        <p className="mt-5 text-sm">
          {authType ? 'Sign in to your account using email and password.' : 'Sign up now get started'}
        </p>
        <h3 className="text-3xl mt-4 bold">{authType ? 'Login' : 'Register'}</h3>
        <form className="w-full" onSubmit={handleSubmit}>
          {!authType && (
            <>
              <Input name="fullName" title="Full name" className="mt-4" placeholder="Enter your full name" />
              <Input name="mobile" title="Mobile" className="mt-4" placeholder="Enter your mobile" />
              <Input name="username" title="Username" className="mt-4" placeholder="Enter your mobile" />
            </>
          )}
          <Input name="email" title="Username or Email" className="mt-4" placeholder="Enter your email" />
          <Input name="password" title="Password" passwordicon={true} type="password" placeholder="Enter your password" />
          <Button text={authType ? 'Log In' : 'Register'} className="mt-4 mx-auto flex bg-blue-500" />
        </form>
        {authType && (
          <a href="#forgot_pass" className="mt-2 ml-auto text-blue-700 hover:underline cursor-pointer">
            Forgot Password?
          </a>
        )}
        <span className="mt-2">
          OR {!authType ? 'I' : 'Not'} have an account{' '}
          <span onClick={toggleForm} className="text-blue-700 cursor-pointer">
            Click here
          </span>
        </span>
      </div>
    </div>
  );
}
Login.defaultProps = {
  isSignInPage: true,
};

Login.propTypes = {
  isSignInPage: PropTypes.bool,
}

export default Login;
