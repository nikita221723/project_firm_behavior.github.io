document.addEventListener('DOMContentLoaded', function() {
    const texts = document.querySelectorAll('.text-content');
    let currentIndex = 0;

    function showText(index) {
        texts.forEach((text, idx) => {
            text.style.display = idx === index ? 'block' : 'none';
        });
    }

    document.getElementById('next').addEventListener('click', function() {
        if (currentIndex < texts.length - 1) {
            currentIndex++;
            showText(currentIndex);
        }
    });

    document.getElementById('prev').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            showText(currentIndex);
        }
    });
});