"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from "lucide-react";
import { updateReadingProgressAction } from "@/app/actions";

interface PDFReaderProps {
  pdfUrl: string;
  ebookId: string;
  initialPage?: number;
}

export default function PDFReader({
  pdfUrl,
  ebookId,
  initialPage = 1,
}: PDFReaderProps) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  // Update reading progress when page changes
  useEffect(() => {
    const updateProgress = async () => {
      const formData = new FormData();
      formData.append("ebook_id", ebookId);
      formData.append("current_page", currentPage.toString());
      formData.append("total_pages", totalPages.toString());

      try {
        await updateReadingProgressAction(formData);
      } catch (error) {
        console.error("Failed to update reading progress:", error);
      }
    };

    if (currentPage > 0) {
      updateProgress();
    }
  }, [currentPage, totalPages, ebookId]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  return (
    <div className="flex flex-col h-[80vh]">
      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm px-3 py-1 bg-white rounded border">
            {currentPage} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm px-2">{Math.round(zoom * 100)}%</span>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleRotate}>
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div className="flex justify-center">
          <div
            className="bg-white shadow-lg"
            style={{
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: "center",
              transition: "transform 0.2s ease",
            }}
          >
            {/* Simple PDF embed - in a real app, you'd use a proper PDF library like react-pdf */}
            <iframe
              src={`${pdfUrl}#page=${currentPage}&zoom=${zoom * 100}`}
              className="w-[800px] h-[1000px] border-0"
              title="PDF Reader"
              onLoad={(e) => {
                // In a real implementation, you'd extract total pages from the PDF
                // For now, we'll set a default
                setTotalPages(10);
              }}
            />
          </div>
        </div>
      </div>

      {/* Page Navigation */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="outline"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Halaman Sebelumnya
          </Button>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = parseInt(e.target.value);
                if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                }
              }}
              className="w-16 px-2 py-1 text-center border rounded"
            />
            <span className="text-sm text-gray-600">dari {totalPages}</span>
          </div>
          <Button
            variant="outline"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
          >
            Halaman Selanjutnya
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
