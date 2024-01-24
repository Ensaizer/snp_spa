import React from 'react';
import CollapsibleTableForUsers from '../ui/CollapsibleTableForUsers';
import CollapsibleTableForNewUsers from '../ui/CollapsibleTableForNewUsers';

export default function AdminPage(): JSX.Element {
  return (
    <>
      <CollapsibleTableForNewUsers />
      <br />
      <br />
      <CollapsibleTableForUsers />
    </>
  );
}
