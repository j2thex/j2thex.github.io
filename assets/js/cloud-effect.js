function randomText() {
    const text = "!@#$%^*()";
    return text[Math.floor(Math.random() * text.length)];
}

function rain() {
    const cloud = document.querySelector('.cloud');
    if (!cloud) return;

    const cloudRect = cloud.getBoundingClientRect();
    const e = document.createElement('div');
    e.classList.add('drop');
    cloud.appendChild(e);

    const left = Math.floor(Math.random() * cloudRect.width - 10);
    const size = Math.random() * 1.5;
    const duration = Math.random() * 1;

    e.innerText = randomText();
    e.style.left = left + 'px';
    e.style.fontSize = 0.5 + size + 'em';
    e.style.animationDuration = 1 + duration + 's';

    setTimeout(() => {
        cloud.removeChild(e);
    }, 2000);
}

function initCloudEffect() {
    setInterval(rain, 20);
}

document.addEventListener('DOMContentLoaded', initCloudEffect); 