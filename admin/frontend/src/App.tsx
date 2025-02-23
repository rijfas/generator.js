import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import AppRoutes from "./routes";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
