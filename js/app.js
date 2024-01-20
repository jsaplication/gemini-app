function saveLg(){
    var lg = $("#select-lg option:selected").attr('lg')
    console.log(lg)
    window.localStorage.setItem('lgn', lg);
    window.location.reload(true);
}

var lgn = window.localStorage.getItem('lgn');
if(lgn == null || lgn == undefined || lgn == ''){
    console.log('sem linguem selecionada')
    $(".translations").show();
    $(".translations").css('display', 'flex');
}else{  
    console.log('linguem selecionada:', lgn)
    $(".translations").hide();
}

function errorStatus(){
    return  window.localStorage.getItem('error_status');
}

function leguageatual(){
    var lgn = window.localStorage.getItem('lgn');
    if(lgn == null || lgn == undefined || lgn == ''){
        return 'english';
    }else{  
        return lgn;
    }
}

function selectLg(){
    $(".translations").show();
    $(".translations").css('display', 'flex');
}
function closeLg(){
    $(".translations").hide();
    // $(".translations").css('display', 'flex');
}

function getJSONS() {
    var lg = leguageatual();
    console.log('-->', lg);

    fetch("translations/" + lg + ".json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação do arquivo JSON');
            }
            return response.json();
        })
        .then(obj => {
            console.log(obj);
            $("#title-modal1").text(obj.title_Modal1)
            $("#text1_modal1").text(obj.text1_modal1)
            $("#text2_modal1").text(obj.text2_modal1)
            $("#text3_modal1").text(obj.text3_modal1)
            $("#text4_modal1").text(obj.text4_modal1)
            $("#text5_modal1").text(obj.text5_modal1)
            $("#btn_default_model1").text(obj.btn_default_modal1)
            $("#btn_save_model1").text(obj.btn_save_modal1)
            $("#btn_ApiEdit").text(obj.btn_ApiEdit)

            $("#typing").text(obj.typing)


            $("#title_modal2").text(obj.title_Modal2)
            $("#text1_modal2").text(obj.text1_modal2)
            $("#text2_modal2").text(obj.text2_modal2)
            $("#text3_modal2").text(obj.text3_modal2)
            $("#text4_modal2").html(obj.text4_modal2.split('.').join('.<br><br>'))
            $("#text5_modal2").text(obj.text5_modal2)
            $("#text6_modal2").html(obj.text6_modal2.split('.').join('.<br><br>'))
            $("#note").text(obj.note)

            window.localStorage.setItem('error_status', obj.error_api);
            window.localStorage.setItem('intro_text', obj.intro);
            window.localStorage.setItem('btnnewchat', obj.btn_newchat);

            getConversas1();
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}

getJSONS();
  
function sendMSG(){
  var pergunta = document.querySelector("#pergunta").value;
  var statusinput =  $("#pergunta").attr('status');
  console.log("status input", statusinput);
  $("#pergunta").focus();

  if(pergunta.trim() == ''){

  }else{

      if(statusinput == "true"){
        $("#pergunta").attr('status', "false");
        var foto = window.localStorage.getItem('foto-src');
       
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

            gemine(pergunta);

            var suaDiv = document.querySelector(".chat-history");
                suaDiv.scrollTop = suaDiv.scrollHeight;

                 
        }else{

            if(foto == undefined || foto == '' || foto == null){
                fotoimg = '';
            }else{
                fotoimg = `<br><img src="${foto}"/>`;
            }

            var html = `<li class="clearfix">
                            // <div class="message-data text-right">
                               
                            </div>
                            <div class="message other-message float-right">${pergunta}</div>
                        </li>`;


            $("#chat-load").append(html);

          
            gemine(pergunta);

            var suaDiv = document.querySelector(".chat-history");
                suaDiv.scrollTop = suaDiv.scrollHeight;

               
        }



    }else{

    }

    
  }
  
}
function enter(event) {
  var statusinput =  $("#pergunta").attr('status');
  console.log("status input", statusinput);

  if (event.keyCode === 13) {
    // $("#pergunta").attr('status', "true");
    

    if(statusinput == "true"){
        $("#pergunta").attr('status', "false");
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

            gemine(pergunta);

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

          
            gemine(pergunta);

            var suaDiv = document.querySelector(".chat-history");
                suaDiv.scrollTop = suaDiv.scrollHeight;

               
        }



    }else{

    }
  }//enter
}

