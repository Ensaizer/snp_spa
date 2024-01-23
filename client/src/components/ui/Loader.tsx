import { CircularProgress } from '@mui/material';
import React from 'react';

type LoaderProps = {
  children: JSX.Element;
  isLoading: boolean;
};

export default function Loader({ children, isLoading }: LoaderProps): JSX.Element {
  if (isLoading) return <CircularProgress />;

  return children;
}
