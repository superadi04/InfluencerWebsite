import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import {
    PlusIcon,
} from '@heroicons/react/24/outline'

const tabs = [
    { name: 'Gallery', href: '#', current: true },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
  
export default function Influencer({isModalOpen, setIsModalOpen, selectedImageUrl, setSelectedImageUrl}) {
    // Function to open the modal with the selected image
    const openModal = (imageUrl) => {
        setSelectedImageUrl(imageUrl);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-8"> {/* Adjusted for vertical stacking and center alignment */}
                <div> {/* Container for the image */}
                    <img className="w-52 h-52 rounded-full" src="baddie.jpg" alt="Rounded avatar" />
                </div>
                <div className="text-white sm:text-4xl text-3xl font-bold text-center pt-4"> {/* Adjusted for center text alignment */}
                    Adrianna
                </div>
                
                <button
                    type="button"
                    className="mt-6 flex rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
                    Create New Image
                </button>
                <div className='pt-5 w-full'>
                    <Tabs/>
                </div>
                <div className='pt-3 w-full'>
                    <Images/>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center"
                    onClick={() => setIsModalOpen(false)} // Close modal when the backdrop is clicked
                >
                    <div
                        className="rounded-lg"
                        onClick={(e) => e.stopPropagation()} // Prevent click inside the modal from closing it
                    >
                        <img src={"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg"} alt="Selected" className="max-w-full h-auto rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    )
}
  
function Tabs() {
    return (
        <div className="flex flex-col items-center justify-center"> {/* Center the entire Tabs component */}
            <div className="sm:block w-full"> {/* Ensure full width for larger screens */}
                <div className="border-b border-gray-800 w-full"> {/* Ensure full width */}
                    <nav className="-mb-px flex justify-center space-x-8" aria-label="Tabs"> {/* Center tabs */}
                        {tabs.map((tab) => (
                        <a
                            key={tab.name}
                            href={tab.href}
                            className={classNames(
                            tab.current
                                ? 'border-indigo-500 text-indigo-600'
                                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                            'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                            )}
                            aria-current={tab.current ? 'page' : undefined}
                        >
                            {tab.name}
                        </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}

function Images() {
    return (
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt=""></img>
            </div>
            <div>
                <img class="rounded-lg w-96 h-96 object-cover" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt=""></img>
            </div>
        </div>
    )
}
