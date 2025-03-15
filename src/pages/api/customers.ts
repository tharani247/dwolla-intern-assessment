import type { NextApiRequest, NextApiResponse } from 'next';
import type { Customer, Customers, ApiError } from '../index';
import fsPromises from 'fs/promises';
import path from 'path';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getCustomers = async () => {
  const filePath = path.join(process.cwd(), 'data/customers.json');
  const customersJson = await fsPromises.readFile(filePath);
  const customers: Customers = JSON.parse(customersJson.toString());

  return customers;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Customers | ApiError>
) => {
  if (req.method === 'GET') {
    await delay(1000);

    try {
      const customers = await getCustomers();
      res.status(200).json(customers);
    } catch {
      res.status(500).json({
        error:
          'Error getting customers from file. Check to make sure file exists and contains valid data.',
      });
    }
  } else if (req.method === 'POST') {
    let customers: Customers;
    let newCustomer: Customer;

    try {
      newCustomer = JSON.parse(req.body);
    } catch {
      res.status(400).json({
        error: 'Request body was not valid JSON',
      });
      return;
    }

    try {
      customers = await getCustomers();
    } catch {
      res.status(500).json({
        error:
          'Error getting customers from file. Check to make sure file exists and contains valid data.',
      });
      return;
    }

    if (!newCustomer.firstName) {
      res.status(400).json({
        error: 'First name is required',
      });
      return;
    }

    if (!newCustomer.lastName) {
      res.status(400).json({
        error: 'Last name is required',
      });
      return;
    }

    if (!newCustomer.email) {
      res.status(400).json({
        error: 'Email is required',
      });
      return;
    }

    if (!newCustomer.email.includes('@')) {
      res.status(400).json({
        error: 'Email is invalid',
      });
      return;
    }

    if (customers.find(customer => customer.email === newCustomer.email)) {
      res.status(409).json({
        error: 'A customer with that email already exists',
      });
      return;
    }

    customers.unshift(newCustomer);

    await delay(1000);

    const filePath = path.join(process.cwd(), 'data/customers.json');
    await fsPromises.writeFile(filePath, JSON.stringify(customers));

    res.status(200).end();
  } else {
    res.status(405).json({
      error: 'Method not allowed',
    });
  }
};

export default handler;
