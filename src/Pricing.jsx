import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { createClient } from '@supabase/supabase-js'
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  // { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]
const supabase = createClient('https://rrvjkmdsixuiuqktlxcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydmprbWRzaXh1aXVxa3RseGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDMxNjcsImV4cCI6MjAwNzExOTE2N30.Vo6_mO9gTwO_XqP9EDFh7LD5qHDGgIa50T8qsjI3wBk')

const tiers = [
  {
    name: 'Free',
    id: 'free',
    href: '#',
    price: { monthly: '$0' },
    description: 'For people who want to try out Flush. Includes up to:',
    features: ['25 image generations', '12 Upscales', 'API & SDK access', 'Standard Speed'],
    mostPopular: false,
  },
  {
    name: 'Starter',
    id: 'starter',
    href: '#',
    price: { monthly: '$6.99' },
    description: 'For people who want a larger amount of images to generate. Buys 1000 credits, which includes up to:',
    features: ['1000 image generations', '500 upscales', 'LLM Prompt Enhancement', 'API & SDK access', 'Standard Speed', 'Inpainting (Coming soon)', 'Outpainting (Coming soon)', 'Face restoration (Coming soon)'],
    mostPopular: false,
  },
  {
    name: 'Basic',
    id: 'basic',
    href: '#',
    price: { monthly: '$12.99' },
    description: 'For creators and developers who need higher volumes. Buys 3000 credits, which includes up to:',
    features: ["2000 image generations", '1000 upscales', 'LLM Prompt Enhancement', "API & SDK access", "Faster Speed", 'Inpainting (Coming soon)', 'Outpainting (Coming soon)', 'Face restoration (Coming soon)'],
    mostPopular: false,
  },
  {
    name: 'Premium',
    id: 'premium',
    href: '#',
    price: { monthly: '$33.99' },
    description: 'For creators and developers who need higher volumes. Buys 10000 credits, which includes up to:',
    features: ["10000 image generations", '5000 upscales', 'LLM Prompt Enhancement', "API & SDK access", "Faster Speed", 'Inpainting (Coming soon)', 'Outpainting (Coming soon)', 'Face restoration (Coming soon)'],
    mostPopular: true,
  },
  // {
  //   name: 'Max',
  //   id: 'max',
  //   href: '#',
  //   price: { monthly: '$60' },
  //   description: 'For creators, developers, and professionals who need high volume usage. Includes:',
  //   features: ["Unlimited image generations", 'LLM Prompt Enhancement', "API & SDK access", "Faster Speed"],
  //   mostPopular: false, 
  // }
  // {
  //   name: 'Professional',
  //   id: 'professional',
  //   href: '#',
  //   price: { monthly: '$XXX' },
  //   description: 'Coming Soon!',
  //   features: [
  //   ],
  //   mostPopular: false,
  // },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function StyledFeature({ feature }) {
  // Split the feature text at '1000' and '3000'
  const parts = feature.split(/(1000|3000)/);

  return (
    <span>
      {parts.map((part, index) => {
        // Apply bold and purple styling to '1000' and '3000'
        if (part === '1000' || part === '3000') {
          return (
            <span key={index} className="font-bold text-indigo-600">
              {part}
            </span>
          );
        }
        // Render the rest of the text normally
        return <span key={index}>{part}</span>;
      })}
    </span>
  );
}


