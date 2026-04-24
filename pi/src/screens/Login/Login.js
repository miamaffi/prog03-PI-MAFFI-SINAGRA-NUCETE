import React, { Component } from "react";
import FormLogin from '../../components/FormLogin/FormLogin';

class Login extends Component {
    render() {
        return (
            <>
            <h2 className="alert alert-primary"> Login </h2>
            {/* Le paso history para que el FormLogin pueda redirigir al home*/}
                <FormLogin history={this.props.history} />
            </>
        );
    }
}

export default Login;