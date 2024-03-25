import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import FinetuneModal from './CreateNewModel'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Terms() {
  return (
    <>
      <div className=''>
            <h2 className="text-left text-gray-300 text-4xl font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-7">
                Flush AI Terms of Service
            </h2>
                <p className="text-left leading-7 text-gray-500 sm:tracking-tight mr-4 pr-2 mb-5">
                    This agreement outlines the rules and regulations for using the website at https://flushai.cloud and any associated services offered by Flush AI.
                </p>
                <p className="text-left leading-7 text-gray-500 sm:tracking-tight mr-4 pr-2 mb-5">
                    By accessing the website at https://flushai.cloud, you consent to follow these rules and agree to adhere to all relevant laws and regulations. If you disagree with any part of these rules, you must not use or access this website or any services offered by Flush AI.
                </p>
                <p className="text-left leading-7 text-gray-500 sm:tracking-tight mr-4 pr-2 mb-5">
                    Flush AI retains the right to modify these terms at any time, and changes will be effective immediately upon updating this page. The latest update to these terms was on December 14, 2023.
                </p>
            <h3 className="text-left text-xl text-gray-300 font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-5">
                Use Restrictions
            </h3 >
                <p className="text-left leading-7 sm:tracking-tight mr-4 pr-2 mb-2 text-gray-500">
                    While using this website, you agree that you will not:
                </p>
                <ul className='text-left mb-5 ml-10 text-gray-500'>
                    <li>Alter, copy, create derivative works from, decompile, or reverse engineer any content or software on this website;</li>
                    <li>Delete or alter any copyright or ownership notices on the website's content or software;</li>
                    <li>Share the website's materials with others or duplicate the content on another server;</li>
                    <li>Misuse the website or Flush AI's services in a way that could harm our networks or other services;</li>
                    <li>Engage in the transmission of harmful, indecent, fraudulent, or illegal material through the website;</li>
                    <li>Violate any laws or regulations in your use of the website;</li>
                    <li>Use the website for unauthorized advertising or spam;</li>
                    <li>Collect or gather user information without consent;</li>
                    <li>Infringe on the rights of third parties, including privacy and intellectual property rights.</li>
                </ul>
            <h3 className="text-left text-xl text-gray-300 font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-5">
                Intellectual Property Rights
            </h3 >
                <p className="text-left leading-7 sm:tracking-tight mr-4 pr-2 mb-5 text-gray-500">
                    Flush AI or its licensors own the intellectual property rights in the materials on this website. You are granted a license to download one copy of the materials for temporary, non-commercial use only. This is a grant of a license, not a transfer of title, and this license may be terminated if you breach these terms.
                </p>
            <h3 className="text-left text-xl text-gray-300 font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-5">
                User Content
            </h3 >
                <p className="text-left leading-7 sm:tracking-tight mr-4 pr-2 mb-5 text-gray-500">
                    You retain ownership of your intellectual property in content you submit for publication on our website. We don’t claim ownership of your content, but you grant us a worldwide license to use it, consistent with your privacy settings and our Privacy Policy. This license ends when you delete your content or account, except where the content has been used in commercial activities.                
                </p>
            <h3 className="text-left text-xl text-gray-300 font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-5">
                Liability Disclamer
            </h3 >
                <p className="text-left leading-7 sm:tracking-tight mr-4 pr-2 mb-5 text-gray-500">
                    The website and its contents are provided "as is". Flush AI disclaims all warranties and will not be liable for any losses arising from your use of the website. This includes, but is not limited to, loss of data, profit, or business interruptions.                
                </p>
            <h3 className="text-left text-xl text-gray-300 font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-5">
                Materials Accuracy
            </h3>
            <p className="text-left leading-7 sm:tracking-tight mr-4 pr-2 mb-5 text-gray-500">
                We do not guarantee the completeness or accuracy of materials on the website. All information is provided for general purposes only and should not be relied upon or used as the sole basis for making decisions.
            </p>

            <h3 className="text-left text-xl text-gray-300 font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-5">
                External Links
            </h3>
            <p className="text-left leading-7 sm:tracking-tight mr-4 pr-2 mb-5 text-gray-500">
                Flush AI is not responsible for the content of external sites linked to our website. We do not endorse, guarantee, or assume liability for any content on these external sites. Visiting any linked sites is at your own risk.
            </p>

            <h3 className="text-left text-xl text-gray-300 font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-5">
                Termination Rights
            </h3>
            <p className="text-left leading-7 sm:tracking-tight mr-4 pr-2 mb-5 text-gray-500">
                Flush AI reserves the right to terminate or suspend your access to the website at any time, without notice, for any breach of these terms. This termination may include denying access to any services provided through the website.
            </p>

            <h3 className="text-left text-xl text-gray-300 font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-5">
                Invalidity of Provisions
            </h3>
            <p className="text-left leading-7 sm:tracking-tight mr-4 pr-2 mb-5 text-gray-500">
                If any provision of these terms is found to be void or unenforceable, that provision shall be deemed severable and shall not affect the validity and enforceability of the remaining provisions.
            </p>

            <h3 className="text-left text-xl text-gray-300 font-bold leading-7 sm:tracking-tight mr-4 pr-2 mb-5">
                Jurisdiction
            </h3>
            <p className="text-left leading-7 sm:tracking-tight mr-4 pr-2 mb-5 text-gray-500">
                These terms and your use of the website are governed by and construed in accordance with the laws of Texas. You agree to submit to the exclusive jurisdiction of the courts located in Texas for any disputes arising out of or relating to these terms or the website.
            </p>

      </div>
    </>
  )
}
