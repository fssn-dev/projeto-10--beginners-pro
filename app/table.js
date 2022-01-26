export function createTable(storage) {
    const TABLE_HOLDER = document.getElementById("tableHolder")
    TABLE_HOLDER.style.display = "block"
    TABLE_HOLDER.insertAdjacentHTML("afterbegin", TableTemplate())
    const TBODY = document.getElementById("tbody")
    storage.forEach(array => TBODY.insertAdjacentHTML("beforeend", RowTemplate(array)))
}

export function TableTemplate() {
    return `
    <h2>Tabela</h2>
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Sobrenome</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">RG</th>
                        <th scope="col">CPF</th>
                        <th scope="col">CEP</th>
                        <th scope="col">Rua</th>
                        <th scope="col">Bairro</th>
                        <th scope="col">Cidade</th>
                        <th scope="col">UF</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    
                </tbody>
            </table>
    `
}

export function RowTemplate(array) {
    return `
    <tr>
        <td>${array[0]}</td>
        <td>${array[1]}</td>
        <td>${array[2]}</td>
        <td>${array[3]}</td>
        <td>${array[4]}</td>
        <td>${array[5]}</td>
        <td>${array[6]}</td>
        <td>${array[7]}</td>
        <td>${array[8]}</td>
        <td>${array[9]}</td>
        <td>${array[10]}</td>
    </tr>
    `
}