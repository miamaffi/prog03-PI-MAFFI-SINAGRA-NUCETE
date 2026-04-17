import React, { Component } from "react";
import FormRegister from "../../components/FormRegister/FormRegister";

class Register extends Component {
    render() {
        return (
            <>
                <h2 className="alert alert-primary">Crear cuenta</h2>
                {/* Le paso history para que FormRegister pueda redirigir al login */}
                <FormRegister history={this.props.history} />
            </>
        );
    }
}

export default Register;