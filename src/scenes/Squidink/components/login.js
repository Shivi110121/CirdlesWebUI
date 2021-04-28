import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, startUp } from "./authActions";
import classnames from "classnames";
import Button from "@material-ui/core/Button";
import FormControl from '@material-ui/core/FormControl';
import { FormHelperText } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {}
        };
    }
//@TODO HANDLE AUTH CONTEXT FOR DIDMOUNT AUTOMATED ROUTING
    //componentDidMount() {
    //    // If logged in and user navigates to Login page, should redirect them to dashboard
    //    if (this.props.auth.isAuthenticated) {
    //        this.props.history.push("/dashboard");
    //    }
    //}

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }

        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.props.loginUser(userData, this.props.history);
    };

    render() {
        const { errors } = this.state;

        return (
            <div>
                <div style={{
                    margin: "0",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -70%)"
                }}>
                    <Grid container
                          justify="center"
                          spacing={6}
                    >
                        <Grid item xs={12} >
                            <div className="col s12">
                                <h2>
                                    <b>Login</b> below
                                </h2>
                            </div>
                        </Grid>

                        <Box   borderColor="#3F51B5" border={2} justifyContent="center" display="flex" p={1} bgcolor="#e3e5e8" >
                            <form noValidate autoComplete="on" onSubmit={this.onSubmit} >
                                <Grid item xs={12}>
                                    <FormControl>
                                        <InputLabel htmlFor="component-simple">Email</InputLabel>
                                        <Input style={{width: "500px"}}
                                               id="email"
                                               value={this.state.email}
                                               onChange={this.onChange}
                                               error={errors.email}
                                               type="email"
                                               className={classnames("", {
                                                   invalid: errors.email || errors.emailnotfound
                                               })}/>
                                        <FormHelperText error id="helper">{errors.email}
                                            {errors.emailnotfound}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl>
                                        <InputLabel htmlFor="component-simple">Password</InputLabel>
                                        <Input style={{width: "500px"}}
                                               id="password"
                                               value={this.state.password}
                                               onChange={this.onChange}
                                               error={errors.password}
                                               type="password"
                                               className={classnames("", {
                                                   invalid: errors.password || errors.passwordincorrect
                                               })}/>
                                        <FormHelperText error id="helper" >{errors.password}
                                            {errors.passwordincorrect}</FormHelperText>

                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <div className="col s12" style={{paddingLeft: "11.250px", marginTop: "20px"}}>
                                        <Button type="submit" variant="outlined" color="gray" size="large">
                                            Login
                                        </Button>
                                    </div>
                                </Grid>
                                <div className="col s12" style={{marginTop: "10px"}}>
                                    <Grid item xs={12}>
                                        <h3 className="grey-text text-darken-1">
                                            Don't have an account? <br/>
                                            <Link to="/register">Register Here</Link>
                                        </h3>
                                    </Grid>
                                </div>
                            </form>
                        </Box>

                    </Grid>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
//@TODO ROUTE REGISTERUSER ACTION TO ACTIONS SUBDIRECTORY WHICH PIPES REQUEST TO LOGIN/REGISTER SERVLET TO HANDLE ACTION CONTEXT
export default connect(
    mapStateToProps,
    {loginUser
    }
)(Login);
