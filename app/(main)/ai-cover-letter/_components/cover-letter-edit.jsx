"use client";

import { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/shared/shadcn/button";
import { Save, Download, Edit, Monitor, Loader2 } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

export default function CoverLetterEdit({ initialContent }) {
  const [content, setContent] = useState(initialContent || "");
  const [mode, setMode] = useState("preview"); // 'preview' or 'edit'
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Replace this with your actual save function
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Cover letter saved successfully!");
    } catch (err) {
      toast.error("Failed to save cover letter.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("cover-letter-pdf");
      const opt = {
        margin: [15, 15],
        filename: "cover-letter.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF generation error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div data-color-mode="light" className="space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="space-x-2">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save
              </>
            )}
          </Button>
          <Button onClick={handleDownload} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </>
            )}
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => setMode(mode === "preview" ? "edit" : "preview")}
          >
            {mode === "preview" ? (
              <>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </>
            ) : (
              <>
                <Monitor className="h-4 w-4 mr-1" />
                Preview
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <MDEditor
          value={content}
          onChange={setContent}
          height={700}
          preview={mode}
        />
      </div>

      {/* Hidden printable area */}
      <div className="hidden">
        <div id="cover-letter-pdf">
          <MDEditor.Markdown
            source={content}
            style={{
              background: "white",
              color: "black",
              padding: "20px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
