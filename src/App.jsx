import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import HomePage from './HomePage';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import {
  XMarkIcon,
  UserGroupIcon,
  ChatBubbleBottomCenterTextIcon,
  TicketIcon,
  PlusIcon,
  BanknotesIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'

function App() {

  return (
    <Router>
      <Routes>
        <Route path = "/" element={<HomePage/>} />
        <Route path = "/signin" element={<SignIn/>} />
        <Route path = "/your-influencers" element={<Dashboard pageName={"Your Influencers"} />} />
        <Route path = "/pricing" element={<Dashboard pageName={"Pricing"} />} />
        <Route path = "/influencer" element={<Dashboard pageName={"Influencer"} />} />
        <Route path = "/create" element={<Dashboard pageName={"Create"} />} />
      </Routes>
    </Router>
  )
}

export default App
