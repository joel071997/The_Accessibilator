import React, { FC, PropsWithChildren } from 'react';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';

// Type definition for the InfoTooltip component's props
type InfoTooltipProps = PropsWithChildren<{
  infoTip: string;
  position?: string;
}>;

// Defining the InfoTooltip component
const InfoTooltip: FC<InfoTooltipProps> = ({ children, infoTip, position }) => {
  // Default class for tooltip position, can be overridden based on the 'position' prop
  let positionClass = `daisy-tooltip-${position || 'right'}`;

  // Switch statement to determine the positionClass based on the 'position' prop
  switch (position) {
    case 'left':
      positionClass = 'md:daisy-tooltip-left';
      break;
    case 'right':
      positionClass = 'md:daisy-tooltip-right';
      break;
    case 'top':
      positionClass = 'md:daisy-tooltip-top';
      break;
    case 'bottom':
      positionClass = 'md:daisy-tooltip-bottom';
      break;

    default:
      positionClass = 'md:daisy-tooltip-right';
      break;
  }

  // Render the tooltip component
  return (
    <div className='relative inline-block'>
      {/* Tooltip container with dynamic positioning */}
      <div
        className={`daisy-tooltip ${positionClass} absolute -right-7 -top-2 z-40 inline-flex whitespace-pre-wrap text-3xl before:px-4 before:py-3 before:text-left before:text-xl md:-right-6 md:before:text-base`}
        data-tip={infoTip}
      >
        <span className='inline-flex items-center justify-center'>
          {/* Tooltip icon */}
          <InformationCircleIcon
            className='h-6 w-6 md:h-5 md:w-5'
            aria-description='Show Tooltip'
          />
        </span>
      </div>
      {/* Children elements wrapped by the tooltip */}
      {children}
    </div>
  );
};

export default InfoTooltip;
