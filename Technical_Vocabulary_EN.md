# Technical Vocabulary for Leaders

> You don't need to use these terms yourself. You need to know what's being said when your engineers use them — and what to ask next.

---

## How to use this cheat sheet

Each term follows the same format:

- **What it means** — plain-language explanation
- **Think of it as** — a familiar analogy
- **When you'll hear it** — the situation where it comes up
- **Ask this** — questions that show understanding without requiring deep expertise

---

## 1 · "The system is slow"

Your team is investigating performance issues. These are the terms you'll hear.

### Cache

- **What it means:** A copy of frequently accessed data stored in fast memory, so the system doesn't have to fetch it from the original source every time.
- **Think of it as:** A sticky note on your desk so you don't open the filing cabinet every time someone asks the same question.
- **When you'll hear it:** "We need to add caching" — the system is doing the same expensive work over and over.
- **Ask this:**
  - What data are we caching?
  - How often does the source data change?
  - What happens when the cache has stale (outdated) data?

### Latency

- **What it means:** The time between a user's action (click, request) and the system's response. Measured in milliseconds (ms).
- **Think of it as:** The wait time at a service counter — from the moment you ask to the moment you get an answer.
- **When you'll hear it:** "Latency spiked after the last deployment" — the system got slower.
- **Ask this:**
  - What's our current latency vs. what's acceptable?
  - Which part of the system is causing the delay?
  - When did it start — can we correlate it with a change?

### p95 / p99 (Percentiles)

- **What it means:** The response time that 95% (or 99%) of requests are faster than. If p95 = 800ms, then 95 out of 100 users wait less than 0.8 seconds.
- **Think of it as:** "Almost everyone gets served in under X seconds." The p95 catches the slow tail that averages hide.
- **When you'll hear it:** "Our p95 latency went from 200ms to 800ms" — the slow cases are getting worse even if averages look fine.
- **Ask this:**
  - What's our p95 vs. our p50 (median)? A big gap means some users have a much worse experience.
  - Which endpoint or page is the bottleneck?
  - Is it getting worse over time?

### Query optimization

- **What it means:** Making database lookups faster — by restructuring how the database searches for data, adding indexes (think: table of contents), or reducing the amount of data requested.
- **Think of it as:** Instead of reading an entire book to find one fact, you use the index at the back.
- **When you'll hear it:** "We need to optimize this query, it's doing a full table scan" — the database is reading every single row to find what it needs.
- **Ask this:**
  - How much time does this save?
  - How many users does it affect?
  - Is this a one-time fix or will it need ongoing tuning?

### CDN (Content Delivery Network)

- **What it means:** A network of servers distributed around the world that serve copies of your content (images, files, pages) from the location nearest to the user.
- **Think of it as:** Instead of one central warehouse, you have local pickup points in every city.
- **When you'll hear it:** "We should put static assets behind a CDN" — users far from the server are experiencing slow load times.
- **Ask this:**
  - What content are we serving through the CDN?
  - What's the expected improvement in load time?
  - What's the cost model?

---

## 2 · "We need to scale"

The system can't handle the growing number of users or requests. These are the terms you'll hear.

### Load balancer

- **What it means:** A system that distributes incoming requests across multiple servers so no single server gets overwhelmed.
- **Think of it as:** A receptionist who sends each visitor to whichever office is least busy.
- **When you'll hear it:** "We need a load balancer in front of the service" — one server can't handle all the traffic alone.
- **Ask this:**
  - How many servers are behind it?
  - What happens if one server goes down?
  - What's our peak traffic and can it handle that?

### Horizontal scaling vs. Vertical scaling

- **What it means:** Horizontal scaling = adding more servers. Vertical scaling = making one server bigger (more CPU, RAM).
- **Think of it as:** Horizontal = opening more checkout lanes. Vertical = making one cashier work faster.
- **When you'll hear it:** "We should scale horizontally" — they want to add capacity by adding machines, not upgrading one machine.
- **Ask this:**
  - Can our application actually run on multiple servers? (Not all can.)
  - What's the cost per additional server?
  - How quickly can we add or remove capacity?

### Auto-scaling

