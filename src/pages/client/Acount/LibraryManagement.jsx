import React from 'react';
import {
  TableContainer, Paper, Table,
    TableHead, TableRow, TableCell, 
} from '@mui/material';
function LibraryManagement(props) {
    return (
        <div>
             <p>Rented Movie</p>
             <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Movie Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}> Rented Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Days Remaining</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    
                </Table>
            </TableContainer>
        </div>
    );
}

export default LibraryManagement;