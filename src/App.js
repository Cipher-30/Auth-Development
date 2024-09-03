// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from "./components/Body";
import MainPage from "./components/MainPage";
import SignInPage from "./components/SignInPage";
import Browse from './components/Browse';
import ForgetPassword from './components/ForgetPassword';
// import { AuthProvider } from './utility/AuthContext';




function App() {

  const appRouter = createBrowserRouter([
    {

      path: "/",
      element: <Body/>,
      children: [{
        path: '/',
        element: <MainPage/>
      },
      {
        path: "/signIn",
        element: <SignInPage/>
      },
      {
        path: "/browse",
        element: <Browse/>
      },
      {
        path: "/forget-password",
        element: <ForgetPassword/>
      }
    ]

    }
  ])

  return (
    <div>
      <RouterProvider router={appRouter}> 
        {/* <AuthProvider> */}

        {/* </AuthProvider> */}
      </RouterProvider>

    </div>
  );
}

export default App;
