import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from './redux/userSlice'
import InterviewPage from './pages/InterviewPage'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'
import { motion } from 'motion/react'
import { HiSparkles } from 'react-icons/hi'
export const serverUrl = "http://localhost:8000"

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const { userData } = useSelector(state => state.user);

  const ProtectedRoute = (comp) => {
    if (loading) {
      return (
        <div className="bg-[#f3f3f3] flex items-center justify-center h-screen flex-col gap-2 relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-10 h-10 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin"></motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            className='absolute bottom-30 flex flex-col items-center'>
            <div className='text-green-600 font-bold text-3xl' >IntervAI</div>
            <div className='bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full flex items-center gap-2'>
              <HiSparkles size={16} className='bg-green-50 text-green-600' />
              AI Powered Smart Interview Platform
            </div>
          </motion.div>

          {/* <div className='text-gray-600'>Loading Your Data Please Wait</div> */}
        </div>
      );
    }
    if (userData == null) {
      return <Navigate to="/" replace />
    } else {
      return comp;
    }
  }

  useEffect(() => {

    const getUser = async () => {
      setLoading(true);
      try {
        const result = await axios.get(serverUrl + "/api/user/current-user", { withCredentials: true });
        dispatch(setUserData(result.data));
      } catch (error) {
        console.log(error);
        dispatch(setUserData(null));

      } finally {
        setLoading(false);
      }
    }
    getUser();

  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={ProtectedRoute(<InterviewPage />)} />
      <Route path='/history' element={ProtectedRoute(<InterviewHistory />)} />
      <Route path='/pricing' element={ProtectedRoute(<Pricing />)} />
      <Route path='/report/:id' element={ProtectedRoute(<InterviewReport />)} />




    </Routes>
  )
}

export default App
