const getAPI = async(num) => {
    const request = await fetch(`https://rickandmortyapi.com/api/character?page=${num}`)

    if(request.status === 200){
        let APIdata = await request.json()
        APIdata = await APIdata.results
        return APIdata
    } else {
        throw new Error("Unable to fetch data")
    }
}

// const getURL = async() => {
//     const APIurl = await getAPI()
//     return APIurl
// }

// const getAPI = async(id) => {
//     const request = await fetch('https://rickandmortyapi.com/api/character')

//     if(request.status === 200){
//         let APIdata = await request.json()
//         APIdata = await APIdata.results
//         APIdata = await APIdata.find(data => data.id === id)
//         return APIdata
//     } else {
//         throw new Error("Unable to fetch data")
//     }
// }


// const sumNumber = async(num) => {
//     const number = await num * 2
//     return number
// }


// const getNumber = async() => {
//     let number = await sumNumber(2)
//     number = await sumNumber(number)
//     number = await sumNumber(number)
//     number = await sumNumber(number)
//     return number
// }

// getNumber().then((data)=>{
//     console.log(data)
// })