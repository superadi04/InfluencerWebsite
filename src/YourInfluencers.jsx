function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
import { UserGroupIcon, PlusIcon } from '@heroicons/react/20/solid'

function EmptyPlaceholder() {
  return (
    <div className="text-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" className="mx-auto block w-12 h-12">

        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
      <h3 className="mt-2 text-lg font-semibold text-gray-300">No influencers</h3>
      <p className="mt-1 text-lg text-gray-500">Get started by creating a new influencer.</p>
      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          New Influencer
        </button>
      </div>
    </div>
  )
}


export default function YourInfluencers() {
  return (
    <div>
      <div className="text-white sm:text-4xl text-3xl font-bold text-left pt-6">
        Your Influencers
      </div> 
      <InfluencerCards/>
    </div>
  )
}

const products = [
  {
    id: 1,
    name: 'Basic Tee 8-Pack',
    href: '#',
    price: '$256',
    description: '8 images',
    options: '8 colors',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
    imageAlt: 'Eight shirts arranged on table in black, olive, grey, blue, white, red, mustard, and green.',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    price: '$32',
    description: 'Look like a visionary CEO and wear the same black t-shirt every day.',
    options: 'Black',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-02.jpg',
    imageAlt: 'Front of plain black t-shirt.',
  },
  
  // More products...
]

function InfluencerCards() {
  return (
    <div>
      <div className="pt-8 lg:max-w-7xl">
        <h2 className="sr-only">Products</h2>
        {products.length === 0 ? (
          // Display EmptyPlaceholder only if products array is empty
          <div className='min-h-screen mt-[-4rem] lg:mt-[-6rem] justify-center items-center flex'>
            <EmptyPlaceholder />
          </div>
        ) : (
          // Otherwise, display the grid of products
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 xl:grid-cols-4 lg:grid-cols-3 lg:gap-x-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-[#1c1c1c] bg-black"
              >
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 group-hover:opacity-75">
                  <img
                    src={"baddie.jpg"}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4 bg-[#0f0f0f]">
                  <h3 className="text-sm font-medium text-gray-300">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


