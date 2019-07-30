export default function validate(values) {
    let errors = {};
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Email address is invalid';
    }
    if (!values.name) {
        errors.name = "Name is required"
    } else if (values.name.length < 3) {
        errors.name = 'Name needs minimum three characters';
    }
    if (!values.username) {
        errors.username = "Username is required"
    } else if (values.username.length < 3) {
        errors.username = 'Username needs minimum three characters';
    }
    if (!values.password) {
        errors.password = "Password is required"
    } else if (values.password.length < 6) {
        errors.password = 'Password needs minimum six characters';
    }
    if (!values.confirmPass) {
        errors.confirmPass = "Password is required"
    } else if (values.confirmPass.length < 6) {
        errors.confirmPass = 'Password needs minimum six characters';
    }
    if (values.password != values.confirmPass) {
        errors.confirm = "Passwords do not match"
    }
    return errors;
}; 