- **What it means:** The system automatically adds or removes servers based on current demand. More traffic = more servers. Less traffic = fewer servers.
- **Think of it as:** A store that automatically opens more checkout lanes when the queue gets long and closes them when it's quiet.
- **When you'll hear it:** "We've set up auto-scaling rules" — capacity adjusts automatically instead of someone manually adding servers.
- **Ask this:**
  - What triggers the scaling? (CPU usage, request count, response time?)
  - How fast does it react?
  - What's the maximum it can scale to, and what does that cost?

### Container (Docker)

- **What it means:** A lightweight, portable package that contains the application and everything it needs to run. Works the same everywhere — developer laptop, test server, production.
- **Think of it as:** A shipping container. Standard size, works on any truck/ship/crane. The contents don't matter; the interface is the same.
- **When you'll hear it:** "We containerized the application" — they packaged it so it runs consistently everywhere.
- **Ask this:**
  - Are all our services containerized or just some?
  - Who manages the container infrastructure?
  - What's our deployment process with containers?

### Kubernetes (K8s)

- **What it means:** A platform that manages containers at scale — decides where each container runs, restarts crashed ones, handles networking between them.
- **Think of it as:** An office manager who assigns desks, moves people when a floor is full, and replaces anyone who doesn't show up.
- **When you'll hear it:** "We're running on Kubernetes" — the team uses it to manage their containerized applications.
- **Ask this:**
  - Who operates our Kubernetes cluster? (In-house, managed service, cloud provider?)
  - How many services are running on it?
  - What's the operational overhead?

---

## 3 · "Something broke in production"

There's an incident. The system is down or behaving incorrectly. These are the terms you'll hear.

### Rollback

- **What it means:** Reverting the system to the previous working version of the software. Undoing the last deployment.
- **Think of it as:** Pressing Ctrl+Z on a deployment.
- **When you'll hear it:** "We need to rollback the last release" — the new version broke something.
- **Ask this:**
  - How long does a rollback take?
  - Is it automated or does someone do it manually?
  - Does it affect data that was written since the deployment?

### Hotfix

- **What it means:** An emergency fix deployed outside the normal release cycle. Goes directly to production to resolve a critical issue.
- **Think of it as:** An emergency repair — you fix the leak now, not during the next scheduled maintenance.
- **When you'll hear it:** "We're pushing a hotfix" — there's a critical bug that can't wait for the next planned release.
- **Ask this:**
  - What exactly does it fix?
  - Has it been tested?
  - Does it go through the normal review process or is it bypassing it?

### Post-mortem (Incident review)

- **What it means:** A structured review held after an incident to understand what happened, why, and how to prevent it. Not about blame — about learning.
- **Think of it as:** A flight investigation after a near-miss — the goal is to improve the system, not punish the pilot.
- **When you'll hear it:** "We'll do a post-mortem on Friday" — the team will formally review the incident.
- **Ask this:**
  - What was the root cause?
  - What prevented us from catching it earlier?
  - What's the concrete action item, and who owns it?

### Monitoring & Alerting

- **What it means:** Monitoring = systems that continuously watch your application's health (response times, error rates, resource usage). Alerting = notifications triggered when something crosses a threshold.
- **Think of it as:** Security cameras (monitoring) connected to alarms (alerting).
- **When you'll hear it:** "We didn't have monitoring on that service" — nobody was watching, so nobody noticed until users complained.
- **Ask this:**
  - What are we monitoring? What are we NOT monitoring?
  - Who gets alerted, and how fast?
  - When was the last time an alert caught something before users noticed?

### SLA / SLO

- **What it means:** SLA (Service Level Agreement) = a contractual promise of uptime/performance to customers. SLO (Service Level Objective) = an internal target. SLA is the contract, SLO is the goal.
- **Think of it as:** SLO = "we aim to deliver in 2 days." SLA = "we guarantee delivery in 3 days or your money back."
- **When you'll hear it:** "We're at risk of breaching our SLA" — the system's reliability is dropping below what was promised.
- **Ask this:**
  - What's our current uptime vs. our SLA commitment?
  - How much error budget do we have left this month?
  - What's the business impact of a breach?

---

## 4 · "We're modernizing"

The team is dealing with old systems, accumulated shortcuts, or moving to new technology. These are the terms you'll hear.

### Technical debt

- **What it means:** The accumulated cost of shortcuts, quick fixes, and deferred improvements in the codebase. Like financial debt: it accumulates interest in the form of slower development and more bugs.
- **Think of it as:** Deferred maintenance on a building. Every month you skip maintenance, the repair bill grows.
- **When you'll hear it:** "We have a lot of tech debt in this module" — the code was written quickly and now every change takes longer than it should.
- **Ask this:**
  - How much time does it cost us per sprint?
  - What's the risk if we keep ignoring it?
  - What's the minimum we can do to stop it from getting worse?

### Refactoring

- **What it means:** Restructuring existing code to make it cleaner, faster, or easier to maintain — without changing what it does. The behavior stays the same; the internal structure improves.
- **Think of it as:** Reorganizing a messy warehouse. Everything is still there, but now you can find things and work faster.
- **When you'll hear it:** "We need to refactor the payment module" — the code works but it's tangled and every change risks breaking something.
- **Ask this:**
  - What's currently broken or slow because of this?
  - How do we know we haven't changed the behavior? (Tests?)
  - Can we do it incrementally or does it require a big-bang rewrite?

### Migration

- **What it means:** Moving from one system, technology, or platform to another. Could be a database migration, cloud migration, or framework migration.
- **Think of it as:** Moving offices — everything needs to work during and after the move. The hardest part isn't the new office; it's moving without shutting down.
- **When you'll hear it:** "We're planning the database migration for Q2" — they're moving data or systems to a new platform.
- **Ask this:**
  - What's the rollback plan if it goes wrong?
  - Can we do it in phases, or is it all-or-nothing?
  - What's the definition of "done"?

### Legacy system

- **What it means:** An older system that's still in use, often because it works and too many things depend on it. Usually harder to change, harder to find people who understand it, and harder to integrate with modern tools.
- **Think of it as:** The old elevator in the building. It still works, but parts are hard to find, the manual is lost, and nobody wants to be the one who "upgrades" it.
- **When you'll hear it:** "The legacy system doesn't support that" — the team hit a wall because the old system wasn't designed for what's now being asked of it.
- **Ask this:**
  - What depends on this system? What breaks if it breaks?
  - Is there a plan to replace it, or do we wrap it?
  - Who still understands how it works?

### API wrapper

- **What it means:** A new, modern interface built on top of an old system. The old system stays untouched; the wrapper translates between the old format and the new one.
- **Think of it as:** A universal adapter plug. The old socket doesn't change, but now modern devices can connect to it.
- **When you'll hear it:** "We'll build a REST wrapper around the SOAP API" — they want to keep the old system but give it a modern face.
- **Ask this:**
  - What happens when the old system changes?
  - Does the wrapper add latency?
  - Is this a temporary bridge or a long-term solution?

---

## 5 · "We're deploying a release"

Code is moving from development to production. These are the terms you'll hear.

### CI/CD pipeline

- **What it means:** CI (Continuous Integration) = every code change is automatically tested when submitted. CD (Continuous Delivery/Deployment) = tested code is automatically prepared for or pushed to production. The pipeline is the automated sequence: build → test → deploy.
- **Think of it as:** An assembly line in a factory. Raw materials (code) go in one end, and a tested, packaged product comes out the other — automatically.
- **When you'll hear it:** "The pipeline is broken" — the automated build or test process failed, so no code can be deployed until it's fixed.
- **Ask this:**
  - How long does our pipeline take from commit to production?
  - What percentage of deployments succeed without manual intervention?
  - What breaks most often in the pipeline?

### Staging environment

- **What it means:** A copy of the production system used for final testing before a release goes live. Same configuration, similar data, but no real users.
- **Think of it as:** A dress rehearsal before opening night. Everything runs exactly like the real show, but the audience isn't there yet.
- **When you'll hear it:** "Let's test it on staging first" — they want to verify the change in a production-like environment before real users see it.
- **Ask this:**
  - How close is staging to production? (Same data? Same configuration?)
  - When was staging last updated?
  - Who has access to verify things on staging?

### Blue-green deployment

- **What it means:** Running two identical production environments. One ("blue") serves live traffic. The new version is deployed to the other ("green"). When ready, traffic is switched from blue to green. If something goes wrong, switch back instantly.
- **Think of it as:** Two identical stages. The audience watches one while you set up the next act on the other. When ready, you just redirect the spotlight.
- **When you'll hear it:** "We'll do a blue-green switch" — they want zero-downtime deployment with instant rollback capability.
- **Ask this:**
  - How fast can we switch back if something goes wrong?
  - Do both environments share the same database?
  - What's the additional infrastructure cost?

### Canary release

- **What it means:** Deploying a new version to a small percentage of users first (e.g., 5%), monitoring for problems, then gradually increasing to 100%.
- **Think of it as:** The canary in a coal mine. Send a small group first — if they're fine, it's safe for everyone.
- **When you'll hear it:** "Let's canary this to 10% first" — they don't want to risk all users at once.
- **Ask this:**
  - What percentage of users will see the new version first?
  - What metrics are we watching to decide if it's safe to continue?
  - How long do we wait before rolling out to everyone?

### Feature flag

- **What it means:** A switch in the code that lets you turn a feature on or off without deploying new code. Can target specific users, regions, or percentages.
- **Think of it as:** A light switch. The wiring (code) is already in place, but you choose when to flip the switch and who gets to see the light.
- **When you'll hear it:** "We'll put it behind a feature flag" — the code is deployed but hidden until you're ready to activate it.
- **Ask this:**
  - Who controls the flag? (Engineering only, or can product toggle it?)
  - What's the plan for removing old flags? (They accumulate and create complexity.)
  - Can we target specific customers or regions?

### Rollback strategy

- **What it means:** The pre-planned approach for reverting a deployment if it causes problems. Includes what triggers a rollback, who decides, and how long it takes.
- **Think of it as:** An evacuation plan. You hope you never need it, but when you do, everyone needs to know exactly what to do.
- **When you'll hear it:** "What's our rollback strategy for this release?" — someone is making sure there's a safety net.
- **Ask this:**
  - Is rollback automated or manual?
  - How long does it take?
  - Are there database changes that make rollback harder?

---

## 6 · "We're discussing architecture"

The team is making structural decisions about how the system is built. These are the terms you'll hear.

### Microservices vs. Monolith

- **What it means:** A monolith is one large application where everything runs together. Microservices split the system into small, independent services that each do one thing and communicate over the network.
- **Think of it as:** Monolith = one big restaurant where the same kitchen handles everything. Microservices = a food court where each stall specializes in one cuisine.
- **When you'll hear it:** "We should break this monolith into microservices" — the single application has become too large and slow to change.
- **Ask this:**
  - What's the specific problem we're solving by splitting? (Don't split just because it's trendy.)
  - Do we have the team and infrastructure to operate multiple services?
  - Can we start by extracting one piece rather than rewriting everything?

### API gateway

- **What it means:** A single entry point that sits in front of multiple backend services. It handles routing, authentication, rate limiting, and load balancing — so individual services don't have to.
- **Think of it as:** The reception desk of a building. All visitors check in at one place, and the receptionist directs them to the right floor and verifies they're allowed in.
- **When you'll hear it:** "We need an API gateway" — there are multiple services and they need a unified, secure front door.
- **Ask this:**
  - What does the gateway handle? (Auth, rate limiting, logging?)
  - Is it a single point of failure? What happens if it goes down?
  - Are we using a managed service or building our own?

### Event-driven architecture

- **What it means:** Instead of services calling each other directly (request → response), they communicate by publishing events ("something happened") that other services can listen for and react to.
- **Think of it as:** A bulletin board. Instead of tapping people on the shoulder, you post a note. Anyone interested reads it and acts on it — you don't need to know who or when.
- **When you'll hear it:** "We should make this event-driven" — the team wants services to be loosely connected so changes in one don't break others.
- **Ask this:**
  - What happens if an event is lost or processed twice?
  - How do we trace a request across multiple services?
  - Is this simpler or more complex than what we have now?

### Serverless

- **What it means:** You write code (functions), and the cloud provider runs it on demand. No servers to manage, no capacity to plan. You pay per execution, not per server.
- **Think of it as:** A taxi vs. owning a car. You only pay when you ride, and you don't worry about maintenance, insurance, or parking.
- **When you'll hear it:** "We could run this as a Lambda function" — the team wants to avoid managing infrastructure for something that runs occasionally.
- **Ask this:**
  - How often does this function run? (Serverless is cheap for occasional use, expensive for constant use.)
  - What's the cold start time? (First execution after idle can be slow.)
  - Does it lock us into one cloud provider?

### Service mesh

- **What it means:** A dedicated infrastructure layer that handles communication between microservices — including encryption, retries, load balancing, and observability — without changing the application code.
- **Think of it as:** The postal system for microservices. You drop a letter in the mailbox; the postal system handles routing, tracking, and delivery confirmation.
- **When you'll hear it:** "We're evaluating Istio/Linkerd" — the team wants to manage inter-service communication more reliably.
- **Ask this:**
  - How many services do we have? (A service mesh adds complexity — worth it at 10+ services, overkill at 3.)
  - What problem are we solving that we can't solve with simpler tools?
  - Who will operate it?

---

## 7 · "We're talking about security"

Security topics are coming up in a review, audit, or after an incident. These are the terms you'll hear.

### Authentication vs. Authorization

- **What it means:** Authentication = verifying *who you are* (login, password, fingerprint). Authorization = verifying *what you're allowed to do* (can this user access admin pages?).
- **Think of it as:** Authentication = showing your ID at the door. Authorization = checking if your name is on the guest list for the VIP area.
- **When you'll hear it:** "The user is authenticated but not authorized" — they logged in successfully, but they don't have permission for what they're trying to do.
- **Ask this:**
  - Where do we manage permissions? (Centrally or per service?)
  - How granular are our authorization rules?
  - When was the last access review?

### OAuth / SSO (Single Sign-On)

- **What it means:** OAuth is a protocol that lets users grant limited access to their data without sharing their password. SSO lets users log in once and access multiple systems without logging in again.
- **Think of it as:** OAuth = giving a valet your car key without giving them your house key. SSO = one master badge that opens every door in the building.
- **When you'll hear it:** "We'll integrate with SSO" — users should log in once (e.g., with their company account) and access everything.
- **Ask this:**
  - Which identity provider are we using? (Azure AD, Okta, Google?)
  - What happens if SSO goes down? Can users still access critical systems?
  - Which systems are integrated and which aren't?

### Encryption (at rest / in transit)

- **What it means:** Encryption at rest = data is encrypted when stored (database, disk). Encryption in transit = data is encrypted while being sent over the network (HTTPS, TLS).
- **Think of it as:** At rest = storing valuables in a safe. In transit = sending them in an armored truck.
- **When you'll hear it:** "Is the data encrypted at rest?" — usually during a security audit or compliance review.
- **Ask this:**
  - Is sensitive data (PII, payment info) encrypted both at rest and in transit?
  - Who manages the encryption keys?
  - Are there any unencrypted data flows we should be aware of?

### SSL / TLS certificate

- **What it means:** A digital certificate that enables encrypted (HTTPS) connections. TLS is the modern version of SSL. When a certificate expires, browsers show scary warnings and users can't access the site.
- **Think of it as:** The padlock icon in the browser. When it's missing or broken, users see "this connection is not secure."
- **When you'll hear it:** "The SSL certificate is expiring next week" — if not renewed, the website will show security warnings to every visitor.
- **Ask this:**
  - Is certificate renewal automated?
  - What's our process when a certificate expires unexpectedly?
  - Are all our public endpoints covered?

### Vulnerability / CVE

