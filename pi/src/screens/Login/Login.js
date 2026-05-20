import React from "react";
import FormLogin from '../../components/FormLogin/FormLogin';

function Login(props) {
    return (
        <>
            <h2 className="alert alert-primary"> Login </h2>
            <FormLogin history={props.history} />
        </>
    );
}

export default Login;