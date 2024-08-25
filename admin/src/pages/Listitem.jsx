import React, { useState } from 'react'
import Navbar from './Navbar'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from 'react'


export default function Listitem({url}) {

  const [list,setList] = useState([])
  

  const fetchList = async () => {
      const response = await axios.get(`${url}/api/food/list`);
      console.log(response.data);

      if (response.data.success) {
          setList(response.data.data)
      } else {
        toast.error("Error to load");
      }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    toast.success(response.data.message);
    await fetchList();
  }

  useEffect(()=>{
    fetchList();
  },[]);

  return (
    <>
      <Navbar />
      <div className='list'>
        <table className='table table-bordered'>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
                <th>Action</th>
            </tr>
            <tbody>
            {list.map((item,index)=>{
              return(
                <>
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <img src={`${url}/images/`+item.image}  alt="" className='tableImage' />
                    </td>
                    <td>
                    <span onClick={()=>{removeFood(item._id)}} className="badge text-bg-danger del">Delete</span>
                    </td>
                  </tr>
                </>
              )
            })}
            </tbody>
        </table>
    </div>
    </>
  )
}
