import React from 'react'

interface FormErrorMessageProps {
    formik: any;
}

const FormErrorMessage = ({ formik }: FormErrorMessageProps) => {
    return (
        <div className="invalid-feedback-error error" >
            {formik}
        </div>

    )
}

export default FormErrorMessage