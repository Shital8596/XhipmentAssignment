import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EditPage = () => {
    const [getUserData, setUserData] = useState([])
    const {id} = useParams("")

    const [inputVal, setInp] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
        address:""
    })

    const getData = async () => {
        const res = await fetch(`https://localhost:8000/getUser/${id}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            },
        })
        const data = await res.json()

        if(res.status === 422 || !data){
            console.log("error")
        }else{
            setInp(data)
        }
    }

    const setData = (e) =>{
        const {name, value} = e.target
        setInp(preVal =>  {
            return{
                ...preVal,
                [name]:value
            }
        })
    }

    useEffect(() =>{
        getData();
    },[])

    const updateUser = async(e) => {
        e.preventDefault();

        const {name, email, username, password, address} = inputVal
        const res2 = await fetch(`https://localhost:8000/updateUser/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name, email, username, password, address
            })
        })
        const data2 = await res2.json();
        if(res2.status === 422 || !data2){
            console.log("Please fill the data")
        }else{
            alert("Data updated")
        }
    }
    return (
        <div className='container mt-5 w-60'>
            <form>
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

                    <button type="submit" onSubmit={updateUser} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditPage