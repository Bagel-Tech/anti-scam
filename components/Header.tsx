import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center' }}>
              🛡️ ScamGuard
            </Typography>
          </Link>
          <div>
            <Button color="inherit" component={Link} href="/about">
              About
            </Button>
            <Button color="inherit" component={Link} href="/statistics">
              Statistics
            </Button>
            <Button color="inherit" component={Link} href="/resources">
              Resources
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
} 