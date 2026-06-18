document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Session Data
  const session = JSON.parse(localStorage.getItem("stackly_session")) || {
    role: "operator",
    operatorId: "guest@stackly.sys",
  };

  const roleInfo = {
    administrator: {
      title: "SYSTEM_ADMIN_ACCESS",
      badge: "LVL_04_ROOT",
      stats: [
        { label: "Active Nodes", val: "128", icon: "hub" },
        { label: "System Health", val: "98%", icon: "monitor_heart" },
        { label: "Storage Load", val: "42%", icon: "database" },
        { label: "Pending Updates", val: "3", icon: "update" },
      ],
      latency: {
        title: "CORE_BACKBONE_LATENCY",
        metric: "AVG_22MS",
        detail:
          "ROOT_SYNC: Monitoring 12 global data centers with sub-millisecond drift detection across orbital relays.",
        specs: [
          { label: "UPLINK_STABILITY", val: "99.98%" },
          { label: "RELAY_DRIFT", val: "0.02ms" },
          { label: "GLOBAL_SYNC", val: "ACTIVE" },
          { label: "NODE_DENSITY", val: "HIGH" },
        ],
      },
      content: {
        heading: "ROOT_INFRASTRUCTURE_COMMAND",
        description:
          "Executing high-level oversight of global system architecture, hardware thermal thresholds, and multi-factor node authentication.",
        modules: [
          {
            title: "Kernel Integrity",
            icon: "security_update_good",
            type: "CORE",
            status: "STABLE",
          },
          {
            title: "Node Access Mesh",
            icon: "vpn_lock",
            type: "AUTH",
            status: "ENCRYPTED",
          },
          {
            title: "Quantum Balancer",
            icon: "settings_suggest",
            type: "OPS",
            status: "BALANCED",
          },
          {
            title: "Encryption Ledger",
            icon: "history_edu",
            type: "LOG",
            status: "SYNCED",
          },
        ],
      },
      nav: [
        {
          label: "Dashboard",
          icon: "dashboard",
          url: "/pages/dashboard/dashboard.html",
        },
        {
          label: "User Management",
          icon: "group",
          url: "/pages/dashboard/system-adminstrator/user-management.html",
        },
        {
          label: "System Config",
          icon: "settings",
          url: "/pages/dashboard/system-adminstrator/system-config.html",
        },
        {
          label: "Global Logs",
          icon: "terminal",
          url: "/pages/dashboard/system-adminstrator/global-logs.html",
        },
        {
          label: "Network Topology",
          icon: "share_location",
          url: "/pages/dashboard/system-adminstrator/network-topology.html",
        },
        {
          label: "Access Policies",
          icon: "policy",
          url: "/pages/dashboard/system-adminstrator/access-policies.html",
        },
        {
          label: "Audit Trails",
          icon: "receipt_long",
          url: "/pages/dashboard/system-adminstrator/audit-trails.html",
        },
        {
          label: "Backup & Restore",
          icon: "cloud_upload",
          url: "/pages/dashboard/system-adminstrator/backup-and-restore.html",
        },
      ],
    },
    analyst: {
      title: "SECURITY_ANALYST_UPLINK",
      badge: "LVL_03_INTEL",
      stats: [
        { label: "Threats Blocked", val: "1.2k", icon: "verified_user" },
        { label: "Anomalies", val: "14", icon: "warning" },
        { label: "Pattern Match", val: "94%", icon: "psychology" },
        { label: "Data Integrity", val: "100%", icon: "lock" },
      ],
      latency: {
        title: "DEEP_PACKET_JITTER",
        metric: "0.8ms_VAR",
        detail:
          "HEURISTIC_SCAN: Real-time analysis of packet arrival variance to detect subtle MITM or signal interception attempts.",
        specs: [
          { label: "JITTER_RATIO", val: "0.04%" },
          { label: "SIGNAL_NOISE", val: "-94dB" },
          { label: "HEURISTIC_CONF", val: "98%" },
          { label: "PATTERN_MATCH", val: "ON" },
        ],
      },
      content: {
        heading: "INTELLIGENCE_THREAT_MATRIX",
        description:
          "Deploying real-time heuristic analysis across inbound packet streams with active cryptographic signature matching.",
        modules: [
          {
            title: "GEO_LOCATION_PING",
            icon: "public",
            type: "INTEL",
            status: "SCANNING",
          },
          {
            title: "HEURISTIC_ENGINE",
            icon: "model_training",
            type: "AI_MOD",
            status: "ACTIVE",
          },
          {
            title: "PACKET_DEEP_DIVE",
            icon: "bug_report",
            type: "NET_SCN",
            status: "CLEAN",
          },
          {
            title: "NEURAL_LINK_STAT",
            icon: "psychology_alt",
            type: "LINK",
            status: "UP",
          },
        ],
      },
      nav: [
        {
          label: "Dashboard",
          icon: "dashboard",
          url: "/pages/dashboard/dashboard.html",
        },
        {
          label: "Pattern Analysis",
          icon: "analytics",
          url: "/pages/dashboard/system-analyst/pattern-analysis.html",
        },
        {
          label: "Forensics",
          icon: "biotech",
          url: "/pages/dashboard/system-analyst/forensics.html",
        },
        {
          label: "Intel Reports",
          icon: "description",
          url: "/pages/dashboard/system-analyst/intel-reports.html",
        },
        {
          label: "Vulnerability Scan",
          icon: "bug_report",
          url: "/pages/dashboard/system-analyst/vulnerability-scan.html",
        },
        {
          label: "Incident History",
          icon: "history",
          url: "/pages/dashboard/system-analyst/incident-history.html",
        },
        {
          label: "Malware Analysis",
          icon: "coronavirus",
          url: "/pages/dashboard/system-analyst/malware-analysis.html",
        },
        {
          label: "Compliance Check",
          icon: "gavel",
          url: "/pages/dashboard/system-analyst/compliance-check.html",
        },
      ],
    },
    operator: {
      title: "COMMAND_OPERATOR_INTERFACE",
      badge: "LVL_01_OPS",
      stats: [
        { label: "Active Connections", val: "4,209", icon: "lan" },
        { label: "Node Latency", val: "12ms", icon: "speed" },
        { label: "Uptime", val: "99.9%", icon: "timer" },
        { label: "Alert Queue", val: "0", icon: "notifications_active" },
      ],
      latency: {
        title: "EDGE_CONNECTION_STABILITY",
        metric: "12ms_RTT",
        detail:
          "FIELD_OPS: Maintaining persistent encrypted bridge between local gateway nodes and central command.",
        specs: [
          { label: "BRIDGE_LOAD", val: "12%" },
          { label: "PROXY_RTT", val: "4ms" },
          { label: "CRYPTO_AUTH", val: "YES" },
          { label: "FIELD_STRENGTH", val: "92%" },
        ],
      },
      content: {
        heading: "FIELD_OPERATIONS_INTERFACE",
        description:
          "Direct management of frontline perimeter defenses and real-time routing protocols for global edge delivery networks.",
        modules: [
          {
            title: "SIGNAL_STRENGTH",
            icon: "signal_cellular_alt",
            type: "RF_LINK",
            status: "100%",
          },
          {
            title: "FIREWALL_LOAD",
            icon: "speed",
            type: "TRAFFIC",
            status: "NOMINAL",
          },
          {
            title: "PROXY_RELAY_GRID",
            icon: "dns",
            type: "RELAY",
            status: "ACTIVE",
          },
          {
            title: "DEFENSE_LOCKDOWN",
            icon: "lock_open",
            type: "PROT_X",
            status: "READY",
          },
        ],
      },
      nav: [
        {
          label: "Dashboard",
          icon: "dashboard",
          url: "/pages/dashboard/dashboard.html",
        },
        {
          label: "Incident Response",
          icon: "emergency",
          url: "#incident-response",
        },
        { label: "Protocol Status", icon: "security", url: "#protocol-status" },
        {
          label: "Perimeter Defense",
          icon: "shield_person",
          url: "#perimeter-defense",
        },
        { label: "Traffic Control", icon: "traffic", url: "#traffic-control" },
        {
          label: "Alert Management",
          icon: "notification_important",
          url: "#alert-management",
        },
        {
          label: "System Health",
          icon: "monitor_heart",
          url: "#system-health",
        },
      ],
    },
  };

  const currentRole = roleInfo[session.role] || roleInfo.operator;

  // Welcome message
  // 2. Update UI Displays
  document.getElementById("role-display").textContent = currentRole.title;
  document.getElementById("op-id-display").textContent =
    `OPERATOR: ${session.operatorId.split("@")[0].toUpperCase()}`;

  // Update Latency Card Content
  const latTitle = document.getElementById("latency-title");
  const latBadge = document.getElementById("latency-badge");
  const latDetails = document.getElementById("latency-details");
  const latSpecs = document.getElementById("latency-specs");

  if (currentRole.latency) {
    if (latTitle) latTitle.textContent = currentRole.latency.title;
    if (latBadge) latBadge.textContent = currentRole.latency.metric;
    if (latDetails)
      latDetails.innerHTML = `<span class="text-primary-container">></span> ${currentRole.latency.detail}`;

    if (latSpecs && currentRole.latency.specs) {
      latSpecs.innerHTML = currentRole.latency.specs
        .map(
          (spec) => `
        <div class="col-6 col-sm-3">
          <div class="p-2 border border-white border-opacity-10 rounded bg-black bg-opacity-25">
            <div class="small opacity-50 font-monospace mb-1" style="font-size: 8px; letter-spacing: 1px;">${spec.label}</div>
            <div class="fw-bold font-monospace text-primary-container" style="font-size: 11px;">${spec.val}</div>
          </div>
        </div>
      `,
        )
        .join("");
    }
  }

  // 3. Populate Sidebar
  const sidebarNav = document.getElementById("sidebar-nav");

  // Helper to resolve paths correctly regardless of current page depth (GitHub Pages compatible)
  const getPrefix = () => {
    const path = window.location.pathname;
    if (
      path.includes("/system-analyst/") ||
      path.includes("/security-analyst/") ||
      path.includes("/system-adminstrator/")
    )
      return "../../../";
    if (path.includes("/dashboard/")) return "../../";
    return "";
  };
  const prefix = getPrefix();

  currentRole.nav.forEach((item) => {
    const link = document.createElement("a");

    // Resolve URL: absolute-style paths starting with '/' are corrected to relative ones
    let resolvedUrl = item.url;
    if (resolvedUrl && resolvedUrl.startsWith("/")) {
      resolvedUrl = prefix + resolvedUrl.substring(1);
    }
    link.href = resolvedUrl || "#";

    // Determine active state by comparing the link's filename with the current pathname
    const isCurrentPage =
      item.url &&
      !item.url.startsWith("#") &&
      window.location.pathname.includes(item.url.split("/").pop());
    link.className = `nav-link-custom ${isCurrentPage ? "active" : ""}`;

    link.innerHTML = `
      <span class="material-symbols-outlined">${item.icon}</span>
      ${item.label}
    `;
    sidebarNav.appendChild(link);
  });

  // 4. Populate Stats
  const statsContainer = document.getElementById("stats-container");
  currentRole.stats.forEach((stat) => {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3";
    col.innerHTML = `
      <div class="glass-panel p-3 stat-card h-100 cyber-border position-relative overflow-hidden bg-black bg-opacity-50">
        <div class="scan-line opacity-25"></div>
        <div class="d-flex justify-content-between mb-2">
          <span class="material-symbols-outlined fs-5" style="color: #00f0ff;">${stat.icon}</span>
          <span class="small font-monospace text-success" style="font-size: 9px; letter-spacing: 1px;">LIVE</span>
        </div>
        <div class="h2 mb-1 fw-extrabold text-white font-monospace">${stat.val}</div>
        <div class="small text-uppercase tracking-widest font-monospace" style="font-size: 10px; color: #00f0ff;">${stat.label}</div>
      </div>
    `;
    statsContainer.appendChild(col);
  });

  // 5. Sidebar Toggle for Mobile
  const sidebarToggle = document.getElementById("sidebarToggle");
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      document.getElementById("sidebar").classList.toggle("show");
    });
  }

  // 6. Render Role-Specific Content
  renderRoleSpecificContent(currentRole.content);

  // 6. Terminal Log Emulation
  const terminal = document.getElementById("log-terminal");
  const logs = [
    { type: "INFO", msg: "INIT_SEQUENCE: Handshaking with satellite relay..." },
    { type: "SUCCESS", msg: "ENCRYPTION: Layer_07 protocol established." },
    { type: "INFO", msg: "FIREWALL: Perimeter breach attempt nullified." },
    { type: "WARNING", msg: "SCAN: Heuristic anomaly detected in sector 4C." },
    { type: "INFO", msg: "ROUTING: Traffic redirected via encrypted proxy." },
    { type: "ERROR", msg: "CRITICAL: Unauthorized access attempt: 204.1.8.2" },
    { type: "INFO", msg: "KERNEL: Integrity check complete. [OK]" },
    { type: "SUCCESS", msg: "AUTH: Administrator session verified." },
    { type: "WARNING", msg: "MEMORY: Buffer utilization at 88%." },
    { type: "INFO", msg: "LOGS: Rotating local audit trails..." },
  ];

  function getLogTimestamp() {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  }

  setInterval(() => {
    const logEntry = document.createElement("div");
    const randomLog = logs[Math.floor(Math.random() * logs.length)];
    logEntry.className = `log-${randomLog.type.toLowerCase()}`;
    logEntry.innerHTML = `<span class="log-timestamp">[${getLogTimestamp()}]</span> <span class="log-type">${randomLog.type}</span>: ${randomLog.msg}`;
    terminal.prepend(logEntry);
    if (terminal.children.length > 8) terminal.lastChild.remove();
  }, 3000);
});

