const servidor = sessionStorage.getItem("servidor_nodered"); 
import {Cxmsg} from  "../../utils/cxmsg.js";

const endpointFornecedores  = `${servidor}todosfornecedores`;
const dadosGrid             = document.getElementById("dadosGrid") ;
const limparFiltragem       = document.getElementById("limparFiltragem");
const pesquisarPessoa       = document.getElementById("pesquisarpessoa");
const adicionarFornecedor   = document.querySelector("#adicionarFornecedor");
const novoFornecedor        = document.getElementById("novoFornecedor");
const btnListarContatos     = document.getElementById("btnListarContatos");
const btnCancelar           = document.getElementById("btnCancelar");
const btnFechar             = document.getElementById("btnFechar");
const btnFecharContatos     = document.getElementById("btnFecharContatos");
const btnGravarPopup        = document.getElementById("btnGravarPopup");
const btnCancelarPopup      = document.getElementById("btnCancelarPopup");
const fNome                 = document.getElementById("fNome");
const fTipo                 = document.getElementById("fTipo");
const fStatus               = document.getElementById("fStatus");
const imgFoto               = document.getElementById("imgFoto");
const telefones             = document.querySelector("#telefones");
const fTelefone             = document.getElementById("fTelefone");
const imgDelTelefone        = document.querySelector(".imgDelTel");
const tituloPopup           = document.getElementById("tituloPopup");
const filtragem             = document.getElementById("filtragem"); 
const popupPesquisa         = document.getElementById("popupPesquisa");
const btnFecharPesquisa     = document.getElementById("btnFecharPesquisa");
const fPesquisaId           = document.getElementById("fPesquisaId");
const fPesquisaNome         = document.getElementById("fPesquisaNome");
const fPesquisa             = document.getElementById("fPesquisa");
const btnPesquisar          = document.getElementById("btnPesquisar");
const campoFormFoto         = document.querySelector(".campoForm2");
const listaContatos         = document.getElementById("listaContatos");
let idFornecedorEditar          = -1;

//n = NOVO COLABORADOR | e = EDITAR COLABORADOR
let modoJanela = "n"; 


// --------------------------------------------------------------- FILTRAGEM DE COLABORADORES -------------------------------------------------------

filtragem.addEventListener("keyup", (evt)=>{
    let input  = evt.target;
    let filtragem = input.value.toUpperCase();
    let texto;
    const linhasGrid = [...document.querySelectorAll(".linhaGrid")];
     for(let i=0; i < linhasGrid.length; i++){

        texto = linhasGrid[i].children[1].innerHTML;
        if(texto.toUpperCase().indexOf(filtragem) > -1){
            linhasGrid[i].classList.remove("ocultarLinhaGrid");
        }else{
            linhasGrid[i].classList.add("ocultarLinhaGrid");
        }
     }
})

// --------------------------------------------------------------- PESQUISA DE COLABORADORES -------------------------------------------------------

pesquisarColaborador.addEventListener("click", ()=>{
    popupPesquisa.classList.remove("ocultarPopup");
    fPesquisa.value = "";
    fPesquisa.focus();
})

btnFecharPesquisa.addEventListener("click", ()=>{
    popupPesquisa.classList.add("ocultarPopup");
})

let opSelecionada = "id";

fPesquisaNome.addEventListener("change", (evt)=>{
    opSelecionada = "nome";
    fPesquisa.value = "";
    fPesquisa.setAttribute("type", "text");
    fPesquisa.focus();
})
fPesquisaId.addEventListener("change", (evt)=>{
    opSelecionada = "id";
    fPesquisa.value = "";
    fPesquisa.setAttribute("type", "number");
    fPesquisa.focus();
})

btnPesquisar.addEventListener("click", (evt)=>{
    
    if(fPesquisa.value == ""){
        const config={
                titulo:"teste",
                texto:"Prencha o campo de pesquisa",
                tipo:"sn",
                cor:"#005",
                ok:()=>{},
                sim:()=>{},
                nao:()=>{},
            }

            Cxmsg.mostrar(config);

        fPesquisa.focus();
    }else{
        const endpointPesquisar = `${servidor}pesquisafornecedor/${opSelecionada}/${fPesquisa.value}`;
        const todasLinhasGrid = [...document.querySelectorAll(".linhaGrid")];
        if(todasLinhasGrid.length > 0){
            todasLinhasGrid.forEach(el =>{
                el.remove();
            })
        }
        carregarFornecedor(endpointPesquisar);
    }
        
        fPesquisa.value = "";
        popupPesquisa.classList.add("ocultarPopup");
    });
    



//  -------------------------------------------------------------------- LIMPAR FILTRAGEM -----------------------------------------------------------

limparFiltragem.addEventListener("click", (evt)=>{
    carregarFornecedor(endpointFornecedores);
    fFiltragem.value = "";
})

//  -------------------------------------------------------------- BUSCANDO USUÁRIOS CADASTRADOS ----------------------------------------------------
    

