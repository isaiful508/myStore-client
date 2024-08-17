/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import {auth} from '../firebase/firebase'
import baseUrl from "../hooks/useBaseUrl"

export const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const logOut = () => {
      setUser(null)
      setLoading(true)
      localStorage.removeItem('token')
      return signOut(auth)
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async currentUser => {
        setLoading(true)

        try {
          if(!currentUser ){
            localStorage.removeItem('token')
            setLoading(false)
          }
  
          const data = await baseUrl.post('/role', {email: currentUser.email})
          const role = await data.data.role
          setUser({
            name: currentUser?.displayName,
            email: currentUser?.email,
            uid: currentUser?.uid,
            photoUrl: currentUser?.photoURL,
            role : role || 'user'
          })
          
          setLoading(false)
        } catch (error) {
          console.log(error)
        }
      })

      return () => {
        return unsubscribe()
      }
    },[])

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        logOut
    }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider