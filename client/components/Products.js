import { useState, useEffect } from 'react'
import  { updateItemQuantity, updateUserBalance, recordTransaction } from '../utils/querySchemas'
import axios from 'axios'


function Products({ login, setLogin , products , fetchUsers, fetchProducts }) {
    const [perpage, setPerpage] = useState(null)
    const [viewpage, setViewpage] = useState(0)
    const [totalpages, setTotalpages] = useState(0)
    const [buywindow, setBuywindow] = useState(null)

    useEffect(()=>{
        if (buywindow === 'NEW_BUY') {
            fetchProducts()
            fetchUsers()
            setBuywindow('BUY_DONE')
        }
        getPages()
    },[products, viewpage, buywindow])
    async function getPages() {
        let queueProducts = products;
        let pagecount = 0;
        let pages = [];
        if (products) {
            let numPages = Math.ceil(queueProducts.length / 6)
            setTotalpages(numPages)
            while(pagecount < numPages) {
                const inPage = queueProducts.slice(0,6);
                const inqueue = queueProducts.slice(6, queueProducts.length)
                pages.push(inPage)
                queueProducts=inqueue;
                pagecount++
            }
        }
        setPerpage(pages)
    }
    function cyclePages(param) {
        switch(param){
            case 'ADD':
                if((viewpage+1)<totalpages){
                    setViewpage(viewpage+1)
                }
                break;
            case 'SUB':
                if((viewpage-1)>=0){
                    setViewpage(viewpage-1)
                }
                break;
        }
    }
    async function updateUserDetails(userName) {
        console.log('update data for: ', userName)
        const res = await axios.get('http://localhost:4000/getUsers' )
        console.log('Updated data for: ', res.data)
        let found = res.data.filter(user=> user.name === userName)
        console.log('found: ', found)
        setLogin(found[0])  
    }
    function showWindow() {
        if(login) {
            switch(buywindow){
                case 'NO_STOCK':
                    return <h1 className='font-bold text-4xl p-5'>Sorry, we are out of this item.</h1>
                case 'NO_FUNDS':
                    return <h1 className='font-bold text-4xl p-5'>You do not have enough funds for purchase.</h1>
                default:
                    return <h1 className='font-bold text-4xl p-5'>Thanks for purchasing!</h1>
            }
        }
        return <h1 className='font-bold text-4xl p-5'>Please login first before purchasing.</h1>
    }

    async function intiateBuy(item) {
        const test = {
            user: null,
            txn: null,
            item: null
        }
        if (login) {
            //check user funds
            //setBuywindow to NO_FUNDS if lacking funds && Exit Purchase function
            if (login.account < item.price) {
                setBuywindow('NO_FUNDS') 
                return
            } 
            //setBuywindow to NO_STOCK if inventory empty && Exit Purchase function
            if (item.quantityInStock < 1) {
                setBuywindow('NO_STOCK') 
                return
            } 
            //send post request UPDATE USER ACCOUNT && ADD new transaction info using passed in item object
            
            let userCheck = updateUserBalance(login, item.price)
            userCheck.status? test.user = await axios.post('http://localhost:4000/updateUser', userCheck.toSend): console.log(userCheck.message)
            let txnCheck = recordTransaction(login, item)
            txnCheck.status?  test.txn = await axios.post('http://localhost:4000/updateUser', txnCheck.toSend): console.log(txnCheck.message)
            //send post request UPDATE ITEM DATABASE
            let itemCheck = updateItemQuantity(item)
            itemCheck.status? test.item = await axios.post('http://localhost:4000/updateProduct', itemCheck.toSend): console.log(itemCheck.message)
            //setBuywindow to THANKS after successful purchase
            setBuywindow('NEW_BUY')
            updateUserDetails(login.name)
        }
        setBuywindow(true)
        console.log(test)
    }
    return (
        <div className="relative w-screen flex flex-col items-center">
            <div className={`absolute top-16 w-5/12 h-2/4 border-2 bg-white flex items-center justify-center ${buywindow?'':'hidden'}`}>
                {/* <h1 className='font-bold text-4xl'>Thanks for purchasing!</h1> */}
                {showWindow()}
                <button onClick={()=> setBuywindow(null)} className='absolute top-5 right-5 text-gray-500 hover:text-red-700 active:text-orange-500 font-bold'>X CLOSE</button>
            </div>
            {
                perpage && perpage.map((page, i)=> (
                    <div key={i} className={`lg:grid lg:gap-4 lg:grid-cols-3 lg:grid-rows-2 pt-8 px-8 lg:w-10/12`}>
                        {page.map((item, j)=>(
                            <div key={j} className={`flex flex-col items-center border-2 border-gray-200 space-y-6 bg-white w-96 py-10 rounded-2xl ${i!==viewpage?'hidden':''}`}>
                                <div className="flex px-2 space-x-10 justify-evenly items-center">
                                    <div className="w-32 space-x-4">
                                        {item.pic?<img className="w-fit object-contain rounded-lg" src={item.pic}/>:''}
                                    </div>
                                    <div className="">
                                        <p className="font-bold">Item Name: </p><p>{item.productName}</p> 
                                        <p className="font-bold">Price: </p><p>${item.price}</p>
                                        <p className="font-bold">Amount In Stock: </p><p>{item.quantityInStock}</p>
                                    </div>
                                </div>
                                <button onClick={()=> intiateBuy(item)} className="cursor-pointer h-10 w-52 rounded-md text-white bg-red-600 hover:bg-orange-500">BUY</button>
                            </div>
                        ))}
                    </div>
                ))
            }
            <div className='flex items-center space-x-4 mb-12'>
                <button onClick={()=>(cyclePages('SUB'))} className='cursor-pointer h-10 w-20 border-2 hover:bg-white'>prev</button>
                {
                    <p className='font-bold'>{`${viewpage+1} / ${totalpages}`}</p>
                }
                <button onClick={()=>(cyclePages('ADD'))} className='cursor-pointer h-10 w-20 border-2 hover:bg-white'>next</button>
            </div> 
        </div>
    )
}

export default Products
