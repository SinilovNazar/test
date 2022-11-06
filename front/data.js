let dataArray = localStorage.getItem("data") || []
const content = document.querySelector(".content")

window.onload = () => {
    content.innerHTML = dataArray
}
let obj = {
    sortBy: String,
    searchText: String,
    sortDir : String
}

const getAllData = async () => {
    const resp = await fetch("http://localhost:8000/all/data", {
        method: "GET"
    })
    const result = await resp.json()
    dataArray = result.data
    content.innerHTML = dataArray
    blockButton()
}

const blockButton = () => {
    const buttonSearch = document.querySelector("#searchDataButton")
    const buttonSave = document.querySelector("#saveDataButton")
    buttonSearch.disabled = true
    buttonSave.disabled = true
    buttonSearch.style.background = "yellow"
    buttonSave.style.background = "yellow"
    setTimeout(() => {
        buttonSearch.disabled = false
        buttonSave.disabled = false
        buttonSearch.style.background = "green"
        buttonSave.style.background = "green"
    }, 5000)
}




const searchData = () => {
    let sortByValue = document.querySelector("#sortByInput").value
    let searchTextValue = document.querySelector("#searchTextInput").value
    let radioAsk = document.querySelector("#sortDirAsk")
    let radioDesk = document.querySelector("#sortDirDesk")
    if (sortByValue && searchTextValue) {
        content.innerHTML = ""
        let sortDir = radioAsk.checked ? "ask" : "desc"
        dataArray = JSON.parse(dataArray)

        obj = {
            sortBy: sortByValue,
            searchText: searchTextValue,
            sortDir
        }
        dataArray =  searchTransactions(obj)

        dataArray.forEach(el => {
            let obj = document.createElement("div")
            obj.classList.add("element")
            obj.innerText = JSON.stringify(el)
            content.appendChild(obj)
        })

        localStorage.setItem("data", JSON.stringify(dataArray))
    }

}

const saveData = async () => {
    try {
        const saveButton = document.querySelector("#saveDataButton")
        dataArray = JSON.stringify(dataArray)
        document.querySelector("#searchDataButton").disabled = true
        document.querySelector("#saveDataButton").disabled = true
        const resp = await fetch("http://localhost:8000/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({
                sortBy: obj.sortBy,
                searchText: obj.searchText,
                sortDir : obj.sortDir,
                searchResult: dataArray
            })
        })
        saveButton.style.background = "yellow"
        setTimeout(() => {
            saveButton.style.background = "green"
        },1000)
        const result = await resp.json()
        if (result) {
            document.querySelector("#searchDataButton").disabled = false
            document.querySelector("#saveDataButton").disabled = false
        }
        console.log(result.data)
        blockSaveButton()
    } catch (err) {
        new Error(err)
    }

}

const blockSaveButton = () => {

}
const searchTransactions = (obj) => {
    const keys = Object.keys(obj)
    if (keys.length === 0) {
        return dataArray
    }

    const searchTextFunc = (el, field) => {
        let flag = false

        for (let i = 0; i < el.split.length; i++) {
            flag = el.split[i].accountName === obj[field]
            if (flag) {
                return true
            }
        }

        return flag;
    }

    let newArr = dataArray.filter(el => {
        return searchTextFunc(el, "searchText")
    })


    if (!obj.hasOwnProperty("sort")) {
        return newArr
    }

    const isAsk = obj.sortDir
    const valueSort = obj.sortBy
    newArr = _.orderBy(newArr, [valueSort], [isAsk])


    return newArr
}
