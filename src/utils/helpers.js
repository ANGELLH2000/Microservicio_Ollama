export function consolidar_data(json) {
    let data=[]
    let element = JSON.parse(json.replaceAll('\n', '')) 
    data.push(Object.values(element)[0])
    data.push(Object.keys(element)[0])
    data.push(Object.values(element)[0].length)
    return data
}