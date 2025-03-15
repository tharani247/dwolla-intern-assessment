import Head from 'next/head';
import useSWR, { useSWRConfig } from 'swr';
import { Box } from '@mui/material';
import { AddRounded } from '@mui/icons-material';

export type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  businessName?: string;
};

export type Customers = Customer[];

export type ApiError = {
  error: string;
};

const Home = () => {
  // SWR is a great library for geting data, but is not really a solution
  // for POST requests. You'll want to use either another library or
  // the Fetch API for adding new customers.
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { mutate } = useSWRConfig();
  const { data, error, isLoading } = useSWR<Customers, ApiError>(
    '/api/customers',
    fetcher
  );

  return (
    <>
      <Head>
        <title>Dwolla | Customers</title>
      </Head>
      <main>
        <Box>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.error}</p>}
          {data && (
            <ul>
              {data.map(customer => (
                <li key={customer.email}>
                  {customer.firstName} {customer.lastName}
                </li>
              ))}
            </ul>
          )}
        </Box>
      </main>
    </>
  );
};

export default Home;
