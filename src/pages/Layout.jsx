import React from 'react';
import { Header, Footer } from '../components';
import PropTypes from 'prop-types';

const Layout = ({ children, showHeader = true, showFooter = true }) => {
  Layout.propTypes = {
      children: PropTypes.node
  };
  return (
      <div className='bg-background min-h-screen h-full w-full flex flex-col relative overflow-hidden'>
        {showHeader && <Header />}
        <div className='pointer-events-none opacity-50 bg-blend-normal
        bg-noisy-texture fixed top-0 left-0 z-[1] h-screen w-screen'/>
        <div className='flex flex-col flex-1 px-5 lg:px-36 py-10 z-[2] pt-20'>
          {children}
        </div>
        {showFooter && <Footer />}
      </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;