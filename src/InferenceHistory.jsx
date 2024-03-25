import { useState, useRef, Fragment, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Menu, Transition, Listbox } from '@headlessui/react'
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid'
import {
  ChevronRightIcon
} from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import { Tab } from '@headlessui/react'
import { createClient } from '@supabase/supabase-js'
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon, ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid'
import axios from 'axios';

// const supabase = createClient('https://bzazcqjsevbcwebcujhw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6YXpjcWpzZXZiY3dlYmN1amh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc2MDA0NDcsImV4cCI6MjAxMzE3NjQ0N30.X-cbMNi41JjibVkfxi_gHTBUtdgDsBpgrEmFArF5cUA')

const supabase = createClient('https://rrvjkmdsixuiuqktlxcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydmprbWRzaXh1aXVxa3RseGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDMxNjcsImV4cCI6MjAwNzExOTE2N30.Vo6_mO9gTwO_XqP9EDFh7LD5qHDGgIa50T8qsjI3wBk')

// const supabase = createClient('https://rrvjkmdsixuiuqktlxcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydmprbWRzaXh1aXVxa3RseGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDMxNjcsImV4cCI6MjAwNzExOTE2N30.Vo6_mO9gTwO_XqP9EDFh7LD5qHDGgIa50T8qsjI3wBk')

