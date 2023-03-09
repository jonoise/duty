# Introduction to Duty

[Duty](https://tryduty.com) is the platform for minimalist developers, just write a simple Javascript function that completes a task and deploy it. And that's it, you created a duty.

We enable developers to iterate quickly and deploy pieces of code to the edge in a click of a button. Duty takes care of your infrastructure so you can focus on finding solutions and deliver fast responses to large amounts of customers.

### Use cases

Duty is a great fit for:

- Deploy serverless APIs and microservices in minutes.

- Automate your workflow with webhooks.

- Trigger recurring duties with cron jobs.

- Deploy code to the edge in a click of a button.

- Connect with a MongoDB database via the MongoDB driver for Node.js.

- Front-end developers who wants to create applications but don't want to worry about server management.

### Sign up

If you don't have a Duty account yet, you can sign up for free <a className='text-sky-300' href='/signup'>here</a>.

# Getting Started

### Sign up

If you don't have a Duty account yet, you can sign up for free [here](/signup).

### Add a project

Once you've signed up, you can create a project by clicking on the [Add project](/dashboard) button on your [dashboard](/dashboard).

You will need to provide a name for your project and select a <a className="text-red-500">unique slug</a>. You will also need to add a description.

The <span className="text-red-500">slug</span> is used to identify your project in the URL. For example, if you create a project with the slug `my-project`, the endpoints to access it will be `https://tryduty.com/api/v1/my-project/{any-duty}`.

### Add a duty

Once you've created a project, you can add a duty by clicking on the ["Add duty"](/docs/create-duty) button on your <span className="text-red-500">project details page</span>.

# Duties

Once you have created a project, you can add duties to it. A <span className='text-red-500'>Duty</span> is a simple
javascript function that lives in an endpoint. It will be executed everytime you call that endpoint.

### Creating a duty

When you create a Duty you will be asked to provide a <span className='text-red-500'>name</span>, a <span className='text-red-500'>description</span> and, again, a <span className='text-red-500'>unique slug</span>. This slug will be used to identify the duty in your project.

![Creating a new duty web page](https://user-images.githubusercontent.com/71573508/223337345-266126d9-174a-4c69-8d50-23fb0c9d9b16.png)

You can test your duty by clicking on the <span className='text-red-500'>Test function</span> button. This will execute your function and show you the result on the right side of the screen.

Once you have finished testing your duty, you can save it by clicking on the <span className='text-red-500'>Save function</span> button.

### Content of a Duty

Duties <span className='text-red-500' >MUST START</span> with the statement `module.exports` and export an async function.
Otherwise the duty will fail.

### Parameters

Duties receive one parameter, which is the `Request` object. This object contains all the information about the request that was made to the endpoint.
So you can easily access the request body, headers, query parameters, etc. For a full list of the properties of the `Request` object, please refer to the [Request object documentation](/docs/request-object).

### Environment variables

You can access the environment variables of your project by using the `process.env` object. For example, if you have an environment variable called `MY_ENV_VAR`, you can access it by using `process.env.MY_ENV_VAR`.

# API Keys

API keys are used to authenticate requests to the API. You can create API keys in the API Keys section of the dashboard of your project.

All you need to do is send the key as a header with the name `Duty-Token` in your request.

Or you can use the [Duty SDK](/docs/sdk) to interact with the API.

# Request Object

All duties get a request object as their first argument. This object contains all the information about the request that was made to the duty.

## Request Object Properties

### request.url

The URL of the request.

### request.method

The HTTP method of the request.

### request.headers

The headers of the request.

### request.rawHeaders

The raw headers of the request.

### request.statusCode

The status code of the request.

### request.body

The body of the request.

### request.query

The query of the request.

### request.cookies

The cookies of the request.

# Duty SDK

The Duty SDK is a Typescript library that allows you to interact with the Duty API. It is designed to be easy to use.
As Duty is thought for React environments, the SDK is designed to be used with React. But can be used with any other framework.

The SDK uses the native fetch API. So you can modify the request body by passing an object as the second argument.

## Installation

```bash
npm install duty-sdk
```

## Usage

```typescript
// configs.ts
import { Client } from 'duty-sdk'

export const api = new Client('api-key', 'project-slug')
```

## GET Request

```tsx
import { api } from './configs.ts'

const fetchdata = async () => {
  const { data, error } = await api.get('/endpoint')
  if (error) {
    // handle error
  }
  return data
}
```

## POST/PUT/DELETE Request

The only thing that changes is the method name.

```tsx
import { api } from './configs.ts'

const postdata = async () => {
  const { data, error } = await api.post('/endpoint', {
    body: { my: 'data' },
  })
  if (error) {
    // handle error
  }
  return data
}
```

## useGet Request

This is a React Hook that fetches data using React Hooks.

```tsx
// components.ts
import { api } from './configs.ts'

export const MyComponent = () => {
  const { data, error, isLoading } = api.useGet<{ my: 'data' }>('/endpoint')

  if (isLoading) return <div>Loading...</div>

  return <div>{data}</div>
}
```
