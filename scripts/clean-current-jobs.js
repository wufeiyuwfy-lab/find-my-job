const fs = require("fs/promises");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const JOBS = path.join(ROOT, "data", "jobs.json");
const DELETED = path.join(ROOT, "data", "deleted-jobs.json");
const checkedAt = new Date().toISOString();

const invalid = new Map([
  ["samsung nordics::product manager mx - graduate", "Application deadline passed: 2026-05-30."],
  ["cleverex / volvo ce client::junior product manager within the automotive industry", "Old six-month consultancy listing; no reliable current application route found."],
  ["schibsted news media::product manager, ad solutions", "Application deadline passed: 2026-06-30."],
  ["volumental::senior product manager (ai builder) - in-store experience", "Excluded by Goal rule: Senior role with a hard 5+ years of product-management experience."],
  ["skf group::product manager - intelligent lubrication solutions", "Excluded by location rule: current official role locations do not include Sweden."],
  ["gelato::product manager, gelatoconnect", "Excluded by Goal rules: hard 5+ years of product-management experience and current role location is London/Madrid, not Sweden-based."],
  ["coretura::product manager - in-vehicle infotainment", "Re-scored below 75: direct IVI architecture/integration domain experience is a key requirement and is not evidenced in Feiyu's profile."]
]);

const replacementUrls = new Map([
  ["h&m group::junior product designer - h&m home", "https://jobs.smartrecruiters.com/HMGroup/744000119940438-junior-product-designer-h-m-home-"],
  ["h&m womenswear::junior product developer for edition & campaign", "https://jobs.smartrecruiters.com/HMGroup/744000125845524-junior-product-developer-for-edition-campaign-h-m-womenswear"]
]);

const keyOf = (job) => `${job.company}::${job.title}`.toLowerCase();

async function main() {
  const [activeData, deletedData] = await Promise.all([
    fs.readFile(JOBS, "utf8").then(JSON.parse),
    fs.readFile(DELETED, "utf8").then(JSON.parse)
  ]);
  const keep = [];
  const removed = [];
  for (const job of activeData.jobs) {
    const key = keyOf(job);
    const lowScore = Number(job.score) < 75;
    const invalidReason = invalid.get(key);
    if (lowScore || invalidReason) {
      removed.push({
        ...job,
        deleted: true,
        deletedAt: checkedAt.slice(0, 10),
        deletedReason: invalidReason || `Score below current 75-point threshold (${job.score}).`,
        statusCheck: {
          checkedAt,
          status: invalidReason ? "invalid" : "removed-by-score-rule",
          evidence: invalidReason || `Local fit score ${job.score} is below 75.`
        }
      });
      continue;
    }
    if (replacementUrls.has(key)) {
      job.applicationUrl = replacementUrls.get(key);
      job.tags = [...new Set([...(job.tags || []), "Application URL refreshed 2026-07-18"])];
    }
    keep.push(job);
  }
  const existingDeleted = new Map((deletedData.jobs || []).map((job) => [job.slug, job]));
  for (const job of removed) existingDeleted.set(job.slug, job);
  activeData.jobs = keep;
  activeData.exportedAt = checkedAt;
  deletedData.jobs = [...existingDeleted.values()];
  deletedData.exportedAt = checkedAt;
  await Promise.all([
    fs.writeFile(JOBS, `${JSON.stringify(activeData, null, 2)}\n`),
    fs.writeFile(DELETED, `${JSON.stringify(deletedData, null, 2)}\n`)
  ]);
  console.log(`Kept ${keep.length}; removed ${removed.length}; refreshed ${replacementUrls.size} application URLs.`);
  console.log(`Removed below 75: ${removed.filter((job) => Number(job.score) < 75).length}`);
  console.log(`Removed invalid: ${removed.filter((job) => Number(job.score) >= 75).length}`);
}

main().catch((error) => { console.error(error); process.exit(1); });