const statuses = {
  Finished: 'text-green-700 bg-green-50 ring-green-600/20',
  Running: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
  Failed: 'text-red-800 bg-red-50 ring-red-600/20'
}
const clients = [
  {
    id: 1,
    name: 'Hot girl, 4k clarity,',
    imageUrl: 'https://flush-user-images.s3.amazonaws.com/generated_images/3194cddc-ff59-448c-8967-9c4f9b0f1028/image_56.jpg',
    lastInvoice: { date: 'stable-diffusion-v21', dateTime: '2022-12-13', status: 'Finished' },
  },
  {
    id: 2,
    name: 'SavvyCal',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/savvycal.svg',
    lastInvoice: { date: 'January 22, 2023', dateTime: '2023-01-22', amount: '$14,000.00', status: 'Paid' },
  },
  {
    id: 3,
    name: 'Reform',
    imageUrl: 'https://tailwindui.com/img/logos/48x48/reform.svg',
    lastInvoice: { date: 'January 23, 2023', dateTime: '2023-01-23', amount: '$7,600.00', status: 'Paid' },
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function TextBox1({ Title, value }) {
  return (
    <form action="#">
      <Tab.Group>
        <Tab.List className="flex items-center">
          <Tab className='bg-[#282828] text-gray-300 text-sm font-medium'>
            {Title}
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-2">
          <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
            <label htmlFor="comment" className="sr-only">
              Comment
            </label>
            <div>
              <textarea
                rows={5}
                name="comment"
                id="comment"
                className="w-full block rounded-md bg-[#282828] border-0 py-1.5 text-gray-300 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
                disabled
                value={value || ""}
                style={{ paddingLeft: '8px' }}
              />
              {/* <textarea
                rows={5}
                name="comment"
                id="comment"
                className="w-full block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
                value={value}
                onChange={onChange}
                style={{ paddingLeft: '8px' }} // Add this for a small margin on the left
              /> */}
            </div>
          </Tab.Panel>
          <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
            <div className="border-b">
              <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                Preview content will render here.
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </form>
  )
}

function TextBox2({ Title, value }) {
  return (
    <form action="#">
      <Tab.Group>
        <Tab.List className="flex items-center">
          <Tab className='text-gray-300 text-sm font-medium'>
            {Title}
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-2">
          <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
            <label htmlFor="comment" className="sr-only">
              Comment
            </label>
            <div>
              <textarea
                rows={1}
                name="comment"
                id="comment"
                className="w-full h-9 block rounded-md bg-[#282828] py-1.5 text-gray-300 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder=""
                disabled
                value={value || ""}
                style={{ paddingLeft: '8px', resize: 'none', whiteSpace: 'nowrap', overflowX: 'auto' }}
              />
            </div>
          </Tab.Panel>
          <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
            <div className="border-b">
              <div className="mx-px mt-px px-3 pb-12 pt-2 text-sm leading-5 text-gray-800">
                Preview content will render here.
              </div>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </form>
  )
}


function InferenceDialogGif({ isOpen, closeDialog, motion_bucket_id, cond_aug, fps, inference_id, model_type, seed, created_at, urls, apiKey }) {
  const cancelButtonRef = useRef(null)

  const handleOpenInNewTab = (url) => {
    window.open(url, '_blank');
  };

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';  // The name of the downloaded file. Leave blank to use the original name.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageModelOpen = (url) => {
    setImageModalOpen(true);
    setImageModalUrl(url); // This sets the URL state for the modal

    // This log will show the previous state due to the async nature of setState
    // console.log("image Modal url", imageModalUrl);
  }

  useEffect(() => {
    // console.log(isOpen);
  }, [isOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div style={{ zIndex: 1000 }} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={(e) => { closeDialog }}>


          </div>
        </Transition.Child>
        <ImageModal open={imageModalOpen} setOpen={setImageModalOpen} url={imageModalUrl} apiKey={apiKey} />

        <div style={{ zIndex: 1001 }} className="fixed inset-0 z-10 w-screen overflow-y-auto">

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#1F1F1F] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6" onClose={closeDialog}>
                <div className="absolute top-1 right-1">
                  <IconButton onClick={closeDialog}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div>
                  <div className="mt-3 text-center sm:mt-5 sm:flex sm:gap-5">
                    <div className="flex-1">
                      <TextBox2 Title={"Inference Id"} value={inference_id} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Model"} value={model_type} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Seed"} value={((seed == "") ? "Random" : seed)} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Date Created"} value={created_at} />
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:mt-5 sm:flex sm:gap-5">
                    <div className="flex-1">
                      <TextBox2 Title={"Cond Aug"} value={cond_aug} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Fps"} value={fps} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Motion Bucket Id"} value={motion_bucket_id} />
                    </div>
                  </div>
                  <div className="mx-auto max-w-7xl sm:px-2 lg:px-3 bg-[#282828] mt-5 rounded-md">
                    <div className="pb-4 pt-4">
                      <div className="flex w-full space-x-3">
                        {urls &&
                          urls.map((url, index) => (
                            <div
                              key={index}
                              className="flex-shrink-0 rounded-lg overflow-hidden relative"  // Added "relative" here for positioning
                            >
                              <video
                                src={url}
                                alt={`Description of Image ${index + 1}`}
                                className="w-[260px] h-[260px] object-cover rounded-lg hover:brightness-50 transition duration-300 cursor-pointer"
                                controls
                              />
                            </div>
                          ))
                        }
                      </div>
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

function InferenceDialog({ isOpen, closeDialog, prompt, negative_prompt, inference_id, model_type, seed, created_at, guidance_scale, height, width, steps, urls, apiKey }) {
  const cancelButtonRef = useRef(null)

  const handleOpenInNewTab = (url) => {
    window.open(url, '_blank');
  };

  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");

  const handleDownload = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = '';  // The name of the downloaded file. Leave blank to use the original name.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageModelOpen = (url) => {
    setImageModalOpen(true);
    setImageModalUrl(url); // This sets the URL state for the modal

    // This log will show the previous state due to the async nature of setState
    // console.log("image Modal url", imageModalUrl);
  }

  useEffect(() => {
    // console.log(isOpen);
  }, [isOpen]);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div style={{ zIndex: 1000 }} className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={(e) => { closeDialog }}>


          </div>
        </Transition.Child>
        <ImageModal open={imageModalOpen} setOpen={setImageModalOpen} url={imageModalUrl} apiKey={apiKey} />

        <div style={{ zIndex: 1001 }} className="fixed inset-0 z-10 w-screen overflow-y-auto">

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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#1F1F1F] px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-6" onClose={closeDialog}>
                <div>

                </div>
                <div className="absolute top-1 right-1">
                  <IconButton onClick={closeDialog}>
                    <CloseIcon />
                  </IconButton>
                </div>
                <div>
                  <div className="text-center sm:flex sm:gap-5">
                    <div className="flex-1">
                      <TextBox1 Title={"Prompt"} value={prompt} />
                    </div>
                    <div className="flex-1">
                      <TextBox1 Title={"Negative Prompt"} value={negative_prompt} />
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:mt-5 sm:flex sm:gap-5">
                    <div className="flex-1">
                      <TextBox2 Title={"Inference Id"} value={inference_id} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Model"} value={model_type} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Seed"} value={((seed == "") ? "Random" : seed)} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Date Created"} value={created_at} />
                    </div>
                  </div>
                  <div className="mt-3 text-center sm:mt-5 sm:flex sm:gap-5">
                    <div className="flex-1">
                      <TextBox2 Title={"Prompt Strength"} value={guidance_scale} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Height"} value={height} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Width"} value={width} />
                    </div>
                    <div className="flex-1">
                      <TextBox2 Title={"Training Steps"} value={steps} />
                    </div>
                  </div>
                  <div className="mx-auto max-w-7xl sm:px-2 lg:px-3 bg-[#282828] mt-5 rounded-md">
                    <div className="pb-4 pt-4">
                      <div className="flex w-full space-x-3">
                        {urls &&
                          urls.map((url, index) => (
                            <div
                              key={index}
                              className="flex-shrink-0 rounded-lg overflow-hidden relative"  // Added "relative" here for positioning
                            >
                              <img
                                src={url}
                                alt={`Description of Image ${index + 1}`}
                                className="w-[260px] h-[260px] object-cover rounded-lg hover:brightness-50 transition duration-300 cursor-pointer"
                                onClick={() => handleImageModelOpen(url)}
                              />
                            </div>
                          ))
                        }
                      </div>
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

