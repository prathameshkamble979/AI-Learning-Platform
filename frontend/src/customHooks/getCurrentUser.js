
import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import { setUserData, setLoading } from '../redux/userSlice'
import axios from 'axios'
import { serverUrl } from '../App'

const getCurrentUser = () => {
    const dispatch = useDispatch()
  useEffect(() => {
    const fetchUser = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/user/getcurrentuser" , {withCredentials : true})
            dispatch(setUserData(result.data))
            dispatch(setLoading(false))
        } catch (error) {
            console.error(error)
            dispatch(setUserData(null))
            dispatch(setLoading(false))
        }
    }
    fetchUser()
  },[])
}

export default getCurrentUser