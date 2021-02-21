import React,{Fragment} from 'react'
import BodyDelete from './BodyDelete';
import BodyEdit from './BodyEdit';
import BodyInsert from './BodyInsert';
import {Modal} from '@material-ui/core';

const ModalsDataTable = ({modalInsert={modalInsert}, handleModalInsert={handleModalInsert},
                          modalEdit={modalEdit},handleModalEdit={handleModalEdit},
                          modalDelete={modalDelete}, handleModalDelet={handleModalDelet},

                          post={post}, styles={styles}, handleChange={handleChange},
                          petitionPost={petitionPost}, petitionPut={petitionPut}, petitionDelete={petitionDelete} }) => {
     
      return (
            <Fragment>
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
        </Fragment>
      )
}

export default ModalsDataTable
