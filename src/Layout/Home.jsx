import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"


const Home = () => {
  return (
    <div>
        <Navbar />
        <div className="pt-20 md:px-5">
          <Outlet />
        </div>
        <footer className="bg-gray-200 p-4 text-gray-800">
        <p>�� 2023 ProductScope. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Home