function ImageDropdown({ setImageUrl, imageData }) {
  const [selected, setSelected] = useState(imageData[0])

  const handleSelectionChange = (person) => {
    setSelected(person);
    setImageUrl(person.image_url);
  };
  return (
    <Listbox value={selected} onChange={handleSelectionChange}>
      {({ open }) => (
        <>
          <div className="relative">
            <Listbox.Button className="relative w-48 cursor-default rounded-md bg-white py-2 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.upscale}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {imageData.map((person) => (
                  <Listbox.Option
                    key={person.upscale}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {/* hello */}
                          {person.upscale}x
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}

function ImageModal({ open, setOpen, url, apiKey }) {
  const cancelButtonRef = useRef(null)
  const [imageUrl, setImageUrl] = useState(url);
  const [upscaleData, setUpscaleData] = useState()
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dummyData = [
        {
          "upscale": "1",
          "image_url": url
        }
      ];

      const { data: data2, error: error2 } = await supabase
        .from('upscales')
        .select("*")
        .eq('input_image', url);
      // console.log("input data", data2);
      // console.log("input url", url);
      const mappedData = data2.map(item => ({
        upscale: String(item.scale), // Ensuring upscale is a string
        image_url: item.urls // Assuming item.urls is a single string URL
      }));
      const combinedData = [...dummyData, ...mappedData];
      setUpscaleData(combinedData);
    }

    fetchData();
    // This will ensure that imageUrl is updated whenever the prop changes.
    setImageUrl(url);

  }, [url]);

  async function callAPI(dataPayload) {
    const API_URL = "https://ypaqg548s7.execute-api.us-east-2.amazonaws.com/testing/web-upscaler";

    const headers = {
      "Content-Type": "application/json",
    };
    dataPayload['user_id'] = apiKey;
    try {
      // console.log("data payload", dataPayload);
      const response = await fetch(API_URL, {
        method: "POST", // or POST or PUT etc., depending on the API requirement
        headers: headers,
        body: JSON.stringify(dataPayload)
      });

      // console.log("response", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('output of API', data);
      return data;

    } catch (error) {
      console.error("There was a problem with the fetch operation:", error.message);
    }
  }

  async function checkImageURL(url) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  const handleUpscale = async (scale) => {
    setLoading(true);
    try {
      const payloadDataBef = {
        "upscale": scale,
        "image_urls": url,
        "mode": "url",
      };
      let payloadData = {};
      Object.entries(payloadDataBef).forEach(([key, value]) => {
        if (value !== null && !Number.isNaN(value)) payloadData[key] = value;
      });

      // console.log("handling upscale", payloadData);
      let result = await callAPI(payloadData);
      let urls = result['urls'];
      let isValidURL = false;
      while (!isValidURL) {
        isValidURL = await checkImageURL(urls[0]); // Assuming urls[0] is the URL to check
        if (isValidURL) {
          // console.log("Valid image URL found:", urls[0]);
          break;
        } else {
          // console.log("Invalid image URL, retrying...");
          // Optionally, add a delay here to avoid too frequent requests
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
        }
      }
      let temp_gen = {
        "upscale": scale,
        "image_url": urls[0]
      }
      setUpscaleData(upscaleData => [...upscaleData, temp_gen]);
      // setIsVerified(isVerified => [...isVerified, false]);
    }
    catch (error) {
      // console.log("error", error);
    }
    finally {
      setLoading(false);
      // setUpscaleData
    }
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
              <Dialog.Panel className="bg-[black] rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                <div className="flex justify-center rounded-lg"> {/* This div will center the image horizontally */}
                  <img className="rounded-t-lg" src={imageUrl} alt="Description of image" />
                </div>
                <div className="bg-gray-50 rounded-lg px-4 py-3 sm:flex sm:justify-between">
                  <div className="flex w-96" style={{ width: '200px' }}>
                    <ImageDropdown setImageUrl={setImageUrl} imageData={upscaleData} />
                  </div>

                  <div className="flex gap-x-1 items-center"> {/* gap-x-1 provides a space between buttons */}
                    {loading && <CircularProgress size={24} />} {/* This is the loading spinner */}
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      style={{ width: '40px', height: '40px' }}
                      ref={cancelButtonRef}
                      onClick={() => handleUpscale(2)}
                    >
                      x2
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      style={{ width: '40px', height: '40px' }}
                      ref={cancelButtonRef}
                      onClick={() => handleUpscale(4)}
                    >
                      x4
                    </button>

                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      style={{ width: '40px', height: '40px' }}
                      ref={cancelButtonRef}
                      onClick={() => handleUpscale(8)}
                    >
                      x8
                    </button>
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

function TruncateText(prompt) {
  // console.log(prompt)

  const maxLength = 100;

  const truncatedText = prompt.length > maxLength ?
    prompt.substring(0, maxLength - 3) + "..." :
    prompt;

  return truncatedText;
}

function InferenceRuns() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeInferenceId, setActiveInferenceId] = useState(null);

  const [prompts, setPrompts] = useState([]);
  const [negativePrompts, setNegativePrompts] = useState([]);
  const [steps, setSteps] = useState([]);
  const [height, setHeight] = useState([]);
  const [numImages, setNumImages] = useState([]);
  const [scale, setScale] = useState([]);
  const [width, setWidth] = useState([]);
  const [modelIds, setModelIds] = useState([]);
  const [inferenceIds, setInferenceIds] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [apiKey, setAPIKey] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function formatTime(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    return date.toLocaleDateString('en-US', options);
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        // console.log('here');
        navigate('/signin')
      }
      const userId = userData?.user?.id;
      // console.log('user id', userId);
      const { data: data2, error: error2 } = await supabase
        .from('inferences')
        .select()
        .eq('user_id', userId ?? '');

      // const { data: keysData, error: keysError } = await supabase
      //   .from('user_details')
      //   .select('keys')
      //   .eq('id', userId);
      setAPIKey(userId);
      // setAPIKey("eec8325d-d3d3-40e9-b5e6-065637e72a29")

      // added nullish coalescing for the possibility that userData is null
      // console.log(data2);
      if (data2) {
        // console.log(data2);
        setPrompts(data2.map(obj => obj.prompt));
        setNegativePrompts(data2.map(obj => obj.negative_prompt));
        setSteps(data2.map(obj => obj.steps));
        setHeight(data2.map(obj => obj.height));
        setNumImages(data2.map(obj => obj.num_images));
        setScale(data2.map(obj => obj.scale));
        setWidth(data2.map(obj => obj.width));
        setModelIds(data2.map(obj => obj.model_id));
        setInferenceIds(data2.map(obj => obj.inference_id));
        setImageUrls(data2.map(obj => obj.urls))

        const transformedData = data2.map((obj, index) => {
          return {
            prompt: obj.prompt || "",
            negative_prompt: obj.negative_prompt || "",
            steps: obj.steps,
            seed: obj.seed,
            height: obj.height,
            num_images: obj.num_images,
            scale: obj.scale,
            width: obj.width,
            model_id: obj.model_id,
            inference_id: obj.inference_id,
            image_url: obj.urls,
            created_at: obj.created_at,
            status: obj.status
          };
        });
        // console.log(transformedData);
        setData(transformedData);
        setLoading(false);
      }
    };

    fetchData();
    // console.log(data);

  }, []);

  return (
    <div className='h-[90vh] overflow-y-scroll'>
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:gap-x-8 px-5 pt-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {loading && <div className="flex justify-center items-center"><CircularProgress /></div>}
        {[...data]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sorting in descending order of created_at
          .map((val) => (
            <li key={val.inference_id} className="overflow-hidden rounded-xl border border-[#3b3b3b] cursor-pointer" onClick={(e) => {
              e.stopPropagation();
              setActiveInferenceId(val.inference_id);
            }}>
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-[#282828] p-6 hoverTarget">
                {val.image_url && <img
                  src={val.image_url[0]}
                  alt={val.inference_id}
                  className="h-16 w-16 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                }
                <div className="text-sm font-medium leading-6 text-gray-300">{TruncateText(val.prompt)}</div>
              </div>

              <dl className="divide-y bg-[#1F1F1F] divide-[#3b3b3b] px-6 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-300">Model</dt>
                  <dd className="text-gray-300">
                    <span>{val.model_id}</span>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-300">Status</dt>
                  <dd className="flex items-start gap-x-2">
                    <div
                      className={classNames(
                        statuses[val.status],
                        'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {val.status}
                    </div>
                  </dd>
                </div>
              </dl>

              <InferenceDialog isOpen={activeInferenceId === val.inference_id} closeDialog={(e) => { e.stopPropagation(); setActiveInferenceId(null) }} prompt={val.prompt} negative_prompt={val.negative_prompt}
                model_type={val.model_id} inference_id={val.inference_id} seed={val.seed} created_at={formatTime(val.created_at)} guidance_scale={val.scale} height={val.height} width={val.width} steps={val.steps} urls={val.image_url} apiKey={apiKey} />
            </li>
          ))}
      </ul>
    </div>
  )
}

const products = {
  "stable-diffusion-xl": "Stable Diffusion XL", 
  "juggernaut-xl": "Juggernaut XL", 
  "dreamshaper-xl": "Dreamshaper XL", 
  "stable-diffusion-v15": "Stable Diffusion V15", 
  "stable-diffusion-v21": "Stable Diffusion V21", 
  "absolute-reality": "Absolute Reality", 
  "realistic-vision-v51": "Realistic Vision V51", 
  "c702cee3-dd0c-4924-a666-8288b565097e": "Lyriel", 
  "8b9d2b19-08e6-42f4-8bdd-e471d4180c01": "Cyberrealistic", 
  "441f8ac2-3d09-4985-9f4f-136014d694fa": "MeinaMix", 
  "10850d7b-4a59-420c-b3ef-1939ac3931c3": "Epic Photogasm", 
  "74db61f2-dae8-4d27-8d2d-6ca7d55f79cb": "Magic Mix Realistic", 
  "348e86b1-7d83-46e9-b58b-60fe1ec52a7f": "Photon", 
  "afdce0d5-089b-4095-aad6-f38e4ebea384": "Beautiful Realistic Asians", 
  "b524be42-107c-4424-ad1b-0cd6085e65a3": "XXMix_9realistic", 
  "22d065c4-022c-4c40-a7de-f5699cc6f6b4": "Neverending Dream NED", 
  "0336e7ad-1bf7-41e3-9578-7790bae77813": "Meina Unreal", 
  "2e1b9ddb-66f7-4fc5-a58a-3b881497ebb0": "Dreamshaper", 
  "a9b28096-1bf6-4902-8536-63e565bfeadd": "Ghostmix", 
  "d16c70a7-a556-4a06-9711-4d5cdd76f07b": "Toonyou", 
  "5d83d50e-7316-437d-bb47-90e390abbe0a": "Analog Madness Realistic Model", 
  "05992f14-1e1c-48d4-93d8-c12d77b80b9c": "Analog Diffusion", 
  "anything-v5": "Anything V5"
}

function InferenceRunsGif() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeInferenceId, setActiveInferenceId] = useState(null);

  // const [prompts, setPrompts] = useState([]);
  // const [negativePrompts, setNegativePrompts] = useState([]);
  // const [steps, setSteps] = useState([]);
  // const [height, setHeight] = useState([]);
  // const [numImages, setNumImages] = useState([]);
  // const [scale, setScale] = useState([]);
  // const [width, setWidth] = useState([]);
  const [fps, setFps] = useState([]);
  const [mbid, setMBID] = useState([]);
  const [cond_augs, setCondAugs] = useState([]);
  const [modelIds, setModelIds] = useState([]);
  const [inferenceIds, setInferenceIds] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [apiKey, setAPIKey] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function formatTime(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    return date.toLocaleDateString('en-US', options);
  }

  function formatModelId(model_id){
    // console.log("model id", model _id);
    if(model_id in products){
      // console.log("HEREERERERE");
      return products[model_id];
    }
    return model_id;
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        // console.log('here');
        navigate('/signin')
      }
      const userId = userData?.user?.id;
      const { data: data2, error: error2 } = await supabase
        .from('generations')
        .select()
        .eq('user_id', userId ?? '');
      setAPIKey(userId);
      // setAPIKey("eec8325d-d3d3-40e9-b5e6-065637e72a29")

      // added nullish coalescing for the possibility that userData is null
      // console.log(data2);
      if (data2) {
        setModelIds(data2.map(obj => obj.model_id));
        setInferenceIds(data2.map(obj => obj.inference_id));
        setImageUrls(data2.map(obj => obj.urls))

        const transformedData = data2.map((obj, index) => {
          return {
            // model_id: obj.model_id,
            model_id: formatModelId(obj.model_id),
            inference_id: obj.generation_id,
            image_url: obj.urls,
            created_at: formatTime(obj.created_at),
            status: obj.status,
            json_data: obj.data 
          };
        });
        // console.log("transformed data", transformedData)
        // console.log(transformedData);
        setData(transformedData);
        setLoading(false);
      }
    };

    fetchData();
    // console.log(data);

  }, []);

  return (
    <div className=''>
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:gap-x-8 px-5 pt-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {loading && <div className="flex justify-center items-center"><CircularProgress /></div>}
        {[...data]
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sorting in descending order of created_at
          .map((val) => (
            <li key={val.inference_id} className="overflow-hidden rounded-xl border border-[#3b3b3b] cursor-pointer" onClick={(e) => {
              e.stopPropagation();
              setActiveInferenceId(val.inference_id);
            }}>
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-[#282828] p-6 hoverTarget">
                {val.image_url && <video
                  src={val.image_url[0]}
                  alt={val.inference_id}
                  className="h-16 w-16 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                />
                }
                {/* <div className="text-sm font-medium leading-6 text-gray-300">{TruncateText(val.prompt)}</div> */}
              </div>

              <dl className="divide-y bg-[#1F1F1F] divide-[#3b3b3b] px-6 text-sm leading-6">
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-300">Model</dt>
                  <dd className="text-gray-300">
                    <span>{val.model_id}</span>
                  </dd>
                </div>
                <div className="flex justify-between gap-x-4 py-3">
                  <dt className="text-gray-300">Status</dt>
                  <dd className="flex items-start gap-x-2">
                    <div
                      className={classNames(
                        statuses[val.status],
                        'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {val.status}
                    </div>
                  </dd>
                </div>
              </dl>
              <InferenceDialogGif created_at={val.created_at} urls={val.image_url} seed={val.json_data.seed} fps={val.json_data.fps} motion_bucket_id={val.json_data.motion_bucket_id} model_type={val.model_id}  inference_id={val.inference_id} cond_aug={val.json_data.cond_aug} apiKey={apiKey} isOpen={activeInferenceId === val.inference_id} closeDialog={(e) => { e.stopPropagation(); setActiveInferenceId(null) }}  />
            </li>
          ))}
      </ul>
    </div>
  )
}
export default function InferenceHistory({ activeTab }) {
  const [tabs, setTabs] = useState([
    { name: 'Text-to-Image', href: '#', current: true },
    { name: 'Image-to-Image', href: '#', current: false },
  ]);

  const [currentTab, setCurrentTab] = useState("Text-to-Image");

  function ModelTypeTabs() {
    const handleTabClick = (selectedTab) => {
      setTabs(tabs.map(tab => ({
        ...tab,
        current: tab.name === selectedTab.name
      })));
    };

    const handleTabChange = useCallback((tab) => {
      handleTabClick(tab);
      setCurrentTab(tab.name);  // Note this change too
    }, [handleTabClick]);

    return (
      <div className='bg-[#1F1F1F]'>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue={tabs.find((tab) => tab.current).name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={() => handleTabChange(tab)}
                className={classNames(
                  tab.current ? 'text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                  'rounded-md px-1 py-2 text-sm font-medium'
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

  return (
    <>
      <div className=''>
        {activeTab === "Images" ? (
          <InferenceRuns />
        ) : (
          <InferenceRunsGif />
        )}
      </div>
    </>
  )
}