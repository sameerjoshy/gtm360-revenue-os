import React from 'react';
import { ExternalLink, BookOpen, Download } from 'lucide-react';

const CourseCard = ({ resource }) => {
    return (
        <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300"
        >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${resource.type === 'template' ? 'bg-green-100 text-green-600' : 'bg-indigo-100 text-indigo-600'
                }`}>
                {resource.type === 'template' ? <Download className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
            </div>

            <div>
                <h4 className="font-bold text-gray-900 group-hover:text-[var(--color-primary)] transition-colors flex items-center gap-2">
                    {resource.title}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h4>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {resource.valueProp}
                </p>
                <span className="inline-block mt-3 text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[var(--color-primary)]">
                    {resource.type === 'template' ? 'Download Resource' : 'Start Course'} →
                </span>
            </div>
        </a>
    );
};

export default CourseCard;
