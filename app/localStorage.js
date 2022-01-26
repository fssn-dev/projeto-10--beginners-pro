export function processData(formSubmitEvent) {

    let receiver = Array.from(Object.values(formSubmitEvent.target))
    receiver.pop()

    let array = []
    receiver.forEach(element => array.push(element.value))

    return array
}

export function localStorageSetItem() {
    localStorage.setItem("data10FSSN", JSON.stringify(STORAGE))
}
export function localStorageGetItem() {
    return JSON.parse(localStorage.getItem("data10FSSN"))
}