'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import { Star } from 'lucide-react';

import CommonSelect from './CommonSelect';

const EventRating = () => {
  const [sortBy, setSortBy] = useState('most-recent');
  const [selectedStars, setSelectedStars] = useState<number | null>(null);

  const ratings = [
    {
      id: 1,
      name: 'Bessie Cooper',
      date: 'Feb 10, 2024',
      stars: 5,
      review:
        'Lorem ipsum dolor sit amet consectetur. Arcu a mollis viverra fermentum nibh eu consectetur duis. Diam nec bibendum quis egestas integer vel amet proin. Pulvinar scelerisque gravida sem at neque amet viverra. Et cursus et purus vulputate vestibulum sit.',
    },
    {
      id: 2,
      name: 'Bessie Cooper',
      date: 'Feb 10, 2024',
      stars: 5,
      review:
        'Lorem ipsum dolor sit amet consectetur. Arcu a mollis viverra fermentum nibh eu consectetur duis. Diam nec bibendum quis egestas integer vel amet proin. Pulvinar scelerisque gravida sem at neque amet viverra. Et cursus et purus vulputate vestibulum sit.',
    },
    {
      id: 3,
      name: 'Bessie Cooper',
      date: 'Feb 10, 2024',
      stars: 5,
      review:
        'Lorem ipsum dolor sit amet consectetur. Arcu a mollis viverra fermentum nibh eu consectetur duis. Diam nec bibendum quis egestas integer vel amet proin. Pulvinar scelerisque gravida sem at neque amet viverra. Et cursus et purus vulputate vestibulum sit.',
    },
  ];

  const ratingDistribution = [
    { stars: 5, count: 10, percentage: 100 },
    { stars: 4, count: 0, percentage: 0 },
    { stars: 3, count: 0, percentage: 0 },
    { stars: 2, count: 0, percentage: 0 },
    { stars: 1, count: 0, percentage: 0 },
  ];

  const sortOptions = [
    { value: 'most-recent', label: 'Most Recent' },
    { value: 'highest-rating', label: 'Highest Rating' },
  ];

  return (
    <div className="m-6 rounded-2xl bg-white p-6 font-diatype">
      <div className="flex items-center justify-between gap-1 pb-6">
        <h3 className="font-romie text-xl font-medium">Event Ratings</h3>
        <Image
          src="/images/Button_.svg"
          alt="Expand icon"
          className="cursor-pointer"
          height={46}
          width={42}
        />
      </div>

      <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-[400px_1fr]">
        <div className="rounded-2xl bg-ui-neutralInputBg p-5">
          <div className="mb-8 flex items-center justify-between gap-1">
            <div className="mb-3 font-romie text-6xl font-bold">5.0</div>
            <div className="flex justify-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} fill="#000000" />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {ratingDistribution.map(rating => {
              const isSelected = selectedStars === rating.stars;
              return (
                <div
                  key={rating.stars}
                  onClick={() =>
                    setSelectedStars(
                      selectedStars === rating.stars ? null : rating.stars
                    )
                  }
                  className={`flex cursor-pointer items-center gap-4 rounded-8 p-2 transition-colors ${
                    isSelected
                      ? 'bg-ui-neutralBorderDisabled hover:bg-ui-neutralBorderDisabled'
                      : 'bg-transparent'
                  } hover:bg-ui-neutralBorderDisabled/25`}
                >
                  <span className="w-3 text-base font-medium">
                    {rating.stars}
                  </span>

                  <div className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-ui-neutralSurfaceSupport">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-black' : 'bg-ui-neutralSurfaceSupport'
                      }`}
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h4 className="text-lg font-medium">10 Ratings</h4>
            <div className="w-full min-w-[200px] sm:w-auto">
              <div className="flex flex-col items-start gap-0.5">
                <span className="whitespace-nowrap text-sm text-ui-neutralSurfaceOnColor">
                  Sort By
                </span>
                <div className="flex-1 sm:min-w-[240px] sm:flex-initial">
                  <CommonSelect
                    label=""
                    value={sortBy}
                    placeholder="Most Recent"
                    onChange={val => setSortBy(val)}
                    options={sortOptions}
                    className="!rounded-12 !bg-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {ratings.map((rating, index) => (
              <div
                key={rating.id}
                className={`pb-6 ${
                  index !== ratings.length - 1 ? 'border-b border-gray-200' : ''
                }`}
              >
                <div className="flex flex-col items-end justify-between gap-3 px-2 pb-5 sm:flex-row">
                  <div>
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent font-diatype text-sm font-medium text-ui-neutralSurfaceOnColor" />
                      <div>
                        <h5 className="mb-2 text-base font-medium">
                          {rating.name}
                        </h5>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-black px-2 py-[5px] text-xs text-white">
                          <Image
                            src="/images/check-verified-02.svg"
                            alt="Verified icon"
                            className="cursor-pointer"
                            height={16}
                            width={16}
                          />{' '}
                          Member
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[...Array(rating.stars)].map((_, i) => (
                        <Star key={i} size={16} fill="#000000" />
                      ))}
                    </div>
                    <span className="whitespace-nowrap text-sm text-ui-neutralContentLight">
                      {rating.date}
                    </span>
                  </div>
                </div>
                <p className="text-[16px] font-medium leading-relaxed text-ui-neutralContentBody">
                  {rating.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRating;
