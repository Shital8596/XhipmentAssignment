import React, { useState } from 'react'

const Register = () => {

    const [inputVal, setInp] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
        address:""
    })

    const setData = (e) =>{
        const {name, value} = e.target
        setInp(preVal =>  {
            return{
                ...preVal,
                [name]:value
            }
        })
    }

    const submitInputData = async (e) =>{
        e.preventDefault();
        const {name, username, email, password, address} = inputVal

        const res = await fetch("https://localhost:8000/register", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name, username, email, password, address
            })
        })
        const data = await res.json()
        console.log(data)
    }
    return (
        <div className='container mt-5 w-60'>
            <form onSubmit={submitInputData}>
                <div className='row'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                        <input type="text" value={inputVal.name} onChange={setData} className="form-control" id="name" name='name' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">UserName</label>
                        <input type="text" value={inputVal.username} onChange={setData} className="form-control" id="uname" name='username' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" value={inputVal.email} onChange={setData} className="form-control" id="email" aria-describedby="emailHelp" name='email' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={inputVal.password} onChange={setData} className="form-control" id="password" name='password' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" value={inputVal.cpassword} onChange={setData} className="form-control" id="cpassword" name='cpassword' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <textarea type="text" value={inputVal.address} onChange={setData} className="form-control" id="address" name='address'></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register