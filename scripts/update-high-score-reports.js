const fs = require("fs/promises");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_FILE = path.join(ROOT_DIR, "data", "jobs.json");
const THRESHOLD = 80;

const SEEDED_REPORTS = {
  "digest-contour-design-software-product-manager": `# Company Job Validation Report

## 1. Executive summary

- Company: Contour Design
- Position: Software Product Manager
- Country: Denmark
- City/region: Copenhagen / Vesterbro
- Candidate level: early-career to mid-level stretch
- Field: software product management, ergonomic hardware, digital services, user research
- Overall recommendation: Continue but verify key issues
- Overall score: 3.8 / 5
- Parent-friendly summary: This is a legitimate and attractive hardware-plus-software product role at an established ergonomic-device company. It strongly matches Feiyu's product-development, user research, physical-product, and design background, but it is likely a stretch because the posting asks for proven software product management, analytics, Agile/Scrum, and technical literacy around software and AI/ML. It is worth continuing if the team accepts transferable founder/product experience, but salary, mentorship, exact seniority, and cross-border Denmark/Sweden practicalities must be checked.

## 2. Scorecard

| Area | Score 1-5 | Evidence status | Confidence | Explanation |
|---|---:|---|---|---|
| Company legitimacy | 5 | Found publicly | High | Contour has official company pages, public LinkedIn presence, a Copenhagen headquarters, named products, and a visible job ad. |
| Financial stability | 4 | Found publicly | Medium | Contour describes a long operating history and Polaris Private Equity acquisition. Detailed current financials are not easy to verify from the job ad. |
| Role clarity | 4 | Found publicly | High | The job ad gives concrete responsibilities across software roadmap, lifecycle, user research, analytics, cross-functional delivery, AI-driven features, and go-to-market. |
| Candidate-role fit | 4 | Estimated from public signals | Medium | Feiyu's founder/product-development background fits the hardware, user need, research, stakeholder, and Figma parts; direct software PM evidence is weaker. |
| Learning potential | 4 | Estimated from public signals | Medium | Reporting to VP Product Management and Product Strategy could be valuable if the VP provides mentorship, but the role may expect independent ownership quickly. |
| Manager/team support signals | 3 | Must ask employer | Medium | Reporting line is visible, but day-to-day support, team size, and onboarding depth are not published. |
| Salary fairness | 3 | Estimated from public signals | Medium | Copenhagen product-manager benchmarks are high, but this role's exact level and salary are unpublished. |
| Benefits clarity | 2 | Must ask employer | Medium | Pension, paid vacation, bonus, relocation, and cross-border benefits are not shown in the ad. |
| Contract clarity | 3 | Found publicly | Medium | The role is described as full-time and on-site; contract terms, probation, notice, and pension are not listed. |
| Work-life balance signals | 3 | Found publicly | Low | The ad describes flexibility and helpful colleagues, but workload and release-pressure expectations are unknown. |
| Cross-border complexity | 2 | Must ask employer | High | Feiyu lives in Sweden and the role is on-site in Copenhagen, so tax, social insurance, pension, commute, and remote-work rules need checking. |
| Overall opportunity quality | 4 | Estimated from public signals | Medium | Strong strategic fit, but software PM seniority and Denmark/Sweden complexity make verification important. |

## 3. Public facts found

| Item | Finding | Evidence status | Confidence | Source |
|---|---|---|---|---|
| Job location and setup | The job ad lists Copenhagen / Vesterbro, full-time, on-site, with English as the language requirement. | Found publicly | High | https://dk.linkedin.com/jobs/view/software-product-manager-at-contour-design-4403237078 |
| Application route | The posting says to apply through LinkedIn or by sending a targeted CV to job@contourdesign.com. | Found publicly | High | https://dk.linkedin.com/jobs/view/software-product-manager-at-contour-design-4403237078 |
| Role scope | The role owns vision, strategy, and delivery for software products and online services complementing ergonomic and hygienic mice and keyboards. | Found publicly | High | https://dk.linkedin.com/jobs/view/software-product-manager-at-contour-design-4403237078 |
| Responsibilities | Responsibilities include product vision, roadmap, full lifecycle, user research, analytics, technical specifications, AI-driven features, and go-to-market support. | Found publicly | High | https://dk.linkedin.com/jobs/view/software-product-manager-at-contour-design-4403237078 |
| Required profile | The ad asks for proven software product management, technical literacy, Agile/Scrum, tools such as Jira/Figma/Asana, market research, and data analysis. | Found publicly | High | https://dk.linkedin.com/jobs/view/software-product-manager-at-contour-design-4403237078 |
| Company business | Contour describes itself as a market leader in research, development, and design of ergonomic computer hardware with RollerMouse, UniMouse, and Shuttle Controller. | Found publicly | High | https://www.contourdesign.com/company/about |
| Company history | Contour's official site says it was founded in 1995 and acquired by Polaris Private Equity in 2021. | Found publicly | High | https://www.contourdesign.com/company/about |
| Company footprint | Contour says it is headquartered in Denmark and operates across six continents, with a global headquarters at Nyropsgade 41-43 in Copenhagen V. | Found publicly | High | https://www.contourdesign.com/company/about |
| LinkedIn company profile | LinkedIn lists Contour Design as computer hardware manufacturing, Copenhagen V, privately held, founded 1995, and 201-500 employees. | Found publicly | Medium | https://www.linkedin.com/company/contourdevices |
| Salary benchmark | LønRadar's May 2026 Product Manager data shows a Denmark median total salary of DKK 58,065/month and 25th-75th percentile of DKK 50,850-68,200/month. | Found publicly | Medium | https://loenradar.dk/loen/product-manager |

## 4. Estimated signals

| Area | Estimate | Reasoning | Confidence | How to verify |
|---|---|---|---|---|
| Role seniority | Mid-level stretch despite LinkedIn's graduate label | The responsibilities sound like ownership of a full software portfolio, not a narrow junior role. | Medium | Ask what experience level the hiring manager truly expects and whether founder-led product work counts. |
| Feiyu fit | Strong on physical product, user needs, stakeholder work, and design; weaker on software roadmap and analytics | SensoryWind and design studies map well to user-centered hardware/software products, but the ad asks for proven software PM. | Medium | Ask whether the team is open to a design-founder profile transitioning into software PM. |
| Values fit | Strong | Ergonomics, health at work, inclusive design, and reducing strain fit Feiyu's wellbeing/product background. | High | Ask which user problems and software services are the current priority. |
| Cross-border load | Meaningful | On-site Copenhagen from Sweden can be viable but requires commute and tax/social-insurance planning. | High | Check Oresunddirekt, Danish tax, pension, and remote-work terms before accepting. |

## 5. Salary benchmark

- Likely salary range: DKK 45,000-62,000/month total compensation for Feiyu-specific discussion, depending on whether Contour treats this as junior/transition, regular PM, or software PM.
- Sources used: Contour job ad, LønRadar Denmark Product Manager 2026 data, and role-seniority inference from responsibilities.
- Offered salary assessment: unknown because no salary is published.
- Caveats: Published product-manager salary benchmarks may overstate Feiyu's immediate leverage if the company sees her as a transition candidate; they may understate expectations if the role requires independent software PM ownership.
- Negotiation notes: Ask for base salary, employer pension, vacation, probation period, salary review timing, commute flexibility, and whether Swedish residence affects payroll, tax, and social insurance.

| Salary item | Finding | Evidence status | Confidence | Source / note |
|---|---|---|---|---|
| Published salary | Not listed in the job ad. | Not found | High | LinkedIn job ad does not show compensation. |
| Denmark PM benchmark | Median Product Manager total salary is DKK 58,065/month; 25th-75th percentile is DKK 50,850-68,200/month. | Found publicly | Medium | https://loenradar.dk/loen/product-manager |
| Feiyu-specific practical target | DKK 48,000-56,000/month would be a reasonable initial discussion range if the role is not senior. | Estimated from public signals | Medium | Adjust after employer clarifies seniority and pension. |

## 6. Red flags

| Red flag | Evidence | Severity | What to ask or verify |
|---|---|---|---|
| Software PM expectations may be higher than Feiyu's current direct experience | The ad asks for proven software product management, technical literacy, analytics, Agile/Scrum, and AI/ML concepts. | Medium | "Would founder-led hardware/product development plus Figma/user research be considered enough for this role?" |
| On-site Copenhagen creates cross-border complexity | The ad says full-time, on-site in Copenhagen while Feiyu lives in Sweden. | Medium | "Can the company support Swedish-resident employees, and what are the tax/social-insurance implications?" |
| Salary and benefits are unpublished | No salary, pension, vacation, or bonus information is visible. | Medium | "What is the salary range and pension contribution for this role?" |
| Portfolio ownership may be broad | The role owns software products and online services tied to the hardware portfolio. | Mild | "How many products/services would the role own during the first six months?" |

## 7. Green flags

| Green flag | Evidence | Why it matters |
|---|---|---|
| English requirement | The posting states English as the language requirement. | Removes the main Swedish/Danish language barrier. |
| Hardware-software bridge | The role connects digital services with ergonomic and hygienic physical products. | Very aligned with Feiyu's industrial design and product-development background. |
| Health and wellbeing mission | Contour focuses on reducing strain and improving healthier computer work. | Fits Feiyu's wellbeing-oriented product story from SensoryWind and NASA concept work. |
| Visible product leadership reporting line | The ad says the role reports to VP Product Management and Product Strategy. | Could provide strong product mentorship if the VP is hands-on. |

## 8. Missing information

| Missing item | Why it matters | Who to ask | Suggested question |
|---|---|---|---|
| Salary range | Determines whether Copenhagen commuting and cross-border work are viable. | HR / recruiter | "What salary range has been budgeted for this Software Product Manager role?" |
| Pension and benefits | Denmark compensation often includes pension and benefits that affect total value. | HR | "What employer pension, insurance, vacation, and benefits are included?" |
| Seniority expectation | Determines whether Feiyu is a credible candidate or a stretch. | Hiring manager | "Is this role open to a design-founder transitioning into software PM?" |
| Onboarding support | Critical because software PM is a stretch. | VP Product Management | "What support and onboarding would the new PM receive in the first 90 days?" |
| Cross-border terms | Swedish residence creates tax and social insurance issues. | HR | "Have you employed Swedish-resident Copenhagen employees before?" |

## 9. Potential LinkedIn connectors

No strong public Lund University alumni connector at Contour was found during this quick website-report pass. Broader searches should target Contour product/design leaders, Polaris portfolio contacts in Denmark, and Lund alumni in Copenhagen hardware/software product management.

| Person | Current public role/company | Lund University connection | Why relevant | Evidence status | Confidence | Suggested coffee-chat angle | Source |
|---|---|---|---|---|---|---|---|
| Not found | Not found | Not found | No reliable public Contour + Lund match found. | Not found | Low | Ask recruiter directly whether there is a product team member open to a short role-fit chat. | Search result review |

### Coffee-chat message template

Hi, I am exploring the Software Product Manager role at Contour Design. My background is in industrial design, product development, and founder-led hardware/product work in Sweden. I would value a short 15-minute chat about how Contour's software product work connects user research, hardware, and digital services. Thank you.

### Coffee-chat questions

- How technical is the software PM work day to day?
- What kinds of user research or analytics most influence roadmap decisions?
- What would make a design-founder profile successful in the first six months?

## 10. Questions to ask the employer

### Salary and salary review
- What is the salary range for this role?
- Is there a salary review after probation or after the first year?

### Collective agreement / contract
- Is the role covered by a Danish collective agreement or company policy equivalent?
- What probation period and notice period apply?

### Pension and insurance
- What employer pension contribution is included?
- What health, accident, travel, and life insurance are included?

### Overtime and working hours
- What are normal working hours?
- How are launch periods, overtime, and flex time handled?

### Manager and team support
- Who is the direct manager?
- How much product mentorship is available from the VP Product Management and Product Strategy?

### Learning and development
- What software, analytics, and Agile skills should the new hire build before starting?

### Remote/hybrid work
- The ad says on-site. Is any hybrid work possible after onboarding?

### Role expectations
- What are the first three product problems this role would own?
- How many engineers and designers would the role work with?

### Cross-border Denmark/Sweden issues
- Can the company employ someone living in Sweden?
- Which country handles tax, pension, social insurance, and remote-work limits?

## 11. Contract items to check before signing

| Contract item | What to check | Risk if unclear |
|---|---|---|
| Job title | Exact title and whether it is junior, regular, or senior PM. | Future career signal may be unclear. |
| Salary | Monthly gross salary and whether pension is included or added. | Offer may be below Copenhagen PM market. |
| Pension | Employer contribution and provider. | Total compensation may be weaker than it looks. |
| Work location | On-site expectation and hybrid flexibility. | Commute burden from Sweden may be high. |
| Cross-border terms | Tax, social insurance, pension, and remote-work rules. | Legal/financial surprises. |
| Probation and notice | Length and termination terms. | Planning risk. |
| Overtime | Whether overtime is paid, flexed, or included. | Hidden workload. |
| IP/confidentiality | Any restrictive clauses. | Future startup or portfolio work limitations. |

## 12. Candidate-friendly summary

This is a very interesting role because it combines physical products, user research, ergonomics, software services, and product strategy. Feiyu can tell a strong story around SensoryWind: identifying a user comfort problem, building a physical product concept, working with engineering partners, testing with users, and translating feedback into product decisions.

The biggest challenge is that the role may not be junior in practice. The ad asks for proven software product management and data/technical skills. Feiyu should not hide that gap; she should position herself as a product-development founder who can bridge hardware, users, design, and business while learning the deeper software PM parts quickly.

## 13. Final recommendation

- Final recommendation: Continue but verify key issues
- Main reason: Strong mission and hardware/software fit, but direct software PM seniority and cross-border Copenhagen terms need verification.
- What would improve the recommendation: clear mentorship, openness to a transition profile, salary around or above DKK 50k/month with pension, and manageable hybrid/commute terms.
- What would make the recommendation worse: expectation of fully independent senior software PM from day one, no cross-border support, weak salary, or no product mentorship.
- Next 3 actions:
  - Apply with a CV framing SensoryWind as product ownership and user research.
  - Ask seniority, software PM expectations, salary, pension, and hybrid/cross-border questions early.
  - Prepare examples for user research, roadmap prioritization, Figma, and translating hardware feedback into software features.

## 14. Sources

- Contour Software Product Manager job ad: https://dk.linkedin.com/jobs/view/software-product-manager-at-contour-design-4403237078
- Contour official About page: https://www.contourdesign.com/company/about
- Contour LinkedIn company page: https://www.linkedin.com/company/contourdevices
- LønRadar Product Manager Denmark salary data: https://loenradar.dk/loen/product-manager

## 15. Research metadata

- Date researched: 2026-05-24
- Company name: Contour Design
- Position name: Software Product Manager
- Country: Denmark
- City/region: Copenhagen / Vesterbro
- Job ad URL: https://dk.linkedin.com/jobs/view/software-product-manager-at-contour-design-4403237078
- Candidate level: early-career to mid-level stretch
- Field: software product management, product development, ergonomic hardware, digital services
- Candidate lives in: Sweden
- Work location: Denmark, on-site
- Cross-border Sweden/Denmark issues apply: Yes
`,
  "digest-medeon-science-park-incubator-manager": `# Company Job Validation Report

## 1. Executive summary

- Company: Medeon Science Park
- Position: Incubator Manager
- Country: Sweden
- City/region: Malmö
- Candidate level: senior-leaning stretch for Feiyu
- Field: life science incubation, startup support, innovation, commercialization, business development
- Overall recommendation: Continue but verify key issues
- Overall score: 3.7 / 5
- Parent-friendly summary: Medeon is a legitimate and established Malmö life-science science park with public ownership by the City of Malmö and Wihlborgs. The role is highly aligned with Feiyu's startup, innovation, funding, validation, and ecosystem interests, but it appears more senior than a typical early-career role because it asks for overall responsibility for the incubator, fundraising/financing optimization, and leading business coaches. Feiyu should treat this as a strong stretch opportunity and verify language expectations, leadership seniority, salary, and support structure before investing heavily.

## 2. Scorecard

| Area | Score 1-5 | Evidence status | Confidence | Explanation |
|---|---:|---|---|---|
| Company legitimacy | 5 | Found publicly | High | Medeon has an official website, named CEO, address, public ownership, long operating history, and a visible role page. |
| Financial stability | 4 | Found publicly | Medium | Medeon is owned by City of Malmö and Wihlborgs Fastigheter, which lowers legitimacy risk, but role budget and finances are not published in the ad. |
| Role clarity | 4 | Found publicly | High | The role page describes responsibilities, reporting line, focus areas, and application route. |
| Candidate-role fit | 4 | Estimated from public signals | Medium | Feiyu's founder and LU Innovation experience fit startup support, validation, and commercialization, but direct incubator leadership is limited. |
| Learning potential | 5 | Found publicly | High | The role sits inside a strong life-science innovation ecosystem with startups, scaleups, labs, healthcare, industry, and investors. |
| Manager/team support signals | 3 | Found publicly | Medium | The role reports to the CEO, but the level of mentoring for a stretch candidate is not clear. |
| Salary fairness | 3 | Estimated from public signals | Medium | Comparable Swedish business manager salaries can be high, but nonprofit/science-park pay and exact seniority are unknown. |
| Benefits clarity | 2 | Must ask employer | Medium | Pension, collective agreement, overtime, wellness allowance, and vacation terms are not published. |
| Contract clarity | 3 | Found publicly | Medium | Application route and reporting line are clear; employment type and detailed contract terms are not visible. |
| Work-life balance signals | 3 | Estimated from public signals | Low | Strategic plus operational responsibility, events, investor relations, and startup support may create broad workload. |
| Cross-border complexity | 4 | Found publicly | High | Feiyu lives in Sweden and the job is in Malmö, so Denmark/Sweden cross-border issues are not central. |
| Overall opportunity quality | 4 | Estimated from public signals | Medium | Excellent strategic fit and legitimacy, but likely seniority mismatch needs careful handling. |

## 3. Public facts found

| Item | Finding | Evidence status | Confidence | Source |
|---|---|---|---|---|
| Job status | Medeon published the Incubator Manager role on 2026-05-12 and invites applications by CV and short motivation statement. | Found publicly | High | https://www.medeon.se/stories-news/blog/incubator-manager/ |
| Application route | The role page says to send application materials to medeon@medeon.se and direct questions to CEO Malin Bornschein. | Found publicly | High | https://www.medeon.se/stories-news/blog/incubator-manager/ |
| Deadline signal | Medicon Village listed the Incubator Manager role with application deadline 26 May. | Found publicly | Medium | https://se.linkedin.com/company/mediconvillage |
| Role scope | The role has overall responsibility for Medeon's incubator and supports ideas, startups, and scaleups with validation, funding, commercialization, and scaling. | Found publicly | High | https://www.medeon.se/stories-news/blog/incubator-manager/ |
| Reporting line | The role reports to the CEO of Medeon Science Park. | Found publicly | High | https://www.medeon.se/stories-news/blog/incubator-manager/ |
| Focus areas | Medeon focuses on medtech, diabetes, oral health, healthy aging, with prevention as a cross-cutting theme. | Found publicly | High | https://www.medeon.se/stories-news/blog/incubator-manager/ |
| Company history | Medeon describes itself as Scandinavia's first and most experienced life-science-focused science park, established in 1985. | Found publicly | High | https://www.medeon.se/about-us/who-we-are/ |
| Ownership | Medeon is owned by the City of Malmö (60%) and Wihlborgs Fastigheter AB (40%). | Found publicly | High | https://www.medeon.se/about-us/owners-board/ |
| Ecosystem | Medeon says it provides business development, strategic networks, infrastructure, and collaboration between industry, academia, and the public sector. | Found publicly | High | https://www.medeon.se/about-us/who-we-are/ |
| Salary benchmark | Unionen's 2025 Swedish market salary range for business manager and similar roles was SEK 47,000-97,470/month. | Found publicly | Medium | https://www.unionen.se/rad-och-stod/om-lon/marknadsloner/business-manager |

## 4. Estimated signals

| Area | Estimate | Reasoning | Confidence | How to verify |
|---|---|---|---|---|
| Role seniority | Senior or senior-leaning | Overall incubator responsibility, leading business coaches, fundraising/financing optimization, and CEO reporting suggest meaningful seniority. | High | Ask whether they consider early-career founder profiles or require prior incubator/program leadership. |
| Feiyu fit | Strong thematic fit but seniority stretch | Feiyu has founder, LU Innovation, Almi, prototype, validation, and pilot experience, but not yet a long record coaching many startups. | Medium | Ask whether founder/operator experience can substitute for incubator management experience. |
| Language risk | Swedish or Scandinavian language may matter | The role is in Malmö, works with regional companies and healthcare/industry actors, and the digest flagged Scandinavian language preference. The official page should be checked directly for final wording before applying. | Medium | Ask if English is sufficient for daily work and external stakeholder meetings. |
| Salary fairness | Likely should not be junior-level pay | The role's responsibility level suggests compensation should reflect management/business-development responsibility. | Medium | Ask for salary range and collective agreement status. |

## 5. Salary benchmark

- Likely salary range: SEK 42,000-58,000/month for a nonprofit/science-park incubator manager context; higher may be possible if the role is treated as senior business-development management.
- Sources used: official role responsibilities, Malmö location, and Unionen business manager salary benchmark.
- Offered salary assessment: unknown because salary is not published.
- Caveats: Unionen's business manager group is broad and may include more commercial roles than a science-park nonprofit role. Medeon's exact collective agreement and salary structure must be checked.
- Negotiation notes: Because this role carries overall incubator responsibility, avoid accepting a junior salary unless mentoring, title, scope, and growth path are clearly favorable.

| Salary item | Finding | Evidence status | Confidence | Source / note |
|---|---|---|---|---|
| Published salary | Not found in the role page. | Not found | High | Medeon role page does not show salary. |
| Swedish benchmark | Unionen's 2025 business manager range was SEK 47,000-97,470/month. | Found publicly | Medium | https://www.unionen.se/rad-och-stod/om-lon/marknadsloner/business-manager |
| Feiyu-specific practical range | SEK 42,000-52,000/month would be a cautious discussion range if they see her as a stretch candidate; role responsibility may justify more. | Estimated from public signals | Medium | Verify with employer and union advice. |

## 6. Red flags

| Red flag | Evidence | Severity | What to ask or verify |
|---|---|---|---|
| Role may be too senior for Feiyu right now | The role has overall responsibility for the incubator and includes leading business coaches. | Medium | "Would you consider a founder/innovation profile without prior incubator manager title?" |
| Language expectations are uncertain | Regional stakeholder, healthcare, and startup support work may require Swedish/Scandinavian even if not obvious from the summary. | Medium | "Is English sufficient for daily work, coaching, and partner meetings?" |
| Salary and benefits are unpublished | No salary, collective agreement, pension, overtime, or benefits are listed. | Medium | "What salary range and collective agreement/benefit package apply?" |
| Broad strategic and operational workload | The role covers strategy, operations, financing, coaches, events, partners, healthcare, industry, investors, and owners. | Mild | "What are the first-year priorities and what support team is in place?" |

## 7. Green flags

| Green flag | Evidence | Why it matters |
|---|---|---|
| Strong legitimacy | Medeon has long history, public ownership, official address, named CEO, and public role page. | Low scam risk and strong ecosystem credibility. |
| Excellent startup-support alignment | The role focuses on validation, funding, commercialization, scaling, and innovation support. | Directly fits Feiyu's founder and LU Innovation experience. |
| Malmö location | The job is in Malmö, close to Lund. | Practical compared with Copenhagen or Stockholm roles. |
| Life-science and medtech ecosystem | Medeon focuses on medtech, diabetes, oral health, healthy aging, and prevention. | Strong bridge to Feiyu's health/wellbeing product interests. |
| CEO reporting line | The role reports to CEO Malin Bornschein. | High exposure and learning potential if expectations are realistic. |

## 8. Missing information

| Missing item | Why it matters | Who to ask | Suggested question |
|---|---|---|---|
| Required experience level | Determines whether Feiyu is realistically competitive. | CEO / hiring team | "How many years of incubator, startup coaching, or leadership experience do you expect?" |
| Language requirement | Swedish may be needed for regional stakeholder work. | CEO / HR | "Is English sufficient, or is professional Swedish/Scandinavian required?" |
| Salary range | Determines fairness for a high-responsibility role. | CEO / HR | "What salary range is budgeted for the Incubator Manager role?" |
| Team structure | The role mentions leading coaches; support level is unclear. | CEO | "How many coaches and team members support the incubator?" |
| Contract and collective agreement | Affects pension, overtime, insurance, and job security. | HR / CEO | "Is the role covered by a collective agreement or equivalent employment policy?" |

## 9. Potential LinkedIn connectors

No confirmed current Medeon employee with a clear Lund University connection was identified for direct coffee-chat outreach in this quick website-report pass. Broader public results show useful nearby ecosystem leads in Lund/Malmö life science and innovation who may understand Medeon's environment.

| Person | Current public role/company | Lund University connection | Why relevant | Evidence status | Confidence | Suggested coffee-chat angle | Source |
|---|---|---|---|---|---|---|---|
| Annie George Chandy | Abarceo Pharma / past public connection to Medeon Science Park, Malmö | Lund University | Broader life-science innovation and Medeon ecosystem perspective, not a confirmed current Medeon contact. | Estimated from public signals | Low | Ask about Malmö life-science startup ecosystem and what incubator roles usually require. | https://se.linkedin.com/in/annie-george-chandy-7b5a135 |
| Lund/Malmö life-science innovation leads | Nearby ecosystem contacts at LU Innovation, Medicon Village, SmiLe Venture Hub, and Ideon | Lund University ecosystem | Useful if no Medeon direct contact is available. | Estimated from public signals | Low | Ask what experience level is expected for incubator manager roles in Skåne. | Search result review |

### Coffee-chat message template

Hi, I am considering the Incubator Manager role at Medeon Science Park. My background is in product development, startup founding, LU Innovation, and health/wellbeing product concepts. I would value a short 15-minute conversation about what makes someone successful in life-science incubation in Malmö. Thank you.

### Coffee-chat questions

- How senior are incubator manager roles usually in the Skåne life-science ecosystem?
- Is Swedish normally required for coaching startups and working with regional partners?
- What experience would make a founder profile credible for this kind of role?

## 10. Questions to ask the employer

### Salary and salary review
- What is the salary range for this position?
- Is there an annual salary review?

### Collective agreement / contract
- Is the role covered by a collective agreement?
- What probation and notice periods apply?

### Pension and insurance
- What occupational pension and insurance package is included?
- Is there wellness allowance or occupational healthcare?

### Overtime and working hours
- What are normal weekly hours?
- Are evening events or investor/startup events expected, and how is overtime handled?

### Manager and team support
- Who supports the Incubator Manager day to day?
- How many coaches or program staff are currently connected to the incubator?

### Learning and development
- Would there be onboarding in life-science regulation, funding, and medtech commercialization?

### Remote/hybrid work
- Is the role fully on-site at Medeon or partly hybrid?

### Role expectations
- What are the top three first-year goals?
- What does success look like after 6 and 12 months?

### Cross-border Denmark/Sweden issues
- Not central if Feiyu lives and works in Sweden. If any Denmark travel or remote work is added later, verify tax, pension, social insurance, and travel rules separately.

## 11. Contract items to check before signing

| Contract item | What to check | Risk if unclear |
|---|---|---|
| Job title and scope | Whether the title includes full incubator ownership from day one. | Too much responsibility without support. |
| Salary | Monthly gross salary and review timing. | Underpayment for senior responsibility. |
| Collective agreement | Whether Swedish collective agreement terms apply. | Weak pension/overtime clarity. |
| Pension and insurance | Occupational pension and insurance levels. | Lower total compensation. |
| Working hours | Events, evening work, and flex/overtime rules. | Hidden workload. |
| Language requirement | English vs Swedish/Scandinavian expectations. | Eligibility risk. |
| Team support | Number of coaches and operational staff. | Role may be too broad for one person. |
| Probation and notice | Probation and termination terms. | Planning risk. |

## 12. Candidate-friendly summary

This is a very attractive role on paper because it connects directly to Feiyu's real experience: founding SensoryWind, getting support from LU Innovation and Almi, developing prototypes, validating with users, and thinking about commercialization. It is also in Malmö, which is practical from Lund.

The main caution is seniority. This is not just a startup-support assistant role. Medeon describes overall responsibility for the incubator, financing efforts, structure, business coaches, partners, and CEO reporting. Feiyu should apply only with a confident story and should quickly verify whether they are open to a high-potential founder profile rather than an already experienced incubator leader.

## 13. Final recommendation

- Final recommendation: Continue but verify key issues
- Main reason: Strong legitimacy and strategic fit, but likely seniority and language expectations need verification.
- What would improve the recommendation: English accepted for daily work, clear support team, openness to founder profile, fair salary, and realistic first-year goals.
- What would make the recommendation worse: professional Swedish requirement, expectation of many years managing incubators, low salary for broad responsibility, or little support from CEO/team.
- Next 3 actions:
  - Apply quickly if still open, because the deadline signal is May 26.
  - Frame SensoryWind, LU Innovation, funding, validation, and commercialization as the core fit story.
  - Ask language, seniority, support team, salary, collective agreement, and first-year goals before investing too much time.

## 14. Sources

- Medeon Incubator Manager role page: https://www.medeon.se/stories-news/blog/incubator-manager/
- Medeon Who We Are page: https://www.medeon.se/about-us/who-we-are/
- Medeon Owners & Board page: https://www.medeon.se/about-us/owners-board/
- Medicon Village LinkedIn job roundup mentioning deadline: https://se.linkedin.com/company/mediconvillage
- Unionen business manager salary benchmark: https://www.unionen.se/rad-och-stod/om-lon/marknadsloner/business-manager

## 15. Research metadata

- Date researched: 2026-05-24
- Company name: Medeon Science Park
- Position name: Incubator Manager
- Country: Sweden
- City/region: Malmö
- Job ad URL: https://www.medeon.se/stories-news/blog/incubator-manager/
- Candidate level: senior-leaning stretch
- Field: life science incubation, startup support, innovation, commercialization, business development
- Candidate lives in: Sweden
- Work location: Sweden
- Cross-border Sweden/Denmark issues apply: No
`,
};

