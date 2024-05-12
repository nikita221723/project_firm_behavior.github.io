function loadScript(url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.onload = () => callback(); 
    script.onerror = () => console.error('Ошибка загрузки скрипта:', url);
    document.head.appendChild(script);
  }
  
  function plotFunction() {
    const trace = {
      x: [],
      y: [],
      type: 'scatter'
    };
  
    for (let x = 0; x <= 10; x += 0.5) {
      trace.x.push(x);
      trace.y.push(x * x); // функция y = x^2
    }
  
    const data = [trace];
    const layout = {
      title: 'График функции y = x^2',
      xaxis: { title: 'x' },
      yaxis: { title: 'y' }
    };
  
    Plotly.newPlot('plot', data, layout);
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    loadScript('https://cdn.plot.ly/plotly-latest.min.js', plotFunction);
  });