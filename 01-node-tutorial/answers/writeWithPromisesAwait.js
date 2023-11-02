const {writeFile, readFile} = require("fs").promises;

const writer = async () => {
    try {
        console.log('writing file 1...')
        await writeFile("./temp.txt", "This is line 1\n");

        console.log('writing file 2...')
        await writeFile("./temp.txt", "This is line 2\n", {flag:"a"});

        console.log('writing file 3...')
        await writeFile("./temp.txt", "This is line 3\n", {flag:"a"});


    } catch {
        console.log("An error occurred: ", error)
    }
}

const reader = async () => {
    try {
        const content = await readFile("./temp.txt", 'utf8');
        console.log(content);
    } catch {
        console.log("An error occurred: ", error)
    }
}

const readWrite = async () => {
    await writer();
    await reader();
}

readWrite();