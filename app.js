const app = document.querySelector("#app");
const refreshButton = document.querySelector("#refreshButton");
const cardTemplate = document.querySelector("#jobCardTemplate");
const hiddenKey = "job-fit-dashboard-hidden";
const appliedKey = "job-fit-dashboard-applied";
const restoredKey = "job-fit-dashboard-restored";

let allJobs = [];
let allDeletedJobs = [];
let defaultAppliedJobs = [];
let activeTab = "report";
let activeFilter = "open";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getHiddenJobs() {
  try {
    const hidden = JSON.parse(localStorage.getItem(hiddenKey) || "[]");
    return new Set(Array.isArray(hidden) ? hidden : []);
  } catch {
    return new Set();
  }
}

function setHiddenJobs(hidden) {
  localStorage.setItem(hiddenKey, JSON.stringify([...hidden].sort()));
}

function getRestoredJobs() {
  try {
    const restored = JSON.parse(localStorage.getItem(restoredKey) || "[]");
    return new Set(Array.isArray(restored) ? restored : []);
  } catch {
    return new Set();
  }
}

function setRestoredJobs(restored) {
  localStorage.setItem(restoredKey, JSON.stringify([...restored].sort()));
}

function getAppliedJobs() {
  try {
    const applied = JSON.parse(localStorage.getItem(appliedKey) || "[]");
    return new Set(Array.isArray(applied) ? applied : []);
  } catch {
    return new Set();
  }
}

function setAppliedJobs(applied) {
  localStorage.setItem(appliedKey, JSON.stringify([...applied].sort()));
}

function visibleJobs(filter = activeFilter) {
  const hidden = getHiddenJobs();
  const applied = getAppliedJobs();
  if (filter === "deleted") return deletedJobs();
  return activeJobs().filter((job) => {
    if (hidden.has(job.slug)) return false;
    if (filter === "applied") return applied.has(job.slug);
    return !applied.has(job.slug);
  });
}

function deletedJobs() {
  const hidden = getHiddenJobs();
  const restored = getRestoredJobs();
  const localDeleted = allJobs.filter((job) => hidden.has(job.slug));
  const exportedDeleted = allDeletedJobs.filter((job) => !restored.has(job.slug));
  const bySlug = new Map([...exportedDeleted, ...localDeleted].map((job) => [job.slug, { ...job, deleted: true }]));
  return [...bySlug.values()].sort((a, b) => b.score - a.score || a.company.localeCompare(b.company));
}

function activeJobs() {
  const restored = getRestoredJobs();
  const restoredDeleted = allDeletedJobs.filter((job) => restored.has(job.slug));
  const bySlug = new Map([...allJobs, ...restoredDeleted].map((job) => [job.slug, { ...job, deleted: false }]));
  return [...bySlug.values()];
}

async function loadJobs() {
  const [jobsResponse, deletedResponse, appliedResponse] = await Promise.all([
    fetch("./data/jobs.json", { cache: "no-store" }),
    fetch("./data/deleted-jobs.json", { cache: "no-store" }).catch(() => null),
    fetch("./data/applied-jobs.json", { cache: "no-store" }).catch(() => null),
  ]);
  if (!jobsResponse.ok) throw new Error("Could not load static job data.");
  const jobsPayload = await jobsResponse.json();
  const deletedPayload = deletedResponse?.ok ? await deletedResponse.json() : {};
  const appliedPayload = appliedResponse?.ok ? await appliedResponse.json() : {};
  allJobs = Array.isArray(jobsPayload.jobs) ? jobsPayload.jobs : [];
  allDeletedJobs = Array.isArray(deletedPayload.jobs) ? deletedPayload.jobs : [];
  defaultAppliedJobs = Array.isArray(appliedPayload.applied) ? appliedPayload.applied : [];
  setAppliedJobs(new Set([...defaultAppliedJobs, ...getAppliedJobs()]));
}

function setRoute(path) {
  history.pushState({}, "", path);
  renderRoute();
}

function currentSlug() {
  const params = new URLSearchParams(location.search);
  return params.get("job");
}

function isNewToday(job) {
  const today = new Date().toLocaleDateString("sv-SE", { timeZone: "Europe/Stockholm" });
  return job.addedDate === today || (Array.isArray(job.tags) && job.tags.includes("New today") && job.date === today);
}

function newTodayBadge(job) {
  return isNewToday(job) ? '<span class="new-today-badge">New today</span>' : "";
}

function summarizeScores(jobs) {
  if (!jobs.length) return { total: 0, average: 0, top: 0 };
  const totalScore = jobs.reduce((sum, job) => sum + job.score, 0);
  return {
    total: jobs.length,
    average: Math.round(totalScore / jobs.length),
    top: jobs[0].score,
  };
}

