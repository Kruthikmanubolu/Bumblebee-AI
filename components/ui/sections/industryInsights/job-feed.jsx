"use client";
import { useState, useEffect } from "react";
import { fetchJobs } from "@/actions/fetch-jobs";
import { Button } from "@/components/ui/shared/shadcn/button";
import { Input } from "@/components/ui/shared/shadcn/input";
import { toast } from "sonner";

const JobFeed = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    query: "",
    location: "",
    salary: "",
    company: "",
    timeRange: "all",
  });

  const handleFetch = async () => {
    setLoading(true);
    try {
      const result = await fetchJobs({
        query: filters.query,
        location: filters.location,
        minSalary: filters.salary,
        company: filters.company,
        timeRange: filters.timeRange,
      });
      setJobs(result);
    } catch {
      toast.error("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <Input
          placeholder="Industry or role"
          value={filters.query}
          onChange={(e) => setFilters({ ...filters, query: e.target.value })}
          className="w-44"
        />
        <Input
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="w-40"
        />
        <Input
          placeholder="Min Salary"
          type="number"
          value={filters.salary}
          onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
          className="w-32"
        />
        <Input
          placeholder="Company"
          value={filters.company}
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
          className="w-40"
        />
        <select
          value={filters.timeRange}
          onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
          className="border rounded-md p-2"
        >
          <option value="all">All Time</option>
          <option value="past_week">Past Week</option>
          <option value="past_24h">Past 24 Hours</option>
          <option value="past_hour">Past Hour</option>
        </select>
        <Button onClick={handleFetch} disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>

      {/* Job Results */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 border rounded-xl shadow-sm bg-muted"
          >
            <h4 className="font-semibold">{job.title}</h4>
            <p className="text-sm text-muted-foreground">
              {job.company?.display_name || "Unknown Company"}
            </p>
            <p className="text-sm">{job.location?.display_name}</p>
            <a
              href={job.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View Job
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobFeed;
