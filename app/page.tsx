'use client'

import { useState } from 'react';
import SearchResults from '@/components/SearchResults';
import ReportForm from '@/components/ReportForm';
import { 
  Button, 
  Container, 
  Typography, 
  Paper, 
  TextField, 
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { Search as SearchIcon, Warning as WarningIcon } from '@mui/icons-material';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      setError('Failed to perform search. Please try again.');
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" sx={{ py: 8, flex: 1 }}>
      <Paper elevation={0} sx={{ p: 4, textAlign: 'center', bgcolor: 'transparent' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Protect Yourself from Online Scams
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Search our database or report new scams to help protect the community
        </Typography>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<WarningIcon />}
          onClick={() => setReportFormOpen(true)}
          size="large"
        >
          Report a Scam
        </Button>
      </Box>

      <Paper component="form" onSubmit={handleSearch} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter website URL or keywords"
            variant="outlined"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} /> : <SearchIcon />}
            size="large"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Paper>

      <SearchResults results={results} />
      
      <ReportForm
        open={reportFormOpen}
        onClose={() => setReportFormOpen(false)}
      />
    </Container>
  );
}