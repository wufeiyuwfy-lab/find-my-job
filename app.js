const app = document.querySelector("#app");
const refreshButton = document.querySelector("#refreshButton");
const cardTemplate = document.querySelector("#jobCardTemplate");
const languageButtons = [...document.querySelectorAll("[data-language]")];
const hiddenKey = "job-fit-dashboard-hidden";
const appliedKey = "job-fit-dashboard-applied";
const restoredKey = "job-fit-dashboard-restored";
const languageKey = "job-fit-dashboard-language";

let allJobs = [];
let allDeletedJobs = [];
let defaultAppliedJobs = [];
let activeTab = "report";
let activeFilter = "open";
let activeLanguage = getSavedLanguage();

const translations = {
  en: {
    pageTitle: "Job Fit Dashboard",
    brandSubtitle: "Static GitHub Pages version",
    refreshJobs: "Refresh jobs",
    pipeline: "Application pipeline",
    jobs: "jobs",
    topScore: "top score",
    avgScore: "avg score",
    openJobs: "Open jobs",
    applied: "Applied",
    deleted: "Deleted",
    newToday: "New today",
    fit: "fit",
    noSummary: "No summary available.",
    noVerdict: "No verdict",
    prepared: "prepared",
    originalSource: "Original source",
    noSourceLink: "No source link",
    restore: "Restore",
    markApplied: "Mark applied",
    remove: "Remove",
    appliedTitle: "Review the jobs already marked as applied.",
    deletedTitle: "Review jobs removed from the main dashboard.",
    openTitle: "Track every job report from strongest fit to weakest fit.",
    deletedCopy: "Deleted jobs are hidden from Open and Applied, but kept here so you can restore them if needed.",
    openCopy: "This static version is hosted from HTML/JSON. Applied and deleted jobs are saved in this browser, with the latest exported state included.",
    noApplied: "No jobs are marked as applied yet.",
    noDeleted: "No jobs have been deleted from the dashboard.",
    noOpen: "No open jobs are visible. Check Applied or Deleted, or clear this browser's site data to restore local changes.",
    markedApplied: "Job marked as applied",
    movedToOpen: "Job moved back to open jobs",
    hiddenInBrowser: "Job hidden in this browser",
    restoredToOpen: "Job restored to open jobs",
    backJobs: "← Jobs",
    fitScore: "/100 fit",
    report: "Report",
    cv: "CV",
    letter: "Letter",
    ppt: "Interview PPT",
    reviewReport: "Review the job report and preparation strategy.",
    deepAnalysisReady: "Deep analysis report ready",
    deepAnalysisMissing: "Deep analysis report missing from export for this high-score job.",
    deepAnalysisReport: "Deep analysis report",
    highScoreAutoReport: "High-score auto report",
    additionalReport: "Additional report",
    fitScoreBreakdown: "Fit score breakdown",
    salarySignal: "Salary signal",
    noSalary: "No salary range available.",
    strengths: "Strengths",
    gaps: "Gaps to handle",
    noItems: "No items available.",
    staticDraft: "Static exported draft. Edit in the local app if you need to save changes.",
    noDraft: "No draft was exported for this job.",
    noContentPrefix: "No",
    noContentSuffix: "content available in this static export.",
    loadError: "Could not load static job data.",
  },
  zh: {
    pageTitle: "求职匹配看板",
    brandSubtitle: "GitHub Pages 静态版",
    refreshJobs: "刷新职位",
    pipeline: "申请进度",
    jobs: "职位",
    topScore: "最高分",
    avgScore: "平均分",
    openJobs: "开放职位",
    applied: "已申请",
    deleted: "已删除",
    newToday: "今日新增",
    fit: "匹配",
    noSummary: "暂无摘要。",
    noVerdict: "暂无结论",
    prepared: "已准备",
    originalSource: "原始链接",
    noSourceLink: "暂无链接",
    restore: "恢复",
    markApplied: "标记已申请",
    remove: "删除",
    appliedTitle: "查看已经标记为已申请的职位。",
    deletedTitle: "查看从主看板移除的职位。",
    openTitle: "按匹配度从高到低追踪每个职位报告。",
    deletedCopy: "已删除职位会从开放和已申请列表中隐藏，但保留在这里，方便需要时恢复。",
    openCopy: "这是 HTML/JSON 托管的静态版本。已申请和已删除状态会保存在此浏览器中，并包含最新导出的状态。",
    noApplied: "目前还没有标记为已申请的职位。",
    noDeleted: "目前没有从看板删除的职位。",
    noOpen: "目前没有可见的开放职位。请查看已申请或已删除，或清除浏览器站点数据以恢复本地更改。",
    markedApplied: "已标记为已申请",
    movedToOpen: "已移回开放职位",
    hiddenInBrowser: "职位已在此浏览器中隐藏",
    restoredToOpen: "职位已恢复到开放列表",
    backJobs: "← 职位",
    fitScore: "/100 匹配",
    report: "报告",
    cv: "简历",
    letter: "动机信",
    ppt: "面试PPT",
    reviewReport: "查看职位报告和申请准备策略。",
    deepAnalysisReady: "深度分析报告已生成",
    deepAnalysisMissing: "此高分职位的深度分析报告未包含在导出中。",
    deepAnalysisReport: "深度分析报告",
    highScoreAutoReport: "高分职位自动报告",
    additionalReport: "补充报告",
    fitScoreBreakdown: "匹配分数拆解",
    salarySignal: "薪资信号",
    noSalary: "暂无薪资范围。",
    strengths: "优势",
    gaps: "需要处理的差距",
    noItems: "暂无内容。",
    staticDraft: "这是静态导出的草稿。如需保存修改，请在本地应用中编辑。",
    noDraft: "此职位未导出该草稿。",
    noContentPrefix: "暂无",
    noContentSuffix: "内容可在此静态导出中查看。",
    loadError: "无法加载静态职位数据。",
  },
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function t(key) {
  return translations[activeLanguage]?.[key] || translations.en[key] || key;
}

function getSavedLanguage() {
  try {
    const saved = localStorage.getItem(languageKey);
    return saved === "zh" ? "zh" : "en";
  } catch {
    return "en";
  }
}

function setLanguage(language) {
  activeLanguage = language === "zh" ? "zh" : "en";
  localStorage.setItem(languageKey, activeLanguage);
  updateLanguageMeta();
  renderRoute();
}

function updateLanguageMeta() {
  document.documentElement.lang = activeLanguage === "zh" ? "zh-CN" : "en";
  document.title = t("pageTitle");
  const subtitle = document.querySelector(".brand small");
  if (subtitle) subtitle.textContent = t("brandSubtitle");
  refreshButton.title = t("refreshJobs");
  refreshButton.setAttribute("aria-label", t("refreshJobs"));
  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.language === activeLanguage);
    button.setAttribute("aria-pressed", String(button.dataset.language === activeLanguage));
  });
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

