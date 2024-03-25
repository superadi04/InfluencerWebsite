import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import HomePage from './HomePage';
import SignIn from './SignIn';
import Dashboard from './Dashboard';
import Pricing from './Pricing';
import Terms from './Terms';

function App() {
  const [navigation, setNavigation] = useState([
    { name: 'Explore', href: 'explore', current: true },
    { name: 'Playground', href: 'playground', current: false },
    { name: 'Gallery', href: 'gallery', current: false },
    { name: 'API Keys', href: 'apikeys', current: false },
    { name: 'Pricing', href: 'pricing', current: false },
    { name: 'Docs', href: 'https://docs.flushai.cloud/introduction', current: false },
  ]);

  const [modelID, setModelID] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [resolution, setResolution] = useState("");
  const [learningRate, setLearningRate] = useState("");
  const [batchSize, setBatchSize] = useState("");
  const [trainingSteps, setTrainingSteps] = useState("");
  const [model_name, setModelName] = useState("");
  const [base_model, setBaseModel] = useState("");
  const [urls, setUrls] = useState({});


  const handleModelDetails = (page, model_id, model_name, created_at, resolution, learning_rate, batch_size, training_steps, urls, base_model, is_gif) => {
    setModelID(model_id);
    setCreatedAt(created_at);
    setResolution(resolution);
    setLearningRate(learning_rate);
    setBatchSize(batch_size);
    setTrainingSteps(training_steps);
    setModelName(model_name);
    setUrls(urls);
    setBaseModel(base_model);
  }

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
      imageSrc: './sd21.jpeg',
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
      imageSrc: './realistic_vision_51.jpeg',
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
  //     id: "441f8ac2-3d09-4985-9f4f-136014d694fa", 
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
  //     id: "10850d7b-4a59-420c-b3ef-1939ac3931c3", 
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
  //     id: "22d065c4-022c-4c40-a7de-f5699cc6f6b4", 
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
  //     id: "2e1b9ddb-66f7-4fc5-a58a-3b881497ebb0", 
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


  const [lastPartOfUrl, setLastPartOfUrl] = useState("");
  console.log(lastPartOfUrl)

  return (
    <Router>
      <Routes>
        <Route path = "/playground" element={<Dashboard setUrls={setUrls} products={products} pageName={"Playground"} navigation={navigation} setNavigation={setNavigation} modelID={modelID} setModelID={setModelID} model_name={model_name} setModelName={setModelName} created_at={createdAt} setCreatedAt={setCreatedAt} resolution={resolution} setResolution={setResolution} learning_rate={learningRate} setLearningRate={setLearningRate} batch_size={batchSize} setBatchSize={setBatchSize} training_steps={trainingSteps} setTrainingSteps={setTrainingSteps} urls={urls} base_model={base_model} setBaseModel={setBaseModel} handleModelDetails={handleModelDetails} startingModel={products[0]} setLastPartOfUrl={setLastPartOfUrl}/>} />
        <Route path = "/signin" element={<SignIn lastPartOfUrl={lastPartOfUrl} />} />
        <Route path = "/pricing" element={<Dashboard setUrls={setUrls} products={products} pageName={"Pricing"} navigation={navigation} setNavigation={setNavigation} modelID={modelID} setModelID={setModelID} model_name={model_name} setModelName={setModelName} created_at={createdAt} setCreatedAt={setCreatedAt} resolution={resolution} setResolution={setResolution} learning_rate={learningRate} setLearningRate={setLearningRate} batch_size={batchSize} setBatchSize={setBatchSize} training_steps={trainingSteps} setTrainingSteps={setTrainingSteps} urls={urls} base_model={base_model} setBaseModel={setBaseModel} handleModelDetails={handleModelDetails}/>} />
        <Route path = "/gallery" element={<Dashboard setUrls={setUrls} products={products} pageName={"Gallery"} navigation={navigation} setNavigation={setNavigation} modelID={modelID} setModelID={setModelID} model_name={model_name} setModelName={setModelName} created_at={createdAt} setCreatedAt={setCreatedAt} resolution={resolution} setResolution={setResolution} learning_rate={learningRate} setLearningRate={setLearningRate} batch_size={batchSize} setBatchSize={setBatchSize} training_steps={trainingSteps} setTrainingSteps={setTrainingSteps} urls={urls} base_model={base_model} setBaseModel={setBaseModel} handleModelDetails={handleModelDetails}/>} />
        <Route path = "/explore" element={<Dashboard setUrls={setUrls} products={products} pageName={"Explore"} navigation={navigation} setNavigation={setNavigation} modelID={modelID} setModelID={setModelID} model_name={model_name} setModelName={setModelName} created_at={createdAt} setCreatedAt={setCreatedAt} resolution={resolution} setResolution={setResolution} learning_rate={learningRate} setLearningRate={setLearningRate} batch_size={batchSize} setBatchSize={setBatchSize} training_steps={trainingSteps} setTrainingSteps={setTrainingSteps} urls={urls} base_model={base_model} setBaseModel={setBaseModel} handleModelDetails={handleModelDetails}/>} />
        <Route path = "/details" element={<Dashboard setUrls={setUrls} products={products} pageName={"Model Details"} navigation={navigation} setNavigation={setNavigation} modelID={modelID} setModelID={setModelID} model_name={model_name} setModelName={setModelName} created_at={createdAt} setCreatedAt={setCreatedAt} resolution={resolution} setResolution={setResolution} learning_rate={learningRate} setLearningRate={setLearningRate} batch_size={batchSize} setBatchSize={setBatchSize} training_steps={trainingSteps} setTrainingSteps={setTrainingSteps} urls={urls} base_model={base_model} setBaseModel={setBaseModel} handleModelDetails={handleModelDetails}/>} />
        <Route path = "/apikeys" element={<Dashboard setUrls={setUrls} products={products} pageName={"API Keys"} navigation={navigation} setNavigation={setNavigation} modelID={modelID} setModelID={setModelID} model_name={model_name} setModelName={setModelName} created_at={createdAt} setCreatedAt={setCreatedAt} resolution={resolution} setResolution={setResolution} learning_rate={learningRate} setLearningRate={setLearningRate} batch_size={batchSize} setBatchSize={setBatchSize} training_steps={trainingSteps} setTrainingSteps={setTrainingSteps} urls={urls} base_model={base_model} setBaseModel={setBaseModel} handleModelDetails={handleModelDetails}/>} />
        <Route path = "/models/details" element={<Dashboard setUrls={setUrls} products={products} pageName={"Model Details"} navigation={navigation} setNavigation={setNavigation} modelID={modelID} setModelID={setModelID} model_name={model_name} setModelName={setModelName} created_at={createdAt} setCreatedAt={setCreatedAt} resolution={resolution} setResolution={setResolution} learning_rate={learningRate} setLearningRate={setLearningRate} batch_size={batchSize} setBatchSize={setBatchSize} training_steps={trainingSteps} setTrainingSteps={setTrainingSteps} urls={urls} base_model={base_model} setBaseModel={setBaseModel} handleModelDetails={handleModelDetails}/>} />
        <Route path = "/terms" element={<Terms/>} />
        <Route path = "/" element={<HomePage/>} />

        {products.map((product) => (
          <Route 
            path={`/playground/${product.link}`} 
            element={<Dashboard setUrls={setUrls} products={products} pageName={"Playground"} navigation={navigation} setNavigation={setNavigation} modelID={modelID} setModelID={setModelID} model_name={model_name} setModelName={setModelName} created_at={createdAt} setCreatedAt={setCreatedAt} resolution={resolution} setResolution={setResolution} learning_rate={learningRate} setLearningRate={setLearningRate} batch_size={batchSize} setBatchSize={setBatchSize} training_steps={trainingSteps} setTrainingSteps={setTrainingSteps} urls={urls} base_model={base_model} setBaseModel={setBaseModel} handleModelDetails={handleModelDetails} startingModel={product} setLastPartOfUrl={setLastPartOfUrl}/>} 
          />
        ))}
      </Routes>
    </Router>
  )
}

export default App
