const blocks = document.querySelectorAll(".terminal-block");

function typeText(el, text, speed = 50, cb) {
    let i = 0;
    el.textContent = "";
    const timer = setInterval(() => {
        el.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            if (cb) cb();
        }
    }, speed);
}

function runCommand(index) {
    if (index >= blocks.length) return;

    const block = blocks[index];
    const cmd = block.querySelector(".cmd-text");
    const out = block.querySelector("[data-out]");
    
    // Safety check: skip if elements are missing
    if (!cmd || !out) {
        runCommand(index + 1);
        return;
    }

    const html = out.innerHTML;
    out.innerHTML = "";
    out.style.display = "none";

    typeText(cmd, cmd.dataset.cmd, 55, () => {
        setTimeout(() => {
            out.style.display = "block";
            out.innerHTML = html;
            runCommand(index + 1);
        }, 400);
    });
}

// Start the sequence
window.onload = () => runCommand(0);
