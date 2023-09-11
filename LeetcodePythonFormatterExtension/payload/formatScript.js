window.addEventListener("keyup", event => {
  if(event.ctrlKey && event.altKey && event.key=='f') {
        console.log("format clicked")
        formatCodeMonaco()
  }
})

const formatCodeMonaco = async function () {
    let language = document.querySelector(".relative.notranslate").innerText

    let codeText = getCode()

    const formattedCode = await formatCode(codeText, language)
    if (formattedCode) {
        insertCode(formattedCode)
    }
    console.debug(`Code formatted for ${language}`)
}

function insertCode(code) {
    if (code) {
        var model = monaco.editor.getModels()[0]
        model.setValue(code)
    }
}

function getCode() {
    var model = monaco.editor.getModels()[0]
    var code = model.getValue()

    return code
}

const formatPython3 = async function(codeText) {
    const apiUrl = '' // replace with your api url
    if (!apiUrl) {
        console.error("ERROR: API URL not set")
        return
    }

    const codeToFormat = codeText

    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "code": codeToFormat })
    }
    
    try {
        const response = await fetch(apiUrl, requestData)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        
        const data = await response.json()
        if (data.formatted_code) {
            return data.formatted_code
        } else {
            console.debug("No formatted code received.")
        }
    } catch (error) {
        console.error("ERROR:", error)
    }
}

const formatCode = async function(codeText, language) {
    if (language === undefined) {
        return
    }
    if (codeText === undefined) {
        return
    }
    let formattedCode = null

    if (language === "Python3") {
        formattedCode = await formatPython3(codeText)
    } else {
        console.debug(`Formatter not available for ${programmingLanguage.title}`)
        return
    }
    return formattedCode
}
