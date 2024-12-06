import React from 'react';
import { Autocomplete, TextField, Paper, TableCell, TableBody, TableContainer, Table, TableHead, TableRow, Box, Popper } from '@mui/material';

const rows = [
  { id: 1, customerName: 'John Doe', projectType: 'Web Development' },
  { id: 2, customerName: 'Jane Smith', projectType: 'Mobile App' },
  { id: 3, customerName: 'Sam Brown', projectType: 'Data Analysis' },
  { id: 4, customerName: 'Alice Johnson', projectType: 'SEO Optimization' },
  { id: 5, customerName: 'Michael Lee', projectType: 'Cloud Computing' },

];

const AutoCompleteDataGrid = () => {
  const handleRowClick = (params) => {
    console.log('Row clicked:', params.row);
    alert(`Row clicked: ${JSON.stringify(params.row)}`);
  };

  const CustomPaper = (props) => (
    <Paper {...props} onClick={(event) => event.stopPropagation()} sx={{ width: 400, maxHeight: 'auto', overflowX: 'hidden', overflowY: 'hidden', '&::-webkit-scrollbar': { display: 'none' } }} >
      <TableContainer>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Contact Person</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Project Type</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        {props.children}
      </TableContainer>
    </Paper>
  );

  const CustomPopper = (props) => {
    return (
      <Popper {...props} sx={{ maxHeight: 350, overflow: 'hidden' }} placement="bottom-start">
        <CustomPaper {...props} sx={{ overflowX: 'hidden', overflowY: 'hidden', '&::-webkit-scrollbar': { display: 'none' } }} />
      </Popper>
    );
  };

  return (
    <Autocomplete
      multiple
      options={rows}
      getOptionLabel={(option) => option.customerName}
      disableCloseOnSelect
      slots={{ popper: CustomPopper }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ width: '100%', overflowX: 'hidden', overflowY: 'scroll','&::-webkit-scrollbar': { display: 'none' } }} {...props} onClick={() => handleRowClick({ row: option })}>
          <TableContainer>
            <Table>
          <TableBody>
            <TableRow key={option.id} >
              <TableCell>{option.customerName}</TableCell>
              <TableCell>{option.projectType}</TableCell>
            </TableRow>
          </TableBody>
          </Table>
          </TableContainer>
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Select a contact" />
      )}
    />
  );
};

export default AutoCompleteDataGrid;
