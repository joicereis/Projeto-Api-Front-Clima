/* Passos:
1- Digitar nome da cidade
2- Clicar no botão de busca
3- Enviar dados para a API
4- Representar dados retornados pela API em tela.
*/
const chaveApi ="" //Insira aqui a chave/token gerada pela API.
const botaoBusca = document.querySelector(".btn-busca");

botaoBusca.addEventListener("click", async() => {
    const cidade = document.getElementById("input-busca-cidade").value;
    //if(!cidade) return; //se não houver nada na cidade, interrompe a busca

    const dados = await buscarDadosDeClima(cidade);
    preencherDadosNaTela(dados, dados.location.name);
})

async function buscarDadosDeClima(cidade){
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${chaveApi}&q=${cidade}&aqi=no&lang=pt`
    const resposta = await fetch(apiUrl); // o fetch retorna o objeto de acordo com a url passada.
    
    if(resposta.status !== 200) return;
    
    const dados= await resposta.json();
    console.log(dados);
    return dados;
}

function preencherDadosNaTela(dados, cidadeEncontrada){
    const estado = dados.location.region;
    const temperatura = Math.round(dados.current.temp_c);
    const umidade = dados.current.humidity;
    const condicao = dados.current.condition.text;
    const velocidadeVento = dados.current.wind_kph;
    const iconeCondicao = "https:" + dados.current.condition.icon;

    document.getElementById("cidade").textContent = cidadeEncontrada;
    document.getElementById("estado").textContent = estado;
    document.getElementById("temperatura").textContent = `${temperatura}°C`;
    document.getElementById("icone-condicao").setAttribute("src", iconeCondicao );
    document.getElementById("condicao").textContent = condicao;
    document.getElementById("umidade").textContent = umidade;
    document.getElementById("velocidade-vento").textContent = velocidadeVento;
}