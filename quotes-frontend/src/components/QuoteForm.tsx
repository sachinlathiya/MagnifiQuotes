import React, { useState } from "react";
import { createQuote } from "../services/quoteService";
import { TextField, Button, Box, Paper } from "@mui/material";

interface QuoteFormProps {
  onAddQuote: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onAddQuote }) => {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createQuote({ text, author });
    onAddQuote();
    setText("");
    setAuthor("");
  };

  return (
    <Paper elevation={3} style={{ padding: 16 }}>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Quote Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Add Quote
        </Button>
      </form>
    </Paper>
  );
};

export default QuoteForm;
