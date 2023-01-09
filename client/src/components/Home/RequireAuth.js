import React from 'react'
import {Navigate} from 'react-router-dom'
import {useAuth} from "../Login/Auth"
export default function RequireAuth({children}) {
    // const auth=useAuth();
    // if(!auth.user){
    //     return <Navigate to="/"/>
    // }
    const isAuth=localStorage.getItem("Profile");
    if(!isAuth){
        return <Navigate to="/"/>
    }
  return (
    children
  )
}
