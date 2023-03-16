import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { register } from "../stores/auth/actions";

//helpers
import { showAlert } from "../helpers/";

import "../custom-styles/signup.css";

function SignUp(props) {
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    console.log({ credentials });
    try {
      setBtnLoading(true);
      e.preventDefault();
      const resp = await props.register(credentials);
      showAlert({ title: "Success!", message: resp.message, type: "success" });
      navigate("/");
    } catch (err) {
      let message = "Something went wrong!";
      if (err?.response?.data?.message) {
        message = err?.response?.data?.message;
      }
      showAlert({ title: "Error!", message, type: "danger" });
    } finally {
      setBtnLoading(false);
    }
  };

  const [credentials, setCredentials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    companyName: "",
  });
  const [btnLoading, setBtnLoading] = useState(false);

  const onInputCredentials = (fieldName, value) => {
    setCredentials({
      ...credentials,
      [fieldName]: value,
    });
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h3>
          Transforming hiring process through <br /> video based interviews
        </h3>
        <p>Easy, efficient & better pre screening for hiring best talent</p>
        <p>Enterprise-grade security and compliance protects critical data</p>
        <div className="left-footer">
          <p>@ {new Date().getFullYear()} Hiiree</p>
          <div>
            <a href="https://hiiree.com/policy.html" target="_blank" rel="noopenner">
              Privacy
            </a>
            <a href="https://hiiree.com/terms.html" target="_blank" rel="noopenner">
              Legal
            </a>
            <a href="https://hiiree.com/#contact" target="_blank" rel="noopenner">
              Contact
            </a>
          </div>
        </div>
      </div>
      <div className="signup-right">
        <div className="abs-right">
          Already have an account? <Link to="/">Sign In</Link>
        </div>
        <div className="signup-form">
          <h3>Sign Up</h3>
          <div className="inputs-group">
            <input
              value={credentials.name}
              onChange={(e) => onInputCredentials("name", e.target.value)}
              type="text"
              placeholder="Name"
            />
            <input
              value={credentials.username}
              onChange={(e) => onInputCredentials("username", e.target.value)}
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="inputs-group">
            <input
              value={credentials.companyName}
              onChange={(e) =>
                onInputCredentials("companyName", e.target.value)
              }
              type="text"
              placeholder="Company Name"
            />
            <input
              value={credentials.email}
              onChange={(e) => onInputCredentials("email", e.target.value)}
              type="email"
              placeholder="Email Address"
            />
          </div>
          <div className="inputs-group">
            <input
              value={credentials.password}
              onChange={(e) => onInputCredentials("password", e.target.value)}
              type="password"
              placeholder="Password"
            />
            <input
              value={credentials.passwordConfirm}
              onChange={(e) =>
                onInputCredentials("passwordConfirm", e.target.value)
              }
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div className="btn-cont">
            <button onClick={onSubmit} disabled={btnLoading}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
});
const mapDispatchToProps = {
  register,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
