import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition, Listbox } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import {
    ChevronRightIcon, DocumentDuplicateIcon
} from '@heroicons/react/24/outline'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { AtSymbolIcon, CodeBracketSquareIcon, LinkIcon, Cog6ToothIcon } from '@heroicons/react/20/solid'
import { Button } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { Tabs } from '@mantine/core';
import { Dialog } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { OpenInNew, GetApp } from '@mui/icons-material';
import { PlusIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const statuses = {
    Complete: 'text-green-700 bg-green-50 ring-green-600/20',
    Archived: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}
const projects = [
    {
        id: 1,
        name: 'GraphQL API',
        href: '#',
        status: 'Complete',
        createdBy: 'Leslie Alexander',
        dueDate: 'March 17, 2023',
        dueDateTime: '2023-03-17T00:00Z',
    },
    {
        id: 2,
        name: 'New benefits plan',
        href: '#',
        status: 'In progress',
        createdBy: 'Leslie Alexander',
        dueDate: 'May 5, 2023',
        dueDateTime: '2023-05-05T00:00Z',
    },
    {
        id: 3,
        name: 'Onboarding emails',
        href: '#',
        status: 'In progress',
        createdBy: 'Courtney Henry',
        dueDate: 'May 25, 2023',
        dueDateTime: '2023-05-25T00:00Z',
    },
    {
        id: 4,
        name: 'iOS app',
        href: '#',
        status: 'In progress',
        createdBy: 'Leonard Krasner',
        dueDate: 'June 7, 2023',
        dueDateTime: '2023-06-07T00:00Z',
    },
    {
        id: 5,
        name: 'Marketing site redesign',
        href: '#',
        status: 'Archived',
        createdBy: 'Courtney Henry',
        dueDate: 'June 10, 2023',
        dueDateTime: '2023-06-10T00:00Z',
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


function Config({ Title, model_id, created_at, resolution, learning_rate, batch_size, training_steps, base_model, is_gif }) {
    return (
        <>
            <form className="bg-[#1F1F1F] shadow-sm border border-[#3b3b3b] sm:rounded-xl md:col-span-2">
                <div className="relative flex justify-start px-4 sm:pl-4 sm:pt-4 pb-1">
                    <span className="bg-[#1F1F1F] pr-3 text-base font-semibold leading-6 text-gray-300 text-xl">{Title}</span>
                </div>

                <div className="px-4 py-6 sm:p-4">
                    <div className="pb-5 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-10">
                            <label htmlFor="website" className="block text-left text-sm font-medium leading-6 text-gray-300">
                                Model ID
                            </label>
                            <div className="mt-1">
                                <div className="flex rounded-md shadow-sm border border-[#3b3b3b] focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        // placeholder="ce5f4186-1dca-4a2e-affc-e58ff8288433"
                                        value={model_id}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex pb-5">
                        <div className="sm:col-span-4 mr-4 sm:w-1/3">
                            <label htmlFor="website" className="block text-left text-sm font-medium leading-6 text-gray-300">
                                Base Model
                            </label>
                            <div className="mt-1">
                                <div className="flex rounded-md shadow-sm border border-[#3b3b3b] focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        // placeholder="ce5f4186-1dca-4a2e-affc-e58ff8288433"
                                        value={base_model}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4 mr-4 sm:w-1/3 pb-1">
                            <label htmlFor="website" className="block text-left text-sm font-medium leading-6 text-gray-300">
                                Date Created
                            </label>
                            <div className="mt-1">
                                <div className="flex rounded-md shadow-sm border border-[#3b3b3b] focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        // placeholder="ce5f4186-1dca-4a2e-affc-e58ff8288433"
                                        value={created_at}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4 sm:w-1/3">
                            <label htmlFor="website" className="block text-left text-sm font-medium leading-6 text-gray-300">
                                Resolution
                            </label>
                            <div className="mt-1">
                                <div className="flex rounded-md shadow-sm border border-[#3b3b3b] focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        // placeholder="ce5f4186-1dca-4a2e-affc-e58ff8288433"
                                        value={resolution}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="sm:col-span-4 mr-4 sm:w-1/3">
                            <label htmlFor="website" className="block text-left text-sm font-medium leading-6 text-gray-300">
                                Learning Rate
                            </label>
                            <div className="mt-1">
                                <div className="flex rounded-md shadow-sm border border-[#3b3b3b] focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        // placeholder="ce5f4186-1dca-4a2e-affc-e58ff8288433"
                                        value={learning_rate}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4 mr-4 sm:w-1/3">
                            <label htmlFor="website" className="block text-left text-sm font-medium leading-6 text-gray-300">
                                Batch Size
                            </label>
                            <div className="mt-1">
                                <div className="flex rounded-md shadow-sm border border-[#3b3b3b] focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        // placeholder="ce5f4186-1dca-4a2e-affc-e58ff8288433"
                                        value={batch_size}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="sm:col-span-4 sm:w-1/3">
                            <label htmlFor="website" className="block text-left text-sm font-medium leading-6 text-gray-300">
                                Training Steps
                            </label>
                            <div className="mt-1">
                                <div className="flex rounded-md shadow-sm border border-[#3b3b3b] focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        name="website"
                                        id="website"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        // placeholder="ce5f4186-1dca-4a2e-affc-e58ff8288433"
                                        value={training_steps}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

function getPython(model_id) {
    return `
# pip3 install flushai

from flushai.models.diffusion.text2img import Txt2ImgBase

# Create a reference to your model on Flush
model = Txt2ImgBase(api_key = "YOUR_API_KEY", 
                    model_id = "${model_id}")

# You must input the prompt as well as the model id. All 
# other parameters are optional. Below is a basic example:
result = model.generate(
    prompt = "a car driving on a highway, beautiful, rustic", 
    negative_prompt = 'blurry, low quality', 
    num_images = 4,
    height = 512, 
    width = 512, 
    steps = 25, 
    prompt_strength = 7.5, 
    seed = 5
)[0]
`
}

function getPythonGif(model_id) {
    return `
# pip3 install flushai

from flushai.models.diffusion.img2img import Txt2ImgBase

# Create a reference to your model on Flush
model = Txt2ImgBase(api_key = "YOUR_API_KEY", 
                    model_id = "${model_id}")

# You must input the prompt as well as the model id. All 
# other parameters are optional. Below is a basic example:
result = model.generate(
    prompt = "a car driving on a highway, beautiful, rustic", 
    negative_prompt = 'blurry, low quality', 
    num_images = 4,
    height = 512, 
    width = 512, 
    steps = 25, 
    prompt_strength = 7.5, 
    seed = 5
)[0]
    `
}

function getCURL(model_id) {
    return `
    COMING SOON
    `
}

function getJavaScript(model_id) {
    return `
COMING SOON
`
}


function Deploy({ Title, model_id }) {
    return (
        <>
            <form className="bg-[#1F1F1F] shadow-sm border border-[#3b3b3b] sm:rounded-xl md:col-span-2">
                <div className="relative flex justify-start px-4 sm:pl-4 sm:pt-4">
                    <span className="bg-[#1F1F1F]  pr-3 text-base font-semibold leading-6 text-gray-300 text-xl">{Title}</span>
                </div>

                <div className="px-4 py-6 sm:p-4">
                    <p className="text-left text-sm text-gray-500">These snippets have been pre-filled with the model ID. You can copy and paste them to run.</p>
                </div>
                <Tabs defaultValue="python" style={{ color: 'orange' }} className="px-4" >
                    <Tabs.List>
                        <Tabs.Tab value="curl">
                            cURL
                        </Tabs.Tab>
                        <Tabs.Tab value="python">
                            Python
                        </Tabs.Tab>
                        <Tabs.Tab value="jsx">
                            Javascript
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="curl" pt="xs">
                        <Prism language="bash" colorScheme="dark" className='text-left'>{getCURL(model_id)}</Prism>
                    </Tabs.Panel>

                    <Tabs.Panel value="python" pt="xs" className="pb-2">
                        <Prism language="python" colorScheme="dark" className="text-left">{getPython(model_id)}</Prism>
                    </Tabs.Panel>

                    <Tabs.Panel value="jsx" pt="xs">
                        <Prism language="javascript" className="text-left">{getJavaScript(model_id)}</Prism>
                    </Tabs.Panel>
                </Tabs>

            </form>
        </>
    )
}

function DeployGif({ Title, model_id }) {
    return (
        <>
            <form className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                <div className="relative flex justify-start px-4 sm:pl-4 sm:pt-4">
                    <span className="bg-white pr-3 text-base font-semibold leading-6 text-gray-900 text-xl">{Title}</span>
                </div>

                <div className="px-4 py-6 sm:p-4">
                    <p className="text-left text-sm text-gray-900">These snippets have been pre-filled with the model ID. You can copy and paste them to run.</p>
                </div>
                <Tabs defaultValue="python" className="px-4 -mb-3">
                    <Tabs.List>
                        <Tabs.Tab value="curl">
                            cURL
                        </Tabs.Tab>
                        <Tabs.Tab value="python">
                            Python
                        </Tabs.Tab>
                        <Tabs.Tab value="jsx">
                            Javascript
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="curl" pt="xs">
                        <Prism language="bash" className='text-left'>{getCURL(model_id)}</Prism>
                    </Tabs.Panel>

                    <Tabs.Panel value="python" pt="xs" className="pb-2">
                        <Prism language="python" className="text-left">{getPythonGif(model_id)}</Prism>
                    </Tabs.Panel>

                    <Tabs.Panel value="jsx" pt="xs">
                        <Prism language="javascript" className="text-left">{getJavaScript(model_id)}</Prism>
                    </Tabs.Panel>
                </Tabs>

            </form>
        </>
    )
}

function NoImages() {
    const navigate = useNavigate();

    return (
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <PhotoIcon/>
          
        </svg>
        <h3 className="mt-2 text-sm font-semibold text-gray-300">No images yet</h3>
        <p className="mt-1 text-sm text-gray-500">Get started with this model in Playground.</p>
        <div className="mt-6">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={(e) => {
                e.preventDefault(); 
                // console.log("hey");
                navigate('/playground');
            }}
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Try it Out
          </button>
        </div>
      </div>
    )
}

function ImageGallery({ Title, urls }) {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            <form className="bg-[#1F1F1F] shadow-sm border border-[#3b3b3b] sm:rounded-xl md:col-span-2">
                <div className="relative flex justify-start px-4 sm:pl-4 sm:pt-4">
                    <span className="bg-[#1F1F1F] pr-3 text-base font-semibold leading-6 text-gray-300 text-xl">{Title}</span>
                </div>
                {urls && urls.length > 0 ? (
                    <div>
                        <div className="px-4 pb-4 pt-6 ">
                            <div className="flex w-full space-x-3">
                                {/* {urls &&
                                    <div> */}
                                <div className="flex-1 aspect-w-1 aspect-h-1" style={{ height: '170px' }}>
                                    {urls[0] && <img src={urls[0]} alt="Description of Image 1" className="w-full h-full object-cover rounded-lg" />}
                                </div>
                                <div className="flex-1 aspect-w-1 aspect-h-1" style={{ height: '170px' }}>
                                    {urls[1] && <img src={urls[1]} alt="Description of Image 2" className="w-full h-full object-cover rounded-lg" />}
                                </div>
                                <div className="flex-1 aspect-w-1 aspect-h-1" style={{ height: '170px' }}>
                                    {urls[2] && <img src={urls[2]} alt="Description of Image 3" className="w-full h-full object-cover rounded-lg" />}
                                </div>
                                {/* </div>
                                } */}
                            </div>
                        </div>
                    <div className="flex justify-end pr-4" style={{ paddingBottom: "1.125rem" }}>
                        <a href="#" className="text-md justify-end font-medium text-indigo-600 hover:text-indigo-500" onClick={(e) => { e.preventDefault(); setShowDialog(true); }}>
                            View More
                            <span aria-hidden="true"> &rarr;</span>
                        </a>
                    </div>
                    {urls &&
                        <ImageGalleryDialog open={showDialog} onClose={() => setShowDialog(false)} urls={urls} />
                    }
                    </div>) : (
                    <div className='pt-8' style={{ paddingBottom: '3.75rem' }}>
                        <NoImages/>
                    </div> 
                    )
                }
            </form>
        </>
    )
}

function ImageGalleryDialog({ open, onClose, urls }) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6">
                            <div className="absolute top-1 right-1">
                                <IconButton onClick={onClose}>
                                    <CloseIcon />
                                </IconButton>
                                </div>
                                <div className="mx-auto max-w-7xl sm:px-2 lg:px-3 mt-5 rounded-md">
                                    <div className="pb-4">
                                        <div className="flex w-full flex-wrap">
                                            {urls.map((imageUrl, index) => (
                                                <div className="w-1/4 p-2 relative" key={index}>
                                                    <img
                                                        src={imageUrl}
                                                        alt={`Description of Image ${index + 1}`}
                                                        className="w-full h-auto object-cover rounded-lg hover:brightness-50 transition duration-300 cursor-pointer"
                                                    />
                                                    <div className="absolute top-2 right-2">
                                                        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                                                            <OpenInNew fontSize="default" className="icon-white cursor-pointer text-2xl" />
                                                        </a>
                                                        <a href={imageUrl} download>
                                                            <GetApp fontSize="default" className="icon-white cursor-pointer text-2xl" />
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default function ModelDetails({ model_id, model_name, created_at, resolution, learning_rate, batch_size, training_steps, urls, base_model, is_gif }) {        

    return (
        <>
            <div className='mx-10 py-5 h-[90vh] overflow-y-scroll'>
                <h2 className="flex items-center text-2xl leading-7 text-gray-300 sm:text-3xl sm:tracking-tight mb-6 ">
                    <span className="font-bold">My Models</span>
                    <span className="ml-4 text-gray-400" style={{ transform: "rotate(20deg) translateY(-3px)" }}>/</span>
                    <span className="ml-4 text-gray-400">{model_name}</span>
                </h2>
                <div className="flex sm:gap-7">
                    <div className="flex-col flex-1">
                        <div className="sm:col-span-4 flex-1 mb-7">
                            <Config Title={"Config"} model_id={model_id} created_at={created_at} resolution={resolution} learning_rate={learning_rate} batch_size={batch_size} training_steps={training_steps} base_model={base_model} is_gif={is_gif} />
                        </div>
                        <div className="sm:col-span-4 flex-1">
                            {is_gif ? <ImageGallery Title={"GIF Gallery"} urls={urls} /> : <ImageGallery Title={"Image Gallery"} urls={urls} />}
                            
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="sm:col-span-4 flex-1">
                            {is_gif ? <DeployGif Title={"Deploy It"} model_id={model_id} /> : <Deploy Title={"Deploy It"} model_id={model_id} />}
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}