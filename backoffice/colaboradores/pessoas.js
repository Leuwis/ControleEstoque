import {Cxmsg} from  "../../utils/cxmsg.js";

const endpointTodasPessoas  = "http://127.0.0.1:1880/todaspessoas";
const endpoinTiposPessoa    = "http://127.0.0.1:1880/tipospessoa";
const dadosGrid             = document.getElementById("dadosGrid") ;
const limparFiltragem       = document.getElementById("limparFiltragem");
const pesquisarPessoa       = document.getElementById("pesquisarPessoa");
const adicionarPessoa       = document.querySelector("#adicionarPessoa");
const novaPessoa            = document.getElementById("novaPessoa");
const btnCancelar           = document.getElementById("btnCancelar");
const btnFechar             = document.getElementById("btnFechar");
const btnGravarPopup        = document.getElementById("btnGravarPopup");
const btnCancelarPopup      = document.getElementById("btnCancelarPopup");
const fNome                 = document.getElementById("fNome");
const fTipo                 = document.getElementById("fTipo");
const fStatus               = document.getElementById("fStatus");
const fFoto                 = document.getElementById("fFoto");
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
let idPessoaEditar          = -1;

//n = NOVA PESSOA | e = EDITAR PESSOA
let modoJanela = "n"; 

const servidor = sessionStorage.getItem("servidor_nodered"); 

// --------------------------------------------------------------- FILTRAGEM DE PESSOAS -------------------------------------------------------

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

// --------------------------------------------------------------- PESQUISA DE PESSOAS -------------------------------------------------------

pesquisarPessoa.addEventListener("click", ()=>{
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
        const endpointPesquisar = `${servidor}pesquisapessoa/${opSelecionada}/${fPesquisa.value}`;
        const todasLinhasGrid = [...document.querySelectorAll(".linhaGrid")];
        if(todasLinhasGrid.length > 0){
            todasLinhasGrid.forEach(el =>{
                el.remove();
            })
        }
        carregarPessoas(endpointPesquisar);
    }
        
        fPesquisa.value = "";
        popupPesquisa.classList.add("ocultarPopup");
    });
    
//  -------------------------------------------------------------------- LIMPAR FILTRAGEM -----------------------------------------------------------

limparFiltragem.addEventListener("click", (evt)=>{
    carregarPessoas(endpointTodasPessoas);
    fFiltragem.value = "";

})

//  -------------------------------------------------------------- BUSCANDO USUÁRIOS CADASTRADOS ----------------------------------------------------


const carregarPessoas=(endpoint)=>{
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
            c1.innerHTML = ele.n_pessoa_pessoa;
            const c2 = document.createElement("div");
            c2.classList = "colunaLinhaGrid c2";
            c2.innerHTML = ele.s_nome_pessoa;
            const c3 = document.createElement("div");
            c3.classList = "colunaLinhaGrid c3";
            c3.innerHTML = ele.n_tipopessoa_pessoa;
            const c4 = document.createElement("div");
            c4.classList = "colunaLinhaGrid c4";
            c4.innerHTML = ele.c_status_pessoa;
            const c5 = document.createElement("div");
            c5.classList = "colunaLinhaGrid c5";
            
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
                        texto:`Tem certeza que deseja deletar o(a) pessoa(a) ${nome} ?`,
                        titulo:"Alerta",
                        tipo:"sn",
                        cor:"#f55",
                        ok:()=>{},
                        sim:()=>{
                            fetch(endpointDeletarColab)
                            .then(res=>{
                                if(res.status == "200"){
                                    const config2={
                                        texto:`Pessoa(a) ${nome} deletado com sucesso!`,
                                        titulo:"info",
                                        tipo:"ok",
                                        cor:"#5b5",
                                        ok:()=>{},
                                        sim:()=>{},
                                        nao:()=>{}
                                    }
                                    Cxmsg.mostrar(config2)
                                }else{
                                    const config2={
                                        texto:`Falha ao deletar pessoa(a) ${nome}!`,
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
    
                const id = evt.target.parentNode.parentNode.firstChild.innerHTML;
                const endpointDadosPessoa = `${servidor}dadospessoa/${id}`;
                const endpointTelefonesColab = `${servidor}telefonespessoa/${id}`;
    
                fetch(endpointDadosPessoa)
                .then(res => res.json())
                .then(res =>{
                    idPessoaEditar = id;
                    fTipo.value     = res[0].n_tipopessoa_pessoa;
                    fNome.value     = res[0].s_nome_pessoa;
                    fStatus.value   = res[0].c_status_pessoa;
                    imgFoto.src     = res[0].s_foto_pessoa;
                });
    
                fetch(endpointTelefonesColab)
                .then(res => res.json())
                .then(res =>{
                    if(res.length > 0){
                        res.map(ele=>{
                            criarCaixaTelefone(ele.s_numero_telefone, ele.n_telefone_telefone, "e")
                        })
                    }                
                });
                 tituloPopup.innerHTML = "Editar dados pessoas";
                 novaPessoa.classList.remove("ocultarPopup");
            })
    
            let status = c4.innerHTML;
    
            const imgStatus = document.createElement("img");
            if(status == "a"){
                imgStatus.setAttribute("src", "../../recursos/on.svg");
            }else{
                imgStatus.setAttribute("src", "../../recursos/off.svg");
            }
    
            imgStatus.classList = "icons"
            imgStatus.setAttribute("data-set", ele.n_pessoa_pessoa)
            imgStatus.addEventListener("click", (evt)=>{
    
                let letraIncial = imgStatus.parentNode.parentNode.childNodes[3]
    
                if(status == "a"){
                    status = "d" 
                }else{
                    status = "a"
                }
    
                const endpointAtualizaStatus = `${servidor}atualizarstatus`;
                
                const dadosStatus = {
                    "status":status,
                    "n_pessoa_pessoa":c1.innerHTML
                }
    
                const cabecalho = {
                    method:'post',
                    body:JSON.stringify(dadosStatus)
                }
    
                fetch(endpointAtualizaStatus, cabecalho)
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
    
            c5.appendChild(imgStatus);
            c5.appendChild(imgedit);
            c5.appendChild(imgLixeira);
    
            linhaGrid.append(c1);
            linhaGrid.append(c2);
            linhaGrid.append(c3);
            linhaGrid.append(c4);
            linhaGrid.append(c5);
    
            dadosGrid.appendChild(linhaGrid);
        });
    })

}
carregarPessoas(endpointTodasPessoas);

fetch(endpoinTiposPessoa)
.then(res=>res.json())
.then(res=>{
    res.map((el)=>{
        const op = document.createElement("option");
        op.setAttribute("value", el.n_tipopessoa_pessoa);
        op.innerHTML = el.s_descricao_tipopessoa;
        fTipo.appendChild(op);
    })
})

adicionarPessoa.addEventListener("click", ()=>{
    modoJanela = "n";
    tituloPopup.innerHTML = "Novo Pessoa";
    novaPessoa.classList.remove("ocultarPopup");
})

//  ------------------------------------------------------------------------------- GRANVANDO NOVA PESSOA -------------------------------------------------------

btnGravarPopup.addEventListener("click", ()=>{

    const tels = [...document.querySelectorAll(".novoTel")];
    let numTels = [];
    tels.forEach(t=>{
        numTels.push(t.innerHTML);
    })
    
    let dados = {
        n_pessoa_pessoa:idPessoaEditar,
        s_nome_pessoa:fNome.value,
        n_tipopessoa_pessoa:fTipo.value,
        c_status_pessoa:fStatus.value,
        telefones:numTels,
        s_foto_pessoa:imgFoto.getAttribute("src")
    }
    
    const cabecalho={
        method:'post',
        body:JSON.stringify(dados)
    }
    
    let endpointAdicionaEditaPessoa = null;
    if(modoJanela == "n"){
        endpointAdicionaEditaPessoa = `${servidor}adicionarpessoa`;
    }else{
        endpointAdicionaEditaPessoa = `${servidor}editarpessoa`;
    }

    const apagarTel = [...document.querySelectorAll(".tel")];

    fetch(endpointAdicionaEditaPessoa, cabecalho)
    .then(res=>{
        if(res.status==200){
            
            if(modoJanela == "n"){
                apagarTel.forEach(t=>{
                    t.remove();
                })
                novaPessoa.classList.add("ocultarPopup");

                const config={
                    titulo:"info",
                    texto:"NovPessoa gravado com sucesso",
                    tipo:"ok",
                    cor:"#5b5",
                    ok:()=>{},
                    sim:()=>{},
                    nao:()=>{},
                }
                Cxmsg.mostrar(config)


                fNome.value = "";
                fStatus.value = "ativo";
                fTipo.value = "1";
                fFoto.value = "";
                imgFoto.src = "";
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
            carregarPessoas(endpointTodasPessoas);
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
    telefones.innerHTML = "";
    fNome.value = "";
    fStatus.value = "";
    fTipo.value = "";
    fFoto.value = "";
    imgFoto.src = "";
    idPessoaEditar = -1;
    novaPessoa.classList.add("ocultarPopup");
}

//--------------------------------------------------------------- INSERINDO TELEFONE NA CAIXA ------------------------------------------------------

const criarCaixaTelefone=(numTelelefone, idTel, tipo)=>{

    const tel = document.createElement("div");
    tel.classList = "tel";
    
    const numTel = document.createElement("div");
    if(tipo == "n"){
        numTel.classList = "numTel novoTel";
    }else{
        numTel.classList = "numTel editarTel";
    }
    numTel.innerHTML = numTelelefone;
    
    const delTel = document.createElement("div");
    delTel.classList = "delTel";
    
    const imgDelTel = document.createElement("img");
    imgDelTel.setAttribute("src", "../../recursos/trashBranca.svg");
    imgDelTel.classList = "imgDelTel";
    imgDelTel.setAttribute("id", "imgDelTel");
    imgDelTel.setAttribute("data-idtel", idTel);
    imgDelTel.addEventListener("click", (evt)=>{
        if(idTel != -1){
            const endPointDelTel = `${servidor}deltelefone/${idTel}`;
            fetch(endPointDelTel)
            .then(res=>res.json())
            .then(res=>{
            })
        }
        evt.target.parentNode.parentNode.remove();
    })
    
    delTel.appendChild(imgDelTel);
     tel.appendChild(numTel);
     tel.appendChild(delTel);
     telefones.appendChild(tel);
}

fTelefone.addEventListener("keyup",(evt)=>{
    if(evt.key=="Enter"){
        if(evt.target.value.length >= 8 && evt.target.value.length <= 11){
            criarCaixaTelefone(evt.target.value, -1, "n")
             evt.target.value = "";
        }else{
            const config={
                texto:"Número de telefone invalido",
                titulo:"Info",
                tipo:"ok",
                ok:()=>{},
                sim:()=>{},
                nao:()=>{}
            }
        }
    }
})

//  ------------------------------------------------------------------ TRATANDO A IMAGEM DA PESSOA ----------------------------------------------------------

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
    converteImagemB64(imgFoto, evt.target.files[0]);
})
