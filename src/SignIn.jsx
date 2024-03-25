import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const supabase = createClient('https://rrvjkmdsixuiuqktlxcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydmprbWRzaXh1aXVxa3RseGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDMxNjcsImV4cCI6MjAwNzExOTE2N30.Vo6_mO9gTwO_XqP9EDFh7LD5qHDGgIa50T8qsjI3wBk')

export default function SignIn({lastPartOfUrl}) {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      // const { error2 } = await supabase.auth.signOut();
      const { data, error } = await supabase.auth.getSession();
      // console.log(data.session);
      if (data.session) {
        // console.log('User is already signed in!', data);
        console.log(`/playground/${lastPartOfUrl}`)
        navigate(`/playground/${lastPartOfUrl}`)
      } else if (error) {
        // console.log('Error getting session:', error.message);
      }
    };

    checkSession();
  }, []);

  async function handleGoogleLogin(event) {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        redirectTo: `https://flushai.cloud/playground/${lastPartOfUrl}` //`http://localhost:5173/playground/${lastPartOfUrl}` //'https://flushai.cloud/playground' //`http://localhost:5173/playground/${lastPartOfUrl}` //'https://flushai.cloud/playground'
      },
    })
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#1C1C1C]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto" // Adjust the size as necessary
          src="/finalflushlogo.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-300"> 
          Sign in to your account
        </h2>
      </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-[#1C1C1C] px-6 py-4 shadow sm:rounded-lg sm:px-12">

            <div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-[#1C1C1C] px-6 text-gray-500">Continue with</span>
                </div>
              </div>

              {/* <div className="mt-6 grid grid-cols-2 gap-4"> */}
              <div className="mt-6 flex justify-center"> {/* Here, I changed from grid to flex and removed grid-cols-2 */}
                <a
                  href="/signin"
                  className="flex w-full items-center justify-center gap-3 rounded-md bg-[#34A853] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                  onClick={handleGoogleLogin}
                >
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 -2 20 20">
                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                  </svg>
                  <span className="text-sm font-semibold leading-6">Google</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}