function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 2400);
}

function renderHome() {
  const jobs = visibleJobs();
  const openCount = visibleJobs("open").length;
  const appliedCount = visibleJobs("applied").length;
  const deletedCount = visibleJobs("deleted").length;
  const stats = summarizeScores(jobs);
  app.innerHTML = `
    <section class="hero">
      <div>
        <p class="eyebrow">Application pipeline</p>
        <h1>${homeTitle()}</h1>
        <p class="hero-copy">${homeCopy()}</p>
      </div>
      <div class="stats" aria-label="Dashboard summary">
        <div class="stat"><strong>${stats.total}</strong><span>jobs</span></div>
        <div class="stat"><strong>${stats.top}</strong><span>top score</span></div>
        <div class="stat"><strong>${stats.average}</strong><span>avg score</span></div>
      </div>
    </section>
    <section class="filter-bar" aria-label="Job filters">
      <button class="filter-button" data-filter="open" type="button">Open jobs <span>${openCount}</span></button>
      <button class="filter-button" data-filter="applied" type="button">Applied <span>${appliedCount}</span></button>
      <button class="filter-button" data-filter="deleted" type="button">Deleted <span>${deletedCount}</span></button>
    </section>
    <section class="job-grid" aria-label="Jobs"></section>
  `;

  app.querySelectorAll(".filter-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.filter === activeFilter);
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      renderHome();
    });
  });

  const grid = app.querySelector(".job-grid");
  if (!jobs.length) {
    grid.innerHTML = `<div class="empty-state">${emptyMessage()}</div>`;
    return;
  }

  const applied = getAppliedJobs();
  for (const job of jobs) {
    const node = cardTemplate.content.firstElementChild.cloneNode(true);
    const isApplied = applied.has(job.slug);
    const isDeleted = activeFilter === "deleted";
    node.tabIndex = 0;
    node.setAttribute("role", "link");
    node.setAttribute("aria-label", `Open ${job.title} at ${job.company}`);
    node.classList.toggle("is-applied", isApplied);
    node.classList.toggle("is-deleted", isDeleted);
    node.style.setProperty("--score-angle", `${Math.max(0, Math.min(100, job.score)) * 3.6}deg`);
    node.querySelector(".score-ring strong").textContent = job.score;
    node.querySelector(".card-text").prepend(document.createRange().createContextualFragment(newTodayBadge(job)));
    node.querySelector(".company").textContent = job.company;
    node.querySelector("h2").textContent = job.title;
    node.querySelector(".meta-line").textContent = job.location;
    node.querySelector(".summary").textContent = job.summary || "No summary available.";
    node.querySelector(".verdict").textContent = job.verdict || "No verdict";
    node.querySelector(".progress-pill").textContent = `${job.progress.completed}/${job.progress.total} prepared`;

    const sourceLink = document.createElement("a");
    sourceLink.className = "source-link";
    sourceLink.href = job.applicationUrl || "#";
    sourceLink.target = "_blank";
    sourceLink.rel = "noreferrer";
    sourceLink.textContent = job.applicationUrl ? "Original source" : "No source link";
    if (!job.applicationUrl) sourceLink.classList.add("disabled");
    sourceLink.addEventListener("click", (event) => event.stopPropagation());
    node.querySelector(".card-footer").appendChild(sourceLink);

    if (isDeleted) {
      const restoreButton = document.createElement("button");
      restoreButton.className = "restore-button";
      restoreButton.type = "button";
      restoreButton.textContent = "Restore";
      restoreButton.addEventListener("click", (event) => {
        event.stopPropagation();
        restoreJob(job.slug);
      });
      node.querySelector(".card-footer").appendChild(restoreButton);
    } else {
      const appliedButton = document.createElement("button");
      appliedButton.className = "applied-button";
      appliedButton.type = "button";
      appliedButton.textContent = isApplied ? "Applied" : "Mark applied";
      appliedButton.setAttribute("aria-pressed", String(isApplied));
      appliedButton.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleApplied(job.slug);
      });
      node.querySelector(".card-footer").appendChild(appliedButton);

      const removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        removeJob(job.slug);
      });
      node.querySelector(".card-footer").appendChild(removeButton);
    }

    const detailPath = `?job=${encodeURIComponent(job.slug)}`;
    node.addEventListener("click", () => setRoute(detailPath));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setRoute(detailPath);
      }
    });
    grid.appendChild(node);
  }
}

function homeTitle() {
  if (activeFilter === "applied") return "Review the jobs already marked as applied.";
  if (activeFilter === "deleted") return "Review jobs removed from the main dashboard.";
  return "Track every job report from strongest fit to weakest fit.";
}

