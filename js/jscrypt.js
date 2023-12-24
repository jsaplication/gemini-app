function encrypt(key,text) {
  const toHex = (byte) => ('0' + byte.toString(16)).slice(-2);
  const salt = key;
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ salt.charCodeAt(i % salt.length);
    result += toHex(charCode);
  }
  return result;
}

function decrypt(key,encoded) {
  const fromHex = (hex) => parseInt(hex, 16);
  const salt = key;
  let result = '';
  for (let i = 0; i < encoded.length; i += 2) {
    const hexByte = encoded.slice(i, i + 2);
    const charCode = fromHex(hexByte) ^ salt.charCodeAt(i / 2 % salt.length);
    result += String.fromCharCode(charCode);
  }
  return result;
}


function geminiKey() {
  var my_api = window.localStorage.getItem('my_apikey');
  var api_returno;

   var apiKeys = [
               "262c17083d10693d080a3d08023c315b57474b20283607281b2647244a0e3d23580b5f304f4811",
               "262c17083d106e2a131c353d372e0c0d193a23270809555f282c4429343635553f050f31454046",
               "262c17083d106e4601230d34323a19044224023d2a5d3b285d245c5d0b0b175440031b2f493133",
               "262c17083d106c2043060d5d3a270020690a270a2055145d571d6700335d2b2835190126741d19",
               "262c17083d106f1f302b5312581c1607452041232137231f3c017a48140b05531c3d59017e453b",
               "262c17083d106c2239090c3f3b013f2d770231060c3c2000311f7f070723133634025d30572537",
               "262c17083d106f0a1c571e541d032b0d545d474252512e2f1a3a4338180d252f5e5f3a3d7c1a05",
               "262c17083d106f5d403e4a235d1e0a2e7209280c3d1c270f3e59573544361f0b075e225b602f46"
               ];
  // gera um índice aleatório entre 0 e o tamanho do array
  const indiceAleatorio = Math.floor(Math.random() * apiKeys.length);



  if(my_api == '' || my_api == undefined || my_api == null){
    api_returno = apiKeys[indiceAleatorio];
  }else{
    api_returno = my_api;
  } 
 
  // retorna a API key no índice aleatório
  return api_returno;
}




// function consultar(){
//     var xhr = new XMLHttpRequest();
  
//     //var model_image = decrypt("gemini-pro", "0f1119191d53025f150a09001f081a005b151e0e09021808090c03171d00000908081e005e5e11000a4a1b580c0c59115d02080108051d464a151f06090c40191c0600061b1c0e0a0353090c4315000e13002e06001d481e06500c001454") + text001;
//     var model_text =  decrypt("gemini-pro", "0f1119191d53025f150a09001f081a005b151e0e09021808090c03171d00000908081e005e5e11000a4a1b580c0c59115d02080108051d464a151f06090c40191c061717170102170c1d0b2a421e060a091152020b1010") + decrypt("gemini-pro", geminiKey());
    
//     // Abra uma conexão com a API
//     xhr.open('POST', model_text, true);
//     xhr.setRequestHeader('Content-Type', 'application/json');

//     // Envie a solicitação
//     xhr.send();

//     // Trate a resposta
//     xhr.onload = function() {
//       if (xhr.status === 200) {
//         // A solicitação foi bem-sucedida
//         var data = JSON.parse(xhr);
//         console.log(data.response);
//         return xhr.response;
//       } else {
//         // A solicitação falhou
       
//         console.log(xhr.response);
//         return xhr.response;
//       }
//     };

// }

// function consultar() {
//     return new Promise(function (resolve, reject) {
//         var xhr = new XMLHttpRequest();
//         var model_text = decrypt("gemini-pro", "0f1119191d53025f150a09001f081a005b151e0e09021808090c03171d00000908081e005e5e11000a4a1b580c0c59115d02080108051d464a151f06090c40191c061717170102170c1d0b2a421e060a091152020b1010");

//         // Abra uma conexão com a API
//         xhr.open('POST', model_text, true);
//         xhr.setRequestHeader('Content-Type', 'application/json');

//         // Envie a solicitação
//         xhr.send();

//         // Trate a resposta
//         xhr.onload = function () {
//             if (xhr.status === 200) {
//                 // A solicitação foi bem-sucedida
//                 var data = JSON.parse(xhr.responseText);
//                 console.log(data.response);
//                 resolve(xhr.response);
//             } else {
//                 // A solicitação falhou
//                 console.error(xhr.response);
//                 reject(xhr.response);
//             }
//         };
//     });
// }

// // Exemplo de uso
// async function executarConsulta() {
//     try {
//         var resultado = await consultar();
//         console.log('Resultado:', resultado);
//         return resultado;
//     } catch (erro) {
//         console.error('Erro:', erro);
//         throw erro;
//     }
// }

// // Chame a função que executa a consulta
// var resultado = await executarConsulta();
// console.log('Resultado fora da função:', resultado);