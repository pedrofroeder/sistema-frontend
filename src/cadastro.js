window.onload = function (e) {

    var txtNome = document.getElementById("txtNome");
    var txtSobrenome = document.getElementById("txtSobrenome");
    var txtEmail = document.getElementById("txtEmail");
    var txtTelefone = document.getElementById("txtTelefone");
    var selectGenero = document.getElementById("selectGenero");
    var txtSenha = document.getElementById("txtSenha");
    var btnCadastrar = document.getElementById("btnCadastrar");

    txtNome.focus();

    btnCadastrar.onclick = function (e) {
        e.preventDefault();

        var nome = txtNome.value;
        var sobrenome = txtSobrenome.value;
        var email = txtEmail.value;
        var telefone = txtTelefone.value;
        var genero = selectGenero.value;
        var senha = txtSenha.value;

        if (nome === "" || sobrenome === "" || telefone === "" || email === "" || genero === "" || senha === "") {
            var mensagem = "Todos campos acima são obrigatórios.";
            exibirMensagemErro(mensagem);
        } else {
            cadastrar(nome, sobrenome, email, telefone, genero, senha);
        }
    };

    function cadastrar(nome, sobrenome, email, telefone, genero, senha) {
        var data = JSON.stringify({
            "nome": nome,
            "sobrenome": sobrenome,
            "email": email,
            "telefone": telefone,
            "genero": genero,
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

        xhr.open("POST", "https://localhost:44319/api/usuario/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    function exibirMensagemErro(mensagem) {
        var spnErro = document.getElementById("spnErro");
        spnErro.innerText = mensagem;
        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);
    }
};
