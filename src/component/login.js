import axios from 'axios'
import validator from 'validator'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { login } from '../feattures/useSlice'
import './login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login(props){
    const [emailError, setEmailError] = useState('')
   
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const validateEmail = (e) => {
        var email = e.target.value
        if (validator.isEmail(email)) {
            setEmail(email)
        } else {
            setEmailError('Enter valid Email!')
            setTimeout(() => {
                setEmailError('')
            }, 5*1000);
        }
    }
    const dispatch = useDispatch()
   function eventDispath(valuse){
       const checkdata = valuse && valuse.filter(item => item.username === name && item.email === email && item.password===password);
       if (checkdata.length !== 0) {
           dispatch(login(checkdata)) && toast("Success!") &&  props.onChild2Event(false)
           setLoading(false);
       }else{
           toast("user, password wrong!")
           setLoading(false);
       }
   }
    const handleSubmit= async(e)=>{
        e.preventDefault();
        setLoading(true);
        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password)) {
            toast("Can not be empty!")
            setTimeout(() => {
                setLoading(false);
            }, 2 * 1000);
            
        }else{
            await axios.get('https://6100dd49bca46600171cfa19.mockapi.io/laptop24h/Users').then(response => {
                eventDispath(response.data)
            }).catch(error => {
                console.log("error", error)
            })
           
        }
    }
    return(
        <div className='login'>
            <form className='loginFrom' onSubmit={(e)=> handleSubmit(e)}>
                <h1>Log in</h1>
                <input type="name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
                <input type="text" placeholder="Gmail"
                    onChange={(e) => validateEmail(e)}></input> 
                <span >{emailError}</span>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                <Button type='submit' disabled={loading}  >     {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                    <span>Log in</span></Button>
            </form>
            <ToastContainer
                position="top-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}
export default Login;