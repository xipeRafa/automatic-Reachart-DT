import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import {Modal,Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from "recharts";
import BodyDelete from './components/BodyDelete';
import BodyEdit from './components/BodyEdit';
import BodyInsert from './components/BodyInsert';

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
                <BodyInsert post={post} styles={styles} petitionPost={petitionPost}
                            handleModalInsert={handleModalInsert} handleChange={handleChange}/>
        </Modal>

        <Modal open={modalEdit} onClose={handleModalEdit}> 
            <BodyEdit post={post} styles={styles} petitionPut={petitionPut}
                      handleModalEdit={handleModalEdit} handleChange={handleChange}/>
        </Modal>

        <Modal open={modalDelete} onClose={handleModalDelet}> 
              <BodyDelete post={post} styles={styles} petitionDelete={petitionDelete} handleModalDelet={handleModalDelet}/>
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