import React, { useEffect, useState } from "react";
import { Box, Typography, List, Divider } from "@mui/material";
import { getQuotes } from "../services/quoteService";
import QuoteItem from "./QuoteItem";

interface QuoteListProps {
  reload: symbol | undefined;
}

const QuoteList: React.FC<QuoteListProps> = (reload) => {
  const [quotes, setQuotes] = useState<
    { id: number; text: string; author: string }[]
  >([]);

  const fetchQuotes = async () => {
    const quotesData = await getQuotes();
    setQuotes(quotesData);
  };

  useEffect(() => {
    fetchQuotes();
  }, [reload]);

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Quotes
      </Typography>
      <List>
        {quotes.map((quote, index) => (
          <React.Fragment key={quote.id}>
            <QuoteItem
              quote={quote}
              onDeleteQuote={fetchQuotes}
              onUpdateQuote={fetchQuotes}
            />
            {index !== quotes.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default QuoteList;
