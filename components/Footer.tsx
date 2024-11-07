import { Box, Container, Typography, Link, Grid } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 6, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              ScamGuard
            </Typography>
            <Typography variant="body2">
              Protecting users from online scams through community-driven reporting and awareness.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/about" color="inherit" display="block">About</Link>
            <Link href="/report" color="inherit" display="block">Report a Scam</Link>
            <Link href="/resources" color="inherit" display="block">Resources</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: support@scamguard.com<br />
              Emergency: +1 (800) SCAM-HELP
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 