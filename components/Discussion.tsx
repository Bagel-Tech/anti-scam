import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

interface DiscussionProps {
  scamReportId: string;
}

interface DiscussionMessage {
  id: string;
  message: string;
  createdAt: string;
}

export default function Discussion({ scamReportId }: DiscussionProps) {
  const [messages, setMessages] = useState<DiscussionMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, [scamReportId]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`/api/discussions/${scamReportId}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/discussions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scamReportId,
          message: newMessage
        }),
      });

      if (response.ok) {
        setNewMessage('');
        fetchMessages();
      }
    } catch (error) {
      console.error('Failed to post message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Discussion
      </Typography>
      <Paper variant="outlined" sx={{ mb: 2, maxHeight: 300, overflow: 'auto' }}>
        <List>
          {messages.map((msg, index) => (
            <React.Fragment key={msg.id}>
              {index > 0 && <Divider />}
              <ListItem>
                <ListItemText
                  primary={msg.message}
                  secondary={formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true })}
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Add to the discussion..."
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !newMessage.trim()}
          >
            {loading ? <CircularProgress size={24} /> : 'Post'}
          </Button>
        </Box>
      </form>
    </Box>
  );
} 