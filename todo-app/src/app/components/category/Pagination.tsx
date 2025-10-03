/**
 * Pagination component for navigating between pages of tasks.
 * Renders page number buttons and handles page changes.
 *
 * @module Pagination
 */

import { StepBack, StepForward } from "lucide-react";

/**
 * Props for Pagination component.
 * @typedef {Object} PaginationProps
 * @property {number} currentPage - The currently selected page.
 * @property {number} totalPages - The total number of pages.
 * @property {(page: number) => void} onPageChange - Callback to change the page.
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * Pagination navigation component.
 *
 * @param {PaginationProps} props - Props for the component.
 * @returns {JSX.Element} The rendered pagination controls.
 */
export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  
  /**
   * Computes the list of visible page numbers.
   * Shows 2 pages before and after the current page.
   */
  const pageNumbers = [];
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
      
      <button
        className="p-2 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <StepBack />
      </button>

      {currentPage > 3 && (
        <>
          <button
            className="px-3 py-1 rounded-xl border border-white/30 bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/70 transition"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {currentPage > 4 && <span className="px-2 text-gray-400">...</span>}
        </>
      )}

      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`px-3 py-1 rounded-xl border transition
            ${num === currentPage
              ? "bg-white text-sky-700 border-sky-300 shadow-md"
              : "bg-white/50 text-gray-700 border-white/30 backdrop-blur-sm hover:bg-white/70"}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span className="px-2 text-gray-400">...</span>}
          <button
            className="px-3 py-1 rounded-xl border border-white/30 bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/70 transition"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className="p-2 rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm text-gray-700 hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <StepForward />
      </button>
    </div>
  );
}
