import { createIcons, Menu, X, Sun, Moon, Settings, LogOut, LayoutDashboard, UserPlus,
    MapPin, Users, FileText, ScanLine, MessageSquare, School, Plus, Pencil, Trash2,
    AlertTriangle, XCircle, KeyRound, UserCog, CircleAlert, LocateFixed, LoaderCircle,
    BookOpen, Info, CalendarDays, Clock, Eye, Table2, History, Download,
    ThumbsUp, ThumbsDown, Check, Send, Crosshair, Copy, Search,
} from 'lucide';

/* Central Lucide icon registry. Every icon used anywhere in the app (Blade
   <x-icon> or data-lucide attributes in JS-injected markup) must be listed
   here — createIcons only replaces the names it has been given. */

const iconRegistry = {
    Menu, X, Sun, Moon, Settings, LogOut, LayoutDashboard, UserPlus,
    MapPin, Users, FileText, ScanLine, MessageSquare, School, Plus, Pencil, Trash2,
    AlertTriangle, XCircle, KeyRound, UserCog, CircleAlert, LocateFixed, LoaderCircle,
    BookOpen, Info, CalendarDays, Clock, Eye, Table2, History, Download,
    ThumbsUp, ThumbsDown, Check, Send, Crosshair, Copy, Search,
};

/* Replace all <i data-lucide="…"> placeholder elements with inline SVGs.
   Call once on page load (app.js) and again after any innerHTML injection
   that contains icons (modals, tables, dynamically rendered rows). */
export function refreshIcons() {
    createIcons({ icons: iconRegistry });
}
