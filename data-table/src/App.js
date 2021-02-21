import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ModalsDataTable from './components/ModalsDataTable';
import TableCrud from './components/TableCrud';
import Chart from './components/Chart';

const baseUrl="http://localhost:3001/data";


function App() {

 
  const [data, setData]= useState([]);
  const [modalInsert, setModalInsert]= useState(false);
  const [modalEdit, setModalEdit]= useState(false);
  const [modalDelete, setModalDelete]= useState(false);
  const [post, setPost]=useState({
    name: "",
    uv: "",
    pv: "",
    amt: "",
    id: ""
  })

  const handleChange = e =>{
      setPost({
      ...post,
      [e.target.name]: e.target.value 
    });
  }


  const petitionGet = async () => { 
    await axios.get(baseUrl)
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }


  const petitionPost=async()=>{
    await axios.post(baseUrl, post)
    .then(response=>{
      setData(data.concat(response.data));
      handleModalInsert();
    }).catch(error=>{
      console.log(error);
    })
  }

  const petitionPut=async()=>{
    await axios.put(baseUrl+"/"+post.id, post)
    .then(()=>{
      var newData= data;
      newData.forEach(name=>{
        if(name.id===post.id){
          name.name=post.name;
          name.uv=post.uv;
          name.pv=post.pv;
          name.amt=post.amt;
         }
      });
      setData(newData);
      handleModalEdit();
    }).catch(error=>{
      console.log(error);
    })
  }

  const petitionDelete=async()=>{
    await axios.delete(baseUrl+"/"+post.id)
    .then(()=>{
      setData(data.filter(name=>name.id!==post.id));
      handleModalDelet();
    }).catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    petitionGet();
  }, [])

  const handleModalInsert=()=>{setModalInsert(!modalInsert);}
  const handleModalEdit=()=>{setModalEdit(!modalEdit);}
  const handleModalDelet=()=>{setModalDelete(!modalDelete);}

  const Actions =(name, caso)=>{
    setPost(name);
    (caso==="Edit")
    ?handleModalEdit()
    :handleModalDelet()
  }

  return (
    <div>
    
      <TableCrud Actions={Actions} data={data} handleModalInsert={handleModalInsert}/>

       <ModalsDataTable  modalInsert={modalInsert} handleModalInsert={handleModalInsert} 
                         modalEdit={modalEdit} handleModalEdit={handleModalEdit} 
                         modalDelete={modalDelete}  handleModalDelet={handleModalDelet} 
                        
                         post={post} handleChange={handleChange}
                         petitionPost={petitionPost} petitionPut={petitionPut} petitionDelete={petitionDelete}
        />

      <Chart data={data}/>
     </div>
  )
}

export default App;