import React from 'react';

interface IProps {
  date: Date;
}

const PurchaseDate: React.FC<IProps> = ({ date }) => {
  const timeDifference = () => {
    const currentDate = new Date();
    const previousDate = new Date(date);
    const differenceInMilliseconds = currentDate.getTime() - previousDate.getTime();

    const millisecondsPerSecond = 1000;
    const millisecondsPerMinute = millisecondsPerSecond * 60;
    const millisecondsPerHour = millisecondsPerMinute * 60;
    const millisecondsPerDay = millisecondsPerHour * 24;
    const millisecondsPerWeek = millisecondsPerDay * 7;

    const weeks = Math.floor(differenceInMilliseconds / millisecondsPerWeek);
    const days = Math.floor((differenceInMilliseconds % millisecondsPerWeek) / millisecondsPerDay);

    // Check if the date is today
    if (
      currentDate.getDate() === previousDate.getDate() &&
      currentDate.getMonth() === previousDate.getMonth() &&
      currentDate.getFullYear() === previousDate.getFullYear()
    ) {
      return `Today (${formatDate(previousDate)})`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks === 1 ? '' : 's'} ago (${formatDate(previousDate)})`;
    } else if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'} ago (${formatDate(previousDate)})`;
    } else {
      return 'Just now';
    }
  };

  const formatDate = (date: Date) => {
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formattedDate;
  };

  return <div>{timeDifference()}</div>;
};

export default PurchaseDate;
