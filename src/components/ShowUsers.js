import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ShowUsers() {
    const [data, setdata] = useState();
    const navigate = useNavigate();
    console.log(data)

    const displayData = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(result => setdata(result))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        displayData();
    }, [])

    const deleteUser = async (id) => {
        const res2 = await fetch(`https://localhost:8000/deleteUser/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        const deletedData = await res2.json();

        if(res2.status === 422){
            console.log("error")
        }else{
            alert("Data deleted")
        }
    }
    return (
        <div className='mt-5'>
            <div className='container'>
                <div className='add_btn mt-2 mb-2'>
                    <button className='btn btn-primary'>Add Data</button>
                </div>
                <table className="table">
                    <thead>
                        <tr className='table-dark'>
                            <th scope="col">SN</th>
                            <th scope="col">Name</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(item => (
                                <tr>
                                    <th scope="row">{item?.id}</th>
                                    <td>{item?.name}</td>
                                    <td>{item?.username}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.address?.city}, {item?.address?.street}, {item?.address?.zipcode}</td>
                                    <td className='d-flex justify-content-between'>
                                        <button className='btn btn-primary' onClick={()=> navigate(`/edit/${item?.id}`)}>update</button>
                                        <button className='btn btn-danger' onClick={()=>deleteUser(item?.id)}>delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowUsers