import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { createClient } from '@supabase/supabase-js'
import React, { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

const supabase = createClient('https://rrvjkmdsixuiuqktlxcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydmprbWRzaXh1aXVxa3RseGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDMxNjcsImV4cCI6MjAwNzExOTE2N30.Vo6_mO9gTwO_XqP9EDFh7LD5qHDGgIa50T8qsjI3wBk')

import {
  TrashIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function APIKeyTable({ setIsOpen, keyIds, createdAt, setCreatedAt, keyVals, setKeyIds, setKeyVals, names, setNames, userId }) {

  const [copied, setCopied] = useState(false);

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const deleteApiKey = async (keyId) => {
    try {
      // console.log("key id", keyId);
      const data = {
        "keyId": keyId, 
        "user_id": userId
      }
      let response = await axios.post("https://api.flushai.cloud/deletekey", data);

      const keyIndex = keyIds.indexOf(keyId);
      // Remove element from keyIds
      const newKeyIds = [...keyIds];
      newKeyIds.splice(keyIndex, 1);
      setKeyIds(newKeyIds);

      // Remove element from keyVals at the same index
      const newKeyVals = [...keyVals];
      newKeyVals.splice(keyIndex, 1);
      setKeyVals(newKeyVals);

      const newNames = [...names];
      newNames.splice(keyIndex, 1);
      setNames(newNames);

    } catch (error) {
      console.error("Error deleting API key:", error);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className=" mt-10 ring-1 ring-gray-300 sm:mx-0 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th scope="col" className="py-3.5 w-1/4 pl-8 pr-3 text-left text-sm font-semibold text-gray-300 sm:pl-6">
                Key
              </th>
              <th
                scope="col"
                className="text-left hidden px-3 py-3.5 text-sm font-semibold text-gray-300 lg:table-cell"
              >
                Name
              </th>
              <th
                scope="col"
                className="text-left hidden px-3 py-3.5 w-1/6 text-sm font-semibold text-gray-300 lg:table-cell"
              >
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {keyVals && [...keyVals].reverse().map((plan, planIdx) => (
              <tr key={keyIds[keyIds.length - planIdx - 1]}>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-transparent',
                    'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                  )}
                >
                  <div className="font-medium text-left text-gray-300">
                    {plan}
                  </div>
                  <div className="mt-1 flex text-left flex-col text-gray-300 sm:block lg:hidden">
                    <span>
                      {createdAt[createdAt.length - planIdx - 1]}
                    </span>
                  </div>
                  {planIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-gray-200',
                    'hidden px-3 py-3.5 text-sm text-gray-300 lg:table-cell text-left'
                  )}
                >
                  {names[names.length - planIdx - 1]}
                </td>
                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-gray-200',
                    'hidden px-3 py-3.5 text-sm text-gray-300 lg:table-cell text-left'
                  )}
                >
                  {createdAt[createdAt.length - planIdx - 1]}
                </td>

                <td
                  className={classNames(
                    planIdx === 0 ? '' : 'border-t border-transparent',
                    'relative py-3.5 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'
                  )}
                >
                  <Tooltip title={copied ? "Copied!" : "Copy to clipboard"} arrow>
                    <button
                      type="button"
                      className="inline-flex mr-1 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      disabled={plan.isCurrent}
                      onClick={() => handleCopy(plan)}
                    >
                      <DocumentDuplicateIcon style={{ width: "15px" }} />
                    </button>
                  </Tooltip>

                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    disabled={plan.isCurrent}
                  >
                    <TrashIcon style={{ width: "15px" }} onClick={() => deleteApiKey(keyIds[keyIds.length - planIdx-1])} />
                  </button>
                  {planIdx !== 0 ? <div className="absolute -top-px left-0 right-6 h-px bg-gray-200" /> : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-2 flex pt-2">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setIsOpen(true)}
        >
          + Create new key
        </button>
      </div>
    </div>
  )
}
function APIKeyDialog({ isOpen, setIsOpen, apiKeys, setApiKeys, keyVals, setKeyVals, keyIds, setKeyIds, names, setNames, userId}) {
  const cancelButtonRef = useRef(null)
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const generateApiKey = async () => {
    setLoading(true);
    try {

      const data = {
        "user_id": userId, 
        "name": name 
      }
      let response = await axios.post('https://api.flushai.cloud/generatekey', data);
      response = response.data;
      setKeyVals([...(Array.isArray(keyVals) ? keyVals : []), response['apiKey']]);
      setKeyIds([...keyIds, response['keyId']]);
      setNames([...names, name])
      // console.log("API Key generated and updated successfully!");
    } catch (error) {
      console.error("Error generating API key:", error);
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsOpen}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Create new API key
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className="pt-4 px-4">
                    <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                      <textarea
                        rows={1}
                        name="description"
                        style={{ paddingLeft: "10px", height: "30px", lineHeight: "30px" }}
                        id="description"
                        className="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 focus:outline-none sm:text-sm sm:leading-6"
                        placeholder="Type a name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto "
                      onClick={generateApiKey}
                    >
                      Create
                    </button>
                  )}
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setIsOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default function APIKeys() {
  const [isOpen, setIsOpen] = useState(false);

  const [userId, setUserId] = useState([]);
  const [keyIds, setKeyIds] = useState([]);
  const [createdAt, setCreatedAt] = useState('');
  const [apiKeys, setApiKeys] = useState([]);
  const [loading2, setLoading2] = useState(true);
  const [keyVals, setKeyVals] = useState([]);
  const [names, setNames] = useState("");

  useEffect(() => {
    const fetchData = async () => {

      const { data: data, error } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/signin');
        console.log('User is not signed in!');
      } else if (error) {
        console.log('Error getting session:', error.message);
      }

      setLoading2(true);
      const { data: userData } = await supabase.auth.getUser();
      setUserId(userData.user.id);
      const { data: keysData, error: keysError } = await supabase
        .from('user_details')
        .select('keys')
        .eq('id', userData.user.id);


      const { data: keyIdsData, error: keyIdsError } = await supabase
        .from('user_details')
        .select('key_ids')
        .eq('id', userData.user.id);

      const { data: createdData, error: createdError } = await supabase
        .from('keys')
        .select('*')
        .eq('id', userData.user.id);
      // console.log(createdData)

      // console.log(createdData);

      // console.log("keys")
      // console.log('keys data', keysData);
      setKeyVals(keysData && keysData.length > 0 ? keysData[0].keys : []);
      setKeyIds(keysData && keyIdsData.length > 0 ? keyIdsData[0].key_ids : []);
      const formatNames = createdData.map(item => {
        if (item.name == null) {
          return "";
        }
        return item.name;
      });
      setNames(formatNames.length > 0 ? formatNames : []);
      // console.log(formatNames);

      // setNames()
      const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      const formattedList = createdData.map(item => {
        const date = new Date(item.created_at);
        return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
      });
      setCreatedAt(createdData ? formattedList : []);
      // console.log("key vals", keysData[0].keys);
      // console.log("key ids", keyIdsData[0].key_ids);
      setLoading2(false);
    };

    fetchData();
  }, []);


  return (
    <>
      <div>
        <p className="ml-8 text-left mt-6 text-md leading-8 text-gray-300">
          Do not share your API key with others, or expose it in the browser or other client-side code.
        </p>
        {loading2 && <div className="flex justify-center items-center"><CircularProgress /></div>}
        {!loading2 &&
          <div>
            <APIKeyTable setIsOpen={setIsOpen} keyIds={keyIds} createdAt={createdAt} setCreatedAt={setCreatedAt} keyVals={keyVals} setKeyIds={setKeyIds} setKeyVals={setKeyVals} names={names} setNames={setNames} userId={userId} />
            <APIKeyDialog isOpen={isOpen} setIsOpen={setIsOpen} apiKeys={apiKeys} setApiKeys={setApiKeys} keyVals={keyVals} setKeyVals={setKeyVals} keyIds={keyIds} setKeyIds={setKeyIds} names={names} setNames={setNames} userId={userId} />
          </div>
        }
      </div>
    </>
  )
}
