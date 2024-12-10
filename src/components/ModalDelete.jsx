
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function ModalDelete({openDelete,setOpenDelete,deleteItem}) {
   
    
    return (
        <div>
        <Dialog
            open={openDelete}
            onClose={() => setOpenDelete(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this item?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDelete(false)} color="primary">
                    Cancel
                </Button>
                <Button  onClick={deleteItem}  color="error" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);
}
  
export default ModalDelete;