import React from "react";
import Layout from "./Layout";

function NotFound() {
  return (
    <Layout showFooter={false} showHeader={false}>
      <div className="flex items-center justify-center">
        <div className="text-center flex flex-col items-center rounded-lg pt-64">
          <div>
            <h1 className="text-9xl font-bold text-white">404</h1>
            <h1 className="font-bold text-white">not found</h1>
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

export default NotFound;
