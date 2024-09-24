// app/components/Timeline.tsx

'use client';

import React, { useState } from 'react';
import { Event } from '@/types';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Card } from './ui/card';
import CardHeader from './ui/cardheader';
import CardBody from './ui/cardbody';
import { Button }  from './ui/button';

interface TimelineItemProps {
  event: Event;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event }) => {
  return (
    <li className="mb-10 ml-6">
      <div className="absolute w-3 h-3 bg-blue-600 rounded-full mt-1.5 -left-1.5 border border-white"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400">
        {new Date(event.date).toLocaleDateString()}
      </time>
      <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
      <p className="mb-4 text-base font-normal text-gray-500">{event.description}</p>
    </li>
  );
};

interface TimelineProps {
  events: Event[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const visibleEvents = isExpanded ? events : events.slice(0, 3); // Show 3 by default

  return (
    <Card className="p-4 mb-6 bg-white rounded-lg shadow">
      <CardHeader className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Upcoming Events</h2>
        <Button variant="link" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? (
            <>
              Show Less <FiChevronUp className="ml-1" />
            </>
          ) : (
            <>
              Show More <FiChevronDown className="ml-1" />
            </>
          )}
        </Button>
      </CardHeader>
      <CardBody>
        <ol className="relative border-l border-gray-200">
          {visibleEvents.map((event, index) => (
            <TimelineItem event={event} key={index} />
          ))}
        </ol>
      </CardBody>
    </Card>
  );
};

export default Timeline;
