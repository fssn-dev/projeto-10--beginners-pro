export function emailRegex(input) {
    if (input.target.value.match(/\S+@\S+\.\S+/)) {
        input.target.style.color = "#3c9c3c"
    } else {
        input.target.style.color = "#bb0f0f"
    }
}

export function phoneFormat(input) {
    if (input.target.value.length < 15) {

        input.target.value = input.target.value.replace(/\D/g, "")
            .replace(/^(\d{2})/, "($1)")
            .replace(/(.{3})(\d)/, "$1 $2")
            .replace(/(.{9})(\d)/, "$1-$2")

    } else {

        input.target.value = input.target.value.replace(/\D/g, "")
            .replace(/^(\d{2})/, "($1)")
            .replace(/(.{3})(\d)/, "$1 $2")
            .replace(/(.{6})(\d)/, "$1 $2")
            .replace(/(.{11})(\d)/, "$1-$2")
    }
}

export function cepRemoveChar(input) {
    input.target.value = input.target.value.replace(/\D/g, "")
}

export function cepRegex(input) {
    return input.target.value.toString().replace(/(.{5})(\d)/, "$1-$2")
}

export function rgRegex(input) {
    input.target.value = input.target.value.replace(/\D/g, "")
        .replace(/^(\d{2})/, "$1.")
        .replace(/(.{6})(\d)/, "$1.$2")
        .replace(/(.{10})(\d)/, "$1-$2")
}

export function cpfRegex(input) {
    input.target.value = input.target.value.replace(/\D/g, "")
        .replace(/^(\d{3})/, "$1.")
        .replace(/(.{7})(\d)/, "$1.$2")
        .replace(/(.{11})(\d)/, "$1-$2")
}

export function upperCase(input) {
    if (input.target.value.match(/\d/g)) {
        input.target.value = ""
    }

    input.target.value = input.target.value.trim()
        .replace(/\d/g, "")
        .replace(/\b(\w)/g, w => w.toUpperCase())
}