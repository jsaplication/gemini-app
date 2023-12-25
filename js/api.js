 var data_gemini_pro = {
            contents: [
              {
                parts: [
                  { text: "Sua Pergunta" },
                ]
              }
            ],
            generationConfig: {
              stopSequences: ["Title"],
              temperature: 1,
              maxOutputTokens: 800,
              topP: 0.8,
              topK: 1
            }
};


var data_gemini_pro_vision = {
          contents: [
            {
              parts: [
                { text: "Sua Pergunta + a image em base64" },
                { inline_data: { mime_type: "image/png", data: "foto" } }
              ]
            }
          ],
          generationConfig: {
            stopSequences: ["Title"],
            temperature: 1,
            maxOutputTokens: 800,
            topP: 0.8,
            topK: 1
          }
};


var url_gemini_pro = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={sua apikey}";
var url_gemini_pro_vision = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key={sua apikey}";


fetch(url_gemini_pro, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data_gemini_pro),
})
.then(response => response.json())
.then(obj => {
  
  console.log("response: ",obj)

})
.catch(error => {
  console.error('Erro na requisição:', error);
});