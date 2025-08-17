const formulario = document.getElementById("form");
const cidade = document.querySelector(".cidade");
const imagemTempo = document.getElementById("img-tempo");
const umidadeAr = document.querySelector(".umidade");
const temp = document.querySelector(".temp");
const tempMax = document.querySelector(".t-max");
const tempMim = document.querySelector(".t-mim");
const velVento = document.querySelector(".v-vento");
const titulo = document.querySelector(".titulo")

let situacaoTempo = document.querySelector(".p-situacao");

const kei = "42e7199bda86e079fb5097d63be93d2a";

const meuBody = document.getElementById("body");

async function buscaCidade(cidadeBuscada) {
    const dados = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidadeBuscada}&appid=${kei}&lang=pt_br&units=metric`
    ).then((resposta) => resposta.json());
    renderizaDados(dados);
    console.log(dados);
}

const containerDados = document.querySelector(".container-info");
const renderizaDados = (dados) => {
    cidade.textContent = `Tempo em ${dados.name}`;
    temp.textContent = dados.main.temp.toFixed(0) + "°C";
    situacaoTempo.textContent = dados.weather[0].description;
    tempMax.textContent = `Temp. Max. ${dados.main.temp_max.toFixed(0)}`;
    tempMim.textContent = `Temp. Min. ${dados.main.temp_min.toFixed(0)}`;
    imagemTempo.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`

  
    const ventoEmKmHora = dados.wind.speed * 3.6;
    velVento.textContent = `Vento ${ventoEmKmHora.toFixed(2)}km/h`;

    umidadeAr.textContent = `Umidade ${dados.main.humidity}%`;

    if (dados.weather[0].description === "nublado") {
        meuBody.style.backgroundImage = "url(./image/nublado.jpg)";
        // quando nublado muda o título pra branco por motivos de contraste
        titulo.style.color = "#fff"
        return

    } else if (dados.weather[0].description === "nuvens dispersas") {
        meuBody.style.backgroundImage = "url(./image/nuvens-dispersas.jpg)";

    } if (dados.weather[0].description === "névoa" || "neblina") {
        meuBody.style.backgroundImage = "url(./image/nevoa.jpg)";

    } if (dados.weather[0].description === "chuva") {
        meuBody.style.backgroundImage = "url(./image/chuva.jpg)";
    } if (dados.weather[0].description === "céu limpo") {
        meuBody.style.backgroundImage = "url(./image/ceu-limpo.jpg)";
    }else{
                meuBody.style.backgroundImage = "url(./image/img-fundo-inicial.jpg)";

    }

    // mostra o container com dados estilizados
    containerDados.style.display = "block";
};

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const cidadeBuscada = document.getElementById("cidade-busca").value;
    buscaCidade(cidadeBuscada);
});
