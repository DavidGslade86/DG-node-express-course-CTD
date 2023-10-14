const {writeFile} = require("fs").promises;

const writer = async () => {
    try {
        console.log('writing line 1...')
        writeFile("./temp.txt", "This is line 1\n")
        .then(()=> {
            console.log('writing line 2...')
            return writeFile("./temp.txt", "This is line 2\n", {flag:"a"});
        })
        .then(()=>{
            console.log('writing line 3...')
            return writeFile("./temp.txt", "This is line 3\n", {flag:"a"});
        })

    } catch {
        console.log("An error occurred: ", error)
    }
}

writer();