import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import React, { useState } from 'react';

export default function Example2() {
  const [opened, setOpened] = useState(false);

  return (
    <div>
      <h2>Hello Drawer Component!</h2>
      <Button variant="contained" onClick={() => setOpened(true)}>
        Open Drawer
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={opened}
        onClose={() => setOpened(false)}
        onOpen={() => setOpened(true)}
      >
        Hello Drawer content
      </SwipeableDrawer>
    </div>
  );
}
