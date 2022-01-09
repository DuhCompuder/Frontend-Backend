import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Products from '../components/Products'
import Userdetails from '../components/Userdetails'
import axios from 'axios'

export default function Home() {
  const [users, setUsers] = useState(null)
  const [products, setProducts] = useState(null)
  const [login, setLogin] = useState(null)
  const [loginStatus, setLoginStatus] = useState(false)
  const [display, setDisplay] = useState('SHOP')

  useEffect(()=>{
    if (products) {
      console.log("products: ", products)
      console.log("users: ", users)
    } else {
      fetchUsers()
      fetchProducts()
    }
    // async function refreshUserLogin() {
    //   // if (users && loginStatus==true) {
    //     let loggedIn = login;
    //       console.log('CUrrent Logged in: ', login)

    //       let updatedUserInfo = await users.filter(user => {
    //           return (loggedIn._id === user._id)
    //       })
    //       setLogin(updatedUserInfo[0])
    //   // }
    // }
    // if (users && loginStatus==true) {
    //   refreshUserLogin()
    // }
  },[users])

  async function fetchUsers() {
    try {
      const res = await axios.get('http://localhost:4000/getUsers');
      /* Uncomment for testing with a mock api endpoint */
      // const res = await axios.get('./api/users.mock')
      console.log("called users api => res: ", res.data)
      setUsers(res.data)
    } catch(e) {
      console.log(e)
    }
  }
  async function fetchProducts() {
    try {
      const res = await axios.get('http://localhost:4000/getProducts');
      /* Uncomment for testing with a mock api endpoint */
      // const res = await axios.get('./api/products.mock') 
      console.log("called products api => res: ", res.data)
      setProducts(res.data)
    } catch(e) {
      console.log(e)
    }
  }

  async function changeDisplay(button) {
    setDisplay(button)
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center">

        <Header users={users} login={login} setLogin={setLogin} loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
        <nav>
            <div className="flex justify-evenly w-screen border-b-2 border-b-gray-400 bg-gray-300">
                <button onClick={()=>changeDisplay('SHOP')} className='py-1 hover:bg-gray-200 w-full underline'>Shop</button>
                <button onClick={()=>changeDisplay('USER')} className='py-1 hover:bg-gray-200 w-full underline'>Account Details</button>
            </div>
        </nav>
        <div className='flex flex-col justify-center bg-gray-100'>
          {
            display==='USER'? <Userdetails login={login} loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>:<Products login={login} setLogin={setLogin} products={products} fetchUsers={fetchUsers} fetchProducts={fetchProducts} loginStatus={loginStatus} setLoginStatus={setLoginStatus}/>
          }
        </div>
    </div>
  )
}
