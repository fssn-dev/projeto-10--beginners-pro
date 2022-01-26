window.addEventListener("load", () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./service-worker.js");
    }
});

import { cepApi } from "./cep-api.js";
import { emailRegex, phoneFormat, cepRemoveChar, cepRegex, rgRegex, cpfRegex, upperCase } from "./regex.js";
import { processData, localStorageGetItem, localStorageSetItem } from "./localStorage.js";
import { createTable } from "./table.js";

const FORM = document.getElementById("formA")
const NOME = document.getElementById("nome")
const SOBRENOME = document.getElementById("sobrenome")
const RG = document.getElementById("rg")
const CPF = document.getElementById("cpf")
const TELEFONE = document.getElementById("telefone")
const EMAIL = document.getElementById("email")
const CEP = document.getElementById("cep")
const RUA = document.getElementById("rua")
const BAIRRO = document.getElementById("bairro")
const CIDADE = document.getElementById("cidade")
const ESTADO = document.getElementById("estado")

const STORAGE = localStorageGetItem() || []

window.STORAGE = STORAGE
if (!!STORAGE.length) {
    createTable(STORAGE)
}

CEP.addEventListener("change", inputChangeEvent => {

    cepRemoveChar(inputChangeEvent)

    if (!!inputChangeEvent.target.value) {

        cepApi(inputChangeEvent.target.value).then(res => {

            if (Object.keys(res) == "erro") {

                CEP.value = "",
                    RUA.value = "",
                    BAIRRO.value = "",
                    CIDADE.value = "",
                    ESTADO.value = ""

            } else {

                RUA.value = res.logradouro,
                    BAIRRO.value = res.bairro,
                    CIDADE.value = res.localidade,
                    ESTADO.value = res.uf

            }
        })
    } else {

        RUA.value = "",
            BAIRRO.value = "",
            CIDADE.value = "",
            ESTADO.value = ""

    }

    CEP.value = cepRegex(inputChangeEvent)

})

EMAIL.addEventListener("change", input => {
    emailRegex(input)
})

TELEFONE.addEventListener("input", input => {
    phoneFormat(input)
})

RG.addEventListener("input", input => {
    rgRegex(input)
})

CPF.addEventListener("input", input => {
    cpfRegex(input)
})

NOME.addEventListener("change", change => {
    upperCase(change)
})

SOBRENOME.addEventListener("change", change => {
    upperCase(change)
})

FORM.addEventListener("submit", submit => {
    STORAGE.push(processData(submit))
    localStorageSetItem()
})