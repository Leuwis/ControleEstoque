class Cxmsg{

    // static config={
        //     titulo:"",
        //     texto:"",
        //     cor:"",
        //     ok:null,
        //     sim:null,
        //     nao:null
        // }
    static config = null;

    static mostrar=(config)=>{

        this.config = config;

        const cxMsgFundo = document.createElement("div");
        cxMsgFundo.setAttribute("id", "cxMsgFundo");
        cxMsgFundo.setAttribute("class", "cxMsgFundo");

        const cxMsg = document.createElement("div")
        cxMsg.setAttribute("class", "cxMsg");

        const tituloCxMag = document.createElement("div");
        tituloCxMag.setAttribute("id", "tituloCxMsg");
        tituloCxMag.setAttribute("class", "tituloCxMsg");
        tituloCxMag.setAttribute("style", `background-color:${config.cor} !important;`);

        const pTitulo = document.createElement("p");
        pTitulo.innerHTML = config.titulo;

        const imgFechar = document.createElement("p");
        imgFechar.classList = "btnFecharCxMsg";
        imgFechar.setAttribute("id", "btnFechar");
        imgFechar.innerHTML = "X";
        imgFechar.addEventListener("click", (evt)=>{
           this.fecharCxMsg();
        })        

        const corpoCxmsg = document.createElement("div");
        corpoCxmsg.setAttribute("id", "corpoCxMsg");
        corpoCxmsg.setAttribute("class", "corpoCxMsg");

        const pMsg = document.createElement("p");
        pMsg.innerHTML = config.texto;

        const rodapeCxmsg = document.createElement("div");
        rodapeCxmsg.setAttribute("id", "rodapeCxMsg");
        rodapeCxmsg.setAttribute("class", "rodapeCxMsg");
        rodapeCxmsg.setAttribute("style", `background-color:${config.cor}`);
        
        const btnOkCxMsg = document.createElement("button");
        btnOkCxMsg.setAttribute("id", "btnOkCxMsg");
        btnOkCxMsg.setAttribute("class", "btnCxMsg");
        btnOkCxMsg.innerHTML = "OK";
        btnOkCxMsg.addEventListener("click", (evt)=>{
            config.ok();
            this.fecharCxMsg();
        }) 
        
        const btnSimCxMsg = document.createElement("button");
        btnSimCxMsg.setAttribute("id", "btnSimCxMsg");
        btnSimCxMsg.setAttribute("class", "btnCxMsg");
        btnSimCxMsg.innerHTML = "Sim";
        btnSimCxMsg.addEventListener("click", (evt)=>{
            config.sim();
            this.fecharCxMsg();
        }) 
        
        const btnNaoCxMsg = document.createElement("button");
        btnNaoCxMsg.setAttribute("id", "btnNaoCxMsg");
        btnNaoCxMsg.setAttribute("class", "btnCxMsg");
        btnNaoCxMsg.innerHTML = "Não";
        btnNaoCxMsg.addEventListener("click", (evt)=>{
            config.nao();
            this.fecharCxMsg();
        }) 
        
        if(config.tipo == "ok"){
            rodapeCxmsg.appendChild(btnOkCxMsg);
        }else{
            rodapeCxmsg.appendChild(btnSimCxMsg);
            rodapeCxmsg.appendChild(btnNaoCxMsg);
        }

        corpoCxmsg.appendChild(pMsg);

        tituloCxMag.appendChild(pTitulo);
        tituloCxMag.appendChild(imgFechar);

        cxMsg.appendChild(tituloCxMag)
        cxMsg.appendChild(corpoCxmsg)
        cxMsg.appendChild(rodapeCxmsg)

        cxMsgFundo.append(cxMsg)

        document.body.prepend(cxMsgFundo);
    }

    static fecharCxMsg=()=>{
        document.getElementById("cxMsgFundo").remove();
    }
}

export {Cxmsg};
