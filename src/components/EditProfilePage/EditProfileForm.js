import React, { Component } from "react";


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

class EditProfileForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: '',
            email: '',
            formErrors: {
                name: "",
                username: "",
                email: ""
            }
        };

    }

    handleSubmit = e => {
        e.preventDefault();
        if (formValid(this.state)) {
            this.postUserInfo();
            console.log(`
        --SUBMITTING--
        Name: ${this.state.name}
        Username: ${this.state.username}
        Email: ${this.state.email}
      `);
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
    };


    postUserInfo = async () => {
        const response = await fetch(`https://cook-this-by-phil.herokuapp.com/updateaccount`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${this.props.token}`
            }),
            body: JSON.stringify({
                'name': `${this.state.name}`,
                'username': `${this.state.username}`,
                'email': `${this.state.email}`
            })
        })
        const result = await response.json()
        if (result.success === "true") {
            return alert("DONE")
        } else {
            return alert("NOT DONE")
        }
    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "username":
                formErrors.username =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value }, () => console.log(this.state));
    };



    render() {
        const { formErrors } = this.state;
        console.log('token1111', this.props.user)
        return (
            <div className="wrapper">
                <div className="form-wrapper">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="name d-flex justify-content-center pb-2">
                            <div className="w-25 pt-2 pr-3" >
                                <label htmlFor="name" style={{ float: 'right', fontWeight: '600' }}>Name</label>
                            </div>
                            <input
                                className='form-control mb-2 w-50'
                                // placeholder="Name"
                                type="text"
                                name="name"
                                noValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="username d-flex justify-content-center pb-2">
                            <div className="w-25 pt-2 pr-3" >
                                <label htmlFor="username" style={{ float: 'right', fontWeight: '600' }}>Username</label>
                            </div>
                            <input
                                className='form-control mb-2 w-50'
                                // placeholder="Username"
                                type="text"
                                name="username"
                                noValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="email d-flex justify-content-center pb-2">
                            <div className="w-25 pt-2 pr-3" >
                                <label htmlFor="email" style={{ float: 'right', fontWeight: '600' }}>Email</label>
                            </div>
                            <input
                                className='form-control mb-2 w-50'
                                // placeholder="Email"
                                type="text"
                                name="email"
                                noValidate
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="email d-flex justify-content-center pb-2">
                            <div className="w-25 pt-2 pr-3" >
                                <label htmlFor="email" style={{ float: 'right', fontWeight: '600' }}>Bio</label>
                            </div>
                            <textarea
                                rows={3}
                                // placeholder="Bio"
                                onChange={this.handleChange}
                                // value={values.description}
                                className="form-control mb-2 w-50"
                            />
                        </div>

                        {/* form error vaidation */}
                        {/* className={formErrors.name.length > 0 ? "error" : null} */}
                        {/* {formErrors.name.length > 0 && (
                                <span className="errorMessage">{formErrors.name}</span>
                            )} */}


                        <div className="updateAccount py-5">
                            {/* <a href="/editprofile" class="editButton">Update Account</a> */}
                            <button className="editButton" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default EditProfileForm;