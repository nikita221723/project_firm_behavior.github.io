document.addEventListener('DOMContentLoaded', () => { //функция которая сразу строит три графика, КПВ первой фирмы, второй фирмы и их сумму 
    let L1 = parseFloat(document.getElementById('L1-input').value); //по классике парсим все данные в числа и закидываем в переменные 
    let a1 = parseFloat(document.getElementById('a1-input').value);
    let pow_a1 = parseFloat(document.getElementById('pow-a1-input').value);
    let b1 = parseFloat(document.getElementById('b1-input').value);
    let pow_b1 = parseFloat(document.getElementById('pow-b1-input').value);

    let L2 = parseFloat(document.getElementById('L2-input').value);
    let a2 = parseFloat(document.getElementById('a2-input').value);
    let pow_a2 = parseFloat(document.getElementById('pow-a2-input').value);
    let b2 = parseFloat(document.getElementById('b2-input').value);
    let pow_b2 = parseFloat(document.getElementById('pow-b2-input').value);

    let trace1Data = { x: [], y: [] }; //здесь будет информация о первой КПВ
    let trace2Data = { x: [], y: [] }; //здесь будет информация о второй КПВ

    function LaunchFunctions() {
        plotFunction1();
        plotFunction2();
        plotSumPPF();
        plotPPS();
    }

    function plotFunction1() {//функция первой КПВ
        x2_max_1 = (Math.pow(L1, pow_b1) * b1).toFixed(1); //формула для максимального количество товара 2
        x1_max_1 = Math.pow(L1, pow_a1) * a1; //формула для максимального количество товара >
        const trace1 = { // готовим первый график 
            x: [],
            y: [],
            type: 'scatter',
            fill: 'tozeroy',
            name: 'PPF firm 1',
            fillcolor: 'rgba(126, 255, 128, 0.8)',
            line: { color: 'green' },
        };

        for (let x = 0; x <= x1_max_1 + 0.1; x += 0.1) { //итерируемся до максимального количества товара 1
            let y = Math.max(0, b1 * Math.pow(L1 - (Math.pow((x.toFixed(1) / a1), (1 / pow_a1).toFixed(1))), pow_b1)); // считаем x2 по соответствующей формуле из условия L1 + L2 = L 
            trace1.x.push(x);
            if (isNaN(parseFloat(y))) {
                trace1.y.push(0);
            } else {
                trace1.y.push(y);
            }
        }
        trace1.x.push(x1_max_1)
        trace1.y.push(0)
        trace1Data = trace1; //сохраняем для суммы 

        //настраиваем 
        const data = [trace1];
        const layout = {
            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            },
            title: 'Production Possibility Frontier 1',
            xaxis: { title: 'first good (x1)', rangemode: "tozero", range: [0, x1_max_1 + 1] },
            yaxis: { title: 'second good (x2)', rangemode: "tozero", range: [0, x2_max_1 + 1] },
            autosize: false,
            width: 450,
            height: 450,
        };
        //рисуем 
        Plotly.newPlot('plot_ppf1', data, layout, { displayModeBar: false });
    }

    function plotFunction2() { //аналогичная первой функция для второй КПВ
        x2_max_2 = Math.pow(L2, pow_b2) * b2;
        x1_max_2 = Math.pow(L2, pow_a2) * a2;
        console.log(x1_max_2)
        const trace2 = {
            x: [],
            y: [],
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgba(0, 128, 255, 0.5)',
            line: { color: 'blue' },
            name: 'PPF firm 2',
        };

        for (let x = 0; x <= x1_max_2 + 0.1; x += 0.1) {
            let y = Math.max(0, b2 * Math.pow(L2 - (Math.pow((x.toFixed(1) / a2), (1 / pow_a2).toFixed(1))), pow_b2));
            trace2.x.push(x);
            if (isNaN(parseFloat(y))) {
                trace2.y.push(0);
            } else {
                trace2.y.push(y);
            }
        }
        trace2.x.push(x1_max_2)
        trace2.y.push(0)

        trace2Data = trace2;

        const data = [trace2];
        const layout = {
            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            },
            title: 'Production Possibility Frontier 2',
            xaxis: { title: 'first good (y1)', rangemode: "tozero", range: [0, x1_max_2 + 1] },
            yaxis: { title: 'second good (y2)', rangemode: "tozero", range: [0, x2_max_2 + 1] },
            autosize: false,
            width: 450,
            height: 450,
        };

        Plotly.newPlot('plot_ppf2', data, layout, { displayModeBar: false });
    }

    function plotSumPPF() { //код суммирует обе КПВ для фирм 
        let my_map = {} //этот словарь нам понадобится попозже 
        // готовим стили  
        const sumTrace = {
            type: 'scatter',
            fill: 'tozeroy',
            fillcolor: 'rgba(252, 231, 111, 0.8)',
            line: { color: 'orange' },
            x: [],
            y: [],
            name: 'Sum PPF',
        };
    // здесь мы пользуемся векторным способом вычисления суммы двух КПВ, который заключается в слкдаывании всех точек одного графика со всеми точками другого графика 
    // идея в том, чтобы создать словарь ключ/значение, где ключ - суммированная координата x (x1 графика 1 + x1 графика 2) а значения соответвенно сложенные значения x2 графика 1 + x2 графика 2
    // так как мы будем проходиться по сумме декартового произведения мы будем получать одни и те же значения x которым будут соответствовать разные значения y, будем работать только с уникальными иксами 
    for (let i = 0; i < trace1Data.x.length; i++) {
        for (let j = 0; j < trace2Data.x.length; j++) {  
            const xSum = (trace1Data.x[i] + trace2Data.x[j]).toFixed(1); // складываем попарно все иксы, делаем округление чтобы избежать проблем с плавающей точкой в словаре my_map 
            if (!my_map[xSum]) { //если нет ничего по данному ключу, то фиксируем 0 (все наши значения будут неотрицательными, поэтому 0 за стартовое значение вполне сойдет)
                my_map[xSum] = 0;
            }
            my_map[xSum] = Math.max(trace1Data.y[i] + trace2Data.y[j], my_map[xSum]); //так как все точки в нашем множестве суммы двух графиков будут доступны, мы хотим найти именно PPF, то есть границу множества 
            //производственных возможностей, поэтому давайте для каждого икса запомнать максимальный y, который будет ему соответствовать в процессе вычисленпия 
        }
    }
    let sortedArray = Object.entries(my_map).sort((a, b) => a[0] - b[0]); //отсортируем наш словарь по иксу для удобства, превратив его в список пар 
    my_map = Object.fromEntries(sortedArray); //конвертруем обратно в словарь 
    for (let [k, v] of Object.entries(my_map)) { //проитерировавшись по парам ключ/значение заполним данные для графика 
        sumTrace.x.push(k)
        sumTrace.y.push(v)
    }
    //настройка графика 
        const data = [sumTrace];
        const layout = {
            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            },
            title: 'Sum of Production Possibility Frontiers',
            xaxis: { title: 'first goods (sum1)', rangemode: "tozero" },
            yaxis: { title: 'second goods (sum2)', rangemode: "tozero" },
            autosize: false,
            width: 450,
            height: 450,
        };
        //рисуем 
        Plotly.newPlot('plot_sum_ppf', data, layout, { displayModeBar: false });
    }

    function plotPPS () { // код рисует функцию множества! производственных возможностей, т.е. PPS без поикса максимума 
        const sumTrace = {
            mode: 'markers',
            type: 'scatter',
            line: { color: 'red', width: 1 },
            x: [],
            y: [],
            name: 'Sum PPS',
        };

        for (let i = 0; i < trace1Data.x.length; i++) {
            for (let j = 0; j < trace2Data.x.length; j++) {  
                sumTrace.x.push(trace1Data.x[i] + trace2Data.x[j])
                sumTrace.y.push(trace1Data.y[i] + trace2Data.y[j])
            }
        }
        const data = [sumTrace];
        const layout = {
            showlegend: true,
            legend: {
                x: 1,
                xanchor: 'right',
                y: 1
            },
            title: 'Total Production Possibility Set',
            xaxis: { title: 'first goods (sum1)', rangemode: "tozero" },
            yaxis: { title: 'second goods (sum2)', rangemode: "tozero" },
            autosize: false,
            width: 450,
            height: 450,
        };
        //рисуем 
        Plotly.newPlot('plot_sum_pps', data, layout, { displayModeBar: false });

    }
    function updateGraphParameters() { //функция обноваления параметров для любых изменений 
        L1 = parseFloat(document.getElementById('L1-input').value);
        a1 = parseFloat(document.getElementById('a1-input').value);
        pow_a1 = parseFloat(document.getElementById('pow-a1-input').value);
        b1 = parseFloat(document.getElementById('b1-input').value);
        pow_b1 = parseFloat(document.getElementById('pow-b1-input').value);
        L2 = parseFloat(document.getElementById('L2-input').value);
        a2 = parseFloat(document.getElementById('a2-input').value);
        pow_a2 = parseFloat(document.getElementById('pow-a2-input').value);
        b2 = parseFloat(document.getElementById('b2-input').value);
        pow_b2 = parseFloat(document.getElementById('pow-b2-input').value);
        LaunchFunctions()
    }
    //при любом обнаружении изменений параметров запускаем функцию обновления 
    document.getElementById('a1-input').addEventListener('input', (e) => {
        updateGraphParameters();
    });
    document.getElementById('L1-input').addEventListener('input', (e) => {
        updateGraphParameters();
    });
    document.getElementById('pow-a1-input').addEventListener('input', (e) => {
        updateGraphParameters();
    });
    document.getElementById('pow-b1-input').addEventListener('input', (e) => {
        updateGraphParameters();
    });
    document.getElementById('b1-input').addEventListener('input', (e) => {
        updateGraphParameters();
    });

    document.getElementById('a2-input').addEventListener('input', (e) => {
        updateGraphParameters();
    });
    document.getElementById('L2-input').addEventListener('input', (e) => {
        updateGraphParameters();
    });
    document.getElementById('pow-a2-input').addEventListener('input', (e) => {
        updateGraphParameters();
    });
    document.getElementById('pow-b2-input').addEventListener('input', (e) => {
        updateGraphParameters();
    });
    document.getElementById('b2-input').addEventListener('input', (e) => {
        updateGraphParameters()
    });
    //рисуем начальные графики 
    LaunchFunctions()
});