function gemine(pergunta) {
  $("#pergunta").val('')
  $(".digitando").css('opacity', "1");
  // setTimeout(function(){
  //   $(".digitando").css('opacity', "1");
  // },500);
  
  //var pergunta = $("#pergunta").val();
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
                              <div class="message my-message" style="color: red">${errorStatus()}</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                // setConversa(pergunta, 'user','gemini-pro', '');

                // setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('status', "true");
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");
                 $(".img-view").css("margin-right", "0px");
                 // getChats()

            }else if(obj.promptFeedback && 'blockReason' in obj.promptFeedback){
                console.log('tem blockReason')
                console.log('error', obj)
                $(".digitando").css('opacity', "0");
                var html = `<li class="clearfix">
                              <div class="message-data">
                                
                              </div>
                              <div class="message my-message" style="color: red">${errorStatus()}</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                // setConversa(pergunta, 'user','gemini-pro', '');

                // setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('status', "true");
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");
                 // $(".img-view").css("margin-right", "0px");
                 // getChats()

            }else{

                 var string = formatarCodigo(obj.candidates[0].content.parts[0].text);
                //  console.log(obj.candidates[0].content.parts[0].text);
                 

                // var html = `<li class="clearfix">
                //           <div class="message-data">
                               
                //               </div>
                //               <div class="message my-message">${string}</div>                                    
                //             </li>`;


                 // var string = formatarCodigo(v.parts[0].text);
                   var getText = string[0].text;
                   var getCode = string[1].code;

                   var showCode;
                   if(getCode == ''){
                      showCode = '';
                   }else{
                      showCode = `<div class="message-padd">
                                    <div class="header-code">
                                       <span>${string[1].lenguage}</span>
                                      <div class="copy copy_${uidChat()}" onclick="copy(this)" uid="${uidChat()}"><i class="fa fa-copy"></i> <span>Copy code</span></div>
                                    </div>

                                    <div class="message my-message code-print code_${uidChat()}">${getCode}</div>
                                  </div>`;
                   }


                   var explications;
                   if(getText == ''){
                      explications = '';
                   }else{
                      explications = `<div class="explication">${getText}</div>`;
                   }


                  var html = `<li class="clearfix">
                                ${explications}
                                ${showCode}                             
                              </li>`;

                              

                $("#chat-load").append(html);
                

                    FinalScroll();

                    setConversa(pergunta, 'user', 'gemini-pro-vision', foto);

                    setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro-vision', foto);

                     $("#pergunta").val('');
                     $("#pergunta").attr('status', "true");
                     $("#pergunta").focus();
                     $(".digitando").css('opacity', "0");
                     $(".img-view").css("margin-right", "0px");

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
                              <div class="message my-message" style="color: red">${errorStatus()}</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                // setConversa(pergunta, 'user','gemini-pro', '');

                // setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('status', "true");
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
                              <div class="message my-message" style="color: red">${errorStatus()}</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

        
                 $("#pergunta").val('');
                 $("#pergunta").attr('status', "true");
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
                              <div class="message my-message" style="color: red">${errorStatus()}</div>                                    
                            </li>`;

                $("#chat-load").append(html);

                FinalScroll();

                // setConversa(pergunta, 'user','gemini-pro', '');

                // setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('status', "true");
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");

                 // getChats()

            }else{
                
                 var string = formatarCodigo(obj.candidates[0].content.parts[0].text);
                 // console.log(obj.candidates[0].content.parts[0].text);
                 
                   var getText = string[0].text;
                   var getCode = string[1].code;

                   var showCode;
                   if(getCode == ''){
                      showCode = '';
                   }else{
                      showCode = `<div class="message-padd">
                                    <div class="header-code">
                                       <span>${string[1].lenguage}</span>
                                      <div class="copy copy_${uidChat()}" onclick="copy(this)" uid="${uidChat()}"><i class="fa fa-copy"></i> <span>Copy code</span></div>
                                    </div>

                                    <div class="message my-message code-print code_${uidChat()}">${getCode}</div>
                                  </div>`;
                   }



               

                    var explications;
                   if(getText == ''){
                      explications = '';
                   }else{
                      explications = `<div class="explication">${getText}</div>`;
                   }


                  var html = `<li class="clearfix">
                                ${explications}
                                ${showCode}                             
                              </li>`;



                $("#chat-load").append(html);

                FinalScroll();

                setConversa(pergunta, 'user','gemini-pro', '');

                setConversa(obj.candidates[0].content.parts[0].text, 'model', 'gemini-pro', '');

                 $("#pergunta").val('');
                 $("#pergunta").attr('status', "true");
                 $("#pergunta").focus();
                 $(".digitando").css('opacity', "0");
                 hljs.highlightAll();
                 getChats()
            }
            
          })
          .catch(error => {
            console.error('Erro na requisição:', error);
          });

  }
}

// function menu(){
//   console.log('click')
//   $(".people-list").toggleClass('menu-list');
//   $(".menu a i").toggleClass('fa-times')
// }

function removerEspacos(texto) {
  // Expressão regular para encontrar espaços em branco
  const regex = /\s+/g;
  // Substitui os espaços em branco por uma string vazia
  return texto.replace(regex, "");
}



function default_apikey(){
  console.log('hello');
  window.localStorage.setItem('my_apikey', "");
  $("#input_apikey").val('');
  $("#config-apikey").modal('hide');
}



function save_apikey(){
  var api = $("#input_apikey").val();
  console.log('hello', removerEspacos(api));

  if(removerEspacos(api) == ''){
    console.log('apikey vazia')
  }else{
    var apix = encrypt("gemini-pro",removerEspacos(api));
    window.localStorage.setItem('my_apikey', apix);
    console.log('apikey api salva')

    $("#config-apikey").modal('hide');
  }
  
}
function openModalApi(){
  var my_api = window.localStorage.getItem('my_apikey');
 

  if(my_api == '' || my_api == undefined || my_api == null){
    $("#input_apikey").val('');
    $(".apikey").text('')
  }else{
    $("#input_apikey").val(decrypt('gemini-pro', my_api));
    $(".apikey").text(decrypt('gemini-pro', my_api))
  } 
}
setInterval(function(){
  var my_api = window.localStorage.getItem('my_apikey');
  if(my_api == '' || my_api == undefined || my_api == null){
    $(".apikey").text('Not Configured')
  }else{
    $(".apikey").text('**********************')
  } 
},1000)



function search(e){
  var text = $(e).val();
}

// function openLimitations(){
//   $("#information").modal('show')
// }


function copy(e){
  var uid = $(e).attr('uid');
  copiarTexto(uid, e)

}

function copiarTexto(uid, e) {
  // Obtém o elemento div
  const div = document.querySelector(".code_"+uid);

  // Seleciona o texto dentro da div
  const selecao = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(div);
  selecao.removeAllRanges();
  selecao.addRange(range);

  // Copia o texto selecionado para a área de transferência
  document.execCommand('copy');

  // Remove a seleção de texto
  selecao.removeAllRanges();

  // Exibe uma mensagem de sucesso
  console.log('copiado')
  $(e).html('<i class="fa fa-check"></i> <span>Copied</span>')
 


  var mudarIconCopy = setInterval(function(){
    console.log('mudou icone');
    clearInterval(mudarIconCopy);
    $('.copy_'+uid).html('<i class="fa fa-copy"></i> <span>Copy code</span>')
  },2000)
}

