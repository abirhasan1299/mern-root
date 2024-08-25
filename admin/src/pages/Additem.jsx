import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { toast } from 'react-toastify';
export default function () {

  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:""
  });

  const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setData(data=>({...data,[name]:value}));
  }

  const onSubmitHandler = async (e)=>{
    const url = "http://localhost:4000";

    e.preventDefault();

    if (data.name || data.description || data.price || data.category ==null) {
      toast.error("Filled the empty input");
    } else {
      const formData = new FormData();

    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("price",data.price);
    formData.append("category",data.category);
    formData.append("image",image);

    const response = await axios.post(`${url}/api/food/add`,formData);

    if (response.data.success) {

        setData({
          name:"",
          description:"",
          price:"",
          category:""
        });

        setImage(false);

        toast.success(response.data.message);

    }else{

      toast.error(response.data.message);
      
    }
    }

    
  }

  return (
    <>
      <Navbar />
      <div className='form'>
          <form onSubmit={onSubmitHandler} >
            {image?
              <center>
                <img src={URL.createObjectURL(image)} alt=""/>
              </center>
            :
            <center>
              <span className="badge text-bg-danger">No image Selected</span>

            </center>
            }
            <br /><br />

              <label>Name *</label>
              <input type="text" name='name' onChange={onChangeHandler} value={data.name} className='form-control' />

              <label>Description *</label>
              <textarea name='description' onChange={onChangeHandler} value={data.description}  className='form-control'></textarea> <br />

              <div className='d-flex'>
                  <div>
                    <label>Price *</label>
                    <input name='price' onChange={onChangeHandler} value={data.price} type="number" className='form-control' />
                  </div>

                  <div className='cat'>
                    <label>Category *</label>
                    <select name='category' onChange={onChangeHandler}  className='form-control'>
                        
                        <option value="vegitable">Vegitables</option>
                        <option value="meat">Meat</option>
                        <option value="fruit">Fruites</option>
                        <option value="conservative">Conservative</option>
                    </select>
                  </div>
              </div>
              <br />
              <label>Image *</label>
              <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" className='form-control' name='image' />
              <br />
              <input type="submit" className='btn btn-primary button' value="ADD" />
          </form>
      </div>
    </>
    
  )
}
