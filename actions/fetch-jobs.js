// actions/fetch-jobs.js
"use server";

export async function fetchJobs({ query, location, minSalary, company, timeRange }) {
  const APP_ID = process.env.ADZUNA_APP_ID;
  const APP_KEY = process.env.ADZUNA_APP_KEY;

  const url = new URL(`https://api.adzuna.com/v1/api/jobs/us/search/1`);
  url.searchParams.set("app_id", APP_ID);
  url.searchParams.set("app_key", APP_KEY);
  url.searchParams.set("results_per_page", "20");

  if (query) url.searchParams.set("what", query);
  if (location) url.searchParams.set("where", location);
  if (minSalary) url.searchParams.set("salary_min", minSalary);
  if (company) url.searchParams.set("company", company);

  // Map dropdown values to Adzuna's max_days_old
  if (timeRange && timeRange !== "all") {
    const daysMap = { "past_week": 7, "past_24h": 1 };
    if (daysMap[timeRange]) {
      url.searchParams.set("max_days_old", daysMap[timeRange]);
    }
  }

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json();

  // Filter for past hour on client side
  if (timeRange === "past_hour") {
    const now = Date.now();
    return (data.results || []).filter(job => {
      const posted = new Date(job.created).getTime();
      return (now - posted) <= 60 * 60 * 1000;
    });
  }

  return data.results || [];
}
