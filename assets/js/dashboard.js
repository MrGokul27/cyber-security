// Sidebar Toggle for Mobile
document.getElementById("sidebarToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("show");
});

// Initialize Latency Graph
const graph = document.getElementById("latency-graph");
const barCount = 20;
for (let i = 0; i < barCount; i++) {
  const bar = document.createElement("div");
  bar.className = "flex-grow-1 bg-primary-container opacity-25 rounded-top";
  bar.style.height = Math.floor(Math.random() * 80 + 20) + "%";
  graph.appendChild(bar);
}

// Simulate real-time updates for latency bars
const bars = document.querySelectorAll(".h-40 div");
const graphBars = graph.querySelectorAll("div");
setInterval(() => {
  graphBars.forEach((bar) => {
    bar.style.height = Math.floor(Math.random() * 80 + 20) + "%";
    bar.style.transition = "height 1.5s ease-in-out";
  });
}, 2000);
