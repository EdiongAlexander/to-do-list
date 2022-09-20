import React from "react";
import './sign-in.css';
import content from "../../static";
import {Link} from 'react-router-dom';

const SignIn = () => (
    <div className="sign-in">
        <h1>Have an account Already?</h1>
        <h3>Sign in here!</h3>

        <form action="" id="sign-in">
            <div className="contents">
                <div className="labels">
                    {content.inputs.map((input, key) => {
                        return (
                            <div key={key}>
                                <label htmlFor={input.name}>{input.label}</label>
                            </div>
                            
                        )
                    })}
                </div>

                <div className="inputs">
                    {content.inputs.map((input, key) => {
                        return (
                            <div key={key}>
                                <input type={input.type} name={input.name} />
                            </div>
                        )
                    })}
                </div>
            </div>
            <Link to="/scrumboard"><button>SIGN IN</button></Link>

            <div>
            <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
            <p><Link to='/'>Back to Home</Link></p>
            </div>
        </form>
    </div>
)

export default SignIn;