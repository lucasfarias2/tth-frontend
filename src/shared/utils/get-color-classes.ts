function getColorClasses(color: string) {
  let textColor, fillColor, bgColor, hex400;
  switch (color) {
    case 'red':
      textColor = 'text-red-400';
      fillColor = 'fill-red-400';
      bgColor = 'bg-red-400';
      hex400 = '#f87171'; // for 400
      break;
    case 'blue':
      textColor = 'text-blue-400';
      fillColor = 'fill-blue-400';
      bgColor = 'bg-blue-400';
      hex400 = '#60a5fa'; // for 400
      break;
    case 'cyan':
      textColor = 'text-cyan-400';
      fillColor = 'fill-cyan-400';
      bgColor = 'bg-cyan-400';
      hex400 = '#22d3ee'; // for 400
      break;
    case 'yellow':
      textColor = 'text-yellow-400';
      fillColor = 'fill-yellow-400';
      bgColor = 'bg-yellow-400';
      hex400 = '#facc15'; // for 400
      break;
    case 'orange':
      textColor = 'text-orange-400';
      fillColor = 'fill-orange-400';
      bgColor = 'bg-orange-400';
      hex400 = '#fb923c'; // for 400
      break;
    case 'pink':
      textColor = 'text-pink-400';
      fillColor = 'fill-pink-400';
      bgColor = 'bg-pink-400';
      hex400 = '#f472b6'; // for 400
      break;
    case 'purple':
      textColor = 'text-purple-400';
      fillColor = 'fill-purple-400';
      bgColor = 'bg-purple-400';
      hex400 = '#c084fc'; // for 400
      break;
    case 'indigo':
      textColor = 'text-indigo-400';
      fillColor = 'fill-indigo-400';
      bgColor = 'bg-indigo-400';
      hex400 = '#818cf8'; // for 400
      break;
    case 'green':
      textColor = 'text-green-400';
      fillColor = 'fill-green-400';
      bgColor = 'bg-green-400';
      hex400 = '#4ade80'; // for 400
      break;
    case 'teal':
      textColor = 'text-teal-400';
      fillColor = 'fill-teal-400';
      bgColor = 'bg-teal-400';
      hex400 = '#2dd4bf'; // for 400
      break;
    case 'gray':
      textColor = 'text-gray-400';
      fillColor = 'fill-gray-400';
      bgColor = 'bg-gray-400';
      hex400 = '#9ca3af'; // for 400
      break;
    case 'emerald':
      textColor = 'text-emerald-400';
      fillColor = 'fill-emerald-400';
      bgColor = 'bg-emerald-400';
      hex400 = '#34d399'; // for 400
      break;
    case 'rose':
      textColor = 'text-rose-400';
      fillColor = 'fill-rose-400';
      bgColor = 'bg-rose-400';
      hex400 = '#fb7185'; // for 400
      break;
    case 'sky':
      textColor = 'text-sky-400';
      fillColor = 'fill-sky-400';
      bgColor = 'bg-sky-400';
      hex400 = '#38bdf8'; // for 400
      break;
    case 'amber':
      textColor = 'text-amber-400';
      fillColor = 'fill-amber-400';
      bgColor = 'bg-amber-400';
      hex400 = '#fbbf24'; // for 400
      break;
    default:
      textColor = 'text-neutral-400';
      fillColor = 'fill-neutral-400';
      bgColor = 'bg-neutral-400';
      hex400 = '#a3a3a3'; // for 400
      break;
  }
  return { textColor, fillColor, bgColor, hex400 };
}

export default getColorClasses;
