import React, { useContext } from 'react';
import PasswordContext from '../contexts/PasswordContext';

const Passwords = () => {
    const { passwordArray } = useContext(PasswordContext);

    return (
        <div className="w-[100vw] h-[100vh] font-mono bg-gradient-to-br from-emerald-50 to-teal-100 text-gray-800 flex flex-col items-center">
            <h1 className="text-3xl text-emerald-700 font-extrabold tracking-tight text-center m-10">Your Saved Passwords</h1>
            {passwordArray.length === 0 && (
                <div className="text-xl text-gray-600">No passwords to show</div>
            )}

            {passwordArray.length > 0 && (
                <table className="table-auto w-[60vw] rounded-md overflow-hidden shadow-lg">
                    <thead className='bg-emerald-700 text-white'>
                        <tr>
                            <th className='py-2 px-4'>Website URL</th>
                            <th className='py-2 px-4'>Username</th>
                            <th className='py-2 px-4'>Password</th>
                        </tr>
                    </thead>
                    <tbody className='bg-emerald-100'>
                        {passwordArray.map((item, index) => (
                            <tr key={index} className="border-b border-emerald-300 last:border-b-0 hover:bg-emerald-200 transition-colors duration-150">
                                <td className='text-center border border-emerald-300 min-w-32 py-2 px-4'><a href={item.site} target="_blank">{item.site}</a></td>
                                <td className='text-center border border-emerald-300 min-w-32 py-2 px-4'>{item.username}</td>
                                <td className='text-center border border-emerald-300 min-w-32 py-2 px-4'>{item.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Passwords;