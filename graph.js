function renderLineGraph(labels, values) {
  const graph = document.getElementById("graph");
  if (!graph) return;
  graph.innerHTML = "";

  if (!values || values.length === 0 || !labels || labels.length !== values.length) {
    graph.innerText = "Enter coordinates to display the line graph.";
    return;
  }

  const width = 900;
  const height = 320;
  const margin = 50;
  const maxValue = Math.max(...values.map(v => Math.abs(v)), 1);
  const stepX = labels.length === 1 ? 0 : (width - margin * 2) / (labels.length - 1);
  const points = values.map((value, index) => {
    const x = margin + index * stepX;
    const y = height - margin - (value / maxValue) * (height - margin * 2);
    return { x, y, value };
  });

  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.classList.add("line-chart-svg");

  const axis = document.createElementNS(svgNS, "line");
  axis.setAttribute("x1", margin);
  axis.setAttribute("y1", height - margin);
  axis.setAttribute("x2", width - margin / 2);
  axis.setAttribute("y2", height - margin);
  axis.setAttribute("stroke", "#333");
  axis.setAttribute("stroke-width", "2");
  svg.appendChild(axis);

  const vertical = document.createElementNS(svgNS, "line");
  vertical.setAttribute("x1", margin);
  vertical.setAttribute("y1", margin / 2);
  vertical.setAttribute("x2", margin);
  vertical.setAttribute("y2", height - margin);
  vertical.setAttribute("stroke", "#333");
  vertical.setAttribute("stroke-width", "2");
  svg.appendChild(vertical);

  for (let i = 0; i <= 4; i += 1) {
    const y = margin + ((height - margin * 2) / 4) * i;
    const grid = document.createElementNS(svgNS, "line");
    grid.setAttribute("x1", margin);
    grid.setAttribute("y1", y);
    grid.setAttribute("x2", width - margin / 2);
    grid.setAttribute("y2", y);
    grid.setAttribute("stroke", "#d0d0d0");
    grid.setAttribute("stroke-width", "1");
    svg.appendChild(grid);

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", 10);
    label.setAttribute("y", y + 5);
    label.setAttribute("fill", "#555");
    label.setAttribute("font-size", "12");
    label.textContent = ((maxValue * 4) / 4 - (maxValue * i) / 4).toFixed(1);
    svg.appendChild(label);
  }

  const pathString = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const path = document.createElementNS(svgNS, "path");
  path.setAttribute("d", pathString);
  path.setAttribute("fill", "none");
  path.setAttribute("stroke", "#007bff");
  path.setAttribute("stroke-width", "4");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-linecap", "round");
  svg.appendChild(path);

  points.forEach((point, index) => {
    const circle = document.createElementNS(svgNS, "circle");
    circle.setAttribute("cx", point.x);
    circle.setAttribute("cy", point.y);
    circle.setAttribute("r", "6");
    circle.setAttribute("fill", "#ff5722");
    svg.appendChild(circle);

    const valueLabel = document.createElementNS(svgNS, "text");
    valueLabel.setAttribute("x", point.x);
    valueLabel.setAttribute("y", point.y - 12);
    valueLabel.setAttribute("fill", "#222");
    valueLabel.setAttribute("font-size", "12");
    valueLabel.setAttribute("text-anchor", "middle");
    valueLabel.textContent = point.value.toFixed(2);
    svg.appendChild(valueLabel);

    const xLabel = document.createElementNS(svgNS, "text");
    xLabel.setAttribute("x", point.x);
    xLabel.setAttribute("y", height - margin + 20);
    xLabel.setAttribute("fill", "#333");
    xLabel.setAttribute("font-size", "12");
    xLabel.setAttribute("text-anchor", "middle");
    xLabel.textContent = labels[index];
    svg.appendChild(xLabel);
  });

  graph.appendChild(svg);
}