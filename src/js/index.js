/* Passos:
1- Digitar nome da cidade/ city
2- Clicar no botão de busca/ search
3- Enviar dados para a API
4- Representar dados retornados pela API em tela.
*/

const btnSearch = document.querySelector(".btn-search");

btnSearch.addEventListener("click", async() => {
    const city = document.getElementById("input-search-city").value;

    const dados = await getDadosDeClima(city);
    printDadosNaTela(dados, dados.city);
})

async function getDadosDeClima(city){
        const apiUrl = `http://localhost:5146/api/clima/${city}`; 
    try{
        const resposta = await fetch(apiUrl); // o fetch retorna o objeto de acordo com a url passada.

        if(resposta.status != 200){
            throw new Error("Erro ao buscar a cidade.");
        } 
        const dados= await resposta.json();
        console.log(dados); //teste para verificar se os dados estão sendo recebidos
        return dados;

    }catch(error){
        console.error("Erro: ", error);
    }
}

function printDadosNaTela(dados, city){
  
    //const tempC = Math.round(dados.tempCelsius);
    const iconCondition = "https:" + dados.iconCondition;

    document.getElementById("city").textContent = dados.city;
    document.getElementById("region").textContent = dados.region;
    document.getElementById("temp-c").textContent = Math.round(dados.tempCelsius) + "°C";
    document.getElementById("icon-condition").setAttribute("src", iconCondition );
    document.getElementById("condition").textContent = dados.condition;
    document.getElementById("humidity").textContent = dados.humidity;
    document.getElementById("wind-speed").textContent = dados.windSpeed;
    
}