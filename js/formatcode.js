
function markdown(markdownText) {
    // Converte o Markdown para HTML usando marked.js
    return marked.parse(markdownText);
}


function formatarCodigo(codigoOriginal) {
  // Divide o código em linhas
  var linhas = codigoOriginal.split('\n');

  // Inicializa as variáveis para armazenar o texto e o código
  var textoForaCodigo = '';
  var dentroCodigo = false;
  var codigo = '';
  var explicacao = '';
  var extensao = '';
 

  // Itera sobre as linhas
  for (var i = 0; i < linhas.length; i++) {
    var linha = linhas[i];

    // Verifica se a linha começa com '```'
    if (linha.trim().startsWith('```')) {
       // var pegarLinguagem = codigoOriginal.split('```')[1].split(' ')[0];
       // console.log('pegarLinguagem-------->',pegarLinguagem);
       // extensao = pegarLinguagem;
      // Inverte o estado dentroCodigo
      dentroCodigo = !dentroCodigo;

      // Se não estiver dentro do código, adiciona o texto fora das tags <pre><code>
      if (!dentroCodigo) {
        // Remove a marcação '```' da linha
        linha = linha.trim().slice(3);

        // Verifica se estamos na parte de explicação
        if (explicacao !== '') {
          explicacao += linha + '\n';
        } else {
          textoForaCodigo += linha + '\n';
        }
      }
    } else {
      // Adiciona a linha ao texto ou ao código, dependendo do estado atual
      if (dentroCodigo) {
        // Escape HTML na linha para evitar problemas de renderização
        codigo += linha + '\n';
      } else {
        // Verifica se estamos na parte de explicação
        if (explicacao !== '') {
          explicacao += linha + '\n';
        } else {
          textoForaCodigo += linha + '\n';
        }
      }
    }
  }

  // Se houver código, envolve-o em tags <pre><code> e realiza o escape HTML
  if (codigo.trim() !== '') {

    codigo = '<pre><code>' + escapeHTML(codigo) + '</code></pre>';
  }

  // Envolve o código dentro de uma <div> e adiciona o texto fora
  // return '<div>' + '<span>' + escapeHTML(textoForaCodigo) + '</span>' + explicacao + codigo + '</div>';
   return '<div>' + '<span class="span-text">' + markdown(escapeHTML(textoForaCodigo))+ '</span>' + markdown(explicacao) + codigo + '</div>';
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, function(match) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[match];
  });
}