- **What it means:** A vulnerability is a weakness in software that can be exploited. A CVE (Common Vulnerabilities and Exposures) is a publicly known vulnerability with an ID number (e.g., CVE-2024-1234).
- **Think of it as:** A known defect in a lock model. Once it's published, anyone can learn how to pick it — so you need to replace the lock.
- **When you'll hear it:** "There's a critical CVE in our logging library" — a security flaw was discovered in software we depend on.
- **Ask this:**
  - How critical is it? (Is it actively being exploited?)
  - Do we have a patch available?
  - How quickly can we deploy the fix?

### Penetration test (Pentest)

- **What it means:** A controlled, authorized attack on your system to find security weaknesses before real attackers do. Usually performed by specialized security professionals.
- **Think of it as:** Hiring someone to try to break into your building — so you can find and fix the weak spots before a real burglar does.
- **When you'll hear it:** "The pentest report found three critical issues" — the security team tested the system and found vulnerabilities that need fixing.
- **Ask this:**
  - When was our last pentest?
  - What were the critical findings, and have they been fixed?
  - Is this a one-time test or do we do it regularly?

---

## 8 · "We're working with data"

Decisions about how data is stored, moved, and processed. These are the terms you'll hear.

### ETL (Extract, Transform, Load)

- **What it means:** A process that extracts data from one or more sources, transforms it (cleans, reformats, enriches), and loads it into a destination (data warehouse, reporting system).
- **Think of it as:** Collecting raw ingredients from different suppliers, preparing them in the kitchen, and serving the finished dish.
- **When you'll hear it:** "We need an ETL pipeline to feed the reporting system" — data from multiple sources needs to be combined and cleaned before it's useful.
- **Ask this:**
  - How often does the ETL run? (Real-time, hourly, nightly?)
  - What happens when it fails? (Is data lost, or can it retry?)
  - How long does it take to process?

### Data warehouse vs. Data lake

- **What it means:** A data warehouse stores structured, cleaned data organized for specific queries and reports. A data lake stores raw data in any format — structured, semi-structured, or unstructured — for later analysis.
- **Think of it as:** Warehouse = a well-organized library with cataloged books on shelves. Data lake = a storage unit where you throw everything in boxes, knowing you'll sort it later.
- **When you'll hear it:** "Should we build a data warehouse or a data lake?" — the team is deciding how to organize data for analytics.
- **Ask this:**
  - Who will use this data? (Analysts who need clean reports, or data scientists who need raw data?)
  - Do we know what questions we want to answer, or are we exploring?
  - What's the governance model? (Who ensures data quality?)

### Streaming vs. Batch processing

- **What it means:** Batch processing = data is collected over a period and processed all at once (e.g., nightly). Streaming = data is processed continuously as it arrives, in real-time or near real-time.
- **Think of it as:** Batch = mail delivery once a day. Streaming = instant messaging.
- **When you'll hear it:** "We need to move from batch to streaming" — the business needs data faster than once a day.
- **Ask this:**
  - Does the business actually need real-time, or is hourly/daily enough?
  - What's the cost and complexity difference?
  - What infrastructure do we need for streaming? (Kafka, Kinesis?)

### Schema

- **What it means:** The structure of a database — what tables exist, what columns they have, what data types are allowed, and how tables relate to each other.
- **Think of it as:** The blueprint of a filing cabinet. It defines which drawers exist, what labels they have, and what type of documents go in each one.
- **When you'll hear it:** "We need a schema migration" — the database structure needs to change (adding a column, changing a data type, creating a new table).
- **Ask this:**
  - Is this a breaking change? (Will existing data or applications stop working?)
  - Can we do it without downtime?
  - Has it been tested with production-scale data?

### GDPR / Data retention

- **What it means:** GDPR (General Data Protection Regulation) is the EU law governing how personal data is collected, stored, and deleted. Data retention = rules about how long data is kept before it must be deleted.
- **Think of it as:** GDPR = the rules about what personal documents a company can keep, why, and for how long. Data retention = the shredding schedule.
- **When you'll hear it:** "We need to check our data retention policy" — someone is asking whether we're keeping personal data longer than we're legally allowed to.
- **Ask this:**
  - What personal data do we store, and where?
  - Do we have automated deletion for data past its retention period?
  - Can we fulfill a "right to be forgotten" request? How long does it take?

---

## 9 · "We're testing"