function sortJobsByScore(jobs) {
  return [...jobs].sort((a, b) => {
    const scoreDifference = Number(b.score || 0) - Number(a.score || 0);
    if (scoreDifference) return scoreDifference;
    return String(a.company || "").localeCompare(String(b.company || "")) || String(a.title || "").localeCompare(String(b.title || ""));
  });
}

function visibleJobs(filter = activeFilter) {
  const hidden = getHiddenJobs();
  const applied = getAppliedJobs();
  if (filter === "deleted") return deletedJobs();
  return sortJobsByScore(activeJobs().filter((job) => {
    if (hidden.has(job.slug)) return false;
    if (filter === "applied") return applied.has(job.slug);
    return !applied.has(job.slug);
  }));
}

function deletedJobs() {
  const hidden = getHiddenJobs();
  const restored = getRestoredJobs();
  const localDeleted = allJobs.filter((job) => hidden.has(job.slug));
  const exportedDeleted = allDeletedJobs.filter((job) => !restored.has(job.slug));
  const bySlug = new Map([...exportedDeleted, ...localDeleted].map((job) => [job.slug, { ...job, deleted: true }]));
  return sortJobsByScore([...bySlug.values()]);
}

function activeJobs() {
  const restored = getRestoredJobs();
  const restoredDeleted = allDeletedJobs.filter((job) => restored.has(job.slug));
  const bySlug = new Map([...allJobs, ...restoredDeleted].map((job) => [job.slug, { ...job, deleted: false }]));
  return sortJobsByScore([...bySlug.values()]);
}

