import { Fragment, useState, useEffect } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import FinetuneModal from './CreateNewModel'
import { createClient } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const supabase = createClient('https://rrvjkmdsixuiuqktlxcg.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJydmprbWRzaXh1aXVxa3RseGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE1NDMxNjcsImV4cCI6MjAwNzExOTE2N30.Vo6_mO9gTwO_XqP9EDFh7LD5qHDGgIa50T8qsjI3wBk')


const tabs = [
  { name: 'Civitai', href: '#', current: true },
  { name: 'Dreambooth', href: '#', current: false },
]

const statuses = {
  Finished: 'text-green-700 bg-green-50 ring-green-600/20',
  Training: 'text-yellow-800 bg-yellow-50 ring-yellow-600/20',
}


const video_models = [
  {
    id: 1,
    title: 'Stable Video Diffusion',
    price: 'stable-video-diffusion',
    imageSrc: './rocket.png',
    description: 'Stable Diffusion XL',
  }
]
function VideoModels() {
  return (
    <div className="">
      <div className=" px-4 sm:px-6 py-5 max-w-full lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-4">
          {video_models.map((product) => (
            <div
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-[#3b3b3b] bg-white"
            >
              <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 h-48">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-2 p-4 bg-[#1F1F1F]">
                <h3 className="text-sm font-medium text-gray-300 text-left">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.description}
                    <p
                      className={classNames(
                        statuses["Finished"],
                        'text-right rounded-md whitespace-nowrap px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                      )}
                    >
                      {"Finished"}
                    </p>
                  </div>


                </h3>
                <p className="text-sm text-left text-gray-500">{product.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ImageModels({ products, setProducts, handleInformation }) {

  const navigate = useNavigate();
  function grouped_urls(data) {
    const groupUrls = data.reduce((acc, curr) => {
      if (!acc[curr.model_id]) {
        acc[curr.model_id] = [];
      }
      acc[curr.model_id] = acc[curr.model_id].concat(curr.urls);
      return acc;
    }, {});
    return groupUrls;
  }

  function formatTimeStamp(timestamp) {
    const dateObject = new Date(timestamp);

    const optionsDate = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = dateObject.toLocaleDateString("en-US", optionsDate);

    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    const formattedTime = dateObject.toLocaleTimeString("en-US", optionsTime);

    return formattedDate + ", " + formattedTime;
  }

  const [loading, setLoading] = useState(true);
  const [urls, setUrls] = useState({});

  const [totalModels, setTotalModels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: userData } = await supabase.auth.getUser();
      // console.log(userData);
      if (!userData.user) {
        // console.log('here');
        navigate('/signin')
      }
      const userId = userData?.user?.id;
      // console.log('user id', userId);
      const { data: data2, error: error2 } = await supabase
        .from('all_models')
        .select()
        .eq('user_id', userId ?? '');
      // console.log("data2", data2);
      const { data: data, error: error } = await supabase
        .from('inferences')
        .select()
        .eq('user_id', userId ?? '')
        .eq("type", "txt2img");
      // console.log(data);
      const urls = grouped_urls(data);
      // console.log(urls);
      setUrls(urls);
      if (data2) {
        const transformedData = data2.map((obj, index) => {
          return {
            id: obj.id,
            created_at: formatTimeStamp(obj.created_at),
            model_name: obj.model_name,
            resolution: obj.resolution,
            learning_rate: obj.learning_rate,
            batch_size: obj.batch_size,
            training_steps: obj.training_steps,
            base_model: obj.model_id,
            status: obj.status
          };
        });
        // console.log("products", products)
        // setData(transformedData);
        setTotalModels([...products, ...transformedData]);
        // setData(prevData => [base_models, ...prevData]);
        // console.log("data", data);

        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-[85vh] overflow-y-scroll sm:pb-20 md:pb-20 lg:pb-0 xl:pb-0">
      <div className=" px-4 sm:px-6 py-5 max-w-full lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-4">
          {totalModels.map((model) => (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // to prevent the default behavior of the anchor tag
                handleInformation('Model Details', model.id, model.model_name, model.created_at, model.resolution, model.learning_rate, model.batch_size, model.training_steps, urls[model.id], model.base_model, false);
                navigate('/models/details');
              }}
            >
              <div
                key={model.id}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-[#3b3b3b] bg-white"
              >
                <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 h-48">
                  <img
                    src={model.imageSrc || '/temp.jpeg'}
                    alt={model.imageAlt}
                    className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-2 p-4 bg-[#1F1F1F]">
                  <h3 className="text-sm font-medium text-gray-300 text-left">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {model.model_name || "A custom uploaded Civit or Finetuned Model"}
                      <p
                        className={classNames(
                          statuses["Finished"],
                          'text-right rounded-md whitespace-nowrap px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset'
                        )}
                      >
                        {model.status}
                      </p>
                    </div>


                  </h3>
                  <p className="text-sm text-left text-gray-500">
                    {model.description === "Stable Diffusion XL" ? "The latest and most powerful Stable Diffusion Model." :
                    model.description === "juggernautxl" ? "One of the most powerful Stable Diffusion Models, finetuned on SDXL, produces creative and hyperrealistic images" :
                    model.description === "dreamshaperxl" ? "One of the most powerful Stable Diffusion Models, finetuned on SDXL, produces creative and hyperrealistic images" :
                      model.description === "Absolute Reality" ? "A photorealistic model from Lykon. Works well for all sorts of photorealistic images." :
                        model.description === "Stable Diffusion 2.1" ? "A marked improvement over Stable Diffusion 1 created by the open-source community." :
                          model.description === "Stable Diffusion 1.5" ? "A versatile model released by Runway ML. Used popularly as a base model in finetuning." :
                            model.description === "Realistic Vision V5.1" ? "A well-rounded model best for generating photograph-style images." :
                              model.description === "Anything-v5" ? "Anime style images. Finetuned on Stable Diffusion 1.5." :
                                model.description === "Lyriel" ? "Artistic style images, finetuned on Stable Diffusion 1.5" :
                                  model.description === "Cyberrealistic" ? "Hyperrealistic model that works well on portraits in 768x512, finetuned on Stable Diffusion 1.5" :
                                    model.description === "meina mix" ? "Anime style images, finetuned on Stable Diffusion 1.5" :
                                      model.description === "epicphotogasm" ? "Creates hyperrealistic images of people with very simple prompts, finetuned on Stable Diffusion 1.5" :
                                        model.description === "Magic-mix realistic" ? "Creates hyperrealistic images of asian people, finetuned on Stable Diffusion 1.5" :
                                          model.description === "Photon" ? "Creates hyperrealistic images of scenes and objects, finetuned on Stable Diffusion 1.5" :
                                            model.description === "Beautiful Realistic Asians" ? "Creates hyperrealistic images of beautiful asian people, finetuned on Stable Diffusion 1.5" :
                                              model.description === "XXMix_9realistic" ? "Creates realistic and creative images of asian people, finetuned on Stable Diffusion 1.5" :
                                                model.description === "neverending_ned" ? "Creates realistic and artistic images of people, finetuned on Stable Diffusion 1.5" :
                                                  model.description === "meina unreal" ? "Anime style images, finetuned on Stable Diffusion 1.5" :
                                                    model.description === "dreamshaper" ? "One of the most popular Stable Diffusion checkpoints, created by lykon, finetuned on Stable Diffusion 1.5" :
                                                      model.description === "ghostmix" ? "Creates extremely creative images with very detailed prompts, finetuned on Stable Diffusion 1.5" :
                                                        model.description === "Toonyou" ? "Creates cartoon/anime style images, finetuned on Stable Diffusion 1.5" :
                                                        model.description === "analog diffusion" ? "Creates realistic photos, use keyphrase 'analog style' at beginning of prompt, finetuned on Stable Diffusion 1.5" :
                                                          model.description === "analog realistic" ? "Creates realistic images of people, finetuned on Stable Diffusion 1.5" : "" || "A custom civit or finetuned model"}



                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function MyModels({ handleInformation, isModalOpen, setModalOpen, activeTab, products, setProducts }) {
  return (
    <>
      {activeTab === "Images" && <ImageModels handleInformation={handleInformation} products={products} setProducts={setProducts} />}
      {/* {activeTab === "Videos" && <VideoModels />} */}
    </>
  )
}
