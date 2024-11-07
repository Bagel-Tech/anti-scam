'use client'

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';

interface ReportFormProps {
  open: boolean;
  onClose: () => void;
}

export default function ReportForm({ open, onClose }: ReportFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    description: '',
    evidence: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit report');
      
      onClose();
    } catch (err) {
      setError('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Submit Scam Report</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              required
              label="Website URL"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <TextField
              required
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              required
              label="Evidence"
              multiline
              rows={3}
              value={formData.evidence}
              onChange={(e) => setFormData({ ...formData, evidence: e.target.value })}
              helperText="Provide details about why you believe this is a scam"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Submit Report
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 