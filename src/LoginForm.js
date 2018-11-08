import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "./store/actions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.resetForm();
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  render() {
    const { username, password } = this.state;
    const { user, errors } = this.props;

    if (user) {
      return <Redirect to="/authors" />;
    }

    return (
      <div className="col-6 mx-auto">
        <div className="card my-5">
          <div className="card-body">
            {errors.non_field_errors && (
              <div className="alert alert-danger" role="alert">
                {errors.non_field_errors}
              </div>
            )}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link to="/signup" className="btn btn-link my-2 my-sm-0">
                Signup for an account
              </Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user,
  errors: state.rootErrors
});

const mapDispatchToProps = dispatch => ({
  login: userData => dispatch(actionCreators.login(userData)),
  resetForm: () => dispatch(actionCreators.setErrors({}))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
