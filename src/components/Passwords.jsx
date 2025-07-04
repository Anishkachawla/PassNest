import React, { useContext, useState } from 'react';
import PasswordContext from '../contexts/PasswordContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Passwords = () => {
    const { passwordArray, deletePassword, setEditingPassword, clearEditingPassword } = useContext(PasswordContext);
    const navigate = useNavigate();

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    }

    const handleEdit = (itemToEdit) => {
        setEditingPassword(itemToEdit);
        navigate('/');
    };

    const handleDelete = (idToDelete) => {
        deletePassword(idToDelete);
    };

    return (
        <div className="w-full h-screen font-mono bg-gradient-to-br from-emerald-50 to-teal-100 text-gray-800 flex flex-col items-center py-4">
            {console.log('Current passwordArray:', passwordArray)}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-emerald-700 font-extrabold tracking-tight text-center mt-4 mb-10">Your Saved Passwords</h1>
            {passwordArray.length === 0 && (
                <div className="text-xl text-gray-600">No passwords to show</div>
            )}

            {passwordArray.length > 0 && (
                <div className='w-full max-w-4xl rounded-md shadow-lg overflow-x-auto'>
                    <table className="min-w-full rounded-md shadow-lg">
                        <thead className='bg-emerald-700 text-white sticky top-0'>
                            <tr>
                                <th className='py-2 px-4'>Website URL</th>
                                <th className='py-2 px-4'>Username</th>
                                <th className='py-2 px-4'>Password</th>
                                <th className='py-2 px-4'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-emerald-100'>
                            {passwordArray.map((item) => (
                                <tr key={item.id} className="border-b border-emerald-300 last:border-b-0 hover:bg-emerald-200 transition-colors duration-150">
                                    <td className='text-center border border-emerald-300 min-w-32 py-2 px-4 break-all'><a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a></td>
                                    <td className='text-center border border-emerald-300 min-w-32 py-2 px-4 break-all'>{item.username}<i onClick={()=>{copyText(item.username)}} className="fa-solid fa-copy cursor-pointer mx-2 transition-transform duration-300 hover:scale-110 hover:translate-y-[-2px]"></i></td>
                                    <td className='text-center border border-emerald-300 min-w-32 py-2 px-4 break-all'>{item.password}<i onClick={()=>{copyText(item.password)}} className="fa-solid fa-copy cursor-pointer mx-2 transition-transform duration-300 hover:scale-110 hover:translate-y-[-2px]"></i></td>
                                    <td className='text-center min-w-32 py-2 px-4 flex gap-6 justify-center items-center'>
                                        <i
                                            onClick={() => handleEdit(item)}
                                            className="fa-solid fa-pen-to-square cursor-pointer transition-transform duration-300 hover:scale-110 hover:translate-y-[-2px]"
                                            title="Edit"
                                        ></i>
                                        <lord-icon
                                            onClick={() => handleDelete(item.id)}
                                            src="https://cdn.lordicon.com/xyfswyxf.json"
                                            trigger="hover"
                                            className="cursor-pointer"
                                            style={{width:'20px', height:'40px'}}>
                                        </lord-icon>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Passwords;