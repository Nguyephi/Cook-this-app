import React, { useState, useEffect } from 'react';


const UseForm = (callback, validate) => {
    const [inputs, setInputs] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        setIsSubmitting(true);
        setErrors(validate(inputs));
    }

    const handleInputChange = (event) => {
        event.persist();
        setInputs(inputs => ({ ...inputs, [event.target.name]: event.target.value }));
    }

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
    }, [errors]);

    return {
        handleSubmit,
        handleInputChange,
        inputs,
        errors
    };
}
export default UseForm

