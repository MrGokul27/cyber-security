document.querySelectorAll(".glass-panel").forEach((panel) => {
  panel.addEventListener("mousemove", (e) => {
    const rect = panel.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    panel.style.setProperty("--mouse-x", `${x}px`);
    panel.style.setProperty("--mouse-y", `${y}px`);
  });

  panel.addEventListener("mouseleave", () => {
    panel.style.setProperty("--mouse-x", `-100%`);
    panel.style.setProperty("--mouse-y", `-100%`);
  });
});

// Simulate data grid activity for the visualization box
const vizTerminal = document.getElementById("viz-terminal");
const logs = [
  "SCANNING_PACKETS...",
  "ENCRYPTING_EDGE_NODES...",
  "THREAT_DETECTED_IP:192.168.1.104",
  "MITIGATING_DDOS_ATTACK...",
  "FIREWALL_STABLE",
  "DATA_GRID_ACTIVE",
];

if (vizTerminal) {
  let i = 0;
  setInterval(() => {
    vizTerminal.textContent = logs[i];
    i = (i + 1) % logs.length;
  }, 2000);
}
