import { useState, useEffect, useRef, useCallback, Fragment } from 'react'
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { AtSymbolIcon, CodeBracketIcon, LinkIcon, PhotoIcon } from '@heroicons/react/20/solid'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { useLocation, useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://rrvjkmdsixuiuqktlxcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydmprbWRzaXh1aXVxa3RseGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDMxNjcsImV4cCI6MjAwNzExOTE2N30.Vo6_mO9gTwO_XqP9EDFh7LD5qHDGgIa50T8qsjI3wBk')
const FastSpinner = styled(CircularProgress)(({ theme }) => ({
  '& .MuiCircularProgress-svg': {
    animationDuration: '0.1s',
  },
}));

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Explore', href: '#', current: true },
  { name: 'Playground', href: '#', current: false },
  { name: 'DreamBooth', href: '#', current: false },
  { name: 'Gallery', href: '#', current: false },
]
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

// const base_models = [
//   {
//     id: 1,
//     title: 'Stable Diffusion XL',
//     price: 'stable-diffusion-xl',
//     imageSrc: './sdxl.jpeg'
//   },
//   {
//     id: 2,
//     title: 'Stable Diffusion 1.5',
//     price: 'stable-diffusion-v15',
//     imageSrc: './sd21.jpeg'
//   },
//   {
//     id: 3,
//     title: 'Stable Diffusion 2.1',
//     price: 'stable-diffusion-v21',
//     imageSrc: './sd21.jpeg'
//   },
//   {
//     id: 4,
//     title: 'Absolute Reality',
//     price: 'absolute-reality',
//     imageSrc: './absreality.png'
//   },
//   {
//     id: 6,
//     title: 'Realistic-Vision-5.1',
//     price: 'realistic-vision-v51',
//     imageSrc: './realistic_vision_51.jpeg',
//   },
//   {
//     id: 7,
//     title: 'Anything V-5',
//     price: 'anything-v5',
//     imageSrc: './anythingv5.jpeg'
//   },
// ]
const deliveryMethods = [
  { id: 1, title: 'Standard', turnaround: '4–10 business days', price: '$5.00' },
  { id: 2, title: 'Express', turnaround: '2–5 business days', price: '$16.00' },
]
const paymentMethods = [
  { id: 'credit-card', title: 'Credit card' },
  { id: 'paypal', title: 'PayPal' },
  { id: 'etransfer', title: 'eTransfer' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function TextArea({ Title, Rows, value, setValue }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor="comment" className="block text-sm text-left font-medium leading-6 text-gray-300">
        {Title}
      </label>
      <div className="mt-1">
        <textarea
          rows={Rows}
          name="comment"
          id="comment"
          value={value} // Control the component using value prop
          onChange={handleChange} // Set up the onChange event handler
          className="bg-[#1C1C1C] block w-full rounded-md border-0 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-[#3b3b3b] placeholder:text-gray-400  sm:text-sm sm:leading-6"
          placeholder={`Enter your ${Title.toLowerCase()}`} // Optional placeholder
          style={{ paddingLeft: '8px', paddingright: '8px' }}
        />
      </div>
    </div>
  );
}

function Models({ open, setOpen, model, setModel, models, setHeight, setWidth, setSteps }) {
  // Handler for product selection
  const handleSelectProduct = (productTitle) => {
    if (productTitle.id == "stable-diffusion-xl" || productTitle.id == "dreamshaper-xl" || productTitle.id == "juggernaut-xl") {
      setHeight(1024);
      setWidth(1024);
      setSteps(20);
    }
    else {
      setHeight(512);
      setWidth(512);
      setSteps(50);
    }
    setModel(productTitle); // Set the model to the selected product's title
    setOpen(false); // Close the modal
  };

  return (
    <div>
      <div className="mx-auto max-w-2xl lg:max-w-7xl">
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {models.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer"
              onClick={() => handleSelectProduct(product)} // Add onClick event here
            >
              <div className="relative">
                <div className="relative h-48 w-48 overflow-hidden rounded-lg product-item">
                  <img
                    src={product.imageSrc || "/temp.jpeg"}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="absolute inset-x-0 top-0 flex h-48 w-48 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50 hover:opacity-100 transition-opacity duration-200"
                  />
                  <p className="relative text-md font-semibold text-white">{product.model_name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// function Models({open, setOpen, model, setModel}) {
//   return (
//     <div className="">
//       <div className="mx-auto max-w-2xl lg:max-w-7xl">
//         <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
//           {products.map((product) => (
//             <div key={product.id} className='cursor-pointer'>
//               <div className="relative">
//                 <div className="relative h-48 w-48 overflow-hidden rounded-lg product-item">
//                   <img
//                     src={product.imageSrc}
//                     alt={product.imageAlt}
//                     className="h-full w-full object-cover object-center"
//                   />
//                 </div>
//                 <div className="absolute inset-x-0 top-0 flex h-48 w-48 items-end justify-end overflow-hidden rounded-lg p-4">
//                   <div
//                     aria-hidden="true"
//                     className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50 hover:opacity-100 transition-opacity duration-200" // Added hover:opacity-100 here
//                   />
//                   <p className="relative text-lg font-semibold text-white">{product.price}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

function WarningModal({ show, setShow, message }) {
  useEffect(() => {
    let timer;
    if (show) {
      timer = setTimeout(() => {
        setShow(false);
      }, 5000); // 5000ms = 5s
    }

    // Cleanup function to clear the timeout when the component is unmounted or if the modal is closed manually before the 5 seconds has elapsed
    return () => clearTimeout(timer);
  }, [show, setShow]);

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-end sm:p-6 justify-end"
    >
      <div className="flex flex-col items-end space-y-4">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-x-full opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-x-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto max-w-lg overflow-hidden rounded-lg bg-[#282828] shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                </div>
                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} className="ml-3 flex-1 pt-0.5">
                  <p className="text-sm font-small text-gray-300">{message}</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}

function ModelsModal({ open, setOpen, model, setModel, models, setHeight, setWidth, setSteps }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden bg-[#1f1f1f] rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6 bg-[#1f1f1f]" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-300">
                      Select Model
                    </Dialog.Title>
                    <div className="mt-2">
                      <Models open={open} setOpen={setOpen} model={model} setModel={setModel} models={models} setHeight={setHeight} setWidth={setWidth} setSteps={setSteps} />
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

function ModelsAccordion({ model, setModel, models, setHeight, setWidth, setSteps }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hs-accordion-group">
      <div className={`hs-accordion ${isOpen ? "active" : ""}`} id="hs-basic-with-title-and-arrow-stretched-heading-one">
        <button
          type="button"  // Add this line
          className="-mb-10 hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
          onClick={() => setIsOpen(true)}
        >
          <h3 className="text-base font-semibold leading-6 text-gray-300">{model.model_name}</h3>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e2e8f0" class="w-6 h-6">
            <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>

        </button>

        <ModelsModal open={isOpen} setOpen={setIsOpen} model={model} setModel={setModel} models={models} setHeight={setHeight} setWidth={setWidth} setSteps={setSteps} />
      </div>
    </div>
  );
}

function VideoModelsAccordian({ Title }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hs-accordion-group">
      <div className={`hs-accordion ${isOpen ? "active" : ""}`} id="hs-basic-with-title-and-arrow-stretched-heading-one">
        <button
          type="button"  // Add this line
          className="-mb-10 hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
          onClick={() => setIsOpen(true)}
        >
          <h3 className="text-base font-semibold leading-6 text-gray-300">{Title}</h3>

          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e2e8f0" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>

        </button>

        {/* <ModelsModal open={isOpen} setOpen={setIsOpen}/> */}
      </div>
    </div>
  );
}


function ImagePlaceholder() {
  return (
    <div className="w-full">
      <div style={{ paddingTop: '90%' }} className="relative items-center block p-6 rounded-lg shadow-md bg-indigo-900"> {/* Adjusted background to bg-gray-800 */}
        <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"> {/* Corrected class to className */}
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin-fast fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

function MoreOptionsAccordion({
  Title,
  guidanceScale,
  setGuidanceScale,
  inferenceSteps,
  setInferenceSteps,
  seed,
  setSeed,
  numberOfImages,
  setNumberOfImages,
  scheduler,
  setScheduler
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hs-accordion-group">
      <div className={`hs-accordion ${isOpen ? "active" : ""}`}>
        <button
          type="button"
          className="-mb-10 hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-base font-semibold leading-6 text-gray-300">{Title}</h3>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e2e8f0" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e2e8f0" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </button>

        {isOpen && (
          <div
            id="hs-basic-with-title-and-arrow-stretched-collapse-one"
            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
          >
            <label htmlFor="numberOfImages" className="block pt-4 text-sm text-left font-medium leading-6 text-gray-300">
              {`Number of Images: ${numberOfImages}`}
            </label>
            <input
              id="numberOfImages"
              type="range"
              min="1"
              max="4"
              step="1"
              value={numberOfImages}
              onChange={(e) => setNumberOfImages(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />

            <div className="flex gap-x-5 pt-4">
              <div className="flex-1">
                <label htmlFor="guidanceScale" className="block text-sm text-left font-medium leading-6 text-gray-300">
                  {`CFG Scale: ${guidanceScale}`}
                </label>
                <input
                  id="guidanceScale"
                  type="range"
                  min="1"
                  max="20"
                  step="0.1"
                  value={guidanceScale}
                  onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="inferenceSteps" className="block text-sm text-left font-medium leading-6 text-gray-300">
                  {`Inference Steps: ${inferenceSteps}`}
                </label>
                <input
                  id="inferenceSteps"
                  type="range"
                  min="10"
                  max="60"
                  step="1"
                  value={inferenceSteps}
                  onChange={(e) => setInferenceSteps(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
            </div>

            {/* <div className='pt-4'>
              <label htmlFor="optionsDropdown" className="block text-sm text-left font-medium leading-6 text-gray-300">
                Scheduler:
              </label>
              <select
                value={scheduler}
                id="optionsDropdown"
                className="block w-full mt-2 p-2 text-gray-300 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => setScheduler(e.target.value)}
              >
                <option value="EulerA" className="text-gray-300 bg-gray-800">Euler A</option>
                <option value="Euler" className="text-gray-300 bg-gray-800">Euler</option>
                <option value="LMS" className="text-gray-300 bg-gray-800">LMS</option>
                <option value="Heun" className="text-gray-300 bg-gray-800">Heun</option>
                <option value="DPM2" className="text-gray-300 bg-gray-800">DPM2</option>
                <option value="DPM2SA" className="text-gray-300 bg-gray-800">DPM2SA</option>
                <option value="DPM2M" className="text-gray-300 bg-gray-800">DPM2M</option>
                <option value="DPMSDE" className="text-gray-300 bg-gray-800">DPMSDE</option>
                <option value="DPMfast" className="text-gray-300 bg-gray-800">DPMfast</option>
                <option value="DPMAdaptive" className="text-gray-300 bg-gray-800">DPMAdaptive</option>
                <option value="LMSKarras" className="text-gray-300 bg-gray-800">LMSKarras</option>
                <option value="DPM2Karras" className="text-gray-300 bg-gray-800">DPM2Karras</option>
                <option value="DPM2AKarras" className="text-gray-300 bg-gray-800">DPM2AKarras</option>
                <option value="DPM2MKarras" className="text-gray-300 bg-gray-800">DPM2MKarras</option>
                <option value="DPMSDEKarras" className="text-gray-300 bg-gray-800">DPMSDEKarras</option>
                <option value="DDIM" className="text-gray-300 bg-gray-800">DDIM</option>
                <option value="PLMS" className="text-gray-300 bg-gray-800">PLMS</option>
                <option value="UniPC" className="text-gray-300 bg-gray-800">UniPC</option>
                <option value="Undefined" className="text-gray-300 bg-gray-800" selected>Undefined</option>
                <option value="LCM" className="text-gray-300 bg-gray-800">LCM</option>
                <option value="DDPM" className="text-gray-300 bg-gray-800">DDPM</option>
                <option value="DEIS" className="text-gray-300 bg-gray-800">DEIS</option>
              </select>
            </div> */}

            <div className='pt-4'>
              <TextArea
                Title={"Seed"}
                Rows={1}
                value={seed}
                setValue={setSeed}
              />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}


function VideoMoreOptionsAccordion({
  Title,
  seed,
  setSeed,
  cond_aug,
  setCondAug
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hs-accordion-group">
      <div className={`hs-accordion ${isOpen ? "active" : ""}`}>
        <button
          type="button"
          className="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
          aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3 className="text-base font-semibold leading-6 text-gray-300">{Title}</h3>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e2e8f0" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#e2e8f0" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </button>

        {isOpen && (
          <div
            id="hs-basic-with-title-and-arrow-stretched-collapse-one"
            className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
          >

            <div className="flex gap-x-4">
              <div className="flex-1">
                <TextArea
                  Title={"Seed"}
                  Rows={1}
                  value={seed}
                  onChange={(e) => setSeed(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <TextArea
                  Title={"Cond Aug"}
                  Rows={1}
                  value={cond_aug}
                  onChange={(e) => setCondAug(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// const products = [
//   {
//     id: "stable-diffusion-xl",
//     "model_name": "Stable Diffusion XL",
//     "base_model": "",
//     "learning_rate": null,
//     "resolution": null,
//     "training_steps": null,
//     "status": "Finished",
//     "batch_size": null,
//     title: 'Stable Diffusion XL',
//     price: 'stable-diffusion-xl',
//     imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/sdxl.jpeg',
//     description: 'Stable Diffusion XL',
//     link: 'stable-diffusion-xl'
//   },
//   {
//     id: "absolute-reality",
//     "model_name": "Absolute Reality",
//     "base_model": "",
//     "learning_rate": null,
//     "resolution": null,
//     "training_steps": null,
//     "status": "Finished",
//     "batch_size": null,
//     title: 'Absolute Reality',
//     price: 'absolute-reality',
//     imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/absreality.png',
//     description: 'Absolute Reality',
//     link: 'absolute-reality'
//   },
//   {
//     id: "realistic-vision-v51",
//     "model_name": "Realistic Vision V51",
//     "base_model": "",
//     "learning_rate": null,
//     "resolution": null,
//     "training_steps": null,
//     "status": "Finished",
//     "batch_size": null,
//     title: 'Realistic-Vision-5.1',
//     price: 'realistic-vision-v51',
//     imageSrc: './realistic_vision_51.jpeg',
//     description: 'Realistic Vision V5.1',
//     link: 'realistic-vision-v51'
//   },
//   {
//     id: "meina-mix",
//     "model_name": "MeinaMix",
//     "base_model": "",
//     "learning_rate": null,
//     "resolution": null,
//     "training_steps": null,
//     "status": "Finished",
//     "batch_size": null,
//     title: 'Meina mix',
//     price: 'meinamix',
//     imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/meinamix.jpeg',
//     description: 'meina mix',
//     link: 'meina-mix'
//   },
//   {
//     id: "epic-photogasm",
//     "model_name": "Epic Photogasm",
//     "base_model": "",
//     "learning_rate": null,
//     "resolution": null,
//     "training_steps": null,
//     "status": "Finished",
//     "batch_size": null,
//     title: 'Epic-photogasm',
//     price: 'Epic-photogasm',
//     imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/epicphotogasm.jpeg',
//     description: 'epicphotogasm',
//     link: 'epic-photogasm'
//   },
//   {
//     id: "neverending-dream-ned",
//     "model_name": "Neverending Dream NED",
//     "base_model": "",
//     "learning_rate": null,
//     "resolution": null,
//     "training_steps": null,
//     "status": "Finished",
//     "batch_size": null,
//     title: 'neverending_ned',
//     price: 'neverending_ned',
//     imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/neverending_ned.png',
//     description: 'neverending_ned',
//     link: 'neverending_ned'
//   },
//   {
//     id: "dreamshaper",
//     "model_name": "Dreamshaper",
//     "base_model": "",
//     "learning_rate": null,
//     "resolution": null,
//     "training_steps": null,
//     "status": "Finished",
//     "batch_size": null,
//     title: 'dreamshaper',
//     price: 'dreamshaper',
//     imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/dreamshaper.png',
//     description: 'dreamshaper',
//     link: "dreamshaper"
//   },
// ]

const products = [
  {
    id: "stable-diffusion-xl",
    "model_name": "Stable Diffusion XL",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Stable Diffusion XL',
    price: 'stable-diffusion-xl',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/sdxl.jpeg',
    description: 'Stable Diffusion XL',
    link: 'stable-diffusion-xl'
  },
  {
    id: "juggernaut-xl",
    "model_name": "Juggernaut XL",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'juggernaut xl',
    price: 'juggernaut xl',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/juggernautxl.jpeg',
    description: 'juggernautxl',
    link: 'juggernaut-xl'
  },
  {
    id: "dreamshaper-xl",
    "model_name": "Dreamshaper XL",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'dreamshaper xl',
    price: 'dreamshaper xl',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/dreamshaper.png',
    description: 'dreamshaperxl',
    link: "dreamshaper-xl"
  },
  {
    id: "stable-diffusion-v15",
    "model_name": "Stable Diffusion V15",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Stable Diffusion 1.5',
    price: 'stable-diffusion-v15',
    imageSrc: 'https://flush-user-images.s3.amazonaws.com/generated_images/10a6bfbe3dea681596383c6cbfec0dffaf26684ef0df10a9505e2ef87cfe040e/image_1036.jpg',
    description: 'Stable Diffusion 1.5',
    link: "stable-diffusion-v15"
  },
  {
    id: "stable-diffusion-v21",
    "model_name": "Stable Diffusion V21",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Stable Diffusion 2.1',
    price: 'stable-diffusion-v21',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/sd21.jpeg',
    description: 'Stable Diffusion 2.1',
    link: 'stable-diffusion-v21'
  },
  {
    id: "absolute-reality",
    "model_name": "Absolute Reality",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Absolute Reality',
    price: 'absolute-reality',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/absreality.png',
    description: 'Absolute Reality',
    link: 'absolute-reality'
  },
  {
    id: "realistic-vision-v51",
    "model_name": "Realistic Vision V51",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Realistic-Vision-5.1',
    price: 'realistic-vision-v51',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/realistic_vision_51.jpeg',
    description: 'Realistic Vision V5.1',
    link: 'realistic-vision-v51'
  },
  {
    id: "c702cee3-dd0c-4924-a666-8288b565097e",
    "model_name": "Lyriel",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Lyriel',
    price: 'lyriel',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/lyriel.jpeg',
    description: 'Lyriel',
    link: 'lyriel'
  },
  {
    id: "8b9d2b19-08e6-42f4-8bdd-e471d4180c01",
    "model_name": "Cyberrealistic",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Cyberrealistic',
    price: 'cyberrealistic',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/cyberrealistic.jpeg',
    description: 'Cyberrealistic',
    link: 'cyberrealistic'
  },
  {
    id: "441f8ac2-3d09-4985-9f4f-136014d694fa",
    "model_name": "MeinaMix",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Meina mix',
    price: 'meinamix',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/meinamix.jpeg',
    description: 'meina mix',
    link: 'meina-mix'
  },
  {
    id: "10850d7b-4a59-420c-b3ef-1939ac3931c3",
    "model_name": "Epic Photogasm",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Epic-photogasm',
    price: 'Epic-photogasm',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/epicphotogasm.jpeg',
    description: 'epicphotogasm',
    link: 'epic-photogasm'
  },
  {
    id: "74db61f2-dae8-4d27-8d2d-6ca7d55f79cb",
    "model_name": "Magic Mix Realistic",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Magic-mix realistic',
    price: 'Magic-mix realistic',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/magicmixrealistic.jpeg',
    description: 'Magic-mix realistic',
    link: 'magic-mix-realistic'
  },
  {
    id: "348e86b1-7d83-46e9-b58b-60fe1ec52a7f",
    "model_name": "Photon",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Photon',
    price: 'Photon',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/photon.jpeg',
    description: 'Photon',
    link: 'photon'
  },
  {
    id: "afdce0d5-089b-4095-aad6-f38e4ebea384",
    "model_name": "Beautiful Realistic Asians",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Beautiful Realistic Asians',
    price: 'Beautiful Realistic Asians',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/beautifulrealisticasians.jpeg',
    description: 'Beautiful Realistic Asians',
    link: 'beautiful-realistic-asians'
  },
  {
    id: "b524be42-107c-4424-ad1b-0cd6085e65a3",
    "model_name": "XXMix_9realistic",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'XXMix_9realistic',
    price: 'XXMix_9realistic',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/XXMix_9realistic.jpeg',
    description: 'XXMix_9realistic',
    link: 'xxmix_9realistic'
  },
  {
    id: "22d065c4-022c-4c40-a7de-f5699cc6f6b4",
    "model_name": "Neverending Dream NED",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'neverending_ned',
    price: 'neverending_ned',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/neverending_ned.png',
    description: 'neverending_ned',
    link: 'neverending_ned'
  },
  {
    id: "0336e7ad-1bf7-41e3-9578-7790bae77813",
    "model_name": "Meina Unreal",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'meina unreal',
    price: 'meina unreal',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/meinaunreal.jpeg',
    description: 'meina unreal',
    link: 'meina-unreal'
  },
  {
    id: "2e1b9ddb-66f7-4fc5-a58a-3b881497ebb0",
    "model_name": "Dreamshaper",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'dreamshaper',
    price: 'dreamshaper',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/dreamshaper.png',
    description: 'dreamshaper',
    link: "dreamshaper"
  },
  {
    id: "a9b28096-1bf6-4902-8536-63e565bfeadd",
    "model_name": "Ghostmix",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'ghostmix',
    price: 'ghostmix',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/ghostmix.jpeg',
    description: 'ghostmix',
    link: "ghostmix"
  },
  {
    id: "d16c70a7-a556-4a06-9711-4d5cdd76f07b",
    "model_name": "Toonyou",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Toonyou',
    price: 'Toonyou',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/toonyou.jpeg',
    description: 'Toonyou',
    link: 'toonyou'
  },
  {
    id: "5d83d50e-7316-437d-bb47-90e390abbe0a",
    "model_name": "Analog Madness Realistic Model",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'analog realistic',
    price: 'analog realistic',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/analog_realistic.jpeg',
    description: 'analog realistic',
    link: 'analog-realistic'
  },
  {
    id: "05992f14-1e1c-48d4-93d8-c12d77b80b9c",
    "model_name": "Analog Diffusion",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'analog diffusion',
    price: 'analog diffusion',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/analog_diffusion.jpeg',
    description: 'analog diffusion',
    link: 'analog-diffusion'
  },
  {
    id: "anything-v5",
    "model_name": "Anything V5",
    "base_model": "",
    "learning_rate": null,
    "resolution": null,
    "training_steps": null,
    "status": "Finished",
    "batch_size": null,
    title: 'Anything V-5',
    price: 'anything-v5',
    imageSrc: 'https://flush-user-images.s3.us-east-2.amazonaws.com/anythingv5.jpeg',
    description: 'Anything-v5',
    link: 'anything-v5'
  },
]

export default function Playground({ base_models, credits, setCredits, generationsImages, setGenerationsImages, generationsVideos, setGenerationsVideos, activeTab, startingModel, setLastPartOfUrl }) {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(deliveryMethods[0])
  const tabs = [
    { name: 'Text-to-Image', href: '#', current: true },
    { name: 'Image-to-Image', href: '#', current: false },
    { name: 'Text-to-Video', href: '#', current: false },
    { name: 'Image-to-Video', href: '#', current: false },
  ]

  const [apiKey, setApiKey] = useState("");
  const [models, setModels] = useState([]);

  const location = useLocation();

  const getLastPartOfUrl = () => {
    const parts = location.pathname.split('/'); // Splits the pathname by '/'
    setLastPartOfUrl((parts[parts.length - 1] === 'playground') ? "" : parts[parts.length - 1]); // Returns the last part
  };

  getLastPartOfUrl()

  useEffect(() => {
    const checkSession = async () => {
      const { data: userData, error } = await supabase.auth.getSession();
      if (!userData.session) {
        // console.log("here")
        // console.log('User is not signed in!', data);
      } else if (error) {
        console.log('Error getting session:', error.message);
      }
      else {
        setApiKey(userData.session.user.id);
      }
      const { data: userData2 } = await supabase.auth.getUser();

      async function fetchData() {
        try {
          const { data: data2, error: error2 } = await supabase
            .from('all_models')
            .select("*")
            .eq('user_id', userData2.user.id ?? '');

          if (error2) throw error2;
          // console.log("data 2", data2);
          // const model_dict = data2.reduce((acc, { model_name, id }) => {
          //   if (model_name && id) acc[model_name] = id;
          //   return acc;
          // }, {});
          // console.log("models before", models)
          // console.log("new models", model_dict)
          // setModels(prevModels => ({ ...prevModels, ...data2 }));
          // console.log("base models", base_models);
          // console.log("models", models)
          // setModels([...base_models, ...data2]);
          setModels([...products, ...data2]);
          // setModels(base_models => ([...base_models, ...data2]));
        } catch (error) {
          // console.log("error", error)
        }
      }
      fetchData();
      // console.log("total models", models);
    };

    checkSession();
    // console.log("api key", apiKey);
    // setApiKey("a7b91275-b17e-41ea-a988-79a3d6016c12")
  }, []);

  const [promptImage, setPromptImage] = useState("");
  const [negativePromptImage, setNegativePromptImage] = useState("ugly, deformed, malformed, lowres, mutant, mutated, disfigured, compressed, noise, artifacts, dithering, simple, watermark, text, font, signage, collage, pixel");
  const [modelTypeImage, setModelTypeImage] = useState("stable-diffusion-xl2");
  const [seedImage, setSeedImage] = useState(null);
  const [numberOfImages, setNumberOfImages] = useState(4);
  const [guidanceScaleImage, setGuidanceScaleImage] = useState(7.5);
  const [heightImage, setHeightImage] = useState(1024);
  const [widthImage, setWidthImage] = useState(1024);
  const [inferenceStepsImage, setInferenceStepsImage] = useState(20);
  const [isVerified, setIsVerified] = useState([]);
  const [isVerifiedVid, setIsVerifiedVid] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("");
  const [loading1, setLoading1] = useState(false);
  const fileInputRef = useRef(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImage2, setUploadedImage2] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fps, setFps] = useState(6);
  const [motion_bucket_id, setMBID] = useState(127);
  const [cond_aug, setCondAug] = useState(0.02);
  const [seedVideo, setSeedVideo] = useState(null);
  const [scheduler, setScheduler] = useState("EulerA");

  const [chosenModel, setChosenModel] = useState(startingModel)

  const [warningModal, setWarningModalOpen] = useState(true);

  const handleFilesUpload = (files) => {
    if (files.length > 0) {
      const file = files[0]; // Only take the first file
      const imageSrc = URL.createObjectURL(file);
      if (activeTab == "Video") {
        setUploadedImage2([imageSrc]);
      }
      else {
        setUploadedImage([imageSrc]); // Set only one image
      }
    }
  }

  const onFileChange = (e) => {
    handleFilesUpload(e.target.files);
  }

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleFilesUpload(files);
  }, []);

  const handleGenerate = (event) => {
    event.preventDefault();
    if (activeTab == "Videos") {
      GenerateVideos();
    }
    else {
      GenerateImages();
    }
  }

  const GenerateVideos = async () => {

    try {
      let newMessage = "";
      if (base64Vid == "") {
        newMessage = "Please upload a valid image, max dimensions of 1024 x 1024"
      }
      else if (isNaN(cond_aug) || cond_aug < 0 || cond_aug > 1) {
        newMessage = "Please choose a valid cond aug between 0 and 1";
      }
      else if (isNaN(seedVideo) || seedVideo < 0) {
        newMessage = "Please choose a valid positive seed.";
      }
      if (newMessage != "") {
        setShow(false);
        setMessage(newMessage);
        setShow(true);
      }
      else {
        setLoading2(true);
        const payloadDataBef = {
          "url": base64Vid,
          "fps": fps,
          "seed": seedVideo,
          "cond_aug": cond_aug,
          "motion_bucket_id": motion_bucket_id,
          "model_id": "stable-video-diffusion"
        };

        let payloadData = {};
        Object.entries(payloadDataBef).forEach(([key, value]) => {
          if (value !== null && !Number.isNaN(value)) payloadData[key] = value;
        });

        const timeOptions = {
          weekday: undefined, // Do not display
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'America/Chicago',
          timeZoneName: 'short'
        };
        const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);

        // console.log(modelType);
        Object.keys(payloadData).forEach(key => {
          if (payloadData[key] === null || payloadData[key] === undefined || payloadData[key] == "") {
            delete payloadData[key];
          }
        });
        let result = null;
        result = await callAPI(payloadData, "https://api.flushai.cloud/web/v1/video/img2vid");
        // console.log("result", result);
        let urls = result['urls'];
        let temp_gen = {
          'prompt': "",
          'image_urls': urls,
          'time': timeFormatter.format(new Date()).replace(',', ''),
          'num_images': parseInt(1, 10)
        }
        setCredits(credits - 20);
        setGenerationsVideos(generations => [...generations, temp_gen]);
        setIsVerifiedVid(isVerified => [...isVerified, false]);
        // console.log("generationImages", generationsImages);
      }
    } catch (error) {
      if (apiKey === undefined) {
        setMessage("Error with your generation, please upgrade to access this feature."); // Set the state with the appropriate message.
      } else {
        setMessage("Error with your generation, please upgrade to access this feature."); // Set the state with the appropriate message.
      }
      setShow(true); // Show the modal.
    } finally {
      setLoading2(false);
    }
  };

  async function callAPI(dataPayload, url) {
    const API_URL = url;

    const headers = {
      "Content-Type": "application/json",
    };

    dataPayload['user_id'] = apiKey;
    console.log("data payload", dataPayload)

    try {
      const response = await fetch(API_URL, {
        method: "POST", // or POST or PUT etc., depending on the API requirement
        headers: headers,
        body: JSON.stringify(dataPayload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('output of API');
      return data;

    } catch (error) {
      console.error("There was a problem with the fetch operation:", error.message);
    }
  }

  const VerifiedImage = ({ imageUrl, altDescription, index }) => {
    const indexRef = useRef(index);

    const changeIndex = (currIndex) => {
      const newArr = [...isVerified];
      newArr[currIndex] = true;
      setIsVerified(newArr);
    };

    useEffect(() => {
      let active = true;
      const checkImageAndUpdate = () => {
        if (!active || isVerified[indexRef.current]) return;

        fetch(imageUrl)
          .then(response => {
            if (!active) return;
            if (response.ok) {
              changeIndex(indexRef.current); // Use the ref's current value
            } else {
              setTimeout(checkImageAndUpdate, 1000);
            }
          })
          .catch(error => {
            if (!active) return;
            setTimeout(checkImageAndUpdate, 1000);
          });
      };
      checkImageAndUpdate();
      return () => {
        active = false;
      };
    }, [imageUrl]);

    if (!isVerified[index]) {
      return (
        <div className='w-full'>
          <ImagePlaceholder />
        </div>
      );
    }

    // Render actual image if it is verified.
    return (
      <div className='w-full'>
        <img
          src={imageUrl}
          alt={altDescription}
          className="object-cover rounded-lg hover:brightness-50 transition duration-300 cursor-pointer"
        />
      </div>
    );
  };

  const VerifiedVideo = ({ imageUrl, altDescription, index }) => {
    const indexRef = useRef(index);

    const changeIndex = (currIndex) => {
      const newArr = [...isVerifiedVid];
      newArr[currIndex] = true;
      setIsVerifiedVid(newArr);
    };

    useEffect(() => {
      let active = true;
      const checkImageAndUpdate = () => {
        if (!active || isVerifiedVid[indexRef.current]) return;

        fetch(imageUrl)
          .then(response => {
            if (!active) return;
            if (response.ok) {
              changeIndex(indexRef.current); // Use the ref's current value
            } else {
              setTimeout(checkImageAndUpdate, 1000);
            }
          })
          .catch(error => {
            if (!active) return;
            setTimeout(checkImageAndUpdate, 1000);
          });
      };
      checkImageAndUpdate();
      return () => {
        active = false;
      };
    }, [imageUrl]);

    if (!isVerifiedVid[index]) {
      return <ImagePlaceholder />; // Render placeholder if the image is not verified.
    }

    // Render actual image if it is verified.
    return (
      <div className='w-full'>
        <video
          src={imageUrl}
          alt={altDescription}
          className="object-cover rounded-lg hover:brightness-50 transition duration-300 cursor-pointer"
          controls
        />
      </div>
    );
  };

  const navigate = useNavigate();

  const GenerateImages = async () => {
    const { data: userData, error } = await supabase.auth.getSession();
    console.log(userData.session)
    if (!userData.session) {
      console.log("HATEEEEE")
      navigate('/signin');
    }
    try {
      // console.log("seed image", seedImage);
      // console.log("model id", chosenModel.price)
      let newMessage = "";
      if (isNaN(seedImage) || seedImage < 0) {
        newMessage = "Please choose a valid positive seed.";
      }
      if (promptImage === "") {
        newMessage = "Please add a prompt for your images.";
      }
      if (newMessage != "") {
        setShow(false)
        setMessage(newMessage);
        setShow(true);
      }
      else {
        setLoading(true);
        const payloadDataBef = {
          "prompt": promptImage,
          "model_id": chosenModel.id,
          "negative_prompt": negativePromptImage,
          "seed": seedImage,
          "num_images": parseInt(numberOfImages, 10),
          "scale": parseFloat(guidanceScaleImage),
          "height": parseInt(heightImage, 10),
          "width": parseInt(widthImage, 10),
          "num_steps": parseInt(inferenceStepsImage, 10),
          "scheduler": scheduler
        };
        if (uploadedImage != null) {
          payloadDataBef["input_image"] = base64Image;
          payloadDataBef["mode"] = "base64";
        }

        let payloadData = {};
        Object.entries(payloadDataBef).forEach(([key, value]) => {
          if (value !== null && !Number.isNaN(value)) payloadData[key] = value;
        });

        const timeOptions = {
          weekday: undefined, // Do not display
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'America/Chicago',
          timeZoneName: 'short'
        };
        const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);

        // console.log(modelType);
        Object.keys(payloadData).forEach(key => {
          if (payloadData[key] === null || payloadData[key] === undefined || payloadData[key] == "") {
            delete payloadData[key];
          }
        });
        // console.log("pay load data", payloadData);
        let result = null;
        if (uploadedImage == null) {
          console.log("payload data", payloadData);
          result = await callAPI(payloadData, "https://api.flushai.cloud/web/v1/images/txt2img");
        }
        else {
          if (chosenModel.id == "stable-diffusion-xl" || chosenModel.id == "stable-diffusion-v15" || chosenModel.id == "stable-diffusion-v21" || chosenModel.id == "absolute-reality" || chosenModel.id == "realistic-vision-v51" || chosenModel.id == "anything-v5") {
            result = await callAPI(payloadData, "https://api.flushai.cloud/web/v1/images/img2img")
          }
          else {
            setShow(false);
            setMessage("Image to image currently not supported with this model");
            setShow(true);
            setLoading(false);
            return;
          }
        }
        // console.log("result", result);
        let urls = result['urls'];
        let temp_gen = {
          'prompt': promptImage,
          'image_urls': urls,
          'time': timeFormatter.format(new Date()).replace(',', ''),
          'num_images': parseInt(numberOfImages, 10)
        }
        if (chosenModel.id == "stable-diffusion-xl" || chosenModel.id == "juggernaut-xl" || chosenModel.id == "dreamshaper-xl") {
          let val = numberOfImages * 3;
          setCredits(credits - parseInt(val, 10));
        }
        else {
          if (heightImage > 768 || widthImage > 768) {
            let val = numberOfImages * 2;
            setCredits(credits - parseInt(val, 10));
          }
          else {
            setCredits(credits - parseInt(numberOfImages, 10));
          }
        }
        setGenerationsImages(generations => [...generations, temp_gen]);
        setIsVerified(isVerified => [...isVerified, false]);
      }
    } catch (error) {
      if (apiKey === undefined) {
        setMessage("Error with your generation, please upgrade to access this feature."); // Set the state with the appropriate message.
      } else {
        setMessage("Error with your generation, please upgrade to access this feature."); // Set the state with the appropriate message.
      }
      setShow(true); // Show the modal.
    } finally {
      setLoading(false);
    };
  }

  async function callLLMAPI(dataPayload) {
    const API_URL = "https://api.flushai.cloud/web/v1/helper/prompt-enhancer"
    const headers = {
      "Content-Type": "application/json",
      // "x-api-key": apiKey
    };

    dataPayload['user_id'] = apiKey;
    // console.log("data payload", dataPayload)

    try {
      const response = await fetch(API_URL, {
        method: "POST", // or POST or PUT etc., depending on the API requirement
        headers: headers,
        body: JSON.stringify(dataPayload)
      });

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

  const improvePrompt = async (event) => {
    event.preventDefault();
    // console.log("improving prompt");

    let newMessage = "";
    if (promptImage === "") {
      newMessage = "Please add a prompt for your images.";
    }

    if (newMessage !== "") {
      setShow(false); // Hide the modal.
      setMessage(newMessage); // Set the state with the appropriate message.
      setShow(true); // Show the modal.
    } else {
      setShow(false); // Hide the modal.
      setLoading1(true);
      try {
        let payloadData = {
          "prompt": promptImage
        };
        let result = await callLLMAPI(payloadData);
        let newPrompt = result['output']
        setPromptImage(newPrompt);
        setCredits(credits - 1);
        // setNumImages(num_images - 2);
      }
      catch (error) {
        if (apiKey === undefined) {
          setMessage("Error with your generation, please upgrade to access this feature."); // Set the state with the appropriate message.
        } else {
          setMessage("Error with your generation, please upgrade to access this feature."); // Set the state with the appropriate message.
        }
        setShow(true); // Show the modal.
      } finally {
        setLoading1(false);
      }
    }
  }

  const [base64Image, setBase64Image] = useState(""); // State to hold the base64 string
  const [base64Vid, setBase64Vid] = useState(""); // State to hold the base64 string
  const handleImageChange = (event) => {
    event.preventDefault();
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0]; // Only take the first file

      if (!file.type.includes("jpeg")) {
        setShow(false); // Hide the modal.
        setMessage("Only JPEG files are allowed."); // Set the state with the appropriate message.
        setShow(true); // Show the modal.
        return; // Exit the function if the file is not a JPEG
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        // Create an image element
        const img = new Image();

        img.onload = function () {
          // Check if image size is within the bounds
          if (img.width > 1024 || img.height > 1024) {
            setShow(false); // Hide the modal.
            setMessage("Image size exceeds the maximum 1024 x 1024 dimensions."); // Set the state with the appropriate message.
            setShow(true); // Show the modal.
            return; // Exit the function if the image is too large
          }

          // Create a canvas element
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          // Calculate the scaling factor to keep the aspect ratio
          let scaleFactor = Math.min(1, 512 / img.width, 512 / img.height);

          // Set the canvas size to the scaled dimensions
          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Convert the canvas to a base64 string
          const resizedDataUrl = canvas.toDataURL(file.type);
          const base64String = resizedDataUrl.split(',')[1];

          // Store the base64 string in the stat

          // Set the FileReader result as the uploadedImage for preview
          if (activeTab == "Images") {
            setUploadedImage(e.target.result);
            setBase64Image(base64String);
          }
          else {
            setUploadedImage2(e.target.result)
            setBase64Vid(base64String);
          }
          // setUploadedImage(e.target.result);
        };

        // Set the src of the image to the FileReader result
        img.src = e.target.result;
      };

      reader.readAsDataURL(file); // Read the file
    }
  };


  return (
    <div className="bg-[#1C1C1C]">
      <WarningModal show={show} setShow={setShow} message={message} />
      <div className="px-6 pb-24 pt-2 overflow-y-auto h-screen">
        {activeTab === 'Images' && (
          <form className="flex flex-col md:flex-row">
            {/* Order summary */}
            <div className="flex-shrink-0 w-full md:w-[400px] md:pr-5 h-screen md:h-auto overflow-auto">
              <div className="mt-4 rounded-lg overflow-y-auto bg-[#1F1F1F] shadow-sm" style={{ border: '0.5px solid', borderColor: "#3b3b3b" }}>
                <div className="overflow-y-auto overflow-y-auto md:h-[calc(79vh-78px)]"> {/* Adjust height as needed */}
                  <dl className="space-y-6 px-5 py-2 sm:px-5">
                    <div className=" border-b border-[#3b3b3b] pb-4">
                      <ModelsAccordion model={chosenModel} setModel={setChosenModel} models={models} setHeight={setHeightImage} setWidth={setWidthImage} setSteps={setInferenceStepsImage} />
                    </div>
                  </dl>

                  <div className='px-5 pt-2'>
                    <div>
                      <TextArea Title={"Prompt"} Rows={4} value={promptImage} setValue={setPromptImage} />
                    </div>
                    <div className="flex justify-end">
                      {loading1 ? (
                        <FastSpinner size={20} />
                      ) : (
                        <button
                          type="button"
                          className="rounded mt-2 bg-[#282828] px-2 py-1 text-xs font-semibold text-gray-300 ring-1 ring-[#363636]"
                          onClick={improvePrompt}
                        >
                          Enhance Prompt
                        </button>
                      )}
                    </div>
                  </div>

                  <div className='px-5 pt-4 pb-4'>
                    <TextArea Title={"Negative Prompt"} Rows={1} value={negativePromptImage} setValue={setNegativePromptImage} />
                  </div>
                  <div className="flex px-5 gap-x-5 pb-3">
                    <div className="flex-1">
                      <label htmlFor="heightRange" className="block text-sm text-left font-medium leading-6 text-gray-300">
                        {`Height: ${heightImage}`}
                      </label>
                      <input
                        id="heightRange"
                        type="range"
                        min="128"
                        max="1024"
                        step="8"
                        value={heightImage} // Bind value to the state variable
                        onChange={(e) => setHeightImage(parseInt(e.target.value, 10))} // Update state on change
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>

                    <div className="flex-1">
                      <label htmlFor="widthRange" className="block text-sm text-left font-medium leading-6 text-gray-300">
                        {`Width: ${widthImage}`}
                      </label>
                      <input
                        id="widthRange"
                        type="range"
                        min="128"
                        max="1024"
                        step="8"
                        value={widthImage} // Bind value to the state variable
                        onChange={(e) => setWidthImage(parseInt(e.target.value, 10))} // Update state on change
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  {/* Image upload input */}
                  {/* <div className='px-5'>
                      <label htmlFor="imageUpload" className="block text-sm text-left font-medium leading-6 text-gray-300">
                        Upload Image (Optional):
                      </label>
                    </div> */}

                  {/* <div
                      className={`mt-2 mb-3 mx-5 flex justify-center rounded-lg border ${isDragging ? "bg-gray-500/50" : "bg-transparent"} border-dashed border-[#3b3b3b] px-6 py-7`}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                    >
                      <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className={`upload-text-bg relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500`}
                          >
                            <span>Upload image</span>
                            <input
                              ref={fileInputRef}
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleImageChange}
                              accept="image/jpeg"
                              multiple
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div> */}

                  {/* Image preview */}
                  {/* {uploadedImage && (
                      <div className='px-5 py-4'>
                        <img
                          src={uploadedImage}
                          alt="Uploaded Preview"
                          className="w-full h-auto rounded-md"
                        />
                      </div>
                    )} */}

                  <dl className="space-y-6 px-5 py-2 sm:px-5">
                    <div className=" border-t border-[#3b3b3b] pt-1 pb-2">
                      <MoreOptionsAccordion Title={"More Options"} guidanceScale={guidanceScaleImage} setGuidanceScale={setGuidanceScaleImage}
                        inferenceSteps={inferenceStepsImage} setInferenceSteps={setInferenceStepsImage} seed={seedImage} setSeed={setSeedImage}
                        numberOfImages={numberOfImages} setNumberOfImages={setNumberOfImages} scheduler={scheduler} setScheduler={setScheduler} />
                    </div>
                  </dl>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6" style={{ borderTop: '0.5px solid', borderColor: "#3b3b3b" }}>
                  {loading ? (
                    <FastSpinner size={20} />
                  ) : (
                    <button
                      type="submit"
                      className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      onClick={handleGenerate}
                    >
                      Generate
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className='flex-grow pt-2'>
              <div className="mx-auto max-w-7xl sm:px-2 lg:px-3 bg-[#1F1F1F] mt-2 rounded-md">
                <div className='' />
                <div className="pt-3">
                  <div className="flex w-full flex-col">
                    <div className="mb-4 h-[73vh] overflow-y-scroll">

                      {generationsImages.slice().reverse().map((item, index) => {
                        return (
                          <div key={index}> {/* Set the background to black for a dark theme */}
                            <div className="mx-auto max-w-7xl sm:px-2 lg:px-3 mb-5 rounded-md">
                              <div className="overflow-hidden rounded-lg border border-[#3b3b3b] shadow-sm mb-2 bg-dark"> {/* bg-dark for dark theme text area */}
                                {/* Prompt display with dark theme */}
                                <textarea
                                  rows={1}
                                  name="description"
                                  style={{ paddingLeft: "10px", height: "30px", lineHeight: "30px", backgroundColor: "#2D2D2D", color: "text-gray-300" }} /* Adjusted for dark theme */
                                  id={`description-${index}`}
                                  className="block w-full resize-none border-0 py-0 text-gray-300 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6" /* Text color changed to white */
                                  disabled
                                  value={item.prompt}
                                />
                              </div>
                              <div className="pt-3">
                                <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center w-full"> {/* Center the content */}
                                  {/* <div className="flex space-x-2"> */}
                                  {item['image_urls'].map((image, imageIndex) => {
                                    return (
                                      <VerifiedImage
                                        key={imageIndex}
                                        imageUrl={image}
                                        altDescription="Description of Image"
                                        index={generationsImages.length - index - 1}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {activeTab === 'Videos' && (
          <form className="flex flex-col md:flex-row">
            {/* Order summary */}
            <div className="flex-shrink-0 w-full md:w-[400px] md:pr-5 h-screen md:h-auto overflow-auto">
              <div className="mt-4 rounded-lg overflow-y-auto bg-[#1F1F1F] shadow-sm" style={{ border: '0.5px solid', borderColor: "#3b3b3b" }}>
                <div className="overflow-y-auto md:h-[calc(71vh-70px)]"> {/* Adjust height as needed */}
                  <dl className="space-y-6 px-5 py-2 sm:px-5">
                    <div className=" border-b border-[#3b3b3b] pb-4">
                      <VideoModelsAccordian Title={"Stable Video Diffusion"} />
                    </div>
                  </dl>

                  {/* Image upload input */}
                  <div className='px-5'>
                    <label htmlFor="imageUpload" className="block text-sm text-left font-medium leading-6 text-gray-300">
                      Upload Image:
                    </label>
                  </div>

                  <div
                    className={`mt-2 mb-3 mx-5 flex justify-center rounded-lg border ${isDragging ? "bg-gray-500/50" : "bg-transparent"} border-dashed border-[#3b3b3b] px-6 py-7`}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                  >
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className={`upload-text-bg relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500`}
                        >
                          <span>Upload image</span>
                          <input
                            ref={fileInputRef}
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleImageChange}
                            accept="image/jpeg"
                            multiple
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>

                  {/* Image preview */}
                  {uploadedImage2 && (
                    <div className='px-5 py-4'>
                      <img
                        src={uploadedImage2}
                        alt="Uploaded Preview"
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                  )}

                  <div className="flex px-5 gap-x-5 pb-3">
                    <div className="flex-1">
                      <label htmlFor="heightRange" className="block text-sm text-left font-medium leading-6 text-gray-300">
                        {`Frames Per Second: ${fps}`}
                      </label>
                      <input
                        id="heightRange"
                        type="range"
                        min="5"
                        max="20"
                        step="1"
                        value={fps} // Bind value to the state variable
                        onChange={(e) => setFps(parseInt(e.target.value, 10))} // Update state on change
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>

                    <div className="flex-1">
                      <label htmlFor="widthRange" className="block text-sm text-left font-medium leading-6 text-gray-300">
                        {`Motion Bucket ID: ${motion_bucket_id}`}
                      </label>
                      <input
                        id="widthRange"
                        type="range"
                        min="1"
                        max="255"
                        step="8"
                        value={motion_bucket_id} // Bind value to the state variable
                        onChange={(e) => setMBID(parseInt(e.target.value, 10))} // Update state on change
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                    </div>
                  </div>

                  <dl className="space-y-6 px-5 py-2 sm:px-5">
                    <div className=" border-t border-[#3b3b3b] pt-1 pb-5">
                      <VideoMoreOptionsAccordion Title={"More Options"} setCondAug={setCondAug} cond_aug={cond_aug} seed={seedVideo} setSeed={setSeedVideo} />
                    </div>
                  </dl>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6" style={{ borderTop: '0.5px solid', borderColor: "#3b3b3b" }}>
                  {loading2 ? (
                    <FastSpinner size={20} />
                  ) : (<button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    onClick={handleGenerate}
                  >
                    Generate
                  </button>
                  )}
                </div>
              </div>
            </div>

            <div className='flex-grow pt-2'>
              <div className="mx-auto max-w-7xl sm:px-2 lg:px-3 bg-[#1F1F1F] mt-2 rounded-md">
                <div className='' />
                <div className="pt-3">
                  <div className="flex w-full flex-col">
                    <div className={`mb-4`}>


                      {generationsVideos.slice().reverse().map((item, index) => {
                        return (
                          <div key={index}> {/* Set the background to black for a dark theme */}
                            <div className="mx-auto max-w-7xl sm:px-2 lg:px-3 mt-2 rounded-md">
                              <div className="overflow-hidden rounded-lg border border-[#3b3b3b] shadow-sm mb-2 bg-dark"> {/* bg-dark for dark theme text area */}
                                {/* Prompt display with dark theme */}
                                <textarea
                                  rows={1}
                                  name="description"
                                  style={{ paddingLeft: "10px", height: "30px", lineHeight: "30px", backgroundColor: "#2D2D2D", color: "text-gray-300" }} /* Adjusted for dark theme */
                                  id={`description-${index}`}
                                  className="block w-full resize-none py-0 text-white placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6" /* Text color changed to white */
                                  disabled
                                  value={item.prompt}
                                />
                              </div>
                              <div className="pt-3">
                                <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center w-full"> {/* Center the content */}
                                  {/* <div className="flex space-x-2"> */}
                                  {item['image_urls'].map((image, imageIndex) => {
                                    return (
                                      <VerifiedVideo
                                        key={imageIndex}
                                        imageUrl={image}
                                        altDescription="Description of Image"
                                        index={generationsVideos.length - index - 1}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}