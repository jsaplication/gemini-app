
function enter(event) {
  
  if (event.keyCode === 13) {
    $("#pergunta").attr('disabled', true);
    
    var foto = window.localStorage.getItem('foto-src');
    var pergunta = document.querySelector("#pergunta").value;
    var fotoimg;

    var fotoInput = document.querySelector("#uploadFoto");

    if(fotoInput.files.length > 0){
            if(foto == undefined || foto == '' || foto == null){
        fotoimg = '';
        }else{
            fotoimg = `<br><img src="${foto}" class="img-send"/>`;
        }

        var html = `<li class="clearfix">
                        <div class="message-data text-right">
                          
                        </div>
                        <div class="message other-message float-right">${pergunta}${fotoimg}</div>
                    </li>`;


        $("#chat-load").append(html);

        gemine();

        var suaDiv = document.querySelector(".chat-history");
            suaDiv.scrollTop = suaDiv.scrollHeight;

             
    }else{

        if(foto == undefined || foto == '' || foto == null){
            fotoimg = '';
        }else{
            fotoimg = `<br><img src="${foto}"/>`;
        }

        var html = `<li class="clearfix">
                        <div class="message-data text-right">
                           
                        </div>
                        <div class="message other-message float-right">${pergunta}</div>
                    </li>`;


        $("#chat-load").append(html);

      
        gemine();

        var suaDiv = document.querySelector(".chat-history");
            suaDiv.scrollTop = suaDiv.scrollHeight;

           
    }

  }
}

function gemine() {
  $(".digitando").css('opacity', "1");
  // setTimeout(function(){
  //   $(".digitando").css('opacity', "1");
  // },500);
  
  var pergunta = $("#pergunta").val();
  var fotoInput = document.querySelector("#uploadFoto");
  var foto = window.localStorage.getItem('foto');
  var text001 =     decrypt("gemini-pro", geminiKey());
  console.log(geminiKey());
  var model_image = decrypt("gemini-pro", "0f1119191d53025f150a09001f081a005b151e0e09021808090c03171d00000908081e005e5e11000a4a1b580c0c59115d02080108051d464a151f06090c40191c0600061b1c0e0a0353090c4315000e13002e06001d481e06500c001454") + text001;
  var model_text =  decrypt("gemini-pro", "0f1119191d53025f150a09001f081a005b151e0e09021808090c03171d00000908081e005e5e11000a4a1b580c0c59115d02080108051d464a151f06090c40191c061717170102170c1d0b2a421e060a091152020b1010") + text001;
  

  if (fotoInput.files.length > 0) {
   
        var data = {
            contents: [
              {
                parts: [
                  { text: pergunta },
                  { inline_data: { mime_type: "image/png", data: foto } }
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

        fetch(model_image, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(obj => {
            

           if(obj.hasOwnProperty('error')){

                // console.log('error', obj.error.status)
                console.log('error', obj.error.status, "key", geminiKey());
                $(".digitando").css('opacity', "0");
                var html = `<li class="clearfix">
                              <div class="message-data">
                               
                              </div>
                              <div class="message my-message" style="color: red">Erro na solicitação</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                // setConversa(pergunta, 'user','gemini-pro', '');

                // setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('disabled', false);
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");

                 // getChats()

            }else if(obj.promptFeedback && 'blockReason' in obj.promptFeedback){
                console.log('tem blockReason')
                console.log('error', obj)
                $(".digitando").css('opacity', "0");
                var html = `<li class="clearfix">
                              <div class="message-data">
                                
                              </div>
                              <div class="message my-message" style="color: red">Erro na solicitação</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                // setConversa(pergunta, 'user','gemini-pro', '');

                // setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('disabled', false);
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");

                 // getChats()

            }else{

                 var string = formatarCodigo(obj.candidates[0].content.parts[0].text);
                 console.log(obj.candidates[0].content.parts[0].text);


                var html = `<li class="clearfix">
                          <div class="message-data">
                               
                              </div>
                              <div class="message my-message">${string}</div>                                    
                            </li>`;

                $("#chat-load").append(html);
                

                    FinalScroll();

                    setConversa(pergunta, 'user', 'gemini-pro-vision', foto);

                    setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro-vision', foto);

                     $("#pergunta").val('');
                     $("#pergunta").attr('disabled', false);
                     $("#pergunta").focus();
                     $(".digitando").css('opacity', "0");


                    getChats()

                    document.querySelector("#uploadFoto").value = '';
                    $(".img-view").html('');

                   hljs.highlightAll(); 
            }


            

          })
          .catch(error => {
            console.error('Erro na requisição:', error);
             $(".digitando").css('opacity', "0");
                var html = `<li class="clearfix">
                              <div class="message-data">
                               
                              </div>
                              <div class="message my-message" style="color: red">Erro na solicitação</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                // setConversa(pergunta, 'user','gemini-pro', '');

                // setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('disabled', false);
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");



          });
  }else{
      var hist = getConversa();
      var data;


      if(hist.length == 0){
        console.log('Primeira MSG')
        data = {
            contents: [
              {
                role: "user",
                parts: [
                  { text: pergunta }
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

      }else{
        console.log('Segunda MSG');


        hist.push({
                    role: "user",
                    parts: [{ text: pergunta }]
                  });


        // // Removendo os campos inline_data e objetos vazios dentro de parts
        // hist.forEach(function(item) {
        //     item.parts = item.parts.filter(function(part) {
        //         return part.text != null && part.text.trim() !== '';
        //     });
        // });

        // // Removendo objetos principais que não têm elementos em parts
        // hist = hist.filter(function(item) {
        //     return item.parts.length > 0;
        // });



        data = {
          contents: hist,
          generationConfig: {
            stopSequences: ["Title"],
            temperature: 1,
            maxOutputTokens: 800,
            topP: 0.8,
            topK: 1
          }
        };
      }


        fetch(model_text, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(obj => {
            

  

            if(obj.hasOwnProperty('error')){

                // gemine();

                console.log('error', obj.error.status, "key", geminiKey());

                

                var html = `<li class="clearfix">
                              <div class="message-data">
                               
                              </div>
                              <div class="message my-message" style="color: red">Erro na solicitação</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                // setConversa(pergunta, 'user','gemini-pro', '');

                // setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('disabled', false);
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");

                 // getChats()

            }else if(obj.promptFeedback && 'blockReason' in obj.promptFeedback){
                console.log('tem blockReason')
                console.log('error', obj)
                $(".digitando").css('opacity', "0");
                var html = `<li class="clearfix">
                              <div class="message-data">
                               
                              </div>
                              <div class="message my-message" style="color: red">Erro na solicitação</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                // setConversa(pergunta, 'user','gemini-pro', '');

                // setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('disabled', false);
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");

                 // getChats()

            }else{
                
                 var string = formatarCodigo(obj.candidates[0].content.parts[0].text);
                 console.log(obj.candidates[0].content.parts[0].text);

                var html = `<li class="clearfix">
                              <div class="message-data">
                                
                              </div>
                              <div class="message my-message">${string}</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                setConversa(pergunta, 'user','gemini-pro', '');

                setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('disabled', false);
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");
                 hljs.highlightAll();
                 getChats()
            }
            
          })
          .catch(error => {
            console.error('Erro na requisição:', error);
            
             // $("#pergunta").val('');
             // $("#pergunta").attr('disabled', false);
             // $("#pergunta").focus();
             // $(".digitando").css('opacity', "0");

          });

  }
}

// function menu(){
//   console.log('click')
//   $(".people-list").toggleClass('menu-list');
//   $(".menu a i").toggleClass('fa-times')
// }