The team is discussing quality assurance and testing strategy. These are the terms you'll hear.

### Unit test

- **What it means:** A test that checks one small piece of code (a function, a method) in isolation. Fast to run, catches logic errors early.
- **Think of it as:** Testing individual LEGO bricks before assembling them. Does each piece have the right shape and color?
- **When you'll hear it:** "We need better unit test coverage on this module" — too much code can break without anyone noticing.
- **Ask this:**
  - What's our current test coverage? (Percentage of code covered by tests.)
  - Are the critical business logic paths tested?
  - How long does the test suite take to run?

### Integration test

- **What it means:** A test that checks whether multiple components work correctly together — e.g., does the API correctly read from the database and return the right response?
- **Think of it as:** Testing that the LEGO bricks actually click together and the assembled structure stands up.
- **When you'll hear it:** "The integration tests are failing" — the individual pieces work, but something breaks when they're connected.
- **Ask this:**
  - What systems does this test cover? (API + database? Service A + Service B?)
  - How long do integration tests take to run?
  - Do they run in the CI/CD pipeline or only manually?

### End-to-end test (E2E)

- **What it means:** A test that simulates a real user's journey through the entire system — from clicking a button in the browser to the database and back. The most realistic but also slowest and most brittle.
- **Think of it as:** A mystery shopper who walks into the store, browses, buys something, and checks that the receipt is correct.
- **When you'll hear it:** "Our E2E tests are flaky" — the full-system tests sometimes pass and sometimes fail for unclear reasons.
- **Ask this:**
  - What user journeys do we cover with E2E tests?
  - How often do they fail for reasons unrelated to real bugs? (Flakiness.)
  - Are they blocking deployments?

### Regression

- **What it means:** When a new change accidentally breaks something that was previously working. "We introduced a regression" = we broke existing functionality.
- **Think of it as:** Fixing a leak in the kitchen and accidentally breaking the bathroom plumbing in the process.
- **When you'll hear it:** "This release introduced a regression in checkout" — something that worked before the deployment no longer works.
- **Ask this:**
  - What changed that caused this?
  - Why didn't our tests catch it?
  - How many users were affected before we noticed?

### Test coverage

- **What it means:** The percentage of code that is exercised by automated tests. 80% coverage means 80% of the code runs during testing.
- **Think of it as:** If your building has 100 rooms and the security guard checks 80 of them nightly, you have 80% coverage. The 20 unchecked rooms are your risk.
- **When you'll hear it:** "Our coverage dropped to 60%" — a lot of new code was added without corresponding tests.
- **Ask this:**
  - Is the coverage focused on critical paths or spread thin everywhere?
  - What's our target, and are we trending up or down?
  - Are there important areas with zero coverage?

### QA environment

- **What it means:** A dedicated environment where testers (QA = Quality Assurance) verify features before they go to production. Separate from development and production.
- **Think of it as:** A fitting room. You try on the clothes (test the features) before buying (deploying to production).
- **When you'll hear it:** "Let's deploy to QA and run the test suite" — the team wants to verify everything in a controlled environment.
- **Ask this:**
  - How close is QA to production? (Configuration, data volume, integrations?)
  - Is QA shared across teams? (Can one team's testing block another?)
  - How often is it refreshed with production-like data?

---

## 10 · "We're estimating work"

The team is planning and the conversation involves effort, scope, and priorities. These are the terms you'll hear.

### Spike (Technical spike)

- **What it means:** A time-boxed investigation to answer a technical question or reduce uncertainty before committing to a full implementation. The output is knowledge, not code.
- **Think of it as:** Sending a scout ahead before the army marches. The scout reports back on the terrain, and then you decide the route.
- **When you'll hear it:** "Let's do a spike first" — the team doesn't know enough to estimate, so they want to investigate before committing.
- **Ask this:**
  - What specific question are we trying to answer?
  - How long is the time box? (A spike should have a fixed end date.)
  - What's the decision we'll make based on the results?

### Proof of concept (PoC)

- **What it means:** A small, quick implementation to prove that an idea or technology works in practice — before investing in a full build.
- **Think of it as:** Building a model house before constructing the real one. You test the design, not the durability.
- **When you'll hear it:** "Let's build a PoC first" — the team wants to validate feasibility before committing full resources.
- **Ask this:**
  - What does "success" look like for this PoC?
  - What's the scope? (What's deliberately left out?)
  - What's the decision if the PoC fails?

