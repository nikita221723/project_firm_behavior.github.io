p_equilibrium = 0; // равновесная цена (приблизительно)
q_equilibrium = 0; // равновесное количество (приблизительно)
cs = 0; //излишек потребителя 
ps = 0; // излишек производителя
prof = 0; // прибыль 

document.addEventListener('DOMContentLoaded', () => {
    let a1 = parseFloat(document.getElementById('a1-input').value);
    let b1 = parseFloat(document.getElementById('b1-input').value);
    let c1 = parseFloat(document.getElementById('c1-input').value);
    let a = parseFloat(document.getElementById('a-input').value);
    let b = parseFloat(document.getElementById('b-input').value);
    function plotFunction() {
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
        const trace4 = {
            x: [],
            y: [],
            type: 'scatter',
            name: 'Monopoly profit',
        }

        if (p_equilibrium) {
            trace3.x.push(q_equilibrium, q_equilibrium);
            trace3.y.push(0, p_equilibrium * q_equilibrium);
        }
      
        for (let x = 0; x <= 30; x += 0.1) {
          trace1.x.push(x);
          trace1.y.push(Math.max(0, a1 * x * x + b1 * x + c1)); 
          trace2.x.push(x)
          trace2.y.push((a - b * x) * x)
          trace4.x.push(x);
          trace4.y.push((a - b * x) * x - (a1 * x * x + b1 * x + c1))
        }
        const data = [trace1, trace2, trace3, trace4]
        const layout = {
          showlegend: true,
          legend: {
            x: 1,
            xanchor: 'right',
            y: 1
          },
          title: 'Costs and Revenue',
          xaxis: { title: 'quantity'},
          yaxis: { title: 'price', rangemode: "tozero", range: [-30, 150]},
          autosize: false,
            width: 450,
            height: 450,
        };
        Plotly.newPlot('plot_m', data, layout, {displayModeBar: false});
        eq_price(); // равновесную цену вызываем 
        eq_quantity(); // равновесное количество вызываем 
        producer_surplus(); // излишки
        consumer_surplus();
        profit(); //прибыль
      }
    function updateGraphParameters() {
        a1 = parseFloat(document.getElementById('a1-input').value);
        b1 = parseFloat(document.getElementById('b1-input').value);
        c1 = parseFloat(document.getElementById('c1-input').value);
        a = parseFloat(document.getElementById('a-input').value);
        b = parseFloat(document.getElementById('b-input').value);
        plotFunction();
    }
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
    plotFunction();
  });

  document.addEventListener('DOMContentLoaded', () => {
    let a = parseFloat(document.getElementById('a-input').value);
    let b = parseFloat(document.getElementById('b-input').value);
    let a1 = parseFloat(document.getElementById('a1-input').value);
    let b1 = parseFloat(document.getElementById('b1-input').value);
    let c1 = parseFloat(document.getElementById('c1-input').value);
    function DemandSupplyFunction() {
        let q_eq = 0
        if (2 * a1 + 2 * b != 0) {
            q_eq = (a - b1) / (2 * a1 + 2 * b)
        }
        if (q_eq > 0 && a - b * q_eq > 0.01 && a - 2 * b * q_eq > 0.01) {
            p_equilibrium = a - b * q_eq;
            q_equilibrium = q_eq;
        } else {
            q_equilibrium = 0;
            p_equilibrium = 0;
        }
        ps = p_equilibrium * q_equilibrium - (a1 * q_equilibrium * q_equilibrium  + b1 * q_equilibrium ); // прибыль но без вычета фиксированных издержек 
        cs = ((a - p_equilibrium) * q_equilibrium ) / 2;
        prof = p_equilibrium * q_equilibrium - (a1 * q_equilibrium * q_equilibrium  + b1 * q_equilibrium  + c1);
        const trace1 = {
          x: [],
          y: [],
          type: 'scatter',
          name: 'Demand',
        };
        const trace2 = {
            x: [],
            y: [],
            type: 'scatter',
            name: 'MC',
          };
        const trace3 = {
            x: [],
            y: [],
            type: 'scatter',
            mode: 'markers',
            name: 'Equilibtium',
            marker: { size: 8 }
        }
        const trace4 = {
            x: [],
            y: [],
            type: 'scatter',
            name: 'Marginal Revenue',
        }
        const trace5 = {
            x: [],
            y: [],
            mode: 'lines',
            line: {
                dash: 'dot',
                width: 4,
                color: 'green',
            },
            showlegend: false
        }
        if (p_equilibrium) {
            trace5.x.push(0, q_equilibrium, q_equilibrium)
            trace5.y.push(p_equilibrium, p_equilibrium, 0)
        }
        
        for (let x = 0; x <= 30; x += 0.1) {
          trace1.x.push(x);
          trace1.y.push(Math.max(a - b * x, 0));
          trace2.x.push(x);
          trace2.y.push(Math.max(0, 2 * a1 * x + b1));
          trace4.x.push(x);
          trace4.y.push(Math.max(0, a - 2 * b * x));  
          if (p_equilibrium) {
            trace3.x.push(q_equilibrium);
            trace3.y.push(p_equilibrium);
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
          title: 'Demand and Supply',
          xaxis: { title: 'quantity' },
          yaxis: { title: 'price', rangemode: 'tozero', range: [0, 30] },
          autosize: false,
            width: 450,
            height: 450,
        };
      
        Plotly.newPlot('plot1_m', data, layout, {displayModeBar: false});
        eq_price(); // равновесную цену вызываем 
        eq_quantity(); // равновесное количество вызываем 
        producer_surplus(); // излишки
        consumer_surplus();
        profit(); //прибыль
        }
    function updateGraphParameters() {
        a = parseFloat(document.getElementById('a-input').value);
        b = parseFloat(document.getElementById('b-input').value);
        a1 = parseFloat(document.getElementById('a1-input').value);
        b1 = parseFloat(document.getElementById('b1-input').value);
        c1 = parseFloat(document.getElementById('c1-input').value);
        DemandSupplyFunction();
    }
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
    DemandSupplyFunction();
  });




  document.addEventListener('DOMContentLoaded', () => {
    let a1 = parseFloat(document.getElementById('a1-input').value);
    let b1 = parseFloat(document.getElementById('b1-input').value);
    let c1 = parseFloat(document.getElementById('c1-input').value);
    let a = parseFloat(document.getElementById('a-input').value);
    let b = parseFloat(document.getElementById('b-input').value);
    function CostsFunction() {

        const trace1 = {
            x: [],
            y: [],
            type: 'scatter',
            name: 'MR (Marginal Revenue)',
            line: {
                color: 'red'
            }
        };

        const trace2 = {
            x: [],
            y: [],
            type: 'scatter',
            name: 'MC (marginal costs)',
        };

        // const trace4 = {
        //     x: [],
        //     y: [],
        //     type: 'scatter',
        //     name: 'equilibrium price',
        // }
        // const trace5 = {
        //     x: [],
        //     y: [],
        //     mode: 'lines',
        //     line: {
        //         dash: 'dot',
        //         width: 4
        //     },
        //     showlegend: false
        // }

        // if (p_equilibrium) {
        //     trace5.x.push(q_equilibrium, q_equilibrium);
        //     trace5.y.push(0, 30);
        // }
      
        for (let x = 0; x <= 30; x += 0.1) {
          trace1.x.push(x);
          trace1.y.push(Math.max(a - 2 * b * x, 0)); 
          trace2.x.push(x);
          trace2.y.push(Math.max(2 * a1 * x + b1, 0)); 
        //   if (p_equilibrium) {
        //     trace4.x.push(x);
        //     trace4.y.push(p_equilibrium);
        //   }
        }
      
        const data = [trace1, trace2];
        const layout = {
           showlegend: true,
           legend: {
              x: 1,
              xanchor: 'right',
              y: 1
            },
          title: 'Demand, MR, MC',
          xaxis: { title: 'quantity' },
          yaxis: { title: 'price', rangemode: 'tozero', range: [0, 30] },
          autosize: false,
            width: 450,
            height: 450, 
        };
      
        Plotly.newPlot('plot2_m', data, layout, {displayModeBar: false});
        eq_price(); // равновесную цену вызываем 
        eq_quantity(); // равновесное количество вызываем 
        producer_surplus(); // излишки
        consumer_surplus();
        profit(); //прибыль
      }
    function updateGraphParameters() {
        a1 = parseFloat(document.getElementById('a1-input').value);
        b1 = parseFloat(document.getElementById('b1-input').value);
        c1 = parseFloat(document.getElementById('c1-input').value);
        a = parseFloat(document.getElementById('a-input').value);
        b = parseFloat(document.getElementById('b-input').value);
        CostsFunction();
    }
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
  CostsFunction();
  });


function eq_price() { //равновесная цена 
    document.getElementById("p_equilibrium").textContent = p_equilibrium.toFixed(2);
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