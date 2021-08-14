import {Button} from '@material-ui/core'

const BodyDelete = ({ post, styles, petitionDelete, handleModalDelete }) => {

    return (

      <div>
          <div className={styles.modal}>

            <p> Are you sure you want to delete? <b>{ post && post.name }</b> ? </p>  

            <div align="right">

                <Button onClick={()=> petitionDelete() } color="secondary"> 
                        Yes 
                </Button>


                <Button onClick={()=> handleModalDelete() }> 
                        No 
                </Button>
                
            </div>
 
          </div>
      </div>
      
    )

}

export default BodyDelete 