### MVP (Minimum Viable Product)

- **What it means:** The smallest version of a product that delivers value to real users. Not a prototype — it's a real product, just with only the essential features.
- **Think of it as:** A restaurant that opens with a 5-item menu instead of 50. Real customers, real food, real feedback — but a deliberately limited offering.
- **When you'll hear it:** "What's the MVP for this feature?" — the team is trying to find the smallest useful version to ship first.
- **Ask this:**
  - What's included and what's explicitly out of scope?
  - How will we collect feedback from the first users?
  - What's the plan for iteration after the MVP?

### Story points

- **What it means:** A relative measure of effort and complexity used to estimate work. Not time — complexity. A "3-point story" is roughly 3× the effort of a "1-point story," but neither maps to specific hours.
- **Think of it as:** T-shirt sizing for work. Small, medium, large — not "this will take 4 hours." Teams calibrate what each size means for them.
- **When you'll hear it:** "This story is an 8, we should break it down" — the task is too complex to deliver in one piece.
- **Ask this:**
  - What does our team consider a "1" vs. a "5"? (Calibration varies by team.)
  - Are our estimates getting more accurate over time?
  - Is high uncertainty driving the estimate up? (If so, consider a spike.)

### Velocity

- **What it means:** The amount of work a team completes per sprint, measured in story points. Used for forecasting, not for judging productivity.
- **Think of it as:** Miles per tank of gas. It tells you how far you can go, not whether you're driving well.
- **When you'll hear it:** "Our velocity is 40 points per sprint" — the team consistently delivers about 40 points of work every two weeks.
- **Ask this:**
  - Is our velocity stable, or does it swing wildly? (Instability signals planning problems.)
  - What's our trend over the last 5 sprints?
  - Are we using velocity for forecasting or for pressure? (Only the first is healthy.)

### Definition of done (DoD)

- **What it means:** A shared checklist of what "done" means for any piece of work. Typically includes: code written, tests passing, code reviewed, documentation updated, deployed to staging.
- **Think of it as:** The final inspection checklist before a car leaves the factory. Every car must pass every check, regardless of model.
- **When you'll hear it:** "Is this really done-done?" — someone is questioning whether all the agreed quality steps were completed.
- **Ask this:**
  - Does our team have a written definition of done?
  - Does everyone on the team apply it consistently?
  - When was it last reviewed and updated?

---

## Quick reference card

| Situation | Key terms to know |
|-----------|-------------------|
| "It's slow" | cache, latency, p95, query optimization, CDN |
| "We need to scale" | load balancer, horizontal scaling, auto-scaling, container, Kubernetes |
| "Something broke" | rollback, hotfix, post-mortem, monitoring, SLA/SLO |
| "We're modernizing" | technical debt, refactoring, migration, legacy system, API wrapper |
| "We're deploying" | CI/CD pipeline, staging, blue-green, canary release, feature flag, rollback strategy |
| "Architecture decisions" | microservices vs. monolith, API gateway, event-driven, serverless, service mesh |
| "Security topics" | authentication vs. authorization, OAuth/SSO, encryption, SSL/TLS, vulnerability/CVE, pentest |
| "Working with data" | ETL, data warehouse vs. data lake, streaming vs. batch, schema, GDPR/retention |
| "We're testing" | unit test, integration test, E2E test, regression, test coverage, QA environment |
| "Estimating work" | spike, PoC, MVP, story points, velocity, definition of done |

---

## The pattern

You don't need to explain these terms to anyone. You need to:

1. **Recognize** the term when you hear it
2. **Understand** what problem it solves
3. **Ask** the right follow-up question

That's enough to be credible in any technical conversation.

---

*Part of the [Becoming a Technical Leader](https://mkovacik.github.io/Technical_leadership/) coaching series by Michal Kováčik.*
