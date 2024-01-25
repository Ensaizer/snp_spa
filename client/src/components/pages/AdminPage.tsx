import React from 'react';
import { Container } from '@mui/material';
import CollapsibleTableForUsers from '../ui/CollapsibleTableForUsers';
import CollapsibleTableForNewUsers from '../ui/CollapsibleTableForNewUsers';
import CollapsibleTableForOrdesAdmin from '../ui/CollapsibleTableForOrdersAdmin';

export default function AdminPage(): JSX.Element {
  return (
    <Container>
      <Container>
        <CollapsibleTableForNewUsers />
      </Container>
      <br />
      <br />
      <Container>
        <CollapsibleTableForUsers />
      </Container>
      <br />
      <br />
      <Container>
        <CollapsibleTableForOrdesAdmin />
      </Container>
    </Container>
  );
}
