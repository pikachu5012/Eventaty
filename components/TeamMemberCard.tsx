"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Linkedin, User, Mail } from "lucide-react";

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

    return (
        <div
            key={index}
            className="flex flex-col items-center group"
            onClick={() => setIsActive(!isActive)}
        >
            {/* Team Member Photo - Icon */}
            <div className="w-full aspect-square bg-card rounded-xl overflow-hidden border border-eventaty-gold/20 shadow-sm relative mb-3 cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/5 to-primary/10 transition-colors duration-300 group-hover:from-eventaty-gold/5 group-hover:to-eventaty-gold/10">
                    <User className="w-10 h-10 text-primary/20 group-hover:text-eventaty-gold/30 transition-all duration-500 transform group-hover:scale-110" />
                </div>
            </div>

            {/* Name and Socials */}
            <div className="relative flex flex-col items-center text-center">
                <h3 className="text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-eventaty-gold line-clamp-1">
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
                        className="text-primary/60 hover:text-eventaty-gold transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary/60 hover:text-secondary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Linkedin className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                        href={member.gmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary/60 hover:text-secondary transition-colors"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Mail className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
