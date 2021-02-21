import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from "recharts";

const baseUrl="http://localhost:3001/data";
        
const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

function App() {

  const styles= useStyles();
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

  const handleModalInsert=()=>{setModalInsert(!modalInsert);}
  const handleModalEdit=()=>{setModalEdit(!modalEdit);}
  const handleModalDelet=()=>{setModalDelete(!modalDelete);}

   useEffect(()=>{
    petitionGet();
  }, [])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Post</h3>
      <TextField className={styles.inputMaterial} label="name" name="name" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="uv" name="uv" onChange={handleChange}/>          
   <br />
<TextField className={styles.inputMaterial} label="pv" name="pv" onChange={handleChange}/>
      <br />
<TextField className={styles.inputMaterial} label="amt" name="amt" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>petitionPost()}>Add</Button>
        <Button onClick={()=>handleModalInsert()}>Cancel</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Edit</h3>
      <TextField className={styles.inputMaterial} label="name" name="name" onChange={handleChange} value={post&&post.name}/>
      <br />
      <TextField className={styles.inputMaterial} label="uv" name="uv" onChange={handleChange} value={post&&post.uv}/>          
     <br />
       <TextField className={styles.inputMaterial} label="pv" name="pv" onChange={handleChange} value={post&&post.pv}/>
      <br />
     <TextField className={styles.inputMaterial} label="amt" name="amt" onChange={handleChange} value={post&&post.amt}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>petitionPut()}>Edit</Button>
        <Button onClick={()=>handleModalEdit()}>Cancel</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Are you sure you want to delete? <b>{post && post.name}</b>? </p>  

      <div align="right">
        <Button color="secondary" onClick={()=>petitionDelete()}>Yes</Button>
        <Button onClick={()=>handleModalDelet()}>No</Button>
      </div>

    </div>
  )
  const columns = [
    { title: 'name', field: 'name' },
    { title: 'uv', field: 'uv' },
    { title: 'pv', field: 'pv' },
    { title: 'amt', field: 'amt', type: 'numeric'}
  ];

  const Actions =(name, caso)=>{
    setPost(name);
    (caso==="Edit")
    ?handleModalEdit()
    :handleModalDelet()
  }

  return (
    <div>
    
      <Button onClick={()=>handleModalInsert()}>Post</Button>
     
      <MaterialTable
          columns={columns}
          data={data}
          title="Data Table"  
          actions={[{icon: 'edit',tooltip: 'Edit',onClick: (event, rowData) => Actions (rowData, "Edit")},
                    {icon: 'delete',tooltip: 'Delete',onClick: (event, rowData) => Actions (rowData, "Delete")}
                  ]}

          options={{actionsColumnIndex: 4, rowStyle: {backgroundColor: '#EEE'}}}
          localization={{ header:{actions: "Actions"} }}
       />

       <Modal open={modalInsert} onClose={handleModalInsert}>
           {bodyInsertar}
        </Modal>

        <Modal open={modalEdit} onClose={handleModalEdit}> 
            {bodyEditar} 
        </Modal>

        <Modal open={modalDelete} onClose={handleModalDelet}> 
            {bodyEliminar} 
        </Modal>
      
       
        <LineChart width={900} height={500} data={data} margin={{top: 25,right: 30, left: 20, bottom: 5}}>
             <CartesianGrid strokeDasharray="3 3" />
             <XAxis dataKey="name" />
             <YAxis />
             <Tooltip />
             <Legend />
             <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }}/>
             <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
     </div>
  )
}

export default App;