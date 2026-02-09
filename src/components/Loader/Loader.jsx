import React from 'react';
import { Loader2 } from 'lucide-react';
import { LoaderContainer, SpinnerIcon } from './Loader.styles';

const Loader = () => {
  return (
    <LoaderContainer>
      <SpinnerIcon>
        <Loader2 />
      </SpinnerIcon>
    </LoaderContainer>
  );
};

export default Loader;
