
var modal = document.getElementById('modal');
var modalContentHTML = document.getElementById('modal-content');


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
        <div class="modal-header">
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
                <div class="modal-medalhista">
                    <p>${i.posicao}</p>
                    <img src="./img/medalha_${i.medalha}.png" alt="medalha de ${i.medalha}">
                    <p>${i.nome}</p>
                </div>
            `
        })
        htmlContent += `
            <div class="modal-year">
                <h4>${year}</h4>
                ${medalhistas}
            </div>
        `
    }
    return htmlContent
}

// Botoes para abrir o modal
modal_togglers = [...document.getElementsByClassName("modal-toggle")] 

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