import axios from 'axios'
import React, {  useState } from 'react'
import { Button } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator'
function Register(props) {
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('')
    const validateEmail = (e) => {
        var email = e.target.value
        if (validator.isEmail(email)) {
            setEmail(email)
        } else {
            setEmailError('Enter valid Email!')
            setTimeout(() => {
                setEmailError('')
            }, 3 * 1000);
        }
    }
 function event(values, data){
     const checkdata = values && values.filter(item => item.username === name || item.email === email);
     if (checkdata.length === 0) {
          axios.post('https://6100dd49bca46600171cfa19.mockapi.io/laptop24h/Users', data)
              .then(response => toast("Success!") && setTimeout(() => props.onChild2Event(true), 3 * 1000) && setLoading(false))
             .catch(error => {
                 setLoading(false);
             });
     } else {
         toast("error!")
         setLoading(false);
     }
 }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data={
            username:name,
            email:email,
            password: password
        }
        if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password)) {
            axios.get("https://6100dd49bca46600171cfa19.mockapi.io/laptop24h/Users")
                .then(response => setTimeout(() => {
                    event(response.data, data)
                }, 3*1000))
        } else {
            setLoading(false);
            toast("Can not be empty!")
        }
    }
   
   
    return (
        <div className='login'>
            <form className='loginFrom' onSubmit={(e) => handleSubmit(e)}>
                <h1>Registration</h1>
                <input type="name" placeholder="Name" value={name}  onChange={(e) => setName(e.target.value)} />
                <input type="text" placeholder="Gmail"
                    onChange={(e) => validateEmail(e)}></input>
                <span >{emailError}</span>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button type='submit' disabled={loading}  >     {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                    <span>Registration</span></Button>
        
              
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
export default Register;