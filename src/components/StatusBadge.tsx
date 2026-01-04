import { motion } from 'framer-motion';

type StatusType = 'mapped' | 'partial' | 'unmapped';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

const statusConfig = {
  mapped: {
    className: 'status-mapped',
    defaultLabel: 'Mapped'
  },
  partial: {
    className: 'status-partial',
    defaultLabel: 'Partial'
  },
  unmapped: {
    className: 'status-unmapped',
    defaultLabel: 'Not Mapped'
  }
};

export const StatusBadge = ({ status, label }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`status-badge ${config.className}`}
    >
      {label || config.defaultLabel}
    </motion.span>
  );
};

interface MappingTypeBadgeProps {
  type: 'exact' | 'broader' | 'narrower' | 'related';
}

const typeConfig = {
  exact: { label: 'Exact Match', className: 'bg-success/10 text-success' },
  broader: { label: 'Broader', className: 'bg-primary/10 text-primary' },
  narrower: { label: 'Narrower', className: 'bg-warning/10 text-warning' },
  related: { label: 'Related', className: 'bg-muted text-muted-foreground' }
};

export const MappingTypeBadge = ({ type }: MappingTypeBadgeProps) => {
  const config = typeConfig[type];

  return (
    <motion.span
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`status-badge ${config.className}`}
    >
      {config.label}
    </motion.span>
  );
};
