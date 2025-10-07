export type AnyProps = Record<string, unknown>;

export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
	avatar: string;
	registrationDate: string;
	registrationTime: string;
	orderCount: number;
	lifetimeValue: string;
	avgOrderValue: string;
	lastOrderDate: string;
	lastActivity: string;
	segment: string;
	status: string;
	billingAddress: string;
	shippingAddress: string;
	recentOrders: {
		id: string;
		date: string;
		items: number;
		total: string;
		status: string;
	}[];
	communications: {
		id: string;
		type: string;
		subject: string;
		preview: string;
		date: string;
		status: string;
		sender: string;
	}[];
	supportTickets: {
		id: string;
		subject: string;
		description: string;
		status: string;
		priority: string;
		created: string;
		updated: string;
		assignee: string;
	}[];
}
