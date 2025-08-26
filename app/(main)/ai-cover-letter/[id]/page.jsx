import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/shared/shadcn/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";
import CoverLetterEdit from "../_components/cover-letter-edit"; // <-- import the edit component

export default async function EditCoverLetterPage({ params, searchParams }) {
  const { id } = params;
  const coverLetter = await getCoverLetter(id);

  // Assume ?edit=true in URL enables edit mode
  const isEditing = searchParams?.edit === "true";

  return (
    <div className="container px-6 py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/ai-cover-letter">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-3xl md:text-6xl font-bold gradient-title mb-6">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>

      {isEditing ? (
        <CoverLetterEdit initialContent={coverLetter?.content} id={id} />
      ) : (
        <CoverLetterPreview content={coverLetter?.content} />
      )}
    </div>
  );
}