function homeCopy() {
  if (activeFilter === "deleted") return "Deleted jobs are hidden from Open and Applied, but kept here so you can restore them if needed.";
  return "This static version is hosted from HTML/JSON. Applied and deleted jobs are saved in this browser, with the latest exported state included.";
}

function emptyMessage() {
  if (activeFilter === "applied") return "No jobs are marked as applied yet.";
  if (activeFilter === "deleted") return "No jobs have been deleted from the dashboard.";
  return "No open jobs are visible. Check Applied or Deleted, or clear this browser's site data to restore local changes.";
}

function toggleApplied(slug) {
  const applied = getAppliedJobs();
  const nextState = !applied.has(slug);
  if (nextState) {
    applied.add(slug);
  } else {
    applied.delete(slug);
  }
  setAppliedJobs(applied);
  showToast(nextState ? "Job marked as applied" : "Job moved back to open jobs");
  renderRoute();
}

function removeJob(slug) {
  const hidden = getHiddenJobs();
  hidden.add(slug);
  setHiddenJobs(hidden);
  showToast("Job hidden in this browser");
  renderHome();
}

function restoreJob(slug) {
  const hidden = getHiddenJobs();
  const restored = getRestoredJobs();
  hidden.delete(slug);
  restored.add(slug);
  setHiddenJobs(hidden);
  setRestoredJobs(restored);
  showToast("Job restored to open jobs");
  renderHome();
}

function renderJob(slug) {
  const job = activeJobs().find((item) => item.slug === slug) || deletedJobs().find((item) => item.slug === slug);
  if (!job) {
    setRoute("./");
    return;
  }

  app.innerHTML = `
    <section class="detail-layout">
      <aside class="sidebar">
        <div class="job-identity">
          <button class="secondary-button" id="backToJobs" type="button">← Jobs</button>
          <button class="applied-button" id="toggleCurrentApplied" type="button"></button>
          <button class="danger-button" id="removeCurrentJob" type="button">Remove</button>
          ${newTodayBadge(job)}
          <h1>${escapeHtml(job.title)}</h1>
          <p class="company">${escapeHtml(job.company)}</p>
          <p class="meta-line">${escapeHtml(job.location)}</p>
          <p class="score-large"><strong>${job.score}</strong><span>/100 fit</span></p>
          <p><span class="progress-pill">${job.progress.completed}/${job.progress.total} prepared</span></p>
        </div>
        <nav class="tabs" aria-label="Job detail sections">
          ${["report", "cv", "letter", "ppt"].map((tab) => `<button class="tab-button" data-tab="${tab}" type="button">${tabLabel(tab)}</button>`).join("")}
        </nav>
      </aside>
      <section class="content-panel" id="contentPanel"></section>
    </section>
  `;

  app.querySelector("#backToJobs").addEventListener("click", () => setRoute("./"));
  const applied = getAppliedJobs();
  const appliedButton = app.querySelector("#toggleCurrentApplied");
  const isApplied = applied.has(job.slug);
  appliedButton.textContent = isApplied ? "Applied" : "Mark applied";
  appliedButton.setAttribute("aria-pressed", String(isApplied));
  appliedButton.addEventListener("click", () => toggleApplied(job.slug));
  app.querySelector("#removeCurrentJob").addEventListener("click", () => {
    removeJob(job.slug);
    setRoute("./");
  });
  app.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === activeTab);
    button.addEventListener("click", () => {
      activeTab = button.dataset.tab;
      renderJob(slug);
    });
  });

  renderTab(job);
}

function tabLabel(tab) {
  if (tab === "cv") return "CV";
  if (tab === "letter") return "Letter";
  if (tab === "ppt") return "Interview PPT";
  return "Report";
}

function renderTab(job) {
  if (activeTab === "cv") return renderTextFile(job, "cv", "CV");
  if (activeTab === "letter") return renderTextFile(job, "letter", "Motivation letter");
  if (activeTab === "ppt") return renderTextFile(job, "ppt", "Interview PPT");
  return renderReport(job);
}

function listItems(items, limit = 6) {
  const safeItems = Array.isArray(items) ? items.slice(0, limit) : [];
  if (!safeItems.length) return "<li>No items available.</li>";
  return safeItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
}

function shouldShowDeepAnalysis(job) {
  return Number(job.score) >= 80 || Boolean(job.files?.deepReport?.trim());
}

function renderDeepAnalysis(job) {
  if (!shouldShowDeepAnalysis(job)) return "";
  const report = job.files?.deepReport || "";
  const content = report.trim()
    ? `
      <div class="analysis-status ready">Deep analysis report ready</div>
      <article class="markdown-preview">${markdownToHtml(report)}</article>
    `
    : `<div class="empty-state">Deep analysis report missing from export for this high-score job.</div>`;

  return `
    <section class="deep-analysis" id="deepAnalysisPanel">
      <div class="deep-analysis-heading">
        <h3>Deep analysis report</h3>
        <span>${Number(job.score) >= 80 ? "High-score auto report" : "Additional report"}</span>
      </div>
      ${content}
    </section>
  `;
}

