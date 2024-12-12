import React from 'react';
import {
  TableContainer, Paper, Table,
    TableHead, TableRow, TableCell, 
} from '@mui/material';
function Subcription(props) {
    return (
        <div>
             <p>Rented Movie</p>
             <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Plan</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}> Start Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}> Exipiry Date</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Payment Method </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    
                </Table>
            </TableContainer>
        </div>
    );
}

export default Subcription;