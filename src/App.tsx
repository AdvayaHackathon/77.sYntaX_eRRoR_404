
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import EventDetails from "./pages/EventDetails";
import SearchResults from "./pages/SearchResults";
import Categories from "./pages/Categories";
import CategoryEvents from "./pages/CategoryEvents";
import AllEvents from "./pages/AllEvents";
import About from "./pages/About";
import Places from "./pages/Places";
import Blog from "./pages/Blogs"; // adjust the path as needed
import CalendarPage from "./pages/CalendarPage";
import TicketPage from '@/pages/TicketPage';
import Chatbot from "./pages/Chatbot";
import PlaceDetails from "./pages/PlaceDetails";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <div id="google_translate_element" style={{ display: 'none' }}></div>

    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<CategoryEvents />} />
          <Route path="/events" element={<AllEvents />} />
          <Route path="/about" element={<About />} />
          <Route path="/places" element={<Places />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/place/:name" element={<PlaceDetails />} />

          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/tickets/:id" element={<TicketPage />} />
          <Route path="/chatbot" element={<Chatbot />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
