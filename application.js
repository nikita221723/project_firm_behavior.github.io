p_equilibrium = 0; // равновесная цена (приблизительно)
q_equilibrium = 0; // равновесное количество (приблизительно)
cs = 0; //излишек потребителя 
ps = 0; // излишек производителя
prof = 0; // прибыль 

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('graphCanvas');
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 2;
  let a = parseFloat(document.getElementById('a-input').value);
  let b = parseFloat(document.getElementById('b-input').value);
  let a1 = parseFloat(document.getElementById('a1-input').value);
  let b1 = parseFloat(document.getElementById('b1-input').value);
  let c1 = parseFloat(document.getElementById('c1-input').value);
  const maxX = 30;
  const maxY = 20;

  function drawAxes1() {
      const axisMargin = 10;
      const startX = canvas.width / 2 + 50;
      const startY = canvas.height - 50;
      const endX = canvas.width - axisMargin;
      const endY = axisMargin;

      // Оси
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX, endY); // Y axis
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, startY); // X axis
      ctx.moveTo(startX, endY);
      ctx.lineTo(endX, endY);
      ctx.lineTo(endX, startY);
      ctx.stroke();

      // Метки на оси X
      const stepX = (endX - startX) / maxX;
      for (let i = 0; i <= maxX; i++) {
          ctx.fillText(i, startX + i * stepX, startY + 15);
      }

      // Метки на оси Y
      const stepY = (startY - endY) / maxY;
      for (let i = 0; i <= maxY; i++) {
          ctx.fillText(i, startX - 20, startY - i * stepY + 5);
      }

      // рисуем сетку 
      scaleX = (canvas.width - startX - 10) / maxX;
      scaleY = (canvas.height - 60) / maxY;
      flag = false;
      for (let x = 1; x <= maxX; ++x) {
        flag = true;
        for (let y = 0; y <= maxY; ++y) {
            const canvasX = startX + x * scaleX;
            const canvasY = startY - y * scaleY;
            if (flag) {
                ctx.moveTo(canvasX, canvasY);
            }
            flag = false;
            ctx.lineTo(canvasX, canvasY);
        }
      }
      ctx.strokeStyle = '#D5D8DC'
      for (let y = 0; y <= maxY; ++y) {
        flag = true;
        for (let x = 0; x <= maxX; ++x) {
            const canvasX = startX + x * scaleX;
            const canvasY = startY - y * scaleY;
            if (flag) {
                ctx.moveTo(canvasX, canvasY);
            }
            flag = false;
            ctx.lineTo(canvasX, canvasY);
        }
        }
      ctx.stroke();
      
  }

  function drawAxes2() {
    const axisMargin = 10;
    const startX = 50;
    const startY = canvas.height - 50;
    const endX = canvas.width - axisMargin - canvas.width / 2;
    const endY = axisMargin;

    // Оси
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, endY); // Y axis
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, startY); // X axis
    ctx.moveTo(startX, endY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(endX, startY);
    ctx.stroke();

    // Метки на оси X
    const stepX = (endX - startX) / maxX;
    for (let i = 0; i <= maxX; i++) {
        ctx.fillText(i, startX + i * stepX, startY + 15);
    }

    // Метки на оси Y
    const stepY = (startY - endY) / maxY;
    for (let i = 0; i <= maxY; i++) {
        ctx.fillText(i, startX - 20, startY - i * stepY + 5);
    }

    scaleX = (canvas.width - startX - canvas.width / 2 - 10) / maxX;
    scaleY = (canvas.height - 60) / maxY;
      flag = false;
      for (let x = 1; x <= maxX; ++x) {
        flag = true;
        for (let y = 0; y <= maxY; ++y) {
            const canvasX = startX + x * scaleX;
            const canvasY = startY - y * scaleY;
            if (flag) {
                ctx.moveTo(canvasX, canvasY);
            }
            flag = false;
            ctx.lineTo(canvasX, canvasY);
        }
      }
      ctx.strokeStyle = '#D5D8DC'
      for (let y = 0; y <= maxY; ++y) {
        flag = true;
        for (let x = 0; x <= maxX; ++x) {
            const canvasX = startX + x * scaleX;
            const canvasY = startY - y * scaleY;
            if (flag) {
                ctx.moveTo(canvasX, canvasY);
            }
            flag = false;
            ctx.lineTo(canvasX, canvasY);
        }
        }
      ctx.stroke();

    
}

  function drawGraphs() {
    p_equilibrium = 0; 
    ctx.clearRect(0, 0, canvas.width, canvas.height); // О
    drawAxes1();
    ctx.lineWidth = 3;

    startX = canvas.width / 2 + 50;
    startY = canvas.height - 50;
    scaleX = (canvas.width - startX - 10) / maxX;
    scaleY = (canvas.height - 60) / maxY;

    // график спроса 
    ctx.beginPath();

    let x = 0
    while (x <= maxX) {
        let y = a - b * x;
        if (y < 0) y = 0; // Предотвращаем отрицательные значения Y
        if (y > maxY) y = maxY;
        const canvasX = startX + x * scaleX;
        const canvasY = startY - y * scaleY;
        if (y == 0) {
          break;
        }
        ctx.lineTo(canvasX, canvasY);
        x += 0.025
      }
    ctx.strokeStyle = '#ff0000'
    ctx.stroke(); // Завершаем рисование графика
    ctx.strokeStyle = '#000000'

    // график предложения 
    ctx.beginPath();

    x = 0
    flag = true;
    flag_xx = true;
    best = 1e9;
    while (x <= maxX) {
        let xx = x; // для условия на min(AVC)
        let y = 2 * a1 * x + b1;
        if (y < 0) y = 0; // Предотвращаем отрицательные значения Y 
        if (y < b1) xx = 0; // ставим условие на p <= min(AVC) 
        if (y > maxY) y = maxY;
        const canvasX = startX + xx * scaleX;
        const canvasY = startY - y * scaleY;
        if (y == maxY) { //этот блок для красоты 
          break; //
        } //
        if (y == 0) { //
          x += 0.025 //
          continue; //
        } //
        if (xx != 0 && flag_xx) { //
          ctx.moveTo(canvasX, canvasY); //
          flag_xx = false; // 
        } //
        ctx.lineTo(canvasX, canvasY);
        if (Math.abs((2 * a1 * x + b1) - (a - b * x)) <= 0.3 && flag && !flag_xx) {
            if (Math.abs((2 * a1 * x + b1) - (a - b * x)) <= best) {
                best = Math.abs((2 * a1 * x + b1) - (a - b * x)); // ищем наиболее подходящую ближайшую точку для пересечения 
                p_equilibrium = a - b * x;
                q_equilibrium = x;
                // далее идет счет излишков 
                ps = p_equilibrium * q_equilibrium - (a1 * x * x + b1 * x); // прибыль но без вычета фиксированных издержек 
                cs = ((a - p_equilibrium) * x) / 2;
                prof = p_equilibrium * q_equilibrium - (a1 * x * x + b1 * x + c1);
            } else {
                flag = false;
                ctx.strokeStyle = '#2E86C1'
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(canvasX, canvasY, 4, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'black';
                ctx.fill();
                ctx.beginPath();
            }
        }
        x += 0.025
      }
    ctx.strokeStyle = '#2E86C1' // синий 
    ctx.stroke(); // Завершаем рисование графика
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#000000'

    drawAxes2();
    ctx.lineWidth = 3;

    startX = 50;
    startY = canvas.height - 50;
    scaleX = (canvas.width - startX - canvas.width / 2 - 10) / maxX;
    scaleY = (canvas.height - 60) / maxY;


    // график функции издержек 
    ctx.beginPath();

    x = 0
    flag_for_extreme_ys = false;
    while (x <= maxX) {
      let y = a1 * x * x + b1 * x + c1;
      if (y < 0) y = 0; // Предотвращаем отрицательные значения Y
      if (y > maxY) y = maxY;
      if (y == maxY) { //этот блок для красоты 
        break; //
      } //
      if (y == 0) {
        flag_for_extreme_ys = true;
      }
      const canvasX = startX + x * scaleX;
      const canvasY = startY - y * scaleY;
      if (flag_for_extreme_ys) {
        ctx.moveTo(canvasX, canvasY);
        flag_for_extreme_ys = false;
      }
      ctx.lineTo(canvasX, canvasY);
      x += 0.025
    }
    ctx.strokeStyle = '#ff0000' //красный 
    ctx.stroke(); // Завершаем рисование графика
    ctx.strokeStyle = '#000000'

    // график функции общей выручки (total revenue) (только если p_equilibrium > 0)
    if (p_equilibrium > 0 ) {
      ctx.beginPath();
      x = 0
      while (x <= maxX) {
        let y = x * p_equilibrium;
        if (y < 0) y = 0; // Предотвращаем отрицательные значения Y
        if (y > maxY) y = maxY;
        if (y == maxY) { //этот блок для красоты 
          break; //
        } //
        const canvasX = startX + x * scaleX;
        const canvasY = startY - y * scaleY;
        ctx.lineTo(canvasX, canvasY);
        x += 0.025
      }
      ctx.strokeStyle = '#2ECC71' // зеленый 
      ctx.stroke(); // Завершаем рисование графика
      ctx.strokeStyle = '#000000'
    }
    ctx.lineWidth = 2;
    eq_price(); //равновесную цену вызываем 
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
      if (a < 0) a = 0; // ограничения 
      if (b < 0) b = 0;
      drawGraphs();
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

  drawGraphs(); 
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('graphCanvas1');
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    let a1 = parseFloat(document.getElementById('a1-input').value);
    let b1 = parseFloat(document.getElementById('b1-input').value);
    let c1 = parseFloat(document.getElementById('c1-input').value);
    const maxX = 30;
    const maxY = 20;
  
    function drawAxes() {
      const axisMargin = 10;
      const startX = 50;
      const startY = canvas.height - 50;
      const endX = canvas.width - axisMargin;
      const endY = axisMargin;
  
      // Оси
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(startX, endY); // Y axis
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, startY); // X axis
      ctx.moveTo(startX, endY);
      ctx.lineTo(endX, endY);
      ctx.lineTo(endX, startY);
      ctx.stroke();
  
      // Метки на оси X
      const stepX = (endX - startX) / maxX;
      for (let i = 0; i <= maxX; i++) {
          ctx.fillText(i, startX + i * stepX, startY + 15);
      }
  
      // Метки на оси Y
      const stepY = (startY - endY) / maxY;
      for (let i = 0; i <= maxY; i++) {
          ctx.fillText(i, startX - 20, startY - i * stepY + 5);
      }

      // рисуем сетку 
      scaleX = (canvas.width - startX - 10) / maxX;
      scaleY = (canvas.height - 60) / maxY;
      flag = false;
      for (let x = 1; x <= maxX; ++x) {
        flag = true;
        for (let y = 0; y <= maxY; ++y) {
            const canvasX = startX + x * scaleX;
            const canvasY = startY - y * scaleY;
            if (flag) {
                ctx.moveTo(canvasX, canvasY);
            }
            flag = false;
            ctx.lineTo(canvasX, canvasY);
        }
      }
      ctx.strokeStyle = '#D5D8DC'
      for (let y = 0; y <= maxY; ++y) {
        flag = true;
        for (let x = 0; x <= maxX; ++x) {
            const canvasX = startX + x * scaleX;
            const canvasY = startY - y * scaleY;
            if (flag) {
                ctx.moveTo(canvasX, canvasY);
            }
            flag = false;
            ctx.lineTo(canvasX, canvasY);
        }
        }
      ctx.stroke();
  }
  
    function drawGraph() {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // О
      drawAxes();
      ctx.lineWidth = 3;
      startX = 50;
      startY = canvas.height - 50;
      scaleX = (canvas.width - startX - 10) / maxX;
      scaleY = (canvas.height - 60) / maxY;
  
      // график предельных издержек 
      ctx.beginPath();
      x = 0
      while (x <= maxX) {
        let y =  2 * a1 * x + b1;
        if (y < 0) y = 0; // Предотвращаем отрицательные значения Y
        if (y > maxY) y = maxY;
        if (y == maxY) { //этот блок для красоты 
          break; //
        } //
        if (y == 0) { //
          x += 0.025 //
          continue; //
        } //
        const canvasX = startX + x * scaleX;
        const canvasY = startY - y * scaleY;
        ctx.lineTo(canvasX, canvasY);
        x += 0.025
      }
      ctx.strokeStyle = '#ff0000'
      ctx.stroke(); // Завершаем рисование графика

      // график средних издержек (ATC)
      ctx.beginPath();
      ctx.strokeStyle = '#3498DB'
      x = 0
      flag_for_extreme_ys = false;
      while (x <= maxX) {
        let y = a1 * x + b1 + c1 / x;
        if (y < 0) y = 0; // Предотвращаем отрицательные значения Y
        if (y > maxY) y = maxY;
        if (y == maxY || y == 0) { //этот блок для красоты 
          flag_for_extreme_ys = true;
          x += 0.025 //
          continue; //
        } //
        const canvasX = startX + x * scaleX;
        const canvasY = startY - y * scaleY;
        if (flag_for_extreme_ys) {
          ctx.moveTo(canvasX, canvasY);
          flag_for_extreme_ys = false;
        }
        ctx.lineTo(canvasX, canvasY);
        x += 0.025
      }
      ctx.stroke();
      ctx.strokeStyle = '#000000'

      // график средних переменных издержек (AVC)
      ctx.beginPath();
      ctx.strokeStyle = '#F446F1' // розовый
      x = 0
      flag_for_extreme_ys = false;
      while (x <= maxX) {
        let y = a1 * x + b1;
        if (y < 0) y = 0; // Предотвращаем отрицательные значения Y
        if (y > maxY) y = maxY;
        if (y == maxY || y == 0) { //этот блок для красоты 
          flag_for_extreme_ys = true;
          x += 0.025 //
          continue; //
        } //
        const canvasX = startX + x * scaleX;
        const canvasY = startY - y * scaleY;
        if (flag_for_extreme_ys) {
          ctx.moveTo(canvasX, canvasY);
          flag_for_extreme_ys = false;
        }
        ctx.lineTo(canvasX, canvasY);
        x += 0.025
      }
      ctx.stroke();
      ctx.strokeStyle = '#000000'

      // равновесная цена (только если p_equilibriunm > 0)
      if (p_equilibrium > 0 ) {
        ctx.beginPath();
      x = 0
      while (x <= maxX) {
        let y = p_equilibrium;
        if (y < 0) y = 0; // Предотвращаем отрицательные значения Y
        if (y > maxY) y = maxY;
        const canvasX = startX + x * scaleX;
        const canvasY = startY - y * scaleY;
        ctx.lineTo(canvasX, canvasY);
        x += 0.025
      }
      ctx.strokeStyle = '#2ECC71' // зеленый 
      ctx.stroke(); // Завершаем рисование графика
      ctx.strokeStyle = '#000000';
      }
      ctx.lineWidth = 2;
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
        drawGraph();
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
  
    drawGraph(); 
  });

  // здесь функции для дисплея 

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