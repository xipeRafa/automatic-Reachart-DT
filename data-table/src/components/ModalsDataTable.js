
import BodyDelete from './Modals/BodyDelete'
import BodyEdit from './Modals/BodyEdit'
import BodyInsert from './Modals/BodyInsert'
import useStyles from '../styles'

import {Modal} from '@material-ui/core'
import {Fragment} from 'react'

const ModalsDataTable = (
                        { 
                          post,

                          modalInsert,
                          modalEdit,
                          handleModalEdit,

                          modalDelete, 
                          handleModalDelete, 

                          handleChange,
                          petitionPost, 

                          petitionPut, 
                          petitionDelete,
                          handleModalInsert, 
                        }
                        ) => {

      const styles = useStyles();

      return (

       <Fragment>
         
            <Modal open={modalInsert} onClose={handleModalInsert}>

                     <BodyInsert 
                        post={post} 
                        styles={styles} 
                        petitionPost={petitionPost}
                        handleChange={handleChange}
                        handleModalInsert={handleModalInsert} 
                     />

            </Modal>
      
            <Modal open={modalEdit} onClose={handleModalEdit}> 

                  <BodyEdit 
                        post={post} 
                        styles={styles} 
                        petitionPut={petitionPut}
                        handleChange={handleChange}
                        handleModalEdit={handleModalEdit} 
                  />

            </Modal>
      
            <Modal open={modalDelete} onClose={handleModalDelete}> 

                    <BodyDelete 
                        post={post} 
                        styles={styles} 
                        petitionDelete={petitionDelete} 
                        handleModalDelete={handleModalDelete}
                    />

            </Modal>
      
       </Fragment>

      )
}

export default ModalsDataTable
