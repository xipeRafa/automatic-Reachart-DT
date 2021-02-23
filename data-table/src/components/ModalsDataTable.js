import {Fragment} from 'react'
import BodyDelete from './Modals/BodyDelete'
import BodyEdit from './Modals/BodyEdit'
import BodyInsert from './Modals/BodyInsert'
import {Modal} from '@material-ui/core'
import useStyles from '../styles'

const ModalsDataTable = ({modalInsert, handleModalInsert,modalEdit,handleModalEdit,modalDelete, handleModalDelete,post, handleChange,petitionPost, petitionPut, petitionDelete }) => {

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
      
            <Modal open={modalDelete} onClose={handleModalDelete}> 
                    <BodyDelete post={post} styles={styles} petitionDelete={petitionDelete} 
                                handleModalDelete={handleModalDelete}
                    />
            </Modal>
      
       </Fragment>
      )
}

export default ModalsDataTable
