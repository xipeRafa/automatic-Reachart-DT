import {Button,TextField} from '@material-ui/core'

const BodyEdit = ({post,styles,petitionPut,handleModalEdit,handleChange}) => {
      return (
<div className={styles.modal}>

      <h3>Edit</h3>
      
    <TextField className={styles.inputMaterial} label="name" name="name" onChange={handleChange} value={post&&post.name}/><br />

    <TextField className={styles.inputMaterial} label="uv" name="uv" onChange={handleChange} value={post&&post.uv}/><br />
    <TextField className={styles.inputMaterial} label="pv" name="pv" onChange={handleChange} value={post&&post.pv}/><br />
    <TextField className={styles.inputMaterial} label="amt" name="amt" onChange={handleChange} value={post&&post.amt}/><br /><br />

      <div align="right">
        <Button color="primary" onClick={()=>petitionPut()}>Edit</Button>
        <Button onClick={()=>handleModalEdit()}>Cancel</Button>
      </div>

</div>
  
     )
}

export default BodyEdit
