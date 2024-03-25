import { Fragment, useState, useEffect, useCallback, useRef } from 'react'
import { Menu, Transition, Dialog, Listbox } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {
    ChevronRightIcon
} from '@heroicons/react/24/outline'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { PlusIcon } from '@heroicons/react/20/solid'
import { Select } from '@mui/material'
import { CheckIcon, ChevronUpDownIcon, PhotoIcon, UserCircleIcon, FolderIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { XCircleIcon } from '@heroicons/react/20/solid'

const supabase = createClient('https://rrvjkmdsixuiuqktlxcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydmprbWRzaXh1aXVxa3RseGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDMxNjcsImV4cCI6MjAwNzExOTE2N30.Vo6_mO9gTwO_XqP9EDFh7LD5qHDGgIa50T8qsjI3wBk')

const tabs = [
    { name: 'Civitai', href: '#', current: true },
    { name: 'Dreambooth', href: '#', current: false },
    // { name: 'Safetensors', href: '#', current: false },
    //{ name: 'AnimateDiff', href: '#', current: false }
]

const people = [
    { id: 1, name: 'stable-diffusion-v15' },
    { id: 2, name: 'absolute-reality' },
    { id: 2, name: 'realistic-vision-v51' }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

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
                    <div className="pointer-events-auto max-w-lg overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
                                </div>
                                <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }} className="ml-3 flex-1 pt-0.5">
                                    <p className="text-sm font-small text-gray-900">{message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
}

