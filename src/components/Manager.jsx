import React, { useState, useContext, useEffect } from "react";
import PasswordContext from "../contexts/PasswordContext";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Manager = () => {
    const { addPassword, updatePassword, editingPassword, setEditingPassword, clearEditingPassword } = useContext(PasswordContext);
    const navigate = useNavigate();

    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({ site: "", username: "", password: "" });

    useEffect(() => {
        if (editingPassword) {
            setForm(editingPassword);
        } else {
            setForm({ site: "", username: "", password: "" });
        }
    }, [editingPassword]);

    const showPassword = () => {
        setShowPass(prevShowPass => !prevPass);
    };

    const savePassword = () => {
        if (editingPassword) {
            updatePassword(form);
            toast.success("Password updated successfully!");
        } else {
            addPassword(form);
            toast.success("Password added successfully!");
        }
        setForm({ site: "", username: "", password: "" });
        clearEditingPassword();
        navigate('/passwords');
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (        
        <div className="w-full h-screen font-mono bg-gradient-to-br from-emerald-50 to-teal-100 text-gray-800 flex flex-col items-center">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-6 flex flex-col items-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-emerald-900 font-extrabold tracking-tight text-center mt-4">
                    &lt;PassNest/&gt;
                </h1>
                <p className="text-base sm:text-xl text-emerald-700 text-center mb-6">Your own password manager</p>
                <div className="rounded-3xl text-white bg-white shadow-xl flex flex-col p-6 sm:p-8 w-full max-w-md justify-around text-center space-y-4 sm:space-y-6 my-6 sm:my-10">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        className="rounded-4xl border border-gray-300 bg-emerald-50 text-black text-base sm:text-lg placeholder-gray-500 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        type="text"
                        name="site"
                        placeholder="Enter Website URL"
                    />
                    <input
                        value={form.username}
                        onChange={handleChange}
                        className="rounded-4xl border border-gray-300 bg-emerald-50 text-black text-base sm:text-lg placeholder-gray-500 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                    />
                    <div className="relative">
                        <input
                            value={form.password}
                            onChange={handleChange}
                            name="password"
                            className="rounded-4xl border border-gray-300 bg-emerald-50 text-black text-base sm:text-lg placeholder-gray-500 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            type={showPass ? "text" : "password"}
                            placeholder="Enter Password"
                        />
                        <span className="absolute right-0 top-0 cursor-pointer pt-2 sm:pt-3.5 pr-2 sm:pr-4" onClick={showPassword}>
                            {showPass ? (
                                <i className="fa-solid fa-eye text-gray-700"></i>
                            ) : (
                                <i className="fa-solid fa-eye-slash text-gray-700"></i>
                            )}
                        </span>
                    </div>
                    <div className="flex justify-center pt-2 sm:pt-4">
                        <button onClick={savePassword} className="flex items-center cursor-pointer gap-2 px-6 py-2 sm:px-8 sm:py-3 bg-emerald-600 text-white text-lg sm:text-xl font-semibold rounded-full shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover"
                                colors="primary:#ffffff"
                                style={{ width: '24px', height: '24px' }}
                            >
                            </lord-icon>
                            {editingPassword ? "Update" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manager;