function PricingPage({ apiKey, curPlan }) {
  const [frequency, setFrequency] = useState(frequencies[0])
  const [loadingTier, setLoadingTier] = useState(null); // New state for tracking loading
  const [rewardfulId, setRewardfulId] = useState("");
  useEffect(() => {
    // Check if Rewardful is loaded
    if (window.rewardful) {
      window.rewardful('ready', function () {
        if (window.Rewardful.referral) {
          console.log('Current referral ID: ', window.Rewardful.referral);
          setRewardfulId(window.Rewardful.referral);
        } else {
          console.log('No referral present.');
        }
      });
    } else {
      console.log("Rewardful script not loaded");
    }
  }, []); // Empty dependency array means this effect runs once on mount


  const handleSubscribeClick = async (tierId) => {
    setLoadingTier(tierId);

    try {

      if (curPlan !== "free") {
        setLoadingTier(null);
      }
      else {
        const response = await axios.post(
          "https://ypaqg548s7.execute-api.us-east-2.amazonaws.com/testing/stripe",
          {
            priceId: tierId,
            "type": "purchase",
            "user_id": apiKey,
            "referral": rewardfulId
          },
        );
        // console.log("response", response);

        // If the response has a URL, redirect to it
        if (response.data.url) {
          window.location.href = response.data.url;
        } else {
          // Handle the case where the URL is not present
          console.error('No URL returned from the server');
        }
        setLoadingTier(null);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      // Handle error, possibly show a message to the user
    }
  };

  return (
    <div className="bg-[#1C1C1C]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
        <div className="mt-5 "> {/* Scrolling enabled here */}
          
          {curPlan !== 'Free' && <div className="text-center text-gray-500 text-sm mb-6">
            If you want a refund or want to cancel your subscription, please contact us at <a href="mailto:team@flushai.cloud" className="text-indigo-600 hover:underline">team@flushai.cloud</a>
          </div>}
          <div className="mx-auto max-w-md grid grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular ? 'ring-2 ring-indigo-600' : 'ring-1 ring-[#3b3b3b]',
                  'rounded-3xl p-8'
                )}
              >
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-indigo-600' : 'text-gray-300',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h3>
                <p className="mt-4 text-sm leading-6 text-gray-500 text-left">{<StyledFeature feature={tier.description} />}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-300">{tier.price[frequency.value]}</span>
                  <span className="text-sm font-semibold leading-6 text-gray-500">{frequency.priceSuffix}</span>
                </p>

                {tier.id === curPlan ? (
                  <div className="flex justify-center mt-8">
                    <span
                      aria-describedby={tier.id}
                      className='text-indigo-600 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6'
                    >
                      Current Plan
                    </span>
                  </div>
                ) : tier.name !== 'Free' && tier.name !== 'Professional' ? (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => handleSubscribeClick(tier.id)}
                      aria-describedby={tier.id}
                      className={classNames(
                          'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500',
                        'block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      )}
                    >
                      {loadingTier === tier.id ? (
                        <CircularProgress size={20} /> // Replace with your actual loading icon component
                      ) : (
                        `Subscribe to ${tier.name}`
                      )}
                    </button>
                  </div>
                ) : null}


                <ul role="list" className="mt-8 text-left space-y-3 text-sm leading-6 text-gray-500">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>
        </div>

        <div className='ring-1 ring-[#3b3b3b] rounded-3xl p-8 mt-10'>
          <div className="text-center text-gray-300 text-3xl  font-bold">
            Credit Pack
          </div>
          <div className="text-center text-gray-400 text-md mt-5">
            Not sure if you want to commit? Keep exploring with a credit pack!
          </div>
          <div className="text-center text-gray-400 text-md mt-5">
            Each credit is <span className="text-indigo-600">$0.01</span>.
          </div>
          <div className="flex justify-center items-center mt-5">
            <button
              onClick={() => handleSubscribeClick("pack")}
              className={classNames(
                'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500',
                'block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              )}
            >
              {loadingTier === "pack" ? (
                <CircularProgress size={20} /> // Replace with your actual loading icon component
              ) : (
                `Buy credits`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Pricing() {
  const [apiKey, setAPIKey] = useState("");
  const [curPlan, setCurPlan] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async () => {
      const { data: userData } = await supabase.auth.getUser();
      // const { data: userData, error } = await supabase.auth.getSession();
      if (!userData.user) {
        navigate('/signin')
      }
      const { data: totalData, error: keysError } = await supabase
        .from('user_details')
        .select('*')
        .eq('id', userData?.user?.id);
      setAPIKey(userData?.user?.id);
      // setAPIKey(totalData[0]['keys'][0]);
      setCurPlan(totalData[0]['plan']);
      // console.log("cur plan", totalData[0]['plan']);
    }
    checkSession();
  });
  return (
    <>
      <div className="h-[95vh] overflow-y-auto pb-20">
        <PricingPage apiKey={apiKey} curPlan={curPlan} />
      </div>
    </>
  )
}