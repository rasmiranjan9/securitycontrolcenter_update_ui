// apps/web/src/features/user-role-assign/components/AssignmentFilters.tsx
// Vanilla spec — Filter tabs with underline active style.

import { useState } from 'react';
import { makeStyles, mergeClasses } from '@fluentui/react-components';
import { 
  SearchRegular,
  ListRegular,
  CheckmarkCircleRegular,
  DismissCircleRegular
} from '@fluentui/react-icons';

export type StatusFilter = 'ALL' | 'ACTIVE' | 'INACTIVE';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px 24px',
    position: 'sticky',
    top: 0,
    zIndex: 30,
    backgroundColor: '#ffffff',
  },

  // ── Search row — icon bahar, input wrapper alag ──
  searchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
  },
  searchIcon: {
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },
  searchInputWrapper: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    height: '40px',
    padding: '0 14px',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#374151',
    padding: '0',
    height: '100%',
    fontFamily: 'inherit',
    WebkitAppearance: 'none',
    appearance: 'none',
    '::placeholder': {
      color: '#9ca3af',
      fontSize: '14px',
    },
  },

  // ── Baki sab same ──
  tabRow: {
    display: 'inline-flex',
    backgroundColor: '#f1f3f5',
    borderRadius: '10px',
    padding: '4px',
    gap: '4px',
    width: 'fit-content',
  },
  tabIcon: {
    display: 'flex',
    alignItems: 'center',
    color: '#276dab',
  },
  tab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    fontSize: '14px',
    color: '#555',
    cursor: 'pointer',
    fontFamily: 'inherit',
    border: 'none',
    borderRadius: '8px',
    background: 'transparent',
    ':hover': {
      backgroundColor: '#e9ecef',
    },
  },
  tabActive: {
    backgroundColor: '#ffffff',
    color: '#193e6b',
    fontWeight: 600,
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
    selectors: {
      '& span': {
        color: '#0d6efd',
      },
    },
  },
  iconActive: {
    color: '#28a745',
  },
  iconInactive: {
    color: '#0d6efd',
  },
  tabDot: {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    flexShrink: 0,
  },
  dotAll:      { backgroundColor: '#999999' },
  dotActive:   { backgroundColor: '#28a745' },
  dotInactive: { backgroundColor: '#666666' },
});

interface FilterTab {
  id: StatusFilter;
  label: string;
  icon: React.ReactNode;
}

export interface AssignmentFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (filter: StatusFilter) => void;
}

export function AssignmentFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: AssignmentFiltersProps) {
  const styles = useStyles();
  const [focused, setFocused] = useState(false); // ✅ focus state

  const tabs: FilterTab[] = [
    { id: 'ALL',      label: 'All Assignments', icon: <ListRegular fontSize={16} /> },
    { id: 'ACTIVE',   label: 'Active',          icon: <CheckmarkCircleRegular fontSize={16} /> },
    { id: 'INACTIVE', label: 'Inactive',        icon: <DismissCircleRegular fontSize={16} /> },
  ];

  return (
    <div className={styles.wrapper}>

      {/* ── Search bar ── */}
      <div className={styles.searchRow}>
        {/* Icon — bahar */}
        <span className={styles.searchIcon}>
          <SearchRegular fontSize={18} />
        </span>
        {/* Input wrapper — border yahan */}
        <div
          className={styles.searchInputWrapper}
          style={focused ? {
            border: '1px solid #c7d2fe',
            boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
          } : undefined}
        >
          <input
            className={styles.searchInput}
            type="search"
            placeholder="Search by User, Role, Solution, Module, Reason, or Assigned By..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            aria-label="Search assignments"
          />
        </div>
      </div>

      {/* ── Filter pill tabs — same as before ── */}
      <div className={styles.tabRow} role="tablist" aria-label="Filter by status">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={statusFilter === tab.id}
            className={mergeClasses(styles.tab, statusFilter === tab.id && styles.tabActive)}
            onClick={() => onStatusFilterChange(tab.id)}
          >
            <span className={styles.tabIcon}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

    </div>
  );
}