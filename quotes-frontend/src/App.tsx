import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
} from "@mui/material";
import QuoteForm from "./components/QuoteForm";
import QuoteList from "./components/QuoteList";

const App: React.FC = () => {
  const [reload, setReload] = useState<symbol>();
  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Quotes Editor</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: "24px" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Quotes
        </Typography>
        <QuoteForm onAddQuote={() => setReload(Symbol(" "))} />
        <QuoteList reload={reload} />
      </Container>
    </div>
  );
};

export default App;
