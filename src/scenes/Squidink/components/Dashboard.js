import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, startUp } from "./authActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


class Dashboard extends Component {
  //onLogoutClick = e => {
  //  e.preventDefault();
  //  this.props.logoutUser();
  //  console.log(this.props.auth)
  //
  //};

  constructor() {
    super();
    this.state = {
      errors: {}
    }
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  printErrors = () => {
    this.props.startContainer(this.props.history);
    setTimeout(function () { window.open("http://localhost:81/squid_servlet"); }, 2000)

  }

  render() {

    return (
      <div>
        <div style={{
          margin: "0",
          position: "absolute",
          top: "45%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
          <Grid container
            justify="center"
            spacing={6}
          >
            <div className="landing-copy col s12 center-align">
              <Grid item xs={12}>
                <h2>
                  <p className="flow-text grey-text text-darken-1">
                    You are logged into SQUID INK.
              </p>
                </h2>
              </Grid>
              <Grid item xs={12} style={{ margin: "30px" }}>
                <Button onClick={this.props.startUp} variant="outlined" color="gray" size="large">
                  Squid Container Button
            </Button>
              </Grid>
            </div>
          </Grid>
        </div>
      </div>
    );
  }
}

//Dashboard.propTypes = {
//logoutUser: PropTypes.func.isRequired,
//auth: PropTypes.object.isRequired
//};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { //logoutUser
    startUp
  }
)(Dashboard);
