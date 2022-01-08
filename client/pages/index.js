import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Products from '../components/Products'
import Userdetails from '../components/Userdetails'
import axios from 'axios'

export default function Home() {
const [users, setUsers] = useState(null)
const [products, setProducts] = useState(null)
const [login, setLogin] = useState(null)
const [display, setDisplay] = useState('SHOP')

useEffect(()=>{
  async function fetchUsers() {
    try {
      // let res = await axios.get('http://localhost:4000/getUsers');
      const res = await axios.get('./api/users.mock')
      console.log("called users api => res: ", res.data)
      setUsers(res.data)
    } catch(e) {
      console.log(e)
    }
  }
  async function fetchProducts() {
    try {
      // let res = await axios.get('http://localhost:4000/getProducts');
      const res = await axios.get('./api/products.mock')
      console.log("called products api => res: ", res.data)
      setProducts(res.data)
    } catch(e) {
      console.log(e)
    }
  }
  if (products) {
    console.log("products: ", products)
    console.log("users: ", users)
  } else {
    fetchUsers()
    fetchProducts()
  }
},[users])

  async function changeDisplay(button) {
    setDisplay(button)
  }
  return (
    <div className="w-screen h-screen flex flex-col items-center">

        <Header users={users} login={login} setLogin={setLogin}/>
        <nav>
            <div className="flex justify-evenly w-screen border-b-2 border-b-gray-400 bg-gray-300">
                <button onClick={()=>changeDisplay('SHOP')} className='py-1 hover:bg-gray-200 w-full underline'>Shop</button>
                <button onClick={()=>changeDisplay('USER')} className='py-1 hover:bg-gray-200 w-full underline'>Account Details</button>
            </div>
        </nav>
        <div className='flex flex-col justify-center bg-gray-100'>
          {
            display==='USER'? <Userdetails login={login} />:<Products login={login} products={products}/>
          }
        </div>
    </div>
  )
}
