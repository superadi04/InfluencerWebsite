
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const supabase = createClient('https://rrvjkmdsixuiuqktlxcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydmprbWRzaXh1aXVxa3RseGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDMxNjcsImV4cCI6MjAwNzExOTE2N30.Vo6_mO9gTwO_XqP9EDFh7LD5qHDGgIa50T8qsjI3wBk')

export default function SignUp() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log(data.session);
      if (data.session) {
        navigate('/playground');
        console.log('User is already signed in!', data);
      } else if (error) {
        console.log('Error getting session:', error.message);
      }
    };

    checkSession();
  }, []);

  const signup = async (event) => {
    event.preventDefault();
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });
    if(data != null){
        navigate('/playground');
        console.log('User is being signed up')
    }

    // const { data, error } = await supabase.auth.signInWithOAuth({
    //   provider: 'google',
    //   redirectTo: `http://localhost:5173/game`
    // })

    // if (error == null) {
    //   navigate('/playground');
    // }
  }
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/finalflushlogo.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="flex block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={signup}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}