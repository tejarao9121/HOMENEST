import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Help from './components/Help';
import Login from './components/Login'
import Root from './components/Root';
import Error from './components/Error';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Addplot from './components/Addplot';
import Addrent from './components/Addrent';
import UserProfile from './components/UserProfile';
import AddedItems from './components/AddedItems';
import MapPrc from './components/MapPrc';



function App() {
  const x=createBrowserRouter([{
    path:'/',
    element:<Root/>,
    errorElement:<Error/>,
    children:[

      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/Login',
        element:<Login/>,  
        
      },
      {
        path:'/Register',
        element:<Register/>,
        
      },
      {
        path:'/Help',
        element:<Help/>,
        
      },
      {
        path:'/UserProfile',
        element:<UserProfile/>,
        children:[
          {
            path:'Addplot',
            element:<Addplot/>
          },
          {
            path:'Addrent',
            element:<Addrent/>
          },
          {
            path:'AddedItems',
            element:<AddedItems/>
          },
          {
            path:'MapPrc',
            element:<MapPrc/>
          },
        ]
      }
      
    ]

}
])
  return (
    <div className="App">
      <RouterProvider router={x}/>
    </div>
  );
}

export default App;