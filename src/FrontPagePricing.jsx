import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { createClient } from '@supabase/supabase-js'
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Dialog } from '@headlessui/react'
import {
  Bars3Icon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
  XMarkIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  ServerIcon,
  ArrowUpTrayIcon,
  ArrowPathIcon,
  DocumentTextIcon,
  LanguageIcon,
  PhotoIcon
} from '@heroicons/react/24/outline'
import { CodeBlock, dracula } from "react-code-blocks";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const navigation = [
    { name: 'Docs', href: 'https://docs.flushai.cloud/introduction' },
    // { name: 'Blog', href: '#' },
    { name: 'Discord', href: 'https://discord.com/invite/fzdHj9DeuC' },
    { name: 'Twitter', href: 'https://twitter.com/flush_ai' },
    { name: 'Pricing', href: 'https://flushai.cloud/pricing-page' },
  
  ]

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
        features: ['50 image generations', '20 upscales', 'API & SDK access', 'Standard Speed'],
        mostPopular: false,
    },
    {
        name: 'Starter',
        id: 'starter',
        href: '#',
        price: { monthly: '$5' },
        description: 'For people who want a larger amount of images to generate. Buys 500 credits, which includes up to:',
        features: ['500 image generations', '100 upscales', 'LLM Prompt Enhancement', 'API & SDK access', 'Standard Speed'],
        mostPopular: false,
    },
    {
        name: 'Basic',
        id: 'basic',
        href: '#',
        price: { monthly: '$10' },
        description: 'For hobbyists, who want to try out image generation. Buys 1000 credits, which includes up to:',
        features: ["1000 image generations", "200 upscales", 'LLM Prompt Enhancement', "6 Civitai uploadable models", "6 Safetensor model uploads", "5 dreambooth finetuned models", "API & SDK access", "Faster Speed"],
        mostPopular: false,
    },
    {
        name: 'Premium',
        id: 'premium',
        href: '#',
        price: { monthly: '$30' },
        description: 'For creators and developers who need higher volumes. Buys 3000 credits, which includes up to:',
        features: ["Dalle-3 Image Generation", "3000 image generations", "600 upscales", 'LLM Prompt Enhancement', "20 Civitai uploadable models", "20 Safetensor model uploads", "15 dreambooth finetuned models", "API & SDK access", "Faster Speed"],
        mostPopular: true,
    },
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
    const navigate = useNavigate();
    const handleSubscribeClick = async (tierId) => {
        navigate("/signin")
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
                <div className="mt-10 "> {/* Scrolling enabled here */}
                    <div className="mx-auto max-w-md grid grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
                        {tiers.map((tier) => (
                            <div
                                key={tier.id}
                                className={classNames(
                                    tier.mostPopular ? 'ring-2 ring-indigo-600 ' : 'ring-1 ring-gray-200',
                                    'rounded-3xl p-8'
                                )}
                            >
                                <h3
                                    id={tier.id}
                                    className={classNames(
                                        tier.mostPopular ? 'text-indigo-600' : 'text-gray-900',
                                        'text-lg font-semibold leading-8'
                                    )}
                                >
                                    {tier.name}
                                </h3>
                                <p className="mt-4 text-sm leading-6 text-gray-600 text-left">{<StyledFeature feature={tier.description} />}</p>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                    <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price[frequency.value]}</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-600">{frequency.priceSuffix}</span>
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
                                                tier.mostPopular
                                                    ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
                                                    : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
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


                                <ul role="list" className="mt-8 text-left space-y-3 text-sm leading-6 text-gray-600">
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
            </div>
        </div>
    )
}

export default function Pricing() {
    const [apiKey, setAPIKey] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [curPlan, setCurPlan] = useState("");
    // useEffect(() => {
    //     const checkSession = async () => {
    //         const { data: userData } = await supabase.auth.getUser();
    //         // const { data: userData, error } = await supabase.auth.getSession();
    //         if (!userData.user) {
    //             navigate('/signin')
    //         }
    //         const { data: totalData, error: keysError } = await supabase
    //             .from('user_details')
    //             .select('*')
    //             .eq('id', userData?.user?.id);
    //         setAPIKey(userData?.user?.id);
    //         // setAPIKey(totalData[0]['keys'][0]);
    //         setCurPlan(totalData[0]['plan']);
    //         // console.log("cur plan", totalData[0]['plan']);
    //     }
    //     checkSession();
    // });
    return (
        <>
            {/* <div className="h-screen overflow-auto h-[100vh] mb-20"> */}
            <div className="bg-white">
                <header className="absolute inset-x-0 top-3 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-24" aria-label="Global">
                        <div className="flex lg:flex-1">
                            <a href="/" className=" p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    className="h-12 w-auto"
                                    src="/finalflushlogo.png"
                                    alt=""
                                />
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                onClick={() => setMobileMenuOpen(true)}
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            {navigation.map((item) => (
                                <a key={item.name} href={item.href} className="text-md font-semibold leading-6 text-gray-900">
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <a href="signin" className="text-md font-semibold leading-6 text-gray-900">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </nav>
                    <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                        <div className="fixed inset-0 z-50" />
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-8 w-auto"
                                        src="/finalflushlogo.png"
                                        alt=""
                                    />
                                </a>
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <a
                                            href="#"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Log in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Dialog>
                </header>


                {/* <h2 className="text-left text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                    Pricing Plans
                </h2>
                <PricingPage apiKey={apiKey} curPlan={curPlan} /> */}
                <main className="pt-20">
                <section aria-labelledby="pricing-heading">
                    <h2 id="pricing-heading" className="text-left text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        Pricing Plans
                    </h2>
                    <PricingPage apiKey={apiKey} curPlan={curPlan} />
                </section>
            </main>
            </div>
        </>
    )
}