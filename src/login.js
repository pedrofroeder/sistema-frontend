window.onload = function (e) {

    var btnEntrar = document.getElementById("btnEntrar");

    var txtEmail = document.getElementById("txtEmail");
    txtEmail.focus();

    var txtSenha = document.getElementById("txtSenha");
    
    btnEntrar.onclick = function (e) {

        e.preventDefault();

        var email = txtEmail.value;

        var senha = txtSenha.value;

        if (email == "") {
            exibirMensagemErro("Informe o E-mail");
        } 
        else if (senha == "") {
            exibirMensagemErro("Informe a Senha");
        }
        else {
            realizarLogin(email, senha);
        }
    };

    function exibirMensagemErro(mensagem) {

        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        } , 5000);
        
    }

    function realizarLogin(email, senha) {

        var data = JSON.stringify({
            "email": email,
            "senha": senha
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {


                    localStorage.setItem("usuarioGuid", result.usuarioGuid);

                    window.location.href = 'home.html';
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "https://localhost:44319/api/usuario/login");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    
}
