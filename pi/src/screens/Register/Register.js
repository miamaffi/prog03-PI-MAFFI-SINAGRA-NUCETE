import React from "react";
import FormRegister from "../../components/FormRegister/FormRegister";

function Register(props) {
    return (
        <>
            <h2 className="alert alert-primary">Crear cuenta</h2>
            <FormRegister history={props.history} />
        </>
    );
}

export default Register;

