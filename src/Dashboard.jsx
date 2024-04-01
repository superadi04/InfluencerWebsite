import {
    XMarkIcon,
    UserGroupIcon,
    ChatBubbleBottomCenterTextIcon,
    TicketIcon,
    PlusIcon,
    BanknotesIcon,
    Bars3Icon
} from '@heroicons/react/24/outline'
import { Fragment, useState, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import YourInfluencers from "./YourInfluencers"
import Pricing from "./Pricing"
import Influencer from "./Influencer"
import Create from "./Create"
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

const teams = [
  { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
  { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
  { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard({pageName}) {
  const [navigation, setNavigation] = useState([
    { name: 'Your Influencers', href: 'your-influencers', icon: UserGroupIcon, current: true },
    { name: 'Pricing', href: 'pricing', icon: BanknotesIcon, current: false },
    { name: 'Affiliate Program', href: '#', icon: TicketIcon, current: false },
    { name: 'Discord', href: '#', icon: ChatBubbleBottomCenterTextIcon, current: false },
    { name: 'Create New Influencer', href: 'create', icon: PlusIcon, current: false },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const blurClass = isModalOpen ? 'blur-effect' : '';

  const navigate = useNavigate();

  const handleNavigationClick = (event, itemName, itemHref) => {
    event.preventDefault(); // Prevent the default anchor link behavior

    // Update the 'current' state for each navigation item
    const updatedNavigation = navigation.map(item => ({
      ...item,
      current: item.name === itemName,
    }));
    setNavigation(updatedNavigation);

    // Use `navigate` to change the route programmatically
    navigate(`/${itemHref}`);
  };

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className={`absolute top-0 left-0 h-full w-full bg-black`}>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className={`relative lg:hidden ${blurClass}`} onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-900',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                  onClick={(e) => handleNavigationClick(e, item.name, item.href)} // Update navigation state on click
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ${blurClass}`} onClick={() => setIsModalOpen(false)}>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          onClick={(e) => handleNavigationClick(e, item.name, item.href)} // Update navigation state on click
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-900',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-black px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-gray-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-white"></div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-800"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="lg:pl-72 bg-black pb-5">
          <div className="px-4 sm:px-6 lg:px-8">
            {pageName === 'Your Influencers' && <YourInfluencers/>}
            {pageName === 'Pricing' && <Pricing/>}
            {pageName === 'Influencer' && <Influencer isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedImageUrl={selectedImageUrl} setSelectedImageUrl={setSelectedImageUrl}/>}
            {pageName === 'Create' && <Create isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedImageUrl={selectedImageUrl} setSelectedImageUrl={setSelectedImageUrl}/>}
          </div>
        </main>
      </div>
    </>
  )
}

function Tabs({ tabs }) {
  return (
    <div>
      <div className="sm:block">
        {/* Added flex-wrap to allow the items to wrap onto the next line if they exceed the container's width */}
        <nav className="flex flex-wrap" aria-label="Tabs">
          {tabs.map((tab) => (
            <a
              key={tab.name} // Added a key prop for each child in a list
              className={classNames(
                tab.current ? 'bg-indigo-800 text-white' : 'bg-[#1d1d1d] text-gray-300 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium mr-4 mt-3'
              )}
              aria-current={tab.current ? 'page' : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
