export interface BaseEntity {
	id?: string | number;
}

export interface SidebarContextType {
	isCollapsed?: boolean;
	onToggle?: () => void;
	className?: string;
}

export interface SidebarProps {
	children: React.ReactNode;
}
