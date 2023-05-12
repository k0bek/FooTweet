import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <div className="bg-gray-800 w-full md:w-3/5 ml-24 md:ml-0 xl:ml-[-13rem]">
      {children}
    </div>
  );
};

export default Wrapper;
