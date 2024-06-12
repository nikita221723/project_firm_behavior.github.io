p_equilibrium = 0; // равновесная цена (приблизительно)
q_equilibrium = 0; // равновесное количество (приблизительно)
cs = 0; //излишек потребителя 
ps = 0; // излишек производителя
prof = 0; // прибыль 

document.addEventListener('DOMContentLoaded', () => { //функция обрабатывающая изменяемые параметры ввода и строящая все графики
    let a1 = parseFloat(document.getElementById('a1-input').value); //считываем значения и парсим в числа 
    let b1 = parseFloat(document.getElementById('b1-input').value);
    let c1 = parseFloat(document.getElementById('c1-input').value);
    let a = parseFloat(document.getElementById('a-input').value);
    let b = parseFloat(document.getElementById('b-input').value);
    function LaunchFunctions() { //функция вызывающая все 
        plotFunction(); //вызываем функцию графика с измененнымим параметров 
        DemandSupplyFunction(); //начальная функция
        CostsFunction(); 
        eq_price(); // равновесную цену вызываем 
        eq_quantity(); // равновесное количество вызываем 
        producer_surplus(); // излишки
        consumer_surplus();
        profit(); //прибыль
    }
    function plotFunction() { // первый график, строящий Total Costs (TC), Total Revenue (TR) и max(TR - TC)
      // подготавливаем три графика 
        const trace1 = {
          x: [],
          y: [],
          type: 'scatter',
          name: 'Total costs',
        };
        const trace2 = {
            x: [],
            y: [],
            type: 'scatter',
            name: 'Total Revenue',
        };
        const trace3 = {
            x: [],
            y: [],
            mode: 'lines',
            line: {
                dash: 'dot',
                width: 4,
                color: 'purple',
            },
            name: 'max Revenue - costs',
        }

        if (p_equilibrium) { //работаем только в условиях ненулевого равновесного количества 
            trace3.x.push(q_equilibrium, q_equilibrium);
            trace3.y.push(Math.max(0, a1 * q_equilibrium * q_equilibrium + b1 * q_equilibrium + c1), p_equilibrium * q_equilibrium);
        }
      
        for (let x = 0; x <= 30; x += 0.1) { //вносим значения x и y для наших графиков по нужным формулам 
          trace1.x.push(x);
          trace1.y.push(Math.max(0, a1 * x * x + b1 * x + c1)); //издержки 
          if (p_equilibrium) { //работаем только в условиях ненулевого равновесного количества
            trace2.x.push(x);
            trace2.y.push(p_equilibrium * x); 
          }
        }
        //настраиваем график 
        const data = [trace1, trace2, trace3] 
        const layout = {
          showlegend: true,
          legend: {
            x: 1,
            xanchor: 'right',
            y: 1
          },
          title: 'Costs and Revenue',
          xaxis: { title: 'quantity'},
          yaxis: { title: 'price', rangemode: "tozero", range: [0, 150]},
          autosize: false,
            width: 450,
            height: 450,
        };
        // строим график
        Plotly.newPlot('plot', data, layout, {displayModeBar: false});
      }
      function DemandSupplyFunction() { //строим график для спроса и предложения 
        let q_eq = 0 //начальное равновесное количество 0
        if (2 * a1 + b != 0) { 
            q_eq = (a - b1) / (2 * a1 + b) //персечение спроса и предложения (избегаем деления на ноль)
        }
        if (q_eq > 0 && a - b * q_eq > 0.01) { //только в случае неотрицательных значений q и p не нулим их 
            p_equilibrium = a - b * q_eq;
            q_equilibrium = q_eq;
        } else {
            q_equilibrium = 0; //иначе пересечения нет 
            p_equilibrium = 0;
        }
        ps = p_equilibrium * q_equilibrium - (a1 * q_equilibrium * q_equilibrium  + b1 * q_equilibrium ); // прибыль но без вычета фиксированных издержек 
        cs = ((a - p_equilibrium) * q_equilibrium ) / 2; //считаем площадь нужного нам треугольника для consumer surplus 
        prof = p_equilibrium * q_equilibrium - (a1 * q_equilibrium * q_equilibrium  + b1 * q_equilibrium  + c1); //считаем прибыль 
        const trace1 = { //готовим графики спроса предложения и точки пересечения 
          x: [],
          y: [],
          type: 'scatter',
          name: 'Demand',
        };
        const trace2 = {
            x: [],
            y: [],
            type: 'scatter',
            name: 'Supply',
          };
        const trace3 = {
            x: [],
            y: [],
            type: 'scatter',
            mode: 'markers',
            name: 'Equilibtium',
            marker: { size: 8 }
        }
        for (let x = 0; x <= 30; x += 0.1) {
          trace1.x.push(x);
          trace1.y.push(Math.max(a - b * x, 0)); //спрос 
          trace2.x.push(x);
          trace2.y.push(Math.max(0, 2 * a1 * x + b1));  // предложение (p = MC)
          if (p_equilibrium) { //только при неотрицательном p учитываем равновесную точку
            trace3.x.push(q_equilibrium);
            trace3.y.push(p_equilibrium);
          }
        }
      
        const data = [trace1, trace2, trace3];
        const layout = {
           showlegend: true,
           legend: {
              x: 1,
              xanchor: 'right',
              y: 1
            },
          title: 'Demand and Supply',
          xaxis: { title: 'quantity' },
          yaxis: { title: 'price', rangemode: 'tozero', range: [0, 30]},
          autosize: false,
            width: 450,
            height: 450,
        };
        //рисуем график
        Plotly.newPlot('plot1', data, layout, {displayModeBar: false});
        }
        function CostsFunction() { //график для AVC, ATC, MC
          const trace1 = {
            x: [],
            y: [],
            type: 'scatter',
            name: 'ATC (average total costs)',
          };
  
          const trace2 = {
              x: [],
              y: [],
              type: 'scatter',
              name: 'AVC (average variable costs)',
          };
  
          const trace3 = {
              x: [],
              y: [],
              type: 'scatter',
              name: 'MC (marginal costs)',
          };
  
          const trace4 = {
              x: [],
              y: [],
              type: 'scatter',
              name: 'equilibrium price',
          }
          const trace5 = {
              x: [],
              y: [],
              mode: 'lines',
              line: {
                  dash: 'dot',
                  width: 4
              },
              showlegend: false
          }
  
          if (p_equilibrium) { //работаем в условиях равновесной цены 
              trace5.x.push(q_equilibrium, q_equilibrium);
              trace5.y.push(0, 30);
          }
        
          for (let x = 0; x <= 30; x += 0.1) {
            trace1.x.push(x);
            trace1.y.push(Math.max(a1 * x + b1 + c1 / x, 0)); 
            trace2.x.push(x);
            trace2.y.push(Math.max(a1 * x + b1, 0)); 
            trace3.x.push(x);
            trace3.y.push(Math.max(2 * a1 * x + b1, 0)); 
            if (p_equilibrium) {
              trace4.x.push(x);
              trace4.y.push(p_equilibrium);
            }
          }
        
          const data = [trace1, trace2, trace3, trace4, trace5];
          const layout = {
             showlegend: true,
             legend: {
                x: 1,
                xanchor: 'right',
                y: 1
              },
            title: 'ATC, AVC, MC',
            xaxis: { title: 'quantity' },
            yaxis: { title: 'price', rangemode: 'tozero', range: [0, 30] },
            autosize: false,
              width: 450,
              height: 450, 
          };
        
          Plotly.newPlot('plot2', data, layout, {displayModeBar: false});
        }

    function updateGraphParameters() { //функция для обновления параметров при вводе / движении слайдеров / любом изменении параметров пользователем 
        a1 = parseFloat(document.getElementById('a1-input').value);
        b1 = parseFloat(document.getElementById('b1-input').value);
        c1 = parseFloat(document.getElementById('c1-input').value);
        a = parseFloat(document.getElementById('a-input').value);
        b = parseFloat(document.getElementById('b-input').value);
        LaunchFunctions()
    }
    //при любом изменении вызываем функцию обновления параметров 
    document.getElementById('a-input').addEventListener('input', (e) => {
      document.getElementById('a-slider').value = e.target.value;
      updateGraphParameters();
    });
    document.getElementById('b-input').addEventListener('input', (e) => {
      document.getElementById('b-slider').value = e.target.value;
      updateGraphParameters();
    });
    document.getElementById('a-slider').addEventListener('input', (e) => {
      document.getElementById('a-input').value = e.target.value;
      updateGraphParameters();
    });
    document.getElementById('b-slider').addEventListener('input', (e) => {
        document.getElementById('b-input').value = e.target.value;
        updateGraphParameters();
    });
    document.getElementById('a1-input').addEventListener('input', (e) => {
      document.getElementById('a1-slider').value = e.target.value;
      updateGraphParameters();
    });
    document.getElementById('b1-input').addEventListener('input', (e) => {
      document.getElementById('b1-slider').value = e.target.value;
      updateGraphParameters();
    });
    document.getElementById('c1-input').addEventListener('input', (e) => {
      document.getElementById('c1-slider').value = e.target.value;
      updateGraphParameters();
    });
    document.getElementById('a1-slider').addEventListener('input', (e) => {
      document.getElementById('a1-input').value = e.target.value;
      updateGraphParameters();
    });
    document.getElementById('b1-slider').addEventListener('input', (e) => {
        document.getElementById('b1-input').value = e.target.value;
        updateGraphParameters();
    });
    document.getElementById('c1-slider').addEventListener('input', (e) => {
      document.getElementById('c1-input').value = e.target.value;
      updateGraphParameters();
  });
  //рисуем начальные графики 
    LaunchFunctions()

  //далее будут функции для примеров 
  function updateGraphParametersFromExamples(a, b, a1, b1, c1) { //отправляем сюда обновленные примерами параметры и вызываем функции 
    document.getElementById('a-input').value = a //фиксируем новые параметры на слайдерах и на инпутах 
    document.getElementById('b-input').value = b
    document.getElementById('a1-input').value = a1
    document.getElementById('b1-input').value = b1
    document.getElementById('c1-input').value = c1
    document.getElementById('a-slider').value = a
    document.getElementById('b-slider').value = b
    document.getElementById('a1-slider').value = a1
    document.getElementById('b1-slider').value = b1
    document.getElementById('c1-slider').value = c1
    LaunchFunctions()
  }
  document.getElementById('example1').addEventListener('click', function() { // параметры для примера 2
    a = 8
    b = 2
    a1 = 0.5
    b1 = 8
    c1 = 6
    updateGraphParametersFromExamples(a, b, a1, b1, c1)
    });
  document.getElementById('example2').addEventListener('click', function() { // параметры для примера 2
    a = 26
    b = 2
    a1 = 1
    b1 = 0
    c1 = 0
    updateGraphParametersFromExamples(a, b, a1, b1, c1)
    });
  document.getElementById('example3').addEventListener('click', function() { // параметры для примера 2
    a = 30
    b = 2
    a1 = 0
    b1 = 10
    c1 = 6
    updateGraphParametersFromExamples(a, b, a1, b1, c1)
    });
  document.getElementById('example4').addEventListener('click', function() { // параметры для примера 2
    a = 20
    b = 2
    a1 = 0.5
    b1 = 8
    c1 = 30
    updateGraphParametersFromExamples(a, b, a1, b1, c1)
    });
  });

function eq_price() { //равновесная цена  
    document.getElementById("p_equilibrium").textContent = p_equilibrium.toFixed(2); //выводим наши измененные глобальные переменные в прошлых функциях вывод в точности до 2-х знаков после запятой 
}
  function eq_quantity() { //равновесная цена 
    if (p_equilibrium <= 0) q_equilibrium = 0;
    document.getElementById("q_equilibrium").textContent = q_equilibrium.toFixed(2); 
}
function producer_surplus() { //излишек производителя
  if (p_equilibrium <= 0) ps = 0; 
  document.getElementById("PS").textContent = ps.toFixed(2);  
}
function consumer_surplus() { //излишек потребителя
  if (p_equilibrium <= 0) cs = 0;
  document.getElementById("CS").textContent = cs.toFixed(2);
}
function profit() { //излишек потребителя
  if (p_equilibrium <= 0) prof = 0;
  document.getElementById("profit").textContent = prof.toFixed(2);
}