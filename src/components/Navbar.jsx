import { useContext, useEffect, useState } from "react"
import {AuthContext} from '../providers/AuthProvider';
import { Link, NavLink } from "react-router-dom";
import { CiMenuBurger, CiMenuFries } from "react-icons/ci";
import Loading from "./Loading";


const Navbar = () => {
  const {user, loading} = useContext(AuthContext)
  const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    fetch('/data.json')
     .then(res => res.json())
     .then(result => {
        const data = result.flatMap(item => item.categories)
        setCategories(data)
      });
  },[open])
  console.log(categories)
  
  const navLink = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <NavLink to="/dashboard" >Dashboard</NavLink>
      {categories.map((item, i) => <li key={i}><NavLink to={item}>{item}</NavLink></li>)}
    </>
  )
  return (
    <div className="fixed w-full z-10">
      <div className="p-3 border-b-black rounded-b-2xl bg-gray-300 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <img className="h-8" src="/logo.png" alt="logo" />
          <h1 className="text-xl font-semibold">Product Scope</h1>
        </div>

        <div className="flex items-center gap-5">
          {loading && <Loading />}
          {user?.name && !loading ? <div className="flex items-center gap-2">
            Hi, {user?.name?.split(' ')[0]}
            <img className="h-10 w-10 p-1 border-blue-500 border-2 rounded-full cursor-pointer" src={user?.photoUrl || "/logo.png"} title={user?.email} alt="user" />
          </div> : !loading && <div className="flex items-center gap-2">
            <Link className="font-semibold px-4 py-2 rounded-md bg-green-500 hover:bg-white hover:text-green-500 text-white hover:border border-black" to="/login">Login</Link>
            <Link className="font-semibold px-4 py-2 rounded-md bg-green-500 hover:bg-white hover:text-green-500 text-white hover:border border-black" to="/signup">Signup</Link>
          </div>}
          
          <div>
            {open ? <CiMenuFries className="text-xl cursor-pointer" onClick={() => setOpen(!open)} /> : <CiMenuBurger className="text-xl cursor-pointer" onClick={() => setOpen(!open)} />}
          </div>
        </div>
      </div>

      {open && <nav className=" w-full bg-white shadow-md px-3 py-3 border-b-black">
        <ul className="flex gap-5 justify-between px-5 flex-wrap">{navLink}</ul>
      </nav>}

    </div>
  )
}

export default Navbar