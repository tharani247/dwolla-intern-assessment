import React, { useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  businessName?: string;
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Home = () => {
  const { data: customers, mutate } = useSWR<Customer[]>('/api/customers', fetcher);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', businessName: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    await fetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    mutate(); // Refresh the data after adding a new customer
    setOpen(false);
    setFormData({ firstName: '', lastName: '', email: '', businessName: '' });
  };

  return (
    <>
      <Head>
        <title>Customer Management</title>
      </Head>
      <Box sx={{ padding: 4 }}>
        <Button variant="contained" startIcon={<AddRounded />} onClick={() => setOpen(true)}>Add Customer</Button>

        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Business Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers && customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>{customer.firstName} {customer.lastName}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.businessName || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add Customer</DialogTitle>
          <DialogContent>
            <TextField label="First Name" name="firstName" fullWidth margin="dense" onChange={handleChange} />
            <TextField label="Last Name" name="lastName" fullWidth margin="dense" onChange={handleChange} />
            <TextField label="Email" name="email" fullWidth margin="dense" onChange={handleChange} />
            <TextField label="Business Name" name="businessName" fullWidth margin="dense" onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Home;
