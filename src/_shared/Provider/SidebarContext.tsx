import type { SidebarContextType, SidebarProps } from "@/App/types";
import { SidebarContext } from "@/_Shared/Context/SidebarContext";
import { useState } from "react";


export const SidebarProvider: React.FC<SidebarProps> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    const value: SidebarContextType = {
        isCollapsed,
        onToggle,
    };
    return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};
