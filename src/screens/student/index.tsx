import React from 'react'
import {useSelector, useDispatch} from "react-redux"

export default function Student() {
    const userData = useSelector((a: any) => a.user)
    console.log(userData)
    
  return <>
    <div className='text-3xl p-2' >Student ID:    {userData.id}</div>
    <div className='text-3xl p-2' >Student Name:    {userData.userName}</div>
    </>
}
