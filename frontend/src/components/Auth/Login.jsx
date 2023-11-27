// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// import { login } from '../../services/api';
import {toast} from 'react-toastify';
import { SyncOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/actions/authActions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password,
            });
            console.log("LOGIN RESPONSE", data);
            dispatch({
                type: "LOGGED_IN_USER",
                payload: {
                    email: data.email,
                    token: data.token,
                },
            });
            // save user and token to local storage
            window.localStorage.setItem("auth", JSON.stringify(data));
            dispatch(setUser(data));
            navigate("/dashboard");
            toast.success("Login Successful");
            setLoading(false);
            // console.log("LOGIN RESPONSE", data);
            
        } catch (err) {
            console.log(err);
            toast.error(err.response.data);
            setLoading(false);
        }
    }

    return (
        <>
            <div className="container-fluid bg-secondary p-5 text-center">
                <h1>Login</h1>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group p-2">
                                <label className="text-muted">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="form-group p-2">
                                <label className="text-muted">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                                disabled={!email || !password || loading}
                            >
                                {loading ? <SyncOutlined spin /> : "Login"}
                            </button>
                            <Link to="/forgot-password" className="float-right text-danger">
                                Forgot Password
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;