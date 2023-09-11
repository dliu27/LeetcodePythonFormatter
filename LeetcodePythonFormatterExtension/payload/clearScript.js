console.log('Content script loaded.');

// structural navigation method of resetting code
function resetCode() {
    const editorDiv = document.querySelector("#editor");

    if (editorDiv) {
        let buttons1 = editorDiv.querySelectorAll("button");
        const button1 = buttons1[4];
        button1.click();

        setTimeout(() => {
            let buttons2 = editorDiv.querySelectorAll("button");
            const button2 = buttons2[6];
            if (button2.innerText === "Confirm") {
                button2.click();
            } else {
                // find the button with the text "Confirm"
                for (let i = 0; i < buttons2.length; i++) {
                    if (buttons2[i].innerText === "Confirm") {
                        buttons2[i].click();
                        break;
                    }
                }
            }
        }, 50);
    }
}

// JS path method of resetting code
function resetCode2() {

    const buttons = document.querySelectorAll("button");
    console.log(buttons)
    
    const button1 = document.querySelector("#editor > div.flex.h-9.items-center.pr-4.bg-layer-2.dark\\:bg-dark-layer-2.border-fill-3.dark\\:border-dark-fill-3.rounded-t.border-b > div.overflow-hidden.ml-2.my-2 > div > div:nth-child(3) > button")
    button1.click()
    setTimeout(() => {
        const button2 = document.querySelector("#editor > div.flex.h-9.items-center.pr-4.bg-layer-2.dark\\:bg-dark-layer-2.border-fill-3.dark\\:border-dark-fill-3.rounded-t.border-b > div.overflow-hidden.ml-2.my-2 > div > div:nth-child(3) > div > div > div > div.my-8.inline-block.min-w-full.transform.overflow-hidden.rounded-\\[13px\\].text-left.transition-all.bg-overlay-3.md\\:min-w-\\[420px\\].shadow-level4.dark\\:shadow-dark-level4.p-0.dark\\:bg-dark-layer-2.w-\\[480px\\].opacity-100.scale-100 > div > div.mt-8.flex.justify-end > div > div > div:nth-child(2) > button")
        button2.click()
    }, 50)    
}

// add hotkey listener
window.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === "E") {
        console.log("hotkey clicked")
        resetCode();
    }
  });
  