async function loadJobs() {
  const [jobsResponse, deletedResponse, appliedResponse] = await Promise.all([
    fetch("./data/jobs.json", { cache: "no-store" }),
    fetch("./data/deleted-jobs.json", { cache: "no-store" }).catch(() => null),
    fetch("./data/applied-jobs.json", { cache: "no-store" }).catch(() => null),
  ]);
  if (!jobsResponse.ok) throw new Error(t("loadError"));
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
  return isNewToday(job) ? `<span class="new-today-badge">${t("newToday")}</span>` : "";
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
        <p class="eyebrow">${t("pipeline")}</p>
        <h1>${homeTitle()}</h1>
        <p class="hero-copy">${homeCopy()}</p>
      </div>
      <div class="stats" aria-label="Dashboard summary">
        <div class="stat"><strong>${stats.total}</strong><span>${t("jobs")}</span></div>
        <div class="stat"><strong>${stats.top}</strong><span>${t("topScore")}</span></div>
        <div class="stat"><strong>${stats.average}</strong><span>${t("avgScore")}</span></div>
      </div>
    </section>
    <section class="filter-bar" aria-label="Job filters">
      <button class="filter-button" data-filter="open" type="button">${t("openJobs")} <span>${openCount}</span></button>
      <button class="filter-button" data-filter="applied" type="button">${t("applied")} <span>${appliedCount}</span></button>
      <button class="filter-button" data-filter="deleted" type="button">${t("deleted")} <span>${deletedCount}</span></button>
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
    node.querySelector(".summary").textContent = job.summary || t("noSummary");
    node.querySelector(".verdict").textContent = job.verdict || t("noVerdict");
    node.querySelector(".score-ring span").textContent = t("fit");
    node.querySelector(".progress-pill").textContent = `${job.progress.completed}/${job.progress.total} ${t("prepared")}`;

    const sourceLink = document.createElement("a");
    sourceLink.className = "source-link";
    sourceLink.href = job.applicationUrl || "#";
    sourceLink.target = "_blank";
    sourceLink.rel = "noreferrer";
    sourceLink.textContent = job.applicationUrl ? t("originalSource") : t("noSourceLink");
    if (!job.applicationUrl) sourceLink.classList.add("disabled");
    sourceLink.addEventListener("click", (event) => event.stopPropagation());
    node.querySelector(".card-footer").appendChild(sourceLink);

    if (isDeleted) {
      const restoreButton = document.createElement("button");
      restoreButton.className = "restore-button";
      restoreButton.type = "button";
      restoreButton.textContent = t("restore");
      restoreButton.addEventListener("click", (event) => {
        event.stopPropagation();
        restoreJob(job.slug);
      });
      node.querySelector(".card-footer").appendChild(restoreButton);
    } else {
      const appliedButton = document.createElement("button");
      appliedButton.className = "applied-button";
      appliedButton.type = "button";
      appliedButton.textContent = isApplied ? t("applied") : t("markApplied");
      appliedButton.setAttribute("aria-pressed", String(isApplied));
      appliedButton.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleApplied(job.slug);
      });
      node.querySelector(".card-footer").appendChild(appliedButton);

      const removeButton = document.createElement("button");
      removeButton.className = "remove-button";
      removeButton.type = "button";
      removeButton.textContent = t("remove");
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
  if (activeFilter === "applied") return t("appliedTitle");
  if (activeFilter === "deleted") return t("deletedTitle");
  return t("openTitle");
}

function homeCopy() {
  if (activeFilter === "deleted") return t("deletedCopy");
  return t("openCopy");
}

function emptyMessage() {
  if (activeFilter === "applied") return t("noApplied");
  if (activeFilter === "deleted") return t("noDeleted");
  return t("noOpen");
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
  showToast(nextState ? t("markedApplied") : t("movedToOpen"));
  renderRoute();
}

function removeJob(slug) {
  const hidden = getHiddenJobs();
  hidden.add(slug);
  setHiddenJobs(hidden);
  showToast(t("hiddenInBrowser"));
  renderHome();
}

