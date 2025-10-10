import Dialog from '@/components/ui/dialog';

interface AboutEventSeriesProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutEventSeries: React.FC<AboutEventSeriesProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="About Lakers Season 2025"
      maxWidth="auto"
    >
      <div className="space-y-4 px-5 py-2 pb-[16px]">
        <p className="font-diatype text-[16px] !text-ui-neutralContentBody">
          Revolve Festival kicks off the 2023 Coachella festival season in
          style. Making a show-stopping return to the desert with its
          bigg...Revolve Festival kicks off the 2023 Coachella festival season
          in style. Making a show-stopping return to the desert with its
          bigg...Revolve Festival kicks off the 2023 Coachella festival season
          in style. Making a show-stopping return to the desert with its
          bigg...Revolve Festival kicks off the 2023 Coachella festival season
          in style. Making a show-stopping return to the desert with its
          biggest.
        </p>
      </div>
    </Dialog>
  );
};

export default AboutEventSeries;
