
var modal = document.getElementById('modall');
var modalContentHTML = document.getElementById('modall-content');


const renderCampCards = () => {
    const cardItem = (campName, imgURL, qntOuro, qntPrata, qntBronze, index) => {
        return `
        <div class="card py-4">
        <img class="premios-img" src="${imgURL}" alt="simbolo do campeonato ${campName}">
        <div class="d-flex justify-content-evenly mt-3 mb-2">
            <div class="d-flex align-items-center">
                <img src="./img/medalha_ouro.png" alt="medalhas de ouro">
                <p class="text-small">${qntOuro}</p>
            </div>
            <div class="d-flex align-items-center">
                <img src="./img/medalha_prata.png" alt="medalhas de prata">
                <p class="text-small">${qntPrata}</p>
            </div>
            <div class="d-flex align-items-center">
                <img src="./img/medalha_bronze.png" alt="medalhas de bronze">
                <p class="text-small">${qntBronze}</p>
            </div>
        </div>
        <div class="px-3">
            <p class="text-small">${campName}</p>
            <button id="campCard-${index}" class="mx-auto btn-yellow modall-toggle mt-3">Ver Mais</button>
        </div>
    </div>
    `
    }

    info.campeonatos.forEach((camp, index)=>{
        const imgURL = camp.imagem
        const campName = camp.nome
        const qntOuro = camp.medalhas.ouro.total
        const qntPrata = camp.medalhas.prata.total
        const qntBronze = camp.medalhas.bronze.total
        document.getElementById('card-container').innerHTML += cardItem(campName, imgURL, qntOuro, qntPrata, qntBronze, index)
    })
}

renderCampCards()

const handleModalClick = (e) => {
    const cardNumber = e.target.id.split('-').pop()
    const campeonato = info.campeonatos[cardNumber]
    modalContentHTML.innerHTML = modalHeader(campeonato) + modalContent(campeonato)
    modal.style.display = "block";
}

const modalHeader = (campeonatoObject) => {
    nomeCampeonato = campeonatoObject.nome
    imgURL = campeonatoObject.imagem
    return `
        <div class="modall-header">
            <img src="${imgURL}" alt="">
            <h3>${nomeCampeonato}</h3>
        </div>
    `
}

const modalContent = (campeonatoObject) => {

    let htmlContent = ''
    const anos = campeonatoObject.anos
    
    for (const [year, arrayMedalhistas] of Object.entries(anos)) {

        let medalhistas = ''
        arrayMedalhistas.forEach((i) => {
            medalhistas += `
                <div class="modall-medalhista">
                    <p class="medalhista-posicao">${i.posicao}</p>
                    <img src="./img/medalha_${i.medalha}.png" alt="medalha de ${i.medalha}">
                    <p>${i.nome}</p>
                </div>
            `
        })
        htmlContent += `
            <div class="modall-year">
                <h4>${year}</h4>
                ${medalhistas}
            </div>
        `
    }
    return htmlContent
}

// Botoes para abrir o modal
modal_togglers = [...document.getElementsByClassName("modall-toggle")] 

modal_togglers.forEach(element => {
    element.onclick = (e) => handleModalClick(e)
});

// fecha o modal se clicar no X
document.getElementsByClassName("close")[0].onclick = function() {
    modal.style.display = "none";
}

// fecha o modal se clicar fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}