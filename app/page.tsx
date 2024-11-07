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

// Add interface for search results
interface SearchResult {
  id: string;
  isScam: boolean;
  url: string;
  title: string;
  description: string;
  reportCount: number;
  createdAt: string;
  status: 'VERIFIED' | 'PENDING' | 'REJECTED';
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [error, setError] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateSearch = (query: string): boolean => {
    setValidationError('');
    
    // if (query.trim().length < 3) {
    //   setValidationError('Search query must be at least 3 characters long');
    //   return false;
    // }

    // // Basic URL validation if it looks like a URL
    // if (query.includes('.') && query.includes('://')) {
    //   try {
    //     new URL(query);
    //   } catch {
    //     setValidationError('Please enter a valid URL');
    //     return false;
    //   }
    // }

    return true;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setValidationError('');

    if (!validateSearch(searchQuery)) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const searchResults = data as SearchResult[];
      const results = searchResults.map(result => ({
        ...result,
        isScam: false  // or whatever default/calculated value is appropriate
      }));
      setResults(results);
      
      if (results.length === 0) {
        setError('No results found. Consider reporting this if you suspect it\'s a scam.');
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(`Search failed: ${error.message}`);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
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
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setValidationError('');
              setError('');
            }}
            placeholder="Enter website URL or keywords"
            variant="outlined"
            disabled={isLoading}
            error={!!validationError}
            helperText={validationError}
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
          <Alert 
            severity={error.includes('No results found') ? 'info' : 'error'} 
            sx={{ mt: 2 }}
          >
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