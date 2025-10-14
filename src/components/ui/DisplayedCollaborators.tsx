'use client';

import Dialog from '@/components/ui/dialog';

interface DisplayedCollaboratorsProps {
  isOpen: boolean;
  onClose: () => void;
}
interface Collaborator {
  name: string;
  role: string;
  type?: 'host' | 'co-host' | 'sponsor';
}
const collaborators: Collaborator[] = [
  { name: 'Uncommon Entertainment', role: 'Host', type: 'host' },
  { name: 'Rumor Entertainment', role: 'Co-Host', type: 'co-host' },
  { name: 'Don Julio', role: 'Sponsor', type: 'sponsor' },
  { name: 'Johnny Walker', role: 'Sponsor', type: 'sponsor' },
  { name: 'King Tide', role: 'Sponsor', type: 'sponsor' },
];
const CollaboratorCard = ({ name, role }: Collaborator) => (
  <div className="flex flex-col gap-2 rounded-lg bg-ui-neutralSurfaceBackground px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ui-neutralSurfaceSupport font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor" />
      <span className="font-romie text-[16px] font-medium text-ui-neutralSurfaceOnColor">
        {name}
      </span>
      <span className="rounded-full bg-ui-neutralSurfaceSupport px-2.5 py-1.5 font-diatype text-[13px] font-normal">
        {role}
      </span>
    </div>
  </div>
);
const DisplayedCollaborators: React.FC<DisplayedCollaboratorsProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Displayed Collaborators"
      discription="Collaborators displayed in event listing."
    >
      <div className="space-y-4 px-5 py-2">
        {collaborators.map((collaborator, index) => (
          <CollaboratorCard key={index} {...collaborator} />
        ))}
      </div>
    </Dialog>
  );
};

export default DisplayedCollaborators;
