export function cepApi(cepValue) {

    let urlApi = `https://viacep.com.br/ws/${cepValue}/json/`

    return fetch(urlApi)
        .then(valorJson => valorJson.json()
            .then(obj => obj));

}