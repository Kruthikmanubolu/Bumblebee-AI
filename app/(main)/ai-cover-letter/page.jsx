import { Button } from "@/components/ui/shared/shadcn/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import CoverLetterList from "./_components/cover-letter-list";
import { getCoverLetters } from "@/actions/cover-letter";

const AICoverLetterPage = async () => {
  const coverLetters = await getCoverLetters();
  return (
    <div className="container px-6 py-6">
      <div className="flex flex-col md:flex-row gap-2 md:items-center justify-start md:justify-between mb-5">
        <h1 className="text-3xl md:text-6xl font-bold gradient-title">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>
      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
};

export default AICoverLetterPage;
