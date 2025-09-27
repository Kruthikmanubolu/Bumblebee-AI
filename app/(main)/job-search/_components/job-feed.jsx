/* eslint-disable */
"use client";

import { useState, useEffect } from "react";
import { fetchJobs } from "@/actions/fetch-jobs";
import { Button } from "@/components/ui/shared/shadcn/button";
import { Input } from "@/components/ui/shared/shadcn/input";
import { Card, CardContent } from "@/components/ui/shared/shadcn/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/shared/shadcn/sheet";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Search, Filter, Briefcase, MapPin, Building2, Clock } from "lucide-react";

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
  const [sheetOpen, setSheetOpen] = useState(false);

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
      setJobs(result || []);
      if (result?.length === 0) toast("No jobs found — try adjusting filters.");
    } catch {
      toast.error("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const FiltersUI = (
    <div className="flex flex-col md:flex-row flex-wrap gap-3">
      <Input
        placeholder="Industry or Role"
        value={filters.query}
        onChange={(e) => setFilters({ ...filters, query: e.target.value })}
        className="w-full md:w-48"
      />
      <Input
        placeholder="Location"
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        className="w-full md:w-44"
      />
      <Input
        placeholder="Min Salary"
        type="number"
        value={filters.salary}
        onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
        className="w-full md:w-36"
      />
      <Input
        placeholder="Company"
        value={filters.company}
        onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        className="w-full md:w-44"
      />
      <select
        value={filters.timeRange}
        onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
        className="border border-gray-300 rounded-lg p-2 text-sm w-full md:w-auto dark:bg-gray-900 dark:border-gray-700"
      >
        <option value="all">All Time</option>
        <option value="past_week">Past Week</option>
        <option value="past_24h">Past 24 Hours</option>
        <option value="past_hour">Past Hour</option>
      </select>

      <Button
        onClick={() => {
          handleFetch();
          setSheetOpen(false);
        }}
        disabled={loading}
        className="flex items-center gap-2 w-full md:w-auto"
      >
        <Search className="w-4 h-4" />
        {loading ? "Searching..." : "Search"}
      </Button>
    </div>
  );

  return (
    <Card className="py-10 border-none shadow-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <CardContent>
        <div className="flex flex-col mb-8 gap-4">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary" />
            Live Job Feed
          </h2>

          {/* Desktop Filters */}
          <div className="hidden md:flex">{FiltersUI}</div>

          {/* Mobile Filter Sheet */}
          <div className="md:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Jobs</SheetTitle>
                </SheetHeader>
                {FiltersUI}
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Job Results */}
        {loading ? (
          <p className="text-center text-gray-500">Fetching jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>No jobs found. Try adjusting your filters.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <motion.div
                key={job.id}
                whileHover={{ scale: 1.02 }}
                className="p-5 border rounded-xl shadow-md bg-white dark:bg-gray-800 transition-all hover:shadow-lg"
              >
                <h4 className="font-semibold text-lg mb-1">{job.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {job.company?.display_name || "Unknown Company"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location?.display_name || "Remote"}
                </p>
                <a
                  href={job.redirect_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-sm font-medium text-primary hover:underline"
                >
                  View Job →
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobFeed;
