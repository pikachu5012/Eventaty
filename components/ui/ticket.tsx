import React from 'react';
import styles from '@/styles/ticket.module.css';
import SpotlightCard from '../SpotlightCard/SpotlightCard';


interface TicketCardProps {
    title: string;
    description: string;
    price: string;
    className?: string;
}

const TicketCard: React.FC<TicketCardProps> = ({
    title,
    description,
    price,
    className = ''
}) => {
    return (
        <div className="w-full max-w-sm group">
            <SpotlightCard className={`${styles.ticketCard} bg-white dark:bg-navFooter border border-gray-200 dark:border-transparent text-slate-800 dark:text-white rounded-3xl cursor-pointer transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] ${className}`}>
                {/* Top section */}
                <div className="px-6 py-4 relative z-10">
                    <h3 className="font-semibold text-lg mb-2 text-slate-800 dark:text-white">{title}</h3>
                    <p className="text-slate-500 dark:text-gray-300 text-sm line-clamp-2">{description}</p>
                </div>
                {/* Dashed divider */}
                <div className={`${styles.divider} relative z-10`}></div>
                {/* Bottom section */}
                <div className="px-6 py-4 flex justify-between items-center relative z-10">
                    <span className="font-semibold text-sm text-slate-500 dark:text-gray-300">Ticket Price</span>
                    <span className="text-violet-600 dark:text-violet-400 font-bold text-xl">{price}</span>
                </div>
            </SpotlightCard>
        </div>
    );
};

export default TicketCard;