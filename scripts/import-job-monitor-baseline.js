const fs = require("fs/promises");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data", "jobs.json");
const BASELINE = "/Users/fei/Documents/Find job/output/job-monitor/sweden-job-monitor-baseline.json";

const slugify = (value) => value.toLowerCase().normalize("NFKD")
  .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function toJob(item, previous) {
  const slug = `monitor-${slugify(item.company)}-${slugify(item.title)}`;
  const strengths = [
    `The role matches Feiyu's ${item.cv} profile and transferable founder-led product ownership.`,
    `Language/location signal: ${item.language}.`,
    `Experience signal: ${item.experience}.`
  ];
  const gaps = [];
  if (/3-5|3\+|2-5|several/i.test(item.experience)) gaps.push("The experience wording may require a clear explanation of how SensoryWind founder work maps to formal role experience.");
  if (!item.official) gaps.push("A company-hosted official application page was not found; preserve evidence of the live listing and verify the final destination before submitting.");
  return {
    ...(previous || {}),
    slug,
    sourceType: "monitor",
    title: item.title,
    company: item.company,
    location: item.location,
    score: item.score,
    verdict: item.recommendation,
    date: "2026-07-18",
    addedDate: previous?.addedDate || "2026-07-18",
    tags: ["Verified 2026-07-18", item.score >= 90 ? "Top match" : "Strong apply"],
    summary: `${item.cv}. ${item.status}. Deadline: ${item.deadline}.`,
    applicationUrl: item.official || item.linkedin || "",
    progress: previous?.progress || { completed: 0, total: 7, percent: 0 },
    files: previous?.files || { pdf: "", cv: "", letter: "", ppt: "", deepReport: "", deepReportZh: "" },
    analysis: {
      ...(previous?.analysis || {}),
      score_breakdown: previous?.analysis?.score_breakdown || [],
      strengths,
      gaps,
      interview_points: [
        "Use SensoryWind as an end-to-end product case: discovery, prototype, testing, suppliers and business case.",
        "Show 5-6 AI-assisted web products as evidence of rapid iteration, without presenting them as years of professional software engineering."
      ],
      questions_to_ask: [
        "Is English sufficient for all daily work and stakeholder communication?",
        "What would success look like in the first 90 days?",
        "How does the team evaluate founder-led experience against the stated year requirement?"
      ],
      language_fit: item.language,
      company_signal: item.status,
      application_angle: `Use the ${item.cv} CV and foreground product ownership, user validation and cross-functional execution.`
    }
  };
}

async function main() {
  const [website, baseline] = await Promise.all([
    fs.readFile(DATA, "utf8").then(JSON.parse),
    fs.readFile(BASELINE, "utf8").then(JSON.parse)
  ]);
  const byKey = new Map(website.jobs.map((job) => [`${job.company}::${job.title}`.toLowerCase(), job]));
  const imported = baseline.recommended
    .filter((item) => Number(item.score) > 80)
    .map((item) => toJob(item, byKey.get(`${item.company}::${item.title}`.toLowerCase())));
  const importedKeys = new Set(imported.map((job) => `${job.company}::${job.title}`.toLowerCase()));
  website.jobs = [...imported, ...website.jobs.filter((job) => !importedKeys.has(`${job.company}::${job.title}`.toLowerCase()))];
  website.exportedAt = new Date().toISOString();
  await fs.writeFile(DATA, `${JSON.stringify(website, null, 2)}\n`);
  console.log(`Imported ${imported.length} monitor jobs scoring above 80.`);
}

main().catch((error) => { console.error(error); process.exit(1); });