const carregarFornecedor=(endpoint)=>{
    const todasLinhasGrid = [...document.querySelectorAll(".linhaGrid")];
    if(todasLinhasGrid.length > 0){
        todasLinhasGrid.forEach(el =>{
            el.remove();
        })
    }
    fetch(endpoint)
    .then(res=>res.json())
    .then(res=>{
        res.forEach(ele => {
            const linhaGrid = document.createElement("div");
            linhaGrid.classList = "linhaGrid";
            const c1 = document.createElement("div");
            c1.classList = "colunaLinhaGrid c1";
            c1.innerHTML = ele.n_fornecedor_fornecedor;
            const c2 = document.createElement("div");
            c2.classList = "colunaLinhaGrid c2";
            c2.innerHTML = ele.s_desc_fornecedor;
            const c3 = document.createElement("div");
            c3.classList = "colunaLinhaGrid c3";
            c3.innerHTML = ele.c_status_fornecedor;
            const c4 = document.createElement("div");
            c4.classList = "colunaLinhaGrid c4";
            
            const imgLixeira = document.createElement("img");
            imgLixeira.setAttribute("src", "../../recursos/trashPreta.svg");
            imgLixeira.classList = "icons"
            imgLixeira.addEventListener("click",(evt)=>{
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML;
                const nome = evt.target.parentNode.parentNode.children[1].innerHTML;
                const endpointBuscaTelColab = `${servidor}buscatelidcolab/${id}`;
                let telefones = [];
                fetch(endpointBuscaTelColab)
                .then(res=>res.json())
                .then(res=>{
                    if(res.length > 0){
                        res.map(ele =>{
                            telefones.push(ele.n_telefone_telefone);
                        })
                    }else{
                        telefones.push(0)
                    }
                })
                setTimeout(()=>{

                    console.log(telefones.length)
                    const endpointDeletarColab = `${servidor}deletarcolab/${id}/${telefones}`;
    
                    const config={
                        texto:`Tem certeza que deseja deletar o(a) colaborador(a) ${nome} ?`,
                        titulo:"Alerta",
                        tipo:"sn",
                        cor:"#f55",
                        ok:()=>{},
                        sim:()=>{
                            fetch(endpointDeletarColab)
                            .then(res=>{
                                if(res.status == "200"){
                                    const config2={
                                        texto:`Colaborador(a) ${nome} deletado com sucesso!`,
                                        titulo:"info",
                                        tipo:"ok",
                                        cor:"#f33",
                                        ok:()=>{},
                                        sim:()=>{},
                                        nao:()=>{}
                                    }
                                    Cxmsg.mostrar(config2)
                                }else{
                                    const config2={
                                        texto:`Falha ao deletar Colaborador(a) ${nome}!`,
                                        titulo:"info",
                                        tipo:"ok",
                                        ok:()=>{},
                                        sim:()=>{},
                                        nao:()=>{}
                                    }
                                    Cxmsg.mostrar(config2)
                                }
                            })
                        },
                        nao:()=>{}
                    }
                    Cxmsg.mostrar(config)
                },150)
            })
    
            const imgedit = document.createElement("img");
            imgedit.setAttribute("src", "../../recursos/edit.svg");
            imgedit.classList = "icons"
            imgedit.addEventListener("click", (evt)=>{

                modoJanela = "e";
                fNome.value = "";
                fStatus.value = "ativo";
                imgFoto.src = "";
                campoFormFoto.classList.add("ocultarElemento")


                idFornecedorEditar = evt.target.parentNode.parentNode.children[0].innerHTML;
                const dadosFornecedor = `${servidor}fornecedor/${idFornecedorEditar}`

                fetch(dadosFornecedor)
                .then(res=>res.json())
                .then(res=>{
                    fNome.value = res[0].s_desc_fornecedor;
                    fStatus.value = res[0].c_status_fornecedor;
                    imgFoto.src = res[0].s_logo_fornecedor;
                    if(res[0].s_logo_fornecedor != ""){
                        campoFormFoto.classList.remove("ocultarElemento")

                    }
                })
                // fNome.value = evt.target.parentNode.parentNode.children[1].innerHTML;
                // fStatus.value = evt.target.parentNode.parentNode.children[2].innerHTML;

                 tituloPopup.innerHTML = "Editar dados Fornecedor";
                 novoFornecedor.classList.remove("ocultarPopup");
            })
    
            let status = c3.innerHTML;
    
            const imgStatus = document.createElement("img");
            if(status == "a"){
                imgStatus.setAttribute("src", "../../recursos/on.svg");
            }else{
                imgStatus.setAttribute("src", "../../recursos/off.svg");
            }
    
            imgStatus.classList = "icons"
            imgStatus.setAttribute("data-set", ele.n_fornecedor_fornecedor)
            imgStatus.addEventListener("click", (evt)=>{
    
                 let letraIncial = imgStatus.parentNode.parentNode.childNodes[2]
    
                 if(status == "a"){
                     status = "d" 
                 }else{
                     status = "a"
                 }
    
                 const endpointAtualizaStatusFornecedor = `${servidor}alterastatusfornecedor`;
                
                 const dadosStatus = {
                     "c_status_fornecedor":status,
                     "n_fornecedor_fornecedor":c1.innerHTML
                 }
    
                const cabecalho = {
                    method:'post',
                    body:JSON.stringify(dadosStatus)
                }
    
                console.log(cabecalho.body)
                fetch(endpointAtualizaStatusFornecedor, cabecalho)
                .then(res=>{
                    if(res.status == 200){
                         if(status == "a"){
                             imgStatus.setAttribute("src", "../../recursos/on.svg");
                             letraIncial.innerHTML = "a"  
                         }else{
                             imgStatus.setAttribute("src", "../../recursos/off.svg");
                             letraIncial.innerHTML = "d"  
                         }
                    }
                })
               
            })
    
            c4.appendChild(imgStatus);
            c4.appendChild(imgedit);
            c4.appendChild(imgLixeira);
    
            linhaGrid.append(c1);
            linhaGrid.append(c2);
            linhaGrid.append(c3);
            linhaGrid.append(c4);
    
            dadosGrid.appendChild(linhaGrid);
        });
    })

}
carregarFornecedor(endpointFornecedores);

