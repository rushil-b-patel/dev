"use client";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ page, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;
    return (
        <div className="flex items-center gap-2">
            <button onClick={() => onPageChange(Math.max(0, page - 1))} disabled={page === 0} className="p-1 rounded text-app-muted hover:text-app-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer">
                <FiChevronLeft size={16} />
            </button>
            <span className="text-xs font-mono text-app-muted">{page + 1}/{totalPages}</span>
            <button onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))} disabled={page === totalPages - 1} className="p-1 rounded text-app-muted hover:text-app-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer">
                <FiChevronRight size={16} />
            </button>
        </div>
    );
}
