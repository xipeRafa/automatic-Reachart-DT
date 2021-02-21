import React,{Fragment} from 'react'
import BodyDelete from './Modals/BodyDelete'
import BodyEdit from './Modals/BodyEdit'
import BodyInsert from './Modals/BodyInsert'
import {Modal} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

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
 

const ModalsDataTable = ({modalInsert, handleModalInsert,modalEdit,handleModalEdit,modalDelete, handleModalDelet,post, handleChange,petitionPost, petitionPut, petitionDelete }) => {

      const styles= useStyles();
      return (
       <Fragment>
         
            <Modal open={modalInsert} onClose={handleModalInsert}>
                      <BodyInsert post={post} styles={styles} petitionPost={petitionPost}
                                  handleModalInsert={handleModalInsert} handleChange={handleChange}
                      />
            </Modal>
      
            <Modal open={modalEdit} onClose={handleModalEdit}> 
                  <BodyEdit post={post} styles={styles} petitionPut={petitionPut}
                            handleModalEdit={handleModalEdit} handleChange={handleChange}
                  />
            </Modal>
      
            <Modal open={modalDelete} onClose={handleModalDelet}> 
                    <BodyDelete post={post} styles={styles} petitionDelete={petitionDelete} 
                                handleModalDelet={handleModalDelet}
                    />
            </Modal>
      
       </Fragment>
      )
}

export default ModalsDataTable