// fetch(endpoinTiposPessoa)
// .then(res=>res.json())
// .then(res=>{
//     res.map((el)=>{
//         const op = document.createElement("option");
//         op.setAttribute("value", el.n_tipopessoa_tipopessoa);
//         op.innerHTML = el.s_descricao_tipopessoa;
//         fTipo.appendChild(op);
//     })
// })

adicionarFornecedor.addEventListener("click", ()=>{
    modoJanela = "n";
    tituloPopup.innerHTML = "Novo Colaborador";
    campoFormFoto.classList.add("ocultarElemento");
    novoFornecedor.classList.remove("ocultarPopup");
})

//  ------------------------------------------------------------------------------- GRANVANDO NOVO FORNECEDOR -------------------------------------------------------

btnGravarPopup.addEventListener("click", ()=>{

   
    let dados = {
        n_fornecedor_fornecedor:idFornecedorEditar,
        s_desc_fornecedor:fNome.value,
        c_status_fornecedor:fStatus.value,
        s_logo_fornecedor:imgFoto.getAttribute("src")
    }
    
    const cabecalho={
        method:'post',
        body:JSON.stringify(dados)
    }
    console.log(cabecalho.body);
    
    let endpointAdicionaEditaFornecedor = null;
    if(modoJanela == "n"){
        endpointAdicionaEditaFornecedor = `${servidor}adicionarfornecedor`;
    }else{
        endpointAdicionaEditaFornecedor = `${servidor}editarfornecedor`;
    }

    fetch(endpointAdicionaEditaFornecedor, cabecalho)
    .then(res=>{
        if(res.status==200){
            
            if(modoJanela == "n"){
                novoFornecedor.classList.add("ocultarPopup");

                const config={
                    titulo:"info",
                    texto:"Novo colaborador gravado com sucesso",
                    tipo:"ok",
                    cor:"#b99",
                    ok:()=>{},
                    sim:()=>{},
                    nao:()=>{},
                }
                Cxmsg.mostrar(config)


                fNome.value = "";
                fStatus.value = "a";
            }else{
                const config={
                    titulo:"info",
                    texto:"Dados autalizados",
                    tipo:"ok",
                    cor:"#6f6",
                    ok:()=>{},
                    sim:()=>{},
                    nao:()=>{},
                }
                Cxmsg.mostrar(config)
            }
            carregarFornecedor(endpointFornecedores);
        }else{
            const config={
                titulo:"info",
                texto:"Erro ao atualizar dados",
                tipo:"ok",
                ok:()=>{},
                sim:()=>{},
                nao:()=>{},
            }
            Cxmsg.mostrar(config)
        }
    })
})

btnCancelarPopup.addEventListener("click", ()=>{
    fecharPopup();
})

btnFechar.addEventListener("click", ()=>{
    fecharPopup();
})

const fecharPopup=()=>{
    fNome.value = "";
    fStatus.value = "";
    idFornecedorEditar = -1;
    campoFormFoto.classList.remove("ocultarElemento");
    fFoto.value = "";
    novoFornecedor.classList.add("ocultarPopup");
}


//  ------------------------------------------------------------------ MOSTRAR/OCULTAR CONTATOS FORNECEDOR ----------------------------------------------------------

btnListarContatos.addEventListener("click", ()=>{
    listaContatos.classList.remove("ocultarPopup");
    fecharPopup();
})

btnFecharContatos.addEventListener("click", ()=>{
    listaContatos.classList.add("ocultarPopup");
})
//  ------------------------------------------------------------------ TRATANDO A IMAGEM DO COLABORADOR ----------------------------------------------------------

const converteImagemB64 = (localDestino, arquivoImg)=>{
    const obj = arquivoImg;
    const reader = new FileReader();
    reader.addEventListener("load", (evt)=>{
        localDestino.src = reader.result;
    });
    if(obj){
        reader.readAsDataURL(obj);
    }
}
fFoto.addEventListener("change", (evt)=>{
    campoFormFoto.classList.remove("ocultarElemento")
    converteImagemB64(imgFoto, evt.target.files[0]);
})
