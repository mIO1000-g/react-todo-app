import { ChakraProvider } from '@chakra-ui/react'
import { RouterProvider } from 'react-router-dom'

import { router } from "./router/router"

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router}>
      </RouterProvider>
    </ChakraProvider>

  );
}

export default App;
