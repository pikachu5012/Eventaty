
export interface IEventFiltersProps {
	selectedCategory: string;
	setSelectedCategory: (category: string) => void;
	location: string;
	setLocation: (location: string) => void;
	date: string;
	setDate: (date: string) => void;
	onClear: () => void;
}

export interface IEvent {
	id: string;
	title: string;
	description: string;
	date: string;
	time: string;
	location: string;
	price: number;
	image: string;
	category: string;
	isFeatured?: boolean;
}
export interface IVenue {
	id: string;
	name: string;
	location: string;
	address: string;
	city: string;
	capacity: number;
	image: string;
	description: string;
	facilities: string[];
	latitude: number;
	longitude: number;
	isFeatured?: boolean;
	upcomingEvents?: number;
}
export interface ITicket {
	id: string;
	name: string;
	description: string;
	priceMultiplier: number;
	features: string[];
	price: number;
}