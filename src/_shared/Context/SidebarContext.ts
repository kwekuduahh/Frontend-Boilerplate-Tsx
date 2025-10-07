import { createContext } from 'react';
import type { SidebarContextType } from '@/App/types';

export const SidebarContext = createContext<SidebarContextType | undefined>(
	undefined
);
