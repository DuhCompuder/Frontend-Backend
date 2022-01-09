function Userdetails({login}) {
    function showUserDetails() {
        return (
            <div className="flex bg-white pt-2 justify-evenly space-x-20">
                <div className="border-2 border-black rounded-md p-4">
                    <h1 className="text-5xl font-extrabold py-4 border-b-2 border-gray-500">{login.name}</h1>
                    <img src={login.pic} className="w-96 h-72 object-cover my-2"/>
                    <div className="flex flex-col p-4 border-2 border-gray-500 bg-gray-300">
                        <h1 className="font-bold text-xl">Email: </h1><p>{login.email}</p>
                        <h1 className="font-bold text-xl">Acount Value: </h1><p>{login.account}</p>
                        <h1 className="font-bold text-xl">Membership: </h1><p>{login.isMember?'Yes':'No'}</p>
                    </div>
                </div>
                <div className="pt-8 w-96">
                    <h1 className="text-3xl border-b-2 border-gray-500">Transactions</h1>
                    <div className="pt-4 max-h-screen overflow-y-scroll">
                        <ul>
                            {
                                login.transactions && login.transactions.map((txns, i)=>(
                                    <li key={i} className="p-2 m-2 border-2 bg-gray-300">
                                        <div className="flex space-x-2"><h1 className="font-bold">Transaction No. : </h1><p>{txns.id}</p></div>
                                        <div className="flex space-x-2"><h1 className="font-bold">Item Name : </h1><p>{txns.item.name}</p></div>
                                        <div className="flex space-x-2"><h1 className="font-bold">Item Price : </h1><p>{txns.item.price}</p></div>
                                        <div className="flex space-x-2"><h1 className="font-bold">Item Quantity Bought: </h1><p>{txns.item.quantity}</p></div>
                                        <div className="flex space-x-2"><h1 className="font-bold">Total Paid: </h1><p>{txns.totalprice}</p></div>
                                    </li>
                                ))
                            }  
                        </ul>
                    </div>
                </div>

            </div>)
    }
    function noLogin() {
        return (
            <div>
                <h1 className="text-5xl font-extrabold">Please Login</h1>
            </div>)
    }
    return (
        <div className="">
            {login?showUserDetails():noLogin()}
        </div>
    )
}

export default Userdetails
