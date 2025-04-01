// src/pages/api/customers.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import type { Customer, Customers, ApiError } from '../index';
import fsPromises from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'data/customers.json');

const readCustomers = async (): Promise<Customers> => {
  const customersJson = await fsPromises.readFile(filePath);
  return JSON.parse(customersJson.toString());
};

const writeCustomers = async (customers: Customers) => {
  await fsPromises.writeFile(filePath, JSON.stringify(customers, null, 2));
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const customers = await readCustomers();
      res.status(200).json(customers);
    } else if (req.method === 'POST') {
      const newCustomer: Customer = req.body;
      const customers = await readCustomers();
      customers.push(newCustomer);
      await writeCustomers(customers);
      res.status(201).json(newCustomer);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
