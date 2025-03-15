# Dwolla Software Engineering Intern Technical Assessment

Thank you for applying to be one of our interns this summer! You've made it past the initial resume screen and now we want to see what you can do!

Please complete this technical assessment as outlined below. You can take as much time as you'd like, but we've scoped it to a couple hours or less.

## Scenario

Using the following mock-ups, your are to build out a page that lists all existing customers and a dialog/modal that can be used to add a new customer to that list

### List

![List Mock-up](/mocks/list.png)

### Modal

![Modal Mock-up](/mocks/modal.png)

## Additional Instructions

- Your starting point should be `src/pages/index.tsx`, which already provides a basic structure and an API call to get the list of customers
- API endpoints have been provided, which should be used for getting the list of customers and adding new ones. You can reference `src/pages/api/customers.ts` for details, but you should not have to make changes to that file as part of this exercise
- Use [Material UI](https://mui.com/material-ui/all-components/) components
- You are welcome to use AI tools to assist you (we do!), but please be prepared to explain your design choices and the code that you submit in a follow-up interview with the hiring manager

## Setup

1. Fork this code so that your solution lives on your own GitHub profile
2. Install the latest LTS version of [Node](https://nodejs.org/en) on your machine. If you use [Node Version Manager](https://github.com/nvm-sh/nvm) on Mac/Linux, run `nvm install`
3. Run `npm ci` to install dependencies
4. Run `npm run seed` to get a starting point for your customers data (this can be re-run if data file gets messed up somehow)
5. Run `npm run dev` to start the server
6. In a browser, navigate to `http://localhost:3000`
