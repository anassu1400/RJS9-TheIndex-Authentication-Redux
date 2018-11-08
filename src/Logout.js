import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "./store/actions";

class Logout extends Component {
  render() {
    return (
      <button className="btn btn-danger" onClick={this.props.logout}>
        Logout {this.props.user.username}
      </button>
    );
  }
}

const mapStateToProps = state => ({
  user: state.rootAuth.user
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actionCreators.logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