function makeFallbackReport(job) {
  return `# Company Job Validation Report

## 1. Executive summary

- Company: ${job.company || "Unknown company"}
- Position: ${job.title || "Unknown position"}
- Country: Not verified
- City/region: ${job.location || "Not specified"}
- Candidate level: Not verified
- Field: ${job.sourceType === "digest" ? "Digest job; field requires validation" : "Job report"}
- Overall recommendation: Continue but verify key issues
- Overall score: Not scored
- Parent-friendly summary: This report was auto-created during website export because the job score is ${job.score}, which meets the high-fit threshold. The core job appears promising from the dashboard score, but a full company/job validation pass with current sources is still required before relying on this report.

## 2. Scorecard

| Area | Score 1-5 | Evidence status | Confidence | Explanation |
|---|---:|---|---|---|
| Company legitimacy | 3 | Must ask employer | Low | Not researched during this automated fallback. |
| Financial stability | 3 | Must ask employer | Low | Not researched during this automated fallback. |
| Role clarity | 3 | Estimated from public signals | Low | Based only on existing dashboard data. |
| Candidate-role fit | 4 | Estimated from public signals | Medium | The job score is ${job.score}, so the original scoring considered it a strong fit. |
| Learning potential | 3 | Must ask employer | Low | Not researched during this automated fallback. |
| Manager/team support signals | 3 | Must ask employer | Low | Not researched during this automated fallback. |
| Salary fairness | 3 | Must ask employer | Low | Salary was not benchmarked in this fallback report. |
| Benefits clarity | 2 | Must ask employer | Low | Benefits are not available in dashboard data. |
| Contract clarity | 2 | Must ask employer | Low | Contract terms are not available in dashboard data. |
| Work-life balance signals | 3 | Must ask employer | Low | Workload signals are not available in dashboard data. |
| Cross-border complexity | 3 | Must ask employer | Low | Location and residence implications require validation. |
| Overall opportunity quality | 3 | Estimated from public signals | Low | Promising but not yet validated. |

## 3. Public facts found

| Item | Finding | Evidence status | Confidence | Source |
|---|---|---|---|---|
| Dashboard score | The website dashboard gives this job a fit score of ${job.score}. | Estimated from public signals | Medium | Local website data |
| Application URL | ${job.applicationUrl || "No application URL available."} | Estimated from public signals | Low | Local website data |
| Summary | ${job.summary || "No summary available."} | Estimated from public signals | Low | Local website data |

## 4. Estimated signals

| Area | Estimate | Reasoning | Confidence | How to verify |
|---|---|---|---|---|
| Candidate fit | Potentially strong | Score is at or above the ${THRESHOLD} threshold. | Medium | Run the full company-job-validator workflow with current sources. |
| Main risk | Validation missing | This fallback does not replace current-source research. | High | Research employer, salary, reviews, role status, and language requirements. |

## 5. Salary benchmark

- Likely salary range: Not researched.
- Sources used: Local website data only.
- Offered salary assessment: Unknown.
- Caveats: A real salary benchmark must use current local sources.
- Negotiation notes: Ask employer for salary range, pension, benefits, overtime, and contract terms.

| Salary item | Finding | Evidence status | Confidence | Source / note |
|---|---|---|---|---|
| Published salary | Not verified. | Must ask employer | Low | Run full validation. |

## 6. Red flags

| Red flag | Evidence | Severity | What to ask or verify |
|---|---|---|---|
| Full validation missing | This is an automated fallback report. | Medium | Run company/job validation before applying or accepting. |

## 7. Green flags

| Green flag | Evidence | Why it matters |
|---|---|---|
| High fit score | Score is ${job.score}. | Indicates strong preliminary alignment. |

## 8. Missing information

| Missing item | Why it matters | Who to ask | Suggested question |
|---|---|---|---|
| Company legitimacy and stability | Needed before applying seriously. | Research / employer | "Can we verify the company, role status, and business health?" |
| Salary and benefits | Determines fairness. | Employer | "What is the salary range and benefits package?" |
| Language and work authorization | Determines eligibility. | Employer | "Is English sufficient for daily work?" |

## 9. Potential LinkedIn connectors

Not researched in this automated fallback.

## 10. Questions to ask the employer

- What is the salary range?
- Is English sufficient for daily work?
- What are the first 3-6 month expectations?
- Who manages and mentors this role?
- What contract, pension, insurance, and overtime terms apply?

## 11. Contract items to check before signing

| Contract item | What to check | Risk if unclear |
|---|---|---|
| Salary | Gross monthly salary and review date. | Underpayment. |
| Pension/benefits | Pension, insurance, vacation, wellness. | Weak total compensation. |
| Working hours | Overtime and flexibility. | Hidden workload. |
| Role scope | Responsibilities and first-year goals. | Misaligned expectations. |

## 12. Candidate-friendly summary

This job is promising because it scored ${job.score}, but the deep report still needs real research. Treat it as a reminder to run the full company-job validation workflow before making a decision.

## 13. Final recommendation

- Final recommendation: Continue but verify key issues
- Main reason: High fit score but missing current-source validation.
- What would improve the recommendation: full company research, salary benchmark, language verification, and clear manager support.
- What would make the recommendation worse: closed role, Swedish/Danish must-have language requirement, poor salary, or weak contract terms.
- Next 3 actions:
  - Run the full company-job validation workflow.
  - Verify job status and language requirements.
  - Ask salary, benefits, and manager-support questions.

## 14. Sources

- Local website data: data/jobs.json
- Application URL: ${job.applicationUrl || "Not available"}

## 15. Research metadata

- Date researched: ${new Date().toISOString().slice(0, 10)}
- Company name: ${job.company || "Unknown"}
- Position name: ${job.title || "Unknown"}
- Country: Not verified
- City/region: ${job.location || "Not specified"}
- Job ad URL: ${job.applicationUrl || "Not available"}
- Candidate level: Not verified
- Field: Not verified
- Candidate lives in: Sweden
- Work location: Not verified
- Cross-border Sweden/Denmark issues apply: Must verify
`;
}

async function main() {
  const data = JSON.parse(await fs.readFile(DATA_FILE, "utf8"));
  if (!Array.isArray(data.jobs)) {
    throw new Error("data/jobs.json must contain a jobs array.");
  }

  let updated = 0;
  for (const job of data.jobs) {
    if (Number(job.score) < THRESHOLD) continue;
    job.files = job.files || {};
    if (typeof job.files.deepReport === "string" && job.files.deepReport.trim()) continue;
    job.files.deepReport = SEEDED_REPORTS[job.slug] || makeFallbackReport(job);
    updated += 1;
  }

  data.exportedAt = new Date().toISOString();
  await fs.writeFile(DATA_FILE, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Updated ${updated} high-score deep report${updated === 1 ? "" : "s"}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
