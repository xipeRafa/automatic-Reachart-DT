
import React from 'react'
import {Button,TextField} from '@material-ui/core';

const BodyInsert = ({post={post},styles={styles},petitionPost={petitionPost},
                     handleModalInsert={handleModalInsert},handleChange={handleChange}}) => {
      return (
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
}

export default BodyInsert
