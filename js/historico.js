function FinalScroll(){
   var suaDiv = document.querySelector(".chat-history");
       suaDiv.scrollTop = suaDiv.scrollHeight;
}

function obterHoraEDataAtual() {
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, '0');
    let mes = String(data.getMonth() + 1).padStart(2, '0');
    let ano = data.getFullYear();
    let hora = String(data.getHours()).padStart(2, '0');
    let minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${minutos}`;
}


function filtrarMensagens(mensagens) {
  const mensagensFiltradas = [];

  for (let i = 0; i < mensagens.length; i++) {
    if (i === 0 || mensagens[i].role !== mensagens[i - 1].role) {
      mensagensFiltradas.push(mensagens[i]);
    }
  }

  return mensagensFiltradas;
}

function getAtualChat(){
  var uid = window.localStorage.getItem('uid_chat');
  return uid
}


function uidChat() {
  const timestamp = new Date().getTime();
  const micros = performance.now() * 1000; // Convertendo para microssegundos

  // Criar um UID concatenando o timestamp e os microssegundos
  const uid = `${timestamp}${micros}`;
  var fil = uid.split('.').join('');
  return fil;
}


function editarNomePorUID(array, uid, novoNome) {
  const newArray = array.map(obj => {
    if (obj.uid === uid) {
      return { ...obj, title: novoNome };
    }
    return obj;
  });

  return newArray;
}
function newChat(){

  setChat("New Chat", obterHoraEDataAtual(), uidChat(), "novo");
  getChats()
  $("#chat-load").html('')
  $(".chat-message").show();
  $("#pergunta").focus();
}
function setChat(title, d, uid, type){
    try{

     
      if(type == 'user'){
           var conversa = getChat();
          if(conversa.length == 0 ){
          
            var data =  {
                    title:title,
                    data: d,
                    uid: uid
                  }    

            var obj = [];
            obj.push(data);

            window.localStorage.setItem('chat', JSON.stringify(obj));
           
          }else{

            $.each(conversa, function(k,v){
            
              if(v.uid == getAtualChat()){
                   

                   const novoArray = editarNomePorUID(conversa, v.uid, title);
                   
                   window.localStorage.setItem('chat', JSON.stringify(novoArray));
                  
              }else{
                  // console.log('não-existe-uid-chat--------------');

                  // var data =  {
                  //   title: title,
                  //   data: d,
                  //   uid: uid
                  // }   

                  //  conversa.push(data);
                  //  window.localStorage.setItem('chat', JSON.stringify(conversa));
                  
              }
            })
            
          }


      }else if(type == 'novo'){
        var conversa = getChat();
        
        var data =  {
                    title:title,
                    data: d,
                    uid: uid
                  }    

           
            conversa.push(data);

            window.localStorage.setItem('chat', JSON.stringify(conversa));
            window.localStorage.setItem('uid_chat', uid);
      }else{
         
      }
      

    }catch(e){
      console.log('erro_chat',e.message)
    } 
}


function setConversa(pergunta, type, model, foto){
  try{
    setChat(pergunta, obterHoraEDataAtual(), uidChat(), type);

    var conversa = getConversa();
    if(conversa.length == 0){
      var data;
      if(model == 'gemini-pro'){
        data  =  {
              role: type,
              parts:  [
                {text: pergunta}
               
              ]
        }  
      }else{
        data =  {
              role: type,
              parts:  [
                {text: pergunta}
                
              ]
        }  
      }
       

      var obj = [];
      obj.push(data);

      window.localStorage.setItem('historico_'+getAtualChat(), JSON.stringify(obj));
      
    }else{
      // var data =  {
      //         role: type,
      //         parts:  [{
      //           text: pergunta
      //         }]
      //       }   

      var data;
      if(model == 'gemini-pro'){
        data  =  {
              role: type,
              parts:  [{
                text: pergunta
              }
              ]
        }  
      }else{
        data =  {
              role: type,
              parts:  [
                {text: pergunta}
              ]
        }  
      }

     conversa.push(data);

     window.localStorage.setItem('historico_'+getAtualChat(), JSON.stringify(conversa));
     


     

     
    }

  }catch(e){
    console.log(e.message)
  } 
} 

function getConversa(){
  try{
      var conversa = window.localStorage.getItem('historico_'+getAtualChat());

      if(conversa == null || conversa == undefined || conversa == '' || conversa == '[]'){
       return [];
      }else{
       var conversa = window.localStorage.getItem('historico_'+getAtualChat());
       return JSON.parse(conversa);
      }

  }catch(e){
      return [];
  }
}


function getChat(){
  try{
      var conversa = window.localStorage.getItem('chat');

      if(conversa == null || conversa == undefined || conversa == '' || conversa == '[]'){
       return [];
      }else{
       var conversa = window.localStorage.getItem('chat');
       return JSON.parse(conversa);
      }

  }catch(e){
      return [];
  }



}



function getConversas1(){
$("#chat-load").html('');

var conversa = getConversa();

// console.log('list-conversa', conversa);


  if(conversa.length != 0){

          $.each(conversa, function(k,v){
          	
             $("#chat-load").html('');
              $.each(conversa, function(k,v){

                var html;
                if(v.role == 'user'){

                    var img;
                    const valorDesejado = v?.parts?.[1]?.inline_data?.data;
                    if(valorDesejado !== undefined){
                      img = `<br><br><img src="data:image/png;base64,${valorDesejado}">`;
                      
                    }else{
                      img = ``;
                      
                    }

                    html = `<li class="clearfix">
                                  <div class="message-data text-right">
                                     
                                      
                                  </div>
                                  <div class="message other-message float-right">${v.parts[0].text}${img}</div>
                              </li>`;
                }else{

                    var img;
                    const valorDesejado = v?.parts?.[1]?.inline_data?.data;
                    if(valorDesejado !== undefined){
                      img = `<br><br><img src="data:image/png;base64,${valorDesejado}">`;
                      
                    }else{
                      img = ``;
                      
                    }
                    var string = formatarCodigo(v.parts[0].text);
                    // console.log(v.parts[0].text);
                    // var string = v.parts[0].text;

                    html = `<li class="clearfix">
                                    <div class="message-data">
                                     
                                    </div>
                                    <div class="message my-message">${string}</div>                                    
                                  </li>`;
                }

                $("#chat-load").append(html);


                


              });
               var suaDiv = document.querySelector(".chat-history");
               suaDiv.scrollTop = suaDiv.scrollHeight;

               hljs.highlightAll();








          })

   
  }else{

    var chat = getChat();
    if(chat.length == 0){
      // console.log('não tem conversa');
     $("#chat-load").html(`
                        <div class="bem-vindo">
                          <div class="box-bem">
                         Como posso ajudá-lo hoje?
                         <br>

                         <span>O Gemini é a família mais recente de modelos de linguagem grandes do Google. Este Aplicativo contém todas as funcionalidades necessárias para você começar a testar o Gemini.</span>
                        <button class="btn btn-primary" onclick="newChat()"><i class="fa fa-commenting-o"></i> Começar</button>

                        </div>
                        </div>`);
    }else{

    }


    
  }


}
getConversas1();

function getChats(){
    var chat = getChat();
    
    
    if(chat.length != 0){
      $("#load-conversa").html('');
      $.each(chat, function(k,v){
      var html = `<li class="clearfix uid_${v.uid} chats" onclick="openChat(this)" uid="${v.uid}">
                                <div class="dell" onclick="dell(event, this)" uid="${v.uid}"><i class="fa fa-trash"></i></div>

                                <div class="icon-chats"><i class="fa fa-comments"></i></div>
                                <div class="about">
                                    <div class="name">${v.title}</div>
                                    <div class="status"></i>${v.data}</div>                                            
                                </div>
                  </li>`;
      $("#load-conversa").prepend(html);
    })

     var uid = window.localStorage.getItem('uid_chat');
      
      $(".uid_"+uid).addClass('active');

      $(".chat-message").show();
      
    }else{
      
      $(".chat-message").hide();
      $("#load-conversa").html('');
    }
}
getChats()

function openChat(e){
  var uid = $(e).attr('uid');
  
  window.localStorage.setItem('uid_chat', uid);
  $(".chats").removeClass('active');
  $(e).addClass('active');
    getConversas1();

  $(".chat-message").show();

  menu()
}

function removerItemPorUID(uid) {
   var chat = getChat();
   var newobj = chat.filter(item => item.uid !== uid);
  
   window.localStorage.setItem('chat', JSON.stringify(newobj));
   window.localStorage.removeItem('historico_'+uid);
   getChats();
   getConversas1();
}


function dell(event, e){
 
  event.stopPropagation();
  var uid = $(e).attr('uid');
 

  removerItemPorUID(uid);
  $(".chat-message").hide();
}

function menu() {
 
  var icon = $(".menu a i");

  if (icon.hasClass('fa-list')) {
    // Se tem a classe fa-list, remove e adiciona fa-times
    icon.removeClass('fa-list').addClass('fa-times');
  } else if (icon.hasClass('fa-times')) {
    // Se tem a classe fa-times, remove e adiciona fa-list
    icon.removeClass('fa-times').addClass('fa-list');
  }

  $(".people-list").toggleClass('menu-list');
}