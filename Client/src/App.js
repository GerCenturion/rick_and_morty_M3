import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Cards from './components/Cards/Cards.jsx';
import NavBar from './components/NavBar/NavBar.jsx';
import About from './components/About/About.jsx';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form.jsx';
import Favorites from './components/Favorites/Favorites';

// import { ROUTES } from './helpers/RoutesPath';

function App() {
  const [characters, setCharacters] = useState([]);
  const { pathname } = useLocation()
  const navigate = useNavigate();
  const [access, setAccess] = useState(false);
  // const EMAIL = 'gerson@email.com';
  // const PASSWORD = '1Password';
  // const HOME_ROUTE = ROUTES.HOME;

  useEffect(() => {
    if (!access) {
      navigate('/');
    }

  }, [access, navigate]);
  

  // const onSearch = (id) => {
  //   axios(`http://localhost:3001/rickandmorty/character/${id}`).then(({ data }) => {
  //      if (data.name) {
  //         setCharacters((oldChars) => [...oldChars, data]);
  //      } else {
  //         window.alert('¡No hay personajes con este ID!');
  //      }
  //   });
  // };

  const onSearch = async (id) => {
    try {
       const { data } = await axios.get(`http://localhost:3001/rickandmorty/character/${id}`)
       if (data.name) {
          setCharacters([...characters, data]);
       }

    } catch (error) {
       window.alert('¡No hay personajes con este ID!');
    }
 }

  const onClose = (id) => {
    setCharacters(characters.filter((char) => char.id !== Number(id)));
  };

//   function login(userData) {
//     const { email, password } = userData;
//     const URL = 'http://localhost:3001/rickandmorty/login/';
//     axios(URL + `?email=${email}&password=${password}`).then(({ data }) => {
//        const { access } = data;
//        setAccess(data);
//        access && navigate('/home');
//     });
//  }
async function login(userData) {
  try {
     const { email, password } = userData;
     const URL = 'http://localhost:3001/rickandmorty/login/';
     const { data } = await axios(URL + `?email=${email}&password=${password}`)
     const { access } = data;
     setAccess(data);
     access && navigate('/home');
  } catch (error) {
     console.log(error)
  }
}

return (
  <div className='App'>
     {
        pathname !== '/' && <NavBar onSearch={onSearch} />
     }

     <Routes>
        <Route path={'/'} element={<Form login={login} />} />
        <Route path={'/home'} element={<Cards characters={characters} onClose={onClose} />} />
        <Route path={'/about'} element={<About />} />
        <Route path={'/detail/:id'} element={<Detail />} />
        <Route path={'/favorites'} element={<Favorites />} />
     </Routes>
  </div>
);
}
export default App;