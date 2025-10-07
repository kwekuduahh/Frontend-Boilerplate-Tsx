import { RouterProvider } from 'react-router'
import router from '@/App/Routing/Router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { SidebarProvider } from '@/_Shared/Provider/SidebarContext';

function App() {

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <Toaster />
        <RouterProvider router={router} />
      </SidebarProvider>
    </QueryClientProvider>
  )
}

export default App
