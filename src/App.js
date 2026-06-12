import React, { useEffect, useContext } from 'react';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthContext, FirebaseContext } from './store/Context';

function App() {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [auth, setUser]);
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route path='/create' component={Create} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;




// import React, { useEffect, useContext } from 'react';
// import './App.css';
// import Home from './Pages/Home';
// import Signup from './Pages/Signup';
// import Login from './Pages/Login';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { AuthContext, FirebaseContext } from './store/Context';

// function App() {
//   const { usetUser } = useContext(AuthContext);
//   const { firebase } = useContext(FirebaseContext)
//   useEffect(() => {
//     // console.log(user);
//     firebase.auth().onAuthStateChanged((user) => {
//       setUser(user)
//     })

//   })
//   return (
//     <div>
//       <Router>
//         <Route exact path='/'>
//           <Home />
//         </Route>
//         <Route path="/signup">
//           <Signup />
//         </Route>
//         <Route path="/login">
//           <Login />
//         </Route>
//       </Router>
//     </div>
//   );
// }

// export default App;
