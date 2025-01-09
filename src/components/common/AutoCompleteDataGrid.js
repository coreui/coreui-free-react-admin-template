import React, { useState } from 'react';
import {
  Autocomplete,
  TextField,
  Paper,
  TableCell,
  TableBody,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Box,
  Popper,
} from '@mui/material';

const rows = [
  { id: 1, customerName: 'John Doe', projectType: 'Web Development' },
  { id: 2, customerName: 'Jane Smith', projectType: 'Mobile App' },
  { id: 3, customerName: 'Sam Brown', projectType: 'Data Analysis' },
  { id: 4, customerName: 'Alice Johnson', projectType: 'SEO Optimization' },
  { id: 5, customerName: 'Michael Lee', projectType: 'Cloud Computing' },
];

const AutoCompleteDataGrid = ({
  label,
  columns,
  rows,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  disabled,
}) => {

  const [selectedContact, setSelectedContact] = useState(null);
  const [open, setOpen] = useState(false);

  const handleRowClick = (params) => {
    console.log('Row clicked:', params.row);
    onChange(null, params.row); // Update the selected contact
    setOpen(false)
  };

  const CustomPaper = (props) => (
    <Paper
      {...props}
      onClick={(event) => event.stopPropagation()}
      sx={{
        width: '100%',
        maxHeight: 'auto',
        overflowX: 'hidden',
        overflowY: 'hidden',
        '&::-webkit-scrollbar': { display: 'none' },
        padding: 0,

      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {
                columns.map((column) => (
                  <TableCell key={column} align='left' sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5', border: '1px solid #ddd', width: '50%' }}>
                    {column}
                  </TableCell>
                ))
              }
              {/* <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Contact Person</TableCell>
              <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Project Type</TableCell> */}
            </TableRow>
          </TableHead>
        </Table>
        {props.children}
      </TableContainer>
    </Paper>
  );

  const CustomPopper = (props) => {
    return (
      <Popper
        {...props}
        sx={{ maxHeight: 350, overflow: 'hidden', padding: 0 }}
        placement="bottom-start"
      >
        <CustomPaper
          {...props}
          sx={{
            overflowX: 'hidden',
            overflowY: 'hidden',
            '&::-webkit-scrollbar': { display: 'none' },
            padding: 0,
          }}
        />
      </Popper>
    );
  };

  return (
    <Autocomplete
      options={rows}
      value={value}
      onChange={onChange}
      onBlur={onBlur} // Update value on user interaction
      getOptionLabel={(option) => {
        const values = Object.values(option).filter((_, index) => index !== 0); 
        return values[0] || ''; 
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}  
      
     
      slots={{ popper: CustomPopper }}
      open={open} 
      onOpen={() => setOpen(true)} 
      onClose={() => setOpen(false)} 
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            width: '100%',
            overflowX: 'hidden',
            overflowY: 'scroll',
            '&::-webkit-scrollbar': { display: 'none' },
            padding: 0,
          }}
          // {...props}
          onClick={() => handleRowClick({ row: option })}
        >
          <TableContainer>
            <Table>
              <TableBody>

                <TableRow key={`row-${option.id}`} 
                  sx={{
                    '&:hover': {
                      backgroundColor: 'lightgray', // Example hover background color
                      cursor: 'pointer', // Example hover cursor
                    },
                  }}
                >
                  {
                    Object.keys(option).filter(key => key !== 'id').map((key) => (
                        <TableCell component="th"   key={`cell-${option.id}-${key}`} sx={{  width: '50%'}}>
                          {option[key]}</TableCell>
                    ))
                  }
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} error={error} helperText={helperText} disabled={disabled || false} />
      )}
      disabled={disabled || false}
      
    />
  );
};

export default AutoCompleteDataGrid;
