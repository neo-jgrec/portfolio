import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Layout } from '../pages';

function ContactForm() {
  const [state, handleSubmit] = useForm("xaygzdao");

  if (state.succeeded) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <div className="text-center flex flex-col items-center rounded-lg pt-64">
            <div>
              <h1 className="text-9xl font-bold text-white">Success</h1>
              <h1 className="font-bold text-white">Your message has been sent</h1>
            </div>
            <div className="mt-8">
              <a href="/" className="px-4 py-2 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out border border-gray-400 hover:border-primary bg-transparent hover:bg-primary hover:bg-opacity-10 rounded-lg">
                Go back home
              </a>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-8 flex flex-col gap-y-4">
        <div className="gap-x-4 items-center justify-between flex md:flex-row flex-col gap-y-4 md:gap-y-0">
          <div className="flex flex-col md:w-1/2">
            <label htmlFor="firstname" className="block text-white text-sm font-bold mb-2">
              Firstname
            </label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent border-white"
            />
            <ValidationError
              prefix="Firstname"
              field="firstname"
              errors={state.errors}
              className="text-red-500 text-xs italic"
            />
          </div>

          <div className="flex flex-col md:w-1/2">
            <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent border-white"
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-red-500 text-xs italic"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="block text-white text-sm font-bold mt-4 mb-2">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-transparent border-white"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-500 text-xs italic"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="message" className="block text-white text-sm font-bold mt-4 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline h-32 bg-transparent border-white"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-500 text-xs italic"
          />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="mt-4 px-4 py-2 font-medium text-gray-400 hover:text-primary transition-colors duration-100 ease-in-out border border-gray-400 hover:border-primary bg-transparent hover:bg-primary hover:bg-opacity-10 rounded-lg"
        >
          Submit
        </button>
      </form>
    </Layout>
  );
}

export default ContactForm;
