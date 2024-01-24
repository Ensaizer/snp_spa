import React from 'react';
import CollapsibleTable from '../ui/CollapsibleTable';
import CollapsibleTableForNewUsers from '../ui/CollapsibleTableForNewUsers';

export default function AdminPage(): JSX.Element {
  return (
    <>
      {/* <CollapsibleTable /> */}
      <CollapsibleTableForNewUsers />
    </>
  );
}
