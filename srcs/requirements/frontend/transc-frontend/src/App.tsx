import './App.css'
import { Nav } from './components/nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landingpage } from './pages/landingPage';
import { Auth } from './pages/auth';
import { Chat } from './pages/chat';
import { Profile } from './pages/profile';
import { Channels } from './pages/channels';
import { Game } from './pages/game';
import { Leaderboard } from './pages/leaderboard';
import { Achievements } from './pages/achievement';
import { Provider } from 'react-redux';
import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';

function App() {

  return (
    <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <div className=''>
            <Nav />
            <Routes>
              <Route path='/' element={<Landingpage/>}/>
              <Route path='/auth' element={<Auth/>} />
              <Route path='/chat' element={<Chat/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/channels' element={<Channels/>}/>
              <Route path='/game' element={<Game/>}/>
              <Route path='/leaderboard' element={<Leaderboard/>}/>
              <Route path='/achievement' element={<Achievements/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </PersistGate>
      </Provider>
    </>
  )
}

export default App
