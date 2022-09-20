import React from "react";
import './sign-up.css';
import content from "../../static";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Link} from 'react-router-dom';

const schema = yup.object().shape(
    {
        fullname: yup.string().required().min(6),
        email: yup.string().required("Please enter a valid email"),
        password: yup.string().required("Please enter a password").matches(
            /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/, 
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One special case Character"
        )
    }
)

const SignUp = () => {
    const { register, handleSubmit, formState: {errors} } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );
    const onSubmit = (data) => console.log(data)

    return (
        <div className="sign-up">
            <h1>Don't have an account?</h1>
            <h3>Sign up here!</h3>

            <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>

                <div className="contents">
                    <div className="labels">
                        {content.inputs.map((input, key) => {
                            return (
                                <div key={key}>
                                <label htmlFor={input.name}>{input.label}</label>
                                </div>
                            )
                        })}
                        <label htmlFor="options">User Type</label>
                    </div>

                    <div className="inputs">
                        {content.inputs.map((input, key) => {
                            return (
                                <div key={key}>
                                    <input type={input.type} name={input.name} {...register(input.name)}/>
                                    <br />
                                    <span className="message">{errors[input.name]?.message}</span>
                                </div>
                            )
                        })}
                        <select name="usertype" id="role" {...register("usertype")}>
                            <option value="Developer">Developer</option>
                            <option value="Owner">Owner</option>
                        </select>

                    </div>
                </div>
                <button type="submit">SIGN UP</button>
                <div>
                    <p>Have an account? <Link to='/signin'>Sign in</Link></p>
                    <p><Link to='/'>Back to Home</Link></p>
                </div>
            </form>
        </div>
    )
}

export default SignUp;