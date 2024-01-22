import React from 'react';
import CollapsibleTable from '../ui/UserTable';

export default function AdminPage(): JSX.Element {
  return (
    <>
      <CollapsibleTable />
      <div />
      <CollapsibleTable />
    </>
  );
}
