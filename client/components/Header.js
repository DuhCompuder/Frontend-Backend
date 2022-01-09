import { useState, useEffect } from 'react'

function Header({ users, login, setLogin, loginStatus, setLoginStatus}) {
    const [reveal, setReveal] = useState(false)
    // const [balance, setBalance] = useState(0)
    
    // useEffect(() => {
    //     if (login && login.account!==balance) {
    //         setBalance(login.account)
    //     }

    // },[login])

    function revealLogin() {
        setReveal(!reveal)
    }
    function selectUser(user){
        setLogin(user)
        setLoginStatus(true)
        // setBalance(user.account)
        setReveal(false)
    }
    function nameAndBalance( loggedin ) {
        return (
            <div>
                <h1 className='font-bold'>User: {loggedin?`${loggedin.name}`: console.log('Debug Login: ',loggedin)}</h1>
                <h1 className='font-bold'>Account: {loggedin?`$ ${loggedin.account}`: ''}</h1>
            </div>
        )
    }
    return (
        <div className="flex justify-evenly w-screen border-b-2 border-b-gray-400 bg-gray-300">
            <h1 className='items-center p-5 px-36 font-extrabold text-4xl'>
                ShopperApp
            </h1>
           
            <div className='flex justify-evenly w-full items-center'>
                {nameAndBalance(login)}
                <div className='relative'>
                    <button className="cursor-pointer rounded-full p-4 px-8 text-white bg-red-600 hover:bg-orange-500" onClick={revealLogin}>Login</button>
                    <div className={`z-50 absolute top-2 ${reveal?'bg-white p-4 w-44 border-2 border-gray-500': 'hidden'}`}>
                        <ul>
                            { users && users.map((user, i) => (
                                <div key={i} className='cursor-pointer flex justify-evenly py-2 hover:border-2 items-center border-gray-400'>
                                    <p>{user.name}</p>
                                    <button className='rounded-full px-2 text-white bg-red-600 hover:bg-orange-500' onClick={() => selectUser(user)}><p>select</p></button>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Header
