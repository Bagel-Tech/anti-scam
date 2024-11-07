import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Button,
  Collapse
} from '@mui/material';
import Discussion from './Discussion';

interface SearchResult {
  id: string
  url: string
  title: string
  description: string
  isScam: boolean
  reportCount: number
}

interface SearchResultsProps {
  results: SearchResult[]
}

export default function SearchResults({ results }: SearchResultsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (results.length === 0) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {results.map((result) => (
        <Card key={result.id}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {result.title || result.url}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {result.url}
            </Typography>
            {result.description && (
              <Typography variant="body2" color="text.secondary" paragraph>
                {result.description}
              </Typography>
            )}
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                label={result.isScam ? 'Potential Scam' : 'Likely Safe'}
                color={result.isScam ? 'error' : 'success'}
              />
              <Chip
                label={`${result.reportCount} reports`}
                variant="outlined"
              />
            </Box>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setExpandedId(expandedId === result.id ? null : result.id)}
            >
              {expandedId === result.id ? 'Hide Discussion' : 'Show Discussion'}
            </Button>
            <Collapse in={expandedId === result.id}>
              <Discussion scamReportId={result.id} />
            </Collapse>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
} 