import React from 'react'

const Passwords = () => {
    return (
        <div className="w-[100vw] h-[100vh] font-mono bg-gradient-to-br from-emerald-50 to-teal-100 text-gray-800 flex flex-col items-center">
        <h1 className="text-3xl text-emerald-700 font-extrabold tracking-tight text-center m-10">Your Saved Passwords</h1>
        <table className="table-auto w-[60vw] rounded-md overflow-hidden">
            <thead className='bg-emerald-700 text-white'>
                <tr>
                <th className='py-1.5'>Website URL</th>
                <th className='py-1.5'>Username</th>
                <th className='py-1.5'>Password</th>
                </tr>
            </thead>
            <tbody className='bg-emerald-100'>
                <tr>
                <td className='text-center border border-emerald-300 min-w-32 py-0.5'>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                <td className='text-center border border-emerald-300 min-w-32 py-0.5'>Malcolm Lockyer</td>
                <td className='text-center border border-emerald-300 min-w-32 py-0.5'>1961</td>
                </tr>
                <tr>
                <td className='text-center border border-emerald-300 min-w-32 py-0.5'>Witchy Woman</td>
                <td className='text-center border border-emerald-300 min-w-32 py-0.5'>The Eagles</td>
                <td className='text-center border border-emerald-300 min-w-32 py-0.5'>1972</td>
                </tr>
                <tr>
                <td className='text-center border border-emerald-300 min-w-32 py-0.5'>Shining Star</td>
                <td className='text-center border border-emerald-300 min-w-32 py-0.5'>Earth, Wind, and Fire</td>
                <td className='text-center border border-emerald-300 min-w-32 py-0.5'>1975</td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Passwords
