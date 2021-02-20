import React, { useState, useEffect } from 'react';
import MaterialTable from "material-table";
import axios from 'axios';
import {Modal, TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const baseUrl="http://localhost:3001/artistas";


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
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
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [artistaSeleccionado, setArtistaSeleccionado]=useState({
    artista: "",
    genero: "",
    id: "",
    pais: "",
    ventas: ""
  })

  const handleChange = e =>{
      setArtistaSeleccionado({
      ...artistaSeleccionado,
      [e.target.name]: e.target.value 
    });
  }


  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, artistaSeleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+"/"+artistaSeleccionado.id, artistaSeleccionado)
    .then(response=>{
      var dataNueva= data;
      dataNueva.map(artista=>{
        if(artista.id===artistaSeleccionado.id){
          artista.artista=artistaSeleccionado.artista;
          artista.genero=artistaSeleccionado.genero;
          artista.ventas=artistaSeleccionado.ventas;
          artista.pais=artistaSeleccionado.pais;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+"/"+artistaSeleccionado.id)
    .then(response=>{
      setData(data.filter(artista=>artista.id!==artistaSeleccionado.id));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarArtista=(artista, caso)=>{
    setArtistaSeleccionado(artista);
    (caso==="Editar")
    ?abrirCerrarModalEditar()
    :abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar=()=>{setModalInsertar(!modalInsertar);}
  const abrirCerrarModalEditar=()=>{setModalEditar(!modalEditar);}
  const abrirCerrarModalEliminar=()=>{setModalEliminar(!modalEliminar);}

   useEffect(()=>{
    peticionGet();
  }, [])

  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Artista</h3>
      <TextField className={styles.inputMaterial} label="Artista" name="artista" onChange={handleChange}/>
      <br />
      <TextField className={styles.inputMaterial} label="País" name="pais" onChange={handleChange}/>          
   <br />
<TextField className={styles.inputMaterial} label="Ventas" name="ventas" onChange={handleChange}/>
      <br />
<TextField className={styles.inputMaterial} label="Género" name="genero" onChange={handleChange}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Artista</h3>
      <TextField className={styles.inputMaterial} label="Artista" name="artista" onChange={handleChange} value={artistaSeleccionado&&artistaSeleccionado.artista}/>
      <br />
      <TextField className={styles.inputMaterial} label="País" name="pais" onChange={handleChange} value={artistaSeleccionado&&artistaSeleccionado.pais}/>          
<br />
<TextField className={styles.inputMaterial} label="Ventas" name="ventas" onChange={handleChange} value={artistaSeleccionado&&artistaSeleccionado.ventas}/>
      <br />
<TextField className={styles.inputMaterial} label="Género" name="genero" onChange={handleChange} value={artistaSeleccionado&&artistaSeleccionado.genero}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar al artista <b>{artistaSeleccionado && artistaSeleccionado.artista}</b>? </p>

      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
      </div>

    </div>
  )
  const columns = [
    { title: 'Artista', field: 'artista' },
    { title: 'País de Origen', field: 'pais' },
    { title: 'Género(s)', field: 'genero' },
    { title: 'Ventas Estimadas (millones)', field: 'ventas', type: 'numeric'}
  ];

  return (
    <div>
    
      <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
     
      <MaterialTable
          columns={columns}
          data={data}
          title="Artistas M"  
          actions={[
                    {
                     icon: 'edit',
                     tooltip: 'Editar Artista',
                     onClick: (event, rowData) => seleccionarArtista(rowData, "Editar")
                    },
                    {
                     icon: 'delete',
                     tooltip: 'Eliminar Artista',
                     onClick: (event, rowData) => seleccionarArtista(rowData, "Eliminar")
                    }
                  ]}
          options={{actionsColumnIndex: -1,}}
          localization={{ header:{actions: "Acciones"} }}
      />


        <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
           {bodyInsertar}
        </Modal>

        <Modal open={modalEditar} onClose={abrirCerrarModalEditar}> 
            {bodyEditar} 
        </Modal>

        <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}> 
            {bodyEliminar} 
        </Modal>

        <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>

    </div>
  )
}

export default App;






/* const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]; */