// Function to render role-specific content
function renderRoleSpecificContent(content) {
  const container = document.getElementById("role-specific-content");
  if (!container || !content) return;

  let html = `
    <div class="glass-panel p-4 h-100 position-relative overflow-hidden cyber-border bg-black bg-opacity-50">
      <div class="scan-line opacity-25"></div>
      <div class="d-flex align-items-center gap-2 mb-3">
        <span class="material-symbols-outlined text-primary-container">terminal</span>
        <h5 class="fw-bold mb-0 text-white font-monospace" style="letter-spacing: 2px;">${content.heading}</h5>
      </div>
      <p class="text-on-surface-variant mb-4 font-monospace small" style="opacity: 0.8; line-height: 1.6;">
        <span class="text-primary-container">[SYSTEM_INFO]:</span> ${content.description}
      </p>
      <div class="row g-3">
  `;

  content.modules.forEach((module) => {
    html += `
      <div class="col-md-6 col-lg-3">
        <div class="glass-panel p-3 h-100 cyber-border module-node-card position-relative overflow-hidden">
          <div class="scan-line opacity-10"></div>
          <div class="d-flex justify-content-between mb-2">
            <span class="material-symbols-outlined fs-4 text-primary-container" style="text-shadow: 0 0 10px rgba(0, 240, 255, 0.5);">${module.icon}</span>
            <span class="text-success font-monospace status-pill rounded-pill">MOD_OK</span>
          </div>
          <h6 class="mb-1 text-white fw-bold font-monospace" style="font-size: 13px; letter-spacing: 0.5px;">${module.title}</h6>
          <div class="border-top border-white border-opacity-10 my-2"></div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <span class="text-primary-container font-monospace opacity-75" style="font-size: 10px;">TYPE: ${module.type}</span>
            <span class="badge rounded-0 border border-primary-container border-opacity-50 text-primary-container font-monospace" style="font-size: 10px;">${module.status}</span>
          </div>
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  container.innerHTML = html;
}

// Initialize Latency Graph
const graph = document.getElementById("latency-graph");
const barCount = 20;
const baseLineHeight = 10;
for (let i = 0; i < barCount; i++) {
  const bar = document.createElement("div");
  bar.className = "flex-grow-1 bg-primary-container opacity-50 rounded-top";
  bar.style.height = Math.floor(Math.random() * 80 + 20) + "%";
  graph.appendChild(bar);
}

// Simulate real-time updates for latency bars
const graphBars = graph.querySelectorAll("div");
setInterval(() => {
  graphBars.forEach((bar) => {
    // Ensure bars are always visible and fluctuate
    bar.style.height =
      Math.floor(Math.random() * (100 - baseLineHeight) + baseLineHeight) + "%";
    bar.style.transition = "height 1.5s ease-in-out";
  });
}, 2000);
