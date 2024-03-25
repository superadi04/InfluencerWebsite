async function callAPI(dataPayload) {
    const API_URL = "https://ypaqg548s7.execute-api.us-east-2.amazonaws.com/testing/civit";
    const apiKey = "gK0ImOzgDJ61FOc1ok6xx1qiKhKNcOsYaE7zrnrf"
    const headers = {
      "Content-Type": "application/json", 
      "x-api-key": "gK0ImOzgDJ61FOc1ok6xx1qiKhKNcOsYaE7zrnrf"
    };

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
      return data;

    } catch (error) {
      console.error("There was a problem with the fetch operation:", error.message);
    }
  }

(async () => {
    const payloadData = {
      "model_url": "https://civitai.com/models/4384"
      };

    const result = await callAPI(payloadData);
    console.log(result);
})();


// app.post('/testing', async (req, res) => {
//   const { data: data3, error: error3 } = await supabase
//   .from('keys')
//   .insert([{ api_key: "hey", key_id: "bruh", id: "3194cddc-ff59-448c-8967-9c4f9b0f1028", usage: 0, name: "breuh" }]);
//   res.json({
//       plan: "worked",
//   });
// });