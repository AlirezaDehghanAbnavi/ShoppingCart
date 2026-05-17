import { useState } from 'react'
import LoginService from '../services/LoginService'

function LoginModal({ isOpen, onClose, setUser }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    if (!isOpen) return null;

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(null)
        console.log("Logging in with:", username, password);

        try {
            const user = await LoginService.login({ username, password })
            setUser(user)
            setUsername('')
            setPassword('')
            onClose()
        } catch {
            setErrorMessage('Invalid username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    };

    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="modal-body">
                            {errorMessage && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={username}
                                    onChange={({ target }) => setUsername(target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input
                                    className="form-control"
                                    type="password"
                                    value={password}
                                    onChange={({ target }) => setPassword(target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;