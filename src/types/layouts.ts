import type { User } from ".";

export interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<unknown>;
    path: string;
    badge?: number;
}

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface NavbarProps {
    onMenuToggle: () => void;
    user: User;
    isDark: boolean;
    onToggleDark: () => void;
}
