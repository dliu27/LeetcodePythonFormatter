/*Old UI Variables */

const codeMirrorDOM = ".CodeMirror";

/* Old UI Variables End */

/* New UI Variables */
let activeLanguage = null;
let btn = null;
const supportedLanguages = ["Python3"]

const languageObserver = ".relative.notranslate";
const languageSelector = ".relative.notranslate div div";
const buttonLocation = ".mr-auto.flex.flex-nowrap.items-center.gap-3";
let theme = null;
const lightTextColor = "#000000";
const darkTextColor = "#eff1f6ff";
/* New UI Variables END */  

window.addEventListener("load", startLoading, false);
window.addEventListener("locationchange", function (event) {
    // Log the state data to the console
    if (document.getElementById("button-format") !== null) {
        console.debug("Button present");
    } else {
        console.debug("Button not present");
    }
});

function startLoading() {
    let codeMirrorSelector = document.querySelector(codeMirrorDOM);
    if (codeMirrorSelector === undefined || codeMirrorSelector === null) {
        // codemirror not found on page
        // Check for new UI
        checkAndLoadNewUI();
        return;
    }
    let codeMirror = codeMirrorSelector.CodeMirror;
    if (codeMirror === undefined) {
        // codeMirror not found
        // this should not happen
        console.debug("FATAL: CodeMirror not found");
        return;
    }

    let programmingLanguage = document.querySelector(
        ".ant-select-selection-selected-value"
    );

    if (!programmingLanguage || !programmingLanguage.title) {
        // Dom not loaded yet
        return;
    }

    if (document.getElementById('format-button') !== null) {
        return;
    }
    else {
        console.debug('installing button');
    }

    let button = getFormatButton();
    button.addEventListener("click", function () {
        formatCodeMirror(codeMirror, programmingLanguage);
    });

    programmingLanguage.parentElement.parentElement.parentElement.parentElement.parentElement.appendChild(
        button
    );
}

function checkAndLoadNewUI() {
    if (!document.querySelector(".tool-button") && document.querySelector(buttonLocation)) {
        btn = getFormatButtonNew();
        document.querySelector(buttonLocation).appendChild(btn);
        // setupLanguageObserver();
    }
}


function setupLanguageObserver() {

    const targetNode = document.querySelector(languageObserver);

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        activeLanguage = document.querySelector(languageSelector).innerText;
        console.debug(activeLanguage);
        if (supportedLanguages.includes(activeLanguage)) {
            btn.style.visibility = 'visible';
        }
        else {
            btn.style.visibility = 'hidden';
        }
        setButtonTheme(btn);

    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

}

const getFormatButtonNew = function () {
    var button = document.createElement("button");
    button.innerHTML = "Format";
    button.className = "tool-button";
    button.id = "format-button";
    button.setAttribute("icon", "information");
    button.setAttribute("data-no-border", "true");
    button.setAttribute("type", "ghost");
    button.style.marginRight = "10px";
    button.style.marginLeft = "10px";
    button.style.border = "none";
    setButtonTheme(button);
    button.style.borderImage = "none";
    button.style.outline = "none";
    button.style.cursor = "pointer";
    button.title = "Format";
    button.style.padding = "4px 20px";
    button.style.fontWeight = "600";
    button.style.borderRadius = "3px";

    button.addEventListener("click", formatCodeMonaco);
    return button;
};

window.addEventListener("keyup", event => {
  if(event.ctrlKey && event.altKey && event.key=='f') {
        console.log("format clicked")
        formatCodeMonaco();
  }
});


const getFormatButton = function () {
    var button = document.createElement("button");
    button.innerHTML = "▤";
    button.className = "tool-button";
    button.id = "format-button";
    button.setAttribute("icon", "information");
    button.setAttribute("data-no-border", "true");
    button.setAttribute("type", "ghost");
    button.style.marginRight = "10px";
    button.style.border = "none";
    button.style.backgroundColor = "transparent";
    button.style.borderImage = "none";
    button.style.outline = "none";
    button.style.cursor = "pointer";
    button.title = "Format";
    return button;
};

const formatCodeMirror = function (codeMirror, programmingLanguage) {
    let language = programmingLanguage.title;
    let codeText = codeMirror.getValue();
    const formattedCode = formatCode(codeText, language);
    if (formattedCode) {
        codeMirror.setValue(formattedCode);
    }
    console.debug(`Code formatted for ${programmingLanguage.title}`);
};

const formatCodeMonaco = async function () {
    let language = document.querySelector(".relative.notranslate").innerText

    let codeText = getCode();
    // console.log(codeText)
    const formattedCode = await formatCode(codeText, language);
    if (formattedCode) {
        insertCode(formattedCode);
    }
    console.debug(`Code formatted for ${language}`);
};

function insertCode(code) {
    if (code) {
        var model = monaco.editor.getModels()[0];
        model.setValue(code);
    }
}

function getCode() {
    var model = monaco.editor.getModels()[0];
    var code = model.getValue();

    return code;
}

const formatPython3 = async function(codeText) {
    const apiUrl = '' // replace with your api url
    if (!apiUrl) {
        console.error("ERROR: API URL not set");
        return;
    }

    const codeToFormat = codeText
    console.log(codeToFormat)
    const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "code": codeToFormat })
    };
    
    console.log(requestData)
    try {
        const response = await fetch(apiUrl, requestData);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        if (data.formatted_code) {
            return data.formatted_code
        } else {
            console.log("No formatted code received.");
        }
    } catch (error) {
        console.error("ERROR:", error);
    }
}


const formatCode = async function(codeText, language) {
    if (language === undefined) {
        return;
    }
    if (codeText === undefined) {
        return;
    }
    let formattedCode = null;

    if (language === "Python3") {
        formattedCode = await formatPython3(codeText)
        console.log(formattedCode)

    } else {
        console.debug(`Formatter not available for ${programmingLanguage.title}`);
        return;
    }
    return formattedCode;
}

const setButtonTheme = function (btn) {
    theme = document.getElementsByTagName('html')[0].getAttribute('data-theme');
    if (theme === 'dark') {
        btn.style.color = darkTextColor;
    }
    else if (theme === 'light') {
        btn.style.color = lightTextColor;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    startLoading()
});
