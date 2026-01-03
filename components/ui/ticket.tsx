import React from 'react';
import styles from '@/styles/ticket.module.css';


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
    <div className={`${styles.ticketCard} bg-navFooter text-white rounded-3xl cursor-pointer transition-colors duration-300 hover:[&>*]:!text-black`}>
        {/* Top section */}
        <div className="px-6 py-4">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-300 group-hover:!text-black text-sm">{description}</p>
        </div>
        {/* Dashed divider */}
        <div className={styles.divider}></div>
        {/* Bottom section */}
        <div className="px-6 py-4 flex justify-between items-center">
            <span className="font-semibold text-lg">Ticket Price</span>
            <span className="text-yellow-400 font-bold text-xl">{price}</span>
        </div>
    </div>
</div>
    );
};

export default TicketCard;