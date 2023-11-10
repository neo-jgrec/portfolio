import React from 'react';
import { Header, Footer } from '../components';
import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  Layout.propTypes = {
      children: PropTypes.node
  };
  return (
      <div className='bg-background min-h-screen h-full w-full flex flex-col relative'>
          <Header />
          <div className='pointer-events-none opacity-70 bg-blend-normal
          bg-noisy-texture fixed top-0 left-0 z-[1] h-screen w-screen'/>
          <br /> <br />
          <div className='flex flex-col flex-1 px-5 lg:px-36 py-10 z-[2]'>
              {children}
          </div>
          <Footer />
      </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;