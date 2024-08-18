import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/routes.tsx'
import { Toaster } from './components/ui/sonner.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster expand={false} richColors />
    </Provider>
  </React.StrictMode>,
)