function FinetuneModalHeader({ activeTab, setActiveTab }) {
    return (
        <div style={{ borderBottom: '1px solid', borderColor: "#3b3b3b" }}>
            <div className="sm:flex sm:items-baseline">
                <h3 className="text-base font-semibold leading-6 text-gray-300">Create New Model</h3>
                <div className="mt-4 sm:ml-10 sm:mt-0">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                className={classNames(
                                    activeTab === tab.name
                                        ? 'border-indigo-500 text-indigo-600'
                                        : 'border-transparent text-gray-400 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium'
                                )}
                                aria-current={activeTab === tab.name ? 'page' : undefined}
                                onClick={(e) => {
                                    e.preventDefault(); // Prevent the default link behavior
                                    setActiveTab(tab.name); // Update the active tab

                                }}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}

function ErrorMessage({ message }) {
    return (
        <div className="rounded-md bg-red-50 p-2 mt-3">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                    <p className="text-sm font-sm text-red-800">{message}</p>
                </div>
            </div>
        </div>
    )
}

function ImageInput({ finalImages, setFinalImages, badImages }) {
    const [selectedImages, setSelectedImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const handleFilesUpload = (files) => {
        const imagesArray = Array.from(files).map(file => URL.createObjectURL(file));
        setSelectedImages(prev => [...prev, ...imagesArray]);
        const filesArray = Array.from(files);
        setFinalImages(prev => [...prev, ...filesArray]);
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

    return (
        <div className="col-span-full mt-4">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-300">
                Training Images
            </label>
            <div
                className={`mt-1 flex justify-center rounded-lg border ${isDragging ? "bg-gray-500/50" : "bg-transparent"} border-dashed border-[#3b3b3b] px-6 py-7`}
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
                            <span>Upload files</span>
                            <input
                                ref={fileInputRef}
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={onFileChange}
                                multiple
                            />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
            <p className="mt-1 text-sm text-gray-500" id="email-description">
                Upload 4-20 images of the subject you want the model to be finetuned on.
            </p>

            {badImages && <ErrorMessage message={"Please input at least 4 images and at most 30."} />}

            {/* Display the selected images */}
            <div className="mt-4 flex flex-wrap">
                {selectedImages.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt="uploaded preview"
                        className="w-24 h-24 object-cover border border-gray-300 mb-2 ml-2 first:ml-0"
                    />
                ))}
            </div>
        </div>
    );
}

function TextBoxInput({ Title, Description, ErrorText, value, onChange, placeholder }) {
    return (
        <div className='mt-4'>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-300">
                {Title}
            </label>
            <div className="mt-1">
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-md bg-[#282828] border-0 py-1.5 pl-3 text-gray-300 shadow-sm ring-1 ring-inset ring-[#3b3b3b] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder={placeholder}
                    aria-describedby="email-description"
                    value={value}
                    onChange={onChange}
                />
            </div>
            <p className="mt-1 text-sm text-gray-500" id="email-description">
                {Description}
            </p>
        </div>
    )
}

function SelectMenu({ selected, setSelected }) {
    // const [selected, setSelected] = useState(people[1])

    return (
        <div className='mt-4'>
            <Listbox value={selected} onChange={setSelected}>
                {({ open }) => (
                    <>
                        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-300">Base Model</Listbox.Label>
                        <div className="relative mt-1">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-[#282828] py-1.5 pl-3 pr-10 text-left text-gray-300 shadow-sm ring-1 ring-inset ring-[#3b3b3b] focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                <span className="block truncate">{selected.name}</span>
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
                                <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-[#282828] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {people.map((person) => (
                                        <Listbox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                                classNames(
                                                    active ? 'bg-indigo-600 text-white' : 'text-gray-300',
                                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                                )
                                            }
                                            value={person}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                        {person.name}
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
                        <p className="mt-1 text-sm text-gray-500" id="email-description">
                            {"The model that will be used as the base for finetuning."}
                        </p>
                    </>
                )}
            </Listbox>
        </div>
    )
}

function MoreOptionsAccordion({ learning_rate, setLearningRate, batch_size, setBatchSize, training_steps, setTrainingSteps, badSteps }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="hs-accordion-group">
            <div className={`hs-accordion ${isOpen ? "active" : ""}`} id="hs-basic-with-title-and-arrow-stretched-heading-one">
                <button
                    className="-mb-10 hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold text-left text-gray-800 transition hover:text-gray-500 dark:hs-accordion-active:text-blue-500 dark:text-gray-200 dark:hover:text-gray-400"
                    aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h3 className="text-base font-semibold leading-6 text-gray-300">More Options</h3>

                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e2e8f0" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e2e8f0" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    )}
                </button>

                {isOpen && (
                    <div
                        id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                        className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                        aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one"
                    >
                        <TextBoxInput
                            Title={"Learning Rate"}
                            Description={"A number that indicates how significantly each iteration of the model updates its weights."}
                            ErrorText={"Please assign a subject for your model."}
                            value={"5e-6"} // Set the fixed value
                            readOnly // Add the readOnly attribute to make it uneditable
                        />

                        {/* <TextBoxInput Title={"Learning Rate"} Description={"A number that indicates how significantly each iteration of the model updates its weights."} ErrorText={"Please assign a subject for your model."} value={learning_rate} onChange={e => setLearningRate(e.target.value)} readOnly /> */}
                        {/* <TextBoxInput Title={"Instance Prompt"} Description={"A single word that describes the type of images the model is being trained on."} ErrorText={"Please assign a subject for your model."} value={batch_size} onChange={e => setBatchSize(e.target.value)} /> */}
                        <TextBoxInput Title={"Training Steps"} Description={"The number of steps to train the model for."} ErrorText={"Please assign a subject for your model."} value={training_steps} onChange={e => setTrainingSteps(e.target.value)} />
                        {badSteps && <ErrorMessage message={"steps must not be < 500"} />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function FinetuneModal({ models, setModels, isOpen, selectedImages, setSelectedImages, closeModal, data, setData, setLoading, setUrls, grouped_urls, formatTimeStamp, setNumModels }) {
    const [activeTab, setActiveTab] = useState(tabs[0].name);

    const [loadingCivit, setLoadingCivit] = useState(false);
    const [civitUrl, setCivitUrl] = useState("");
    const [civitName, setCivitName] = useState("");

    const [finetuneName, setFinetuneName] = useState("");
    const [subjectType, setSubjectType] = useState("");
    const [steps, setSteps] = useState(200);
    const [learning_rate, setLearningRate] = useState("5e-6");
    const [batch_size, setBatchSize] = useState(1);

    const [model, setModel] = useState(people[0]);

    const [uploadedUrls, setUploadedUrls] = useState([]);
    const [loadingFinetune, setLoadingFinetune] = useState(false);

    const [badName, setBadName] = useState(false);
    const [badSubject, setBadSubject] = useState(false);
    const [badImages, setBadImages] = useState(false);
    const [badLR, setBadLR] = useState(false);
    const [badSteps, setBadSteps] = useState(false);

    const [badCivitURL, setBadCivitURL] = useState(false);
    const [badCivitName, setBadCivitName] = useState(false);

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const [fileBlob, setFileBlob] = useState(null);
    const [fileName, setFileName] = useState(null);

    const [apiKey, setApiKey] = useState("");

    const navigate = useNavigate();

    const closeStuff = () => {
        closeModal();
    }

    useEffect(() => {
        const checkSession = async () => {
            const { data: userData } = await supabase.auth.getUser();
            if (!userData.user) {
                // navigate('/signin')
            }
            const { data: totalData, error: keysError } = await supabase
                .from('user_details')
                .select('*')
                .eq('id', userData?.user?.id);
            setApiKey(userData?.user?.id);
        }
        checkSession();
    });

    async function callCivitAPI(dataPayload) {
        const API_URL = "https://api.flushai.cloud/web/v1/models/civit" //"https://ypaqg548s7.execute-api.us-east-2.amazonaws.com/testing/newCivit";

        const headers = {
            "Content-Type": "application/json",
            // "x-api-key": apiKey
        };
        // console.log(dataPayload);
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
            // console.log(data);
            return data;

        } catch (error) {
            console.error("There was a problem with the fetch operation:", error.message);
            setMessage("Invalid Civit Model URL, please try again");
            setShow(true);
            return "bad";
        }
    }
    const fetchData = async () => {
        setLoading(true);
        const { data: userData } = await supabase.auth.getUser();
        const userId = userData?.user?.id;
        const { data: data2, error: error2 } = await supabase
            .from('all_models')
            .select()
            .eq('user_id', userId ?? '');
        const { data: data, error: error } = await supabase
            .from('inferences')
            .select()
            .eq('user_id', userId ?? '');
        const urls = grouped_urls(data);
        setUrls(urls);
        if (data2) {
            const transformedData = data2.map((obj, index) => {
                return {
                    id: obj.id,
                    created_at: formatTimeStamp(obj.created_at),
                    model_name: obj.model_name,
                    type: obj.type,
                    // model_id: obj.model_id, 
                    instance_prompt: obj.instance_prompt,
                    civit_url: obj.civit_url,
                    resolution: 512,//obj.resolution,
                    learning_rate: obj.learning_rate,
                    batch_size: 1,//obj.batch_size,
                    training_steps: obj.training_steps,
                    base_model: obj.model_id,
                    status: obj.status
                };
            });
            setModels([...models, ...transformedData])
            // setData([...base_models, ...transformedData]);
            const { data: data3, error: error2 } = await supabase
                .from('user_details')
                .select()
                .eq('id', userId ?? '');
            setNumModels(data3[0]['credits'])
            setLoading(false);
        }
    };

    const handleCivit = async () => {
        let failed = false;
        if (civitName == "") {
            setBadCivitName(true);
            failed = true;
        }
        else {
            setBadCivitName(false);
        }
        if (civitUrl == "") {
            setBadCivitURL(true);
            failed = true;
        }
        else {
            setBadCivitURL(false);
        }
        if (!failed) {
            setBadCivitName(false);
            setBadCivitURL(false);
            setLoadingCivit(true);
            const payloadData = {
                "model_url": civitUrl,
                "model_name": civitName,
            };
            // console.log("payload data", payloadData);
            const result = await callCivitAPI(payloadData);
            // console.log(result);
            if (result != "bad") {
                closeModal();
                setCivitUrl("");
                setCivitName("");
                // setNumModels()
                // setNumModels(num_models + 150);
                await fetchData();
            }
            setLoadingCivit(false);
        }
    }

    async function callDreamboothAPI(dataPayload) {
        const API_URL = "https://api.flushai.cloud/web/v1/models/dreambooth"//"https://ypaqg548s7.execute-api.us-east-2.amazonaws.com/testing/finetune";

        const headers = {
            "Content-Type": "application/json",
            // "x-api-key": apiKey
        };
        dataPayload['user_id'] = apiKey
        // console.log(dataPayload);
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
            // console.log(data);
            return data;

        } catch (error) {
            console.error("There was a problem with the fetch operation:", error.message);
        }
    }

    const createURLs = async (files) => {
        const uploadedImageUrls = [];
        const response = await getPresignedUrls(files); // Call this once outside the loop
        // console.log("response", response);
        if (response) {
            for (let i = 0; i < response.length; i++) {
                await uploadImageToS3(response[i].signedRequest, files[i]); // Use the ith response for the ith file
                uploadedImageUrls.push(response[i].url);
                // console.log("pushed image i!")
            }
        }
        return uploadedImageUrls;
        // setUploadedUrls(prev => [...prev, ...uploadedImageUrls]);
    }


    const getPresignedUrls = async (files) => {
        try {
            const data = {
                "num_urls": files.length,
                "job_type": "finetuning",
                "user_id": apiKey
            };
            // console.log("data", data);
            const response = await axios.post("https://api.flushai.cloud/web/v1/helper/create-upload-url", data)
            return response.data['data'];
        } catch (error) {
            console.error("Error fetching presigned URL:", error);
            return null;
        }
    };

    const uploadImageToS3 = async (presignedUrl, file) => {
        try {
            await axios.put(presignedUrl, file, {
                headers: {
                    'Content-Type': file.type
                }
            });
        } catch (error) {
            console.error("Error uploading to S3:", error);
        }
    };

    const handleDreambooth = async () => {
        // console.log("here 1 here 1 here 1");
        let failed = false;
        if (finetuneName == "") {
            setBadName(true);
            failed = true;
        }
        else {
            setBadName(false);
        }
        if (selectedImages.length < 4 || selectedImages.length > 30) {
            setBadImages(true);
            failed = true;
        }
        else {
            setBadImages(false);
        }
        if (subjectType == "" || subjectType.split(' ').length > 1) {
            setBadSubject(true);
            failed = true;
        }
        else {
            setBadSubject(false);
        }
        if (steps > 500) {
            setBadSteps(true);
            failed = true;
        }
        else {
            setBadSteps(false);
        }

        // console.log("here here here")
        if (!failed) {
            setBadName(false);
            setBadImages(false);
            setBadSubject(false);
            setBadSteps(false);
            setLoadingFinetune(true);
            // console.log("model id", model['name']);
            // console.log("selected images length", selectedImages.length);
            let imageUrls = await createURLs(selectedImages);
            let finalInstancePrompt = "a photo of sks " + subjectType;
            const payloadData = {
                "model_name": finetuneName,
                "model_id": model['name'],
                "steps": steps,
                "learning_rate": learning_rate,
                "urls": imageUrls,
                "instance_prompt": finalInstancePrompt //subjectType
            };
            // console.log("payload data", payloadData);
            const result = await callDreamboothAPI(payloadData);
            // console.log(result);
            await fetchData();
            closeModal();
            setLoadingFinetune(false);
            setCivitUrl("");
            setCivitName("");
        }
    }

    const handleEverything = async (event) => {
        event.preventDefault();
        setLoadingFinetune(true);
        if (apiKey == null) {
            setMessage("Please create an API key before attempting to add a Civitai model."); // Set the state with the appropriate message.
            setShow(true);
            setLoadingFinetune(false);
            return;
        }

        if (activeTab == 'Civitai') {
            handleCivit();
        }
        else if (activeTab == 'Dreambooth') {
            handleDreambooth();
        }
        // else if(activeTab == 'Safetensors'){
        //   // setLoadingFinetune(false);
        //   handleSafetensors();
        // }
    }

    return (
        <div>
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-10 "
                    onClose={closeStuff}
                    static={loadingFinetune} // Prevents closing when clicking outside if loadingFinetune is true
                >
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
                            <WarningModal show={show} setShow={setShow} message={message} />
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="bg-[#1F1F1F] relative transform overflow-hidden rounded-lg p-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                        {!loadingFinetune && ( // Render close button only if not loading
                                            <button
                                                type="button"
                                                className="rounded-md bg-[#1F1F1F] text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                onClick={() => closeModal()}
                                            >
                                                <span className="sr-only">Close</span>
                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="sm:flex sm:items-start">

                                        <div className="mt-3 text-center sm:ml-2 sm:mt-0 sm:text-left">
                                            <FinetuneModalHeader activeTab={activeTab} setActiveTab={setActiveTab} />
                                            {activeTab === 'Dreambooth' && (
                                                <div>
                                                    <div className="mt-3">
                                                        <p className="text-sm text-gray-500">
                                                            Start a new finetuning run with Dreambooth. This will create a new model that can be used for inference.
                                                        </p>
                                                    </div>
                                                    <TextBoxInput placeholder={""} Title={"Model Name"} Description={"Assign a name for your model so that you can find it easily later."} value={finetuneName} onChange={e => setFinetuneName(e.target.value)} />
                                                    {badName && <ErrorMessage message={"Please add a name for your model."} />}
                                                    <SelectMenu selected={model} setSelected={setModel} />
                                                    <TextBoxInput placeholder={"Man"} Title={"Subject Type"} Description={"A single word that describes the type of images the model is being trained on."} ErrorText={"Please assign a name for your model."} value={subjectType} onChange={e => setSubjectType(e.target.value)} />
                                                    {badSubject && <ErrorMessage message={"Please provide a one-word subject for your model."} />}
                                                    <ImageInput finalImages={selectedImages} setFinalImages={setSelectedImages} badImages={badImages} />
                                                    <MoreOptionsAccordion learning_rate={learning_rate} setLearningRate={setLearningRate} batch_size={batch_size} setBatchSize={setBatchSize} training_steps={steps} setTrainingSteps={setSteps} badSteps={badSteps} />
                                                </div>)}

                                            {activeTab === 'Civitai' && (
                                                <div>
                                                    <div className="mt-3">
                                                        <p className="text-sm text-gray-500">
                                                            Upload any Civitai model to your models database. This will create a new model that can be used for inference.
                                                            <TextBoxInput Title={"Model Name"} Description={"Assign a name for your model so that you can find it easily later."} ErrorText={"Please assign a name for your model."} value={civitName} onChange={e => setCivitName(e.target.value)} />
                                                            {badCivitName && <ErrorMessage message={"Please add a name for your model."} />}
                                                            <TextBoxInput Title={"Model URL"} Description={"The URL of the model from Civitai you with to upload. We only accept Checkpoints under 4GB."} ErrorText={"The Civitai url you provided is incorrect."} value={civitUrl} onChange={e => setCivitUrl(e.target.value)} />
                                                            {badCivitURL && <ErrorMessage message={"The inputted url is incorrect."} />}
                                                        </p>
                                                    </div>

                                                </div>)}

                                            {activeTab === 'Safetensors' && (
                                                <div>
                                                    <div className="mt-3">
                                                        <p className="text-sm text-gray-500">
                                                            Upload any safetensors file to your models database. This will create a new model that can be used for inference.
                                                            <TextBoxInput Title={"Model Name"} Description={"Assign a name for your model so that you can find it easily later."} ErrorText={"Please assign a name for your model."} value={civitName} onChange={e => setCivitName(e.target.value)} />
                                                            {badCivitName && <ErrorMessage message={"Please add a name for your model."} />}
                                                            <SafetensorsInput finalImages={selectedImages} setFinalImages={setSelectedImages} badImages={badImages} setFileBlob={setFileBlob} setFileName={setFileName} />
                                                        </p>
                                                    </div>

                                                </div>)}
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-5 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                                            onClick={handleEverything}
                                            disabled={loadingFinetune} // you may want to disable the button while loading
                                        >

                                            {loadingFinetune ? (
                                                <CircularProgress />
                                            ) : (
                                                "Create"
                                            )}
                                        </button>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}