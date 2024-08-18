import { useState } from "react";
import { signUpUser, loginUser } from "../service/index";
import { useNavigate } from "react-router-dom";
import "../index.css";

const loginField = {
  username: "",
  password: "",
};

function LoginPage() {
  const [userInput, setUserInput] = useState(loginField);
  const [signUp, setSignUp] = useState(true);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (evt) => {
    evt.preventDefault();
    try {
      const res = await loginUser(userInput);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      setMessage(error.response.data.msg);
    } finally {
      setUserInput(loginField);
    }
  };

  const handleSignUp = async (evt) => {
    evt.preventDefault();
    try {
      const res = await signUpUser(userInput);
      if (res.status === 200) {
        setMessage("Sign up successfull! please wait");
        setTimeout(() => {
          setSignUp(true);
          setUserInput(loginField);
          setMessage(null);
        }, 2000);
      }
    } catch (error) {
      setMessage(error.response.data.msg);
    }
  };

  const handleFormInput = (evt) => {
    setUserInput({ ...userInput, [evt.target.name]: evt.target.value });
  };

  const handleSignUpState = () => {
    setSignUp((prevState) => !prevState);
  };

  return (
    <div className="login-page-styles">
      <h1 className="text-center text-2xl mb-4">Test your reaction time</h1>
      {signUp ? (
        <h1 className="text-center">Login </h1>
      ) : (
        <h1 className="text-center">Sign-up</h1>
      )}
      {signUp ? (
        //login-form
        <form onSubmit={handleLogin}>
          <div className="form-str">
            <label>
              Username
              <input
                type="text"
                name="username"
                placeholder="username"
                value={userInput.username}
                onChange={handleFormInput}
                required
              />
            </label>
          </div>
          <div className="form-str">
            <label>
              Password
              <input
                type="password"
                name="password"
                value={userInput.password}
                placeholder="password"
                onChange={handleFormInput}
                required
              />
            </label>
          </div>
          <button className="login-signup-Btn">login</button>
        </form>
      ) : (
        // sign-up form
        <form onSubmit={handleSignUp}>
          <div className="form-str">
            <label>
              Username
              <input
                type="text"
                name="username"
                placeholder="username"
                value={userInput.username}
                onChange={handleFormInput}
                required
              />
            </label>
          </div>
          <div className="form-str">
            <label>
              Password
              <input
                type="password"
                name="password"
                value={userInput.password}
                placeholder="password"
                onChange={handleFormInput}
                required
              />
            </label>
          </div>

          <button className="login-signup-Btn">Sign-up</button>
        </form>
      )}
      <div>
        {message === null ? "" : <h3 className="text-center p-2">{message}</h3>}
      </div>
      <div className="choice-btn mt-3 text-center" onClick={handleSignUpState}>
        {signUp ? (
          <h3>Create a new account</h3>
        ) : (
          <h3>Already have an Account</h3>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
