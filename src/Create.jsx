function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
import { Fragment, useState, useRef } from 'react'
import {
    SparklesIcon,
    ArrowPathIcon,
    PlusCircleIcon
} from '@heroicons/react/24/outline'
  
  
export default function Create() {
    return (
        <div>
            <div className="text-white sm:text-4xl text-3xl font-bold text-left pt-6">
                Create New Influencer
            </div> 
            <CreateNewInfluencerModal/>
        </div>
    )
}

function Tabs({ tabs, onClick }) {
    return (
      <div>
        <div className="sm:block">
          <nav className="flex flex-wrap" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                className={classNames(
                  tab.current ? 'bg-indigo-800 text-white' : 'bg-[#1d1d1d] text-gray-300 hover:text-gray-700',
                  'rounded-md px-3 py-2 text-sm font-medium mr-4 mt-3 cursor-pointer'
                )}
                aria-current={tab.current ? 'page' : undefined}
                onClick={() => onClick(tab)} // Calling the onClick function passed as a prop
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    );
}  
  

function CreateNewInfluencerModal() {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef(null)

    const [genderTabs, setGenderTabs] = useState([
        { name: 'Female', current: true }, 
        { name: 'Male', current: false }
    ]);

    const handleGenderClick = (clickedTab) => {
        // Update the genderTabs state to reflect the new current tab
        const updatedTabs = genderTabs.map(tab => ({
            ...tab,
            current: tab.name === clickedTab.name
        }));
        setGenderTabs(updatedTabs);
    };

    const [ethnicityTabs, setEthnicityTabs] = useState([
        { name: 'White', current: false }, 
        { name: 'Asian', current: false },
        { name: 'Latina', current: false },
        { name: 'Arabic', current: false },
        { name: 'Black', current: false },
        { name: 'Indian', current: false },
        { name: 'Native American', current: false },
    ]);

    const handleEthnicityClick = (clickedTab) => {
        // Update the genderTabs state to reflect the new current tab
        const updatedTabs = ethnicityTabs.map(tab => ({
            ...tab,
            current: tab.name === clickedTab.name
        }));
        setEthnicityTabs(updatedTabs);
    };

    const [hairTabs, setHairTabs] = useState([
        { name: 'Blonde', current: false }, 
        { name: 'Brunette', current: false }, 
        { name: 'Black', current: false }, 
        { name: 'Pink', current: false }, 
        { name: 'Blue', current: false }, 
        { name: 'Green', current: false }, 
        { name: 'Purple', current: false }, 
    ]);

    const handleHairClick = (clickedTab) => {
        // Update the genderTabs state to reflect the new current tab
        const updatedTabs = hairTabs.map(tab => ({
            ...tab,
            current: tab.name === clickedTab.name
        }));
        setHairTabs(updatedTabs);
    };

    const [ageTabs, setAgeTabs] = useState([
        { name: '18', current: false }, 
        { name: '20s', current: false }, 
        { name: '30s', current: false }, 
        { name: '40s', current: false }, 
        { name: '50s', current: false },  
        { name: '60s', current: false },  
    ]);

    const handleAgeClick = (clickedTab) => {
        // Update the genderTabs state to reflect the new current tab
        const updatedTabs = ageTabs.map(tab => ({
            ...tab,
            current: tab.name === clickedTab.name
        }));
        setAgeTabs(updatedTabs);
    };

    const [eyeTabs, setEyeTabs] = useState([
        { name: 'Brown', current: false }, 
        { name: 'Blue', current: false }, 
        { name: 'Green', current: false }, 
        { name: 'Hazel', current: false }, 
        { name: 'Gray', current: false },  
    ]);

    const handleEyeClick = (clickedTab) => {
        // Update the genderTabs state to reflect the new current tab
        const updatedTabs = eyeTabs.map(tab => ({
            ...tab,
            current: tab.name === clickedTab.name
        }));
        setEyeTabs(updatedTabs);
    };

    return (
        <div>
            <div class="flex flex-col-reverse md:flex-row">
                <div class="flex-1">
                    <div class="mt-8">
                        <p class="text-lg text-gray-300 text-left">Gender</p>
                        <div><Tabs tabs={genderTabs} onClick={handleGenderClick}/></div>
                    </div>

                    <div class="mt-8">
                        <p class="text-lg text-gray-300 text-left">Ethnicity</p>
                        <div><Tabs tabs={ethnicityTabs} onClick={handleEthnicityClick}/></div>
                    </div>

                    <div class="mt-8">
                        <p class="text-lg text-gray-300 text-left">Hair Color</p>
                        <div><Tabs tabs={hairTabs} onClick={handleHairClick}/></div>
                    </div>

                    <div class="mt-8">
                        <p class="text-lg text-gray-300 text-left">Age</p>
                        <div><Tabs tabs={ageTabs} onClick={handleAgeClick}/></div>
                    </div>

                    <div class="mt-8">
                        <p class="text-lg text-gray-300 text-left">Eye Color</p>
                        <div><Tabs tabs={eyeTabs} onClick={handleEyeClick}/></div>
                    </div>

                    <div className="text-left mt-10">
                        <button
                            type="button"
                            className="inline-flex items-center w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 sm:w-auto"
                            onClick={() => setOpen(false)}
                        >
                            Generate
                            <SparklesIcon className="ml-2 -mr-1 h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div class="flex-1 justify-right">
                    <div class="mx-auto w-[500px] h-[500px] bg-[#101010] rounded-lg flex items-center justify-center text-gray-300 m-2 p-5">
                        <div class="spinner"></div>
                        Choose some tags and click generate to get started!
                    </div>
                    <div className=''>
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-full bg-red-900 px-3.5 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-red-800"
                            >
                            Remix
                            <ArrowPathIcon className="ml-2 -mr-1 h-5 w-5" />
                            </button>

                        <button
                            type="button"
                            className="inline-flex items-center justify-center ml-2 rounded-full bg-green-900 px-3.5 py-2 text-sm font-semibold text-gray-300 shadow-sm hover:bg-gray-50"
                        >
                            Add Influencer
                            <PlusCircleIcon className="ml-2 -mr-1 h-5 w-5" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