function restoreJob(slug) {
  const hidden = getHiddenJobs();
  const restored = getRestoredJobs();
  hidden.delete(slug);
  restored.add(slug);
  setHiddenJobs(hidden);
  setRestoredJobs(restored);
  showToast(t("restoredToOpen"));
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
          <button class="secondary-button" id="backToJobs" type="button">${t("backJobs")}</button>
          <button class="applied-button" id="toggleCurrentApplied" type="button"></button>
          <button class="danger-button" id="removeCurrentJob" type="button">${t("remove")}</button>
          ${newTodayBadge(job)}
          <h1>${escapeHtml(job.title)}</h1>
          <p class="company">${escapeHtml(job.company)}</p>
          <p class="meta-line">${escapeHtml(job.location)}</p>
          <p class="score-large"><strong>${job.score}</strong><span>${t("fitScore")}</span></p>
          <p><span class="progress-pill">${job.progress.completed}/${job.progress.total} ${t("prepared")}</span></p>
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
  appliedButton.textContent = isApplied ? t("applied") : t("markApplied");
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
  if (tab === "cv") return t("cv");
  if (tab === "letter") return t("letter");
  if (tab === "ppt") return t("ppt");
  return t("report");
}

function renderTab(job) {
  if (activeTab === "cv") return renderTextFile(job, "cv", t("cv"));
  if (activeTab === "letter") return renderTextFile(job, "letter", t("letter"));
  if (activeTab === "ppt") return renderTextFile(job, "ppt", t("ppt"));
  return renderReport(job);
}

function listItems(items, limit = 6) {
  const safeItems = Array.isArray(items) ? items.slice(0, limit) : [];
  if (!safeItems.length) return `<li>${t("noItems")}</li>`;
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
      <div class="analysis-status ready">${t("deepAnalysisReady")}</div>
      <article class="markdown-preview">${markdownToHtml(report)}</article>
    `
    : `<div class="empty-state">${t("deepAnalysisMissing")}</div>`;

  return `
    <section class="deep-analysis" id="deepAnalysisPanel">
      <div class="deep-analysis-heading">
        <h3>${t("deepAnalysisReport")}</h3>
        <span>${Number(job.score) >= 80 ? t("highScoreAutoReport") : t("additionalReport")}</span>
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
        <h2>${t("report")}</h2>
        <p>${escapeHtml(job.summary || t("reviewReport"))}</p>
      </div>
    </div>
    ${renderDeepAnalysis(job)}
    <div class="summary-grid">
      <article class="info-box">
        <h3>${t("fitScoreBreakdown")}</h3>
        <ul>${(job.analysis?.score_breakdown || []).map((item) => `<li>${escapeHtml(item.label)}: ${escapeHtml(item.score)}/${escapeHtml(item.weight)}</li>`).join("") || `<li>${t("noItems")}</li>`}</ul>
      </article>
      <article class="info-box">
        <h3>${t("salarySignal")}</h3>
        <p>${salary.currency ? `${escapeHtml(salary.currency)} ${escapeHtml(salary.low)}-${escapeHtml(salary.high)} / ${escapeHtml(salary.period || "period")}` : t("noSalary")}</p>
        <p>${escapeHtml(salary.note || "")}</p>
      </article>
      <article class="info-box">
        <h3>${t("strengths")}</h3>
        <ul>${listItems(job.analysis?.strengths)}</ul>
      </article>
      <article class="info-box">
        <h3>${t("gaps")}</h3>
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
        <p>${content ? t("staticDraft") : t("noDraft")}</p>
      </div>
    </div>
    ${content ? `<textarea class="editor" readonly>${escapeHtml(content)}</textarea>` : `<div class="empty-state">${t("noContentPrefix")} ${escapeHtml(title.toLowerCase())} ${t("noContentSuffix")}</div>`}
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
languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});
window.addEventListener("popstate", renderRoute);

updateLanguageMeta();
loadJobs().then(renderRoute).catch((error) => {
  app.innerHTML = `<section class="error-state">${escapeHtml(error.message)}</section>`;
});
