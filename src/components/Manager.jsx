import React, { useState, useContext } from "react";
import PasswordContext from "../contexts/PasswordContext";

const Manager = () => {
    // We're getting the 'addPassword' function from our PasswordContext.
    // The actual 'passwordArray' state is managed within the context provider.
    const { addPassword } = useContext(PasswordContext);

    const [showPass, setShowPass] = useState(false);
    const [form, setForm] = useState({ site: "", username: "", password: "" });

    const showPassword = () => {
        setShowPass(prevShowPass => !prevShowPass);
    };

    const savePassword = () => {
        addPassword(form);
        setForm({ site: "", username: "", password: "" });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-[100vw] h-[100vh] font-mono bg-gradient-to-br from-emerald-50 to-teal-100 text-gray-800 flex flex-col">
            <div className="container mx-auto max-w-3xl py-6 flex flex-col justify-center items-center">
                <h1 className="text-4xl text-emerald-900 font-extrabold tracking-tight text-center">&lt;PassNest/&gt;</h1>
                <p className="text-xl text-emerald-700 text-center">Your own password manager</p>
                <div className="rounded-3xl text-white bg-white shadow-xl flex flex-col p-8 h-[50vh] w-full max-w-md justify-around text-center space-y-6 my-10">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        className="rounded-4xl border border-gray-300 bg-emerald-50 text-black text-lg placeholder-gray-500 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        type="text"
                        name="site"
                        placeholder="Enter Website URL"
                    />
                    <input
                        value={form.username}
                        onChange={handleChange}
                        className="rounded-4xl border border-gray-300 bg-emerald-50 text-black text-lg placeholder-gray-500 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                        type="text"
                        name="username"
                        placeholder="Enter Username"
                    />
                    <div className="relative">
                        <input
                            value={form.password}
                            onChange={handleChange}
                            name="password"
                            className="rounded-4xl border border-gray-300 bg-emerald-50 text-black text-lg placeholder-gray-500 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                            type={showPass ? "text" : "password"}
                            placeholder="Enter Password"
                        />
                        <span className="absolute right-0 top-0 cursor-pointer" onClick={showPassword}>
                            {showPass ? (
                                <i className="fa-solid fa-eye text-gray-700 pr-4 pt-3.5"></i>
                            ) : (
                                <i className="fa-solid fa-eye-slash text-gray-700 pr-4 pt-3.5"></i>
                            )}
                        </span>
                    </div>
                    <div className="flex justify-center pt-4">
                        <button onClick={savePassword} className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                            <lord-icon
                                src="https://cdn.lordicon.com/efxgwrkc.json"
                                trigger="hover"
                                colors="primary:#ffffff"
                                style={{ width: '28px', height: '28px' }}
                            >
                            </lord-icon>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Manager;