import { useState, useEffect, Fragment } from 'react'
import ModalsDataTable from './components/ModalsDataTable'
import TableCrud from './components/TableCrud'
import Chart from './components/Chart'
import axios from 'axios'


const baseUrl="http://localhost:3001/data"


function App() {

  const [dataState, setData] = useState([]);

  const [modalInsert, setModalInsert] = useState(false)
      const [modalEdit, setModalEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  const [post, setPost] = useState({
    name: "",
    uv: "",
    pv: "",
    amt: "",
    id: ""
  })
  
  const handleChange = e =>{
      setPost({ ...post, [e.target.name]: e.target.value })
  }

  const petitionGet = async () => { 
   /*  await (baseUrl)
      .then(response => {  setData(response.data) })
      .catch(  error => { console.log(error) }) */

      try {
        const { data } = await axios.get(baseUrl);
        setData(data)
      } catch (error) {
        console.log(error);
        console.log('error en petitionGet');
      }
  }

  const petitionPost = async () => {
/*     await axios.post(baseUrl, post)
      .then(response => { setData( data.concat(response.data) ); handleModalInsert() })
      .catch(  error => { console.log(error) })  */

       try {
        const { data } = await axios.post(baseUrl, post);
        setData([...dataState, data])
        handleModalInsert()
      } catch (error) {
        console.log(error);
        console.log('error en petitionPost');
      } 
  }

  const petitionPut = async () => {
    await axios.put( baseUrl + "/" + post.id, post) 
      .then(()=> {

          dataState.forEach( el => {
            if(el.id === post.id){

              el.name = post.name
              el.uv = post.uv
              el.pv = post.pv
              el.amt = post.amt 

            }
          }
        )

        setData(dataState); handleModalEdit() 

      }).catch( error => { console.log(error) } )
  }

  const petitionDelete = async () => {
    await axios.delete( baseUrl + "/" + post.id )
      .then(()=> { setData(dataState.filter( el => el.id !== post.id )); handleModalDelete() })
      .catch( error => { console.log(error) } )
  }

  useEffect(()=> { petitionGet() }, [])

  const handleModalInsert = () => { setModalInsert(!modalInsert) }
    const handleModalEdit = () => { setModalEdit(!modalEdit) }
  const handleModalDelete = () => { setModalDelete(!modalDelete) }

  const Actions = (name, caso) => {
    setPost(name);
    caso === "Edit" ? handleModalEdit() : handleModalDelete()
  }

  return (

    <Fragment>
    
      <TableCrud 
          data={dataState} 
          Actions={Actions}
          handleModalInsert={handleModalInsert}
      />

      <ModalsDataTable  
          post={post}

          modalEdit={modalEdit} 
          petitionPut={petitionPut} 
          modalInsert={modalInsert}

          modalDelete={modalDelete}   
          handleChange={handleChange}

          petitionPost={petitionPost} 
          petitionDelete={petitionDelete}

          handleModalEdit={handleModalEdit} 
          handleModalDelete={handleModalDelete}
          handleModalInsert={handleModalInsert} 
      />

      <Chart data={dataState}/>

    </Fragment>

  )
}

export default App;

