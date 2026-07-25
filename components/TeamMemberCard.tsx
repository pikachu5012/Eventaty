"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

interface TeamMemberCardProps {
    member: {
        name: string;
        github: string;
        linkedin: string;
        gmail: string;
    };
    index: number;
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
    const [isActive, setIsActive] = useState(false);

    // Compute initials from name (e.g., "Ahmed Mohamed" -> "AM")
    const initials = member.name
        .split(" ")
        .map((part) => part.charAt(0))
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const bgGradients = [
        "from-violet-600 to-purple-600",
        "from-blue-600 to-indigo-600",
        "from-emerald-600 to-teal-600",
        "from-rose-600 to-pink-600",
        "from-amber-500 to-orange-600",
        "from-cyan-600 to-blue-600",
    ];

    const currentGradient = bgGradients[index % bgGradients.length];

    return (
        <div
            className="flex flex-col items-center group"
            onClick={() => setIsActive(!isActive)}
        >
            {/* Team Member Photo / Initial Avatar */}
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentGradient} shadow-md flex items-center justify-center mb-3 cursor-pointer transition-transform duration-300 group-hover:scale-105`}>
                <span className="text-xl font-extrabold text-white tracking-wider">
                    {initials}
                </span>
            </div>

            {/* Name and Socials */}
            <div className="relative flex flex-col items-center text-center">
                <h3 className="text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 line-clamp-1">
                    {member.name}
                </h3>
                <div
                    className={`flex items-center gap-3 mt-1.5 transform transition-all duration-300 ${isActive
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 md:opacity-0 md:group-hover:opacity-100 translate-y-1 md:group-hover:translate-y-0"
                        }`}
                >
                    <Link
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github className="w-4 h-4" />
                    </Link>
                    <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Linkedin className="w-4 h-4" />
                    </Link>
                    <Link
                        href={member.gmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Mail className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