function markdownInline(value) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function markdownToHtml(markdown) {
  const lines = String(markdown || "").split(/\r?\n/);
  let html = "";
  let inList = false;
  let inCode = false;
  let inTable = false;

  const closeList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      html += "</tbody></table>";
      inTable = false;
    }
  };
  const tableCells = (line) => line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (line.startsWith("```")) {
      closeList();
      closeTable();
      html += inCode ? "</code></pre>" : "<pre><code>";
      inCode = !inCode;
      continue;
    }

    if (inCode) {
      html += `${escapeHtml(line)}\n`;
      continue;
    }

    if (!line.trim()) {
      closeList();
      closeTable();
      continue;
    }

    const nextLine = lines[index + 1] || "";
    if (line.trim().startsWith("|") && nextLine.trim().match(/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/)) {
      closeList();
      closeTable();
      const headers = tableCells(line);
      html += `<table><thead><tr>${headers.map((cell) => `<th>${markdownInline(cell)}</th>`).join("")}</tr></thead><tbody>`;
      inTable = true;
      continue;
    }

    if (line.trim().match(/^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/)) {
      continue;
    }

    if (inTable && line.trim().startsWith("|")) {
      const cells = tableCells(line);
      html += `<tr>${cells.map((cell) => `<td>${markdownInline(cell)}</td>`).join("")}</tr>`;
      continue;
    }

    closeTable();

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 2, 5);
      html += `<h${level}>${markdownInline(heading[2])}</h${level}>`;
      continue;
    }

    const bullet = line.match(/^\s*-\s+(.+)$/);
    if (bullet) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${markdownInline(bullet[1])}</li>`;
      continue;
    }

    closeList();
    html += `<p>${markdownInline(line)}</p>`;
  }

  closeList();
  closeTable();
  if (inCode) html += "</code></pre>";
  return html;
}

function renderReport(job) {
  const salary = job.analysis?.salary || {};
  document.querySelector("#contentPanel").innerHTML = `
    <div class="panel-header">
      <div>
        <h2>Report</h2>
        <p>${escapeHtml(job.summary || "Review the job report and preparation strategy.")}</p>
      </div>
    </div>
    ${renderDeepAnalysis(job)}
    <div class="summary-grid">
      <article class="info-box">
        <h3>Fit score breakdown</h3>
        <ul>${(job.analysis?.score_breakdown || []).map((item) => `<li>${escapeHtml(item.label)}: ${escapeHtml(item.score)}/${escapeHtml(item.weight)}</li>`).join("") || "<li>No breakdown available.</li>"}</ul>
      </article>
      <article class="info-box">
        <h3>Salary signal</h3>
        <p>${salary.currency ? `${escapeHtml(salary.currency)} ${escapeHtml(salary.low)}-${escapeHtml(salary.high)} / ${escapeHtml(salary.period || "period")}` : "No salary range available."}</p>
        <p>${escapeHtml(salary.note || "")}</p>
      </article>
      <article class="info-box">
        <h3>Strengths</h3>
        <ul>${listItems(job.analysis?.strengths)}</ul>
      </article>
      <article class="info-box">
        <h3>Gaps to handle</h3>
        <ul>${listItems(job.analysis?.gaps)}</ul>
      </article>
    </div>
  `;
}

function renderTextFile(job, key, title) {
  const content = job.files?.[key] || "";
  document.querySelector("#contentPanel").innerHTML = `
    <div class="panel-header">
      <div>
        <h2>${title}</h2>
        <p>${content ? "Static exported draft. Edit in the local app if you need to save changes." : "No draft was exported for this job."}</p>
      </div>
    </div>
    ${content ? `<textarea class="editor" readonly>${escapeHtml(content)}</textarea>` : `<div class="empty-state">No ${escapeHtml(title.toLowerCase())} content available in this static export.</div>`}
  `;
}

function renderRoute() {
  const slug = currentSlug();
  if (slug) {
    renderJob(slug);
  } else {
    activeTab = "report";
    renderHome();
  }
}

refreshButton.addEventListener("click", () => {
  loadJobs().then(renderRoute).catch((error) => {
    app.innerHTML = `<section class="error-state">${escapeHtml(error.message)}</section>`;
  });
});
window.addEventListener("popstate", renderRoute);

loadJobs().then(renderRoute).catch((error) => {
  app.innerHTML = `<section class="error-state">${escapeHtml(error.message)}</section>`;
});
