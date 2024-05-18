async function fetchData() {
    try {
        const response = await fetch('GemaData.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// cria os backgrounds GEMA GEMA GEMA e 0 1 0 1
const createCanvas = (canvasText, textColor, darkOrLight) => {

    const canvas = document.createElement("canvas");
    const fontSize = 30;
    canvas.setAttribute('height', fontSize);
    var context = canvas.getContext('2d');

    context.fillStyle = darkOrLight === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.04)' ;
    context.color = textColor
    context.font = fontSize + 'px sans-serif';
    context.lineHeight = '45px'
    context.fillText(canvasText, 7, fontSize);
    
    return canvas
}

// background 0 1 0 1 ...
const bgBinario = [...document.getElementsByClassName('bg-binario')]

bgBinario.forEach( (e) => {
    const text = '0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 1 1 0 1';
    e.style.backgroundImage = "url(" + createCanvas(text, '#191946','dark').toDataURL("image/png")+ ")" ;
})

// background GEMA
const bgGema = [...document.getElementsByClassName('bg-gema')]

bgGema.forEach( (e) => {
    const text = 'GEMA GEMA GEMA GEMA';
    e.style.backgroundImage = "url(" + createCanvas(text, '#D2D2D2', 'light').toDataURL("image/png")+ ")" ;
})


// renderiza os cards
const renderCampCards = (info) => {
    const cardItem = (campName, imgURL, qntOuro, qntPrata, qntBronze, index) => {
        return `
        <div class="col-12 col-md-8 col-lg-4 my-3">
            <div class="card py-4">
                <img class="premios-img" src="${imgURL}" alt="simbolo do campeonato ${campName}">
                <div class="d-flex justify-content-evenly mt-3 mb-2">
                    <div class="d-flex align-items-center">
                        <img src="./img/premios/medalha_ouro.png" alt="medalhas de ouro">
                        <p class="text-small">${qntOuro}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <img src="./img/premios/medalha_prata.png" alt="medalhas de prata">
                        <p class="text-small">${qntPrata}</p>
                    </div>
                    <div class="d-flex align-items-center">
                        <img src="./img/premios/medalha_bronze.png" alt="medalhas de bronze">
                        <p class="text-small">${qntBronze}</p>
                    </div>
                </div>
                
                <p class="text-small px-3 mb-2">${campName}</p>
                
                <button id="campCard-${index}" class=" mx-auto btn-yellow modal-toggle mt-auto">Ver Mais</button>
            </div>
        </div>
    `
    }

    info.campeonatos.forEach((camp, index)=>{
        const imgURL = camp.imagem
        const campName = `${camp.nomeCompleto} (${camp.nome})`
        const qntOuro = camp.medalhas.ouro.total
        const qntPrata = camp.medalhas.prata.total
        const qntBronze = camp.medalhas.bronze.total
        document.getElementById('card-campeonatos-container').innerHTML += cardItem(campName, imgURL, qntOuro, qntPrata, qntBronze, index)
    })
}

const renderNewsCards = (info) => {
    const cardItem = (newsText, imgURL) => {
        return `
        <div class="col-12 col-md-8 col-lg-4 my-3">
            <div class="card cursor-pointer bg-transparent">
                <img src="${imgURL}" alt="imagem da notícia" class="card-img-top">            
                <div class="p-2 bg-white h-100 border-radius-card-bottom d-flex align-items-center">
                    <p class="text-small">${newsText}</p>
                </div>
            </div>
        </div>
    `
    }   
    info.Noticias.forEach((noticia) => {
        document.getElementById('card-noticias-container').innerHTML += cardItem(noticia.titulo, noticia.imagem)
    })

}

// Modal
const modalHeader = (campeonatoObject) => {
    nomeCampeonato = campeonatoObject.nomeCompleto
    imgURL = campeonatoObject.imagem
    return `
        <div class="modal-header justify-content-between">
            <img src="${imgURL}" alt="">
            <h3 class="mx-3">${nomeCampeonato}</h3>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
    `
}

const modalContent = (campeonatoObject) => {

    let htmlContent = ''
    const anos = campeonatoObject.anos
    
    for (const year of Object.keys(anos).reverse()) {

        let medalhistas = ''
        const arrayMedalhistas = anos[year]
        arrayMedalhistas.forEach((i) => {
            medalhistas += `
                <div class="d-flex align-items-center fs-4">
                    <p class="medalhista-posicao mb-0">${i.posicao}</p>
                    <img src="./img/premios/medalha_${i.medalha}.png" alt="medalha de ${i.medalha}" class="ms-2">
                    <p class="mb-0">${i.nome}</p>
                </div>
            `
        })
        htmlContent += `
            <div class="mb-4">
                <h4>${year}</h4>
                ${medalhistas}
            </div>
        `
    }
    return `
        <div class="modal-body">
            ${htmlContent}
        </div>
    `
}

const handleModalClick = (e, info) => {
    const modal = document.getElementById('modal');
    const modalDialog = document.getElementById('modal-content');
    
    const cardNumber = e.target.id.split('-').pop()
    const campeonato = info.campeonatos[cardNumber]
    modalDialog.innerHTML = modalHeader(campeonato) + modalContent(campeonato);
    modal.style.display = "block";

    // fecha o modal se clicar no X
    document.getElementsByClassName("btn-close")[0].onclick = function() {
    modal.style.display = "none";
}
}

async function initialize() {
    const info = await fetchData();
    if (info) {
        renderCampCards(info);
        renderNewsCards(info);

        // Botoes para abrir o modal
        const modal_togglers = [...document.getElementsByClassName("modal-toggle")];
        modal_togglers.forEach(element => {
            element.onclick = (e) => handleModalClick(e, info);
        });

        // fecha o modal se clicar fora dele
        const modal = document.getElementById('modal');
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}

initialize();
