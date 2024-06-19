import React, { useState } from "react";
import { deleteQuote, updateQuote } from "../services/quoteService";
import {
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Box,
  ListItemSecondaryAction,
} from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";

interface QuoteItemProps {
  quote: { id: number; text: string; author: string };
  onDeleteQuote: () => void;
  onUpdateQuote: () => void;
}

const QuoteItem: React.FC<QuoteItemProps> = ({
  quote,
  onDeleteQuote,
  onUpdateQuote,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(quote.text);
  const [author, setAuthor] = useState(quote.author);

  const handleDelete = async () => {
    await deleteQuote(quote.id);
    onDeleteQuote();
  };

  const handleUpdate = async () => {
    await updateQuote(quote.id, { text, author });
    setIsEditing(false);
    onUpdateQuote();
  };

  return (
    <ListItem divider>
      {isEditing ? (
        <Box display="flex" flexDirection="column" flexGrow={1}>
          <TextField
            label="Quote Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author Name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleUpdate}
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <ListItemText
          primary={"“" + quote.text + "”"}
          secondary={`- ${quote.author}`}
          primaryTypographyProps={{ variant: "body1" }}
          secondaryTypographyProps={{
            variant: "body2",
            color: "textSecondary",
          }}
        />
      )}
      {!isEditing && (
        <ListItemSecondaryAction>
          <IconButton edge="end" onClick={() => setIsEditing(true)}>
            <Edit />
          </IconButton>
          <IconButton edge="end" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default QuoteItem;
