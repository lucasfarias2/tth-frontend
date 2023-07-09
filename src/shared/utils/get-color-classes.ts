function getColorClasses(color: string) {
  let textColor, fillColor, bgColor, hex400, borderColor, bgLightColor;
  switch (color) {
    case 'red':
      textColor = 'text-red-400';
      fillColor = 'fill-red-400';
      bgColor = 'bg-red-400';
      hex400 = '#f87171'; // for 400
      borderColor = 'border-red-200';
      bgLightColor = 'bg-red-100';
      break;
    case 'blue':
      textColor = 'text-blue-400';
      fillColor = 'fill-blue-400';
      bgColor = 'bg-blue-400';
      hex400 = '#60a5fa'; // for 400
      borderColor = 'border-blue-200';
      bgLightColor = 'bg-blue-100';
      break;
    case 'cyan':
      textColor = 'text-cyan-400';
      fillColor = 'fill-cyan-400';
      bgColor = 'bg-cyan-400';
      hex400 = '#22d3ee'; // for 400
      borderColor = 'border-cyan-200';
      bgLightColor = 'bg-cyan-100';
      break;
    case 'yellow':
      textColor = 'text-yellow-400';
      fillColor = 'fill-yellow-400';
      bgColor = 'bg-yellow-400';
      hex400 = '#facc15'; // for 400
      borderColor = 'border-yellow-200';
      bgLightColor = 'bg-yellow-100';
      break;
    case 'orange':
      textColor = 'text-orange-400';
      fillColor = 'fill-orange-400';
      bgColor = 'bg-orange-400';
      hex400 = '#fb923c'; // for 400
      borderColor = 'border-orange-200';
      bgLightColor = 'bg-orange-100';
      break;
    case 'pink':
      textColor = 'text-pink-400';
      fillColor = 'fill-pink-400';
      bgColor = 'bg-pink-400';
      hex400 = '#f472b6'; // for 400
      borderColor = 'border-pink-200';
      bgLightColor = 'bg-pink-100';
      break;
    case 'purple':
      textColor = 'text-purple-400';
      fillColor = 'fill-purple-400';
      bgColor = 'bg-purple-400';
      hex400 = '#c084fc'; // for 400
      borderColor = 'border-purple-200';
      bgLightColor = 'bg-purple-100';
      break;
    case 'indigo':
      textColor = 'text-indigo-400';
      fillColor = 'fill-indigo-400';
      bgColor = 'bg-indigo-400';
      hex400 = '#818cf8'; // for 400
      borderColor = 'border-indigo-200';
      bgLightColor = 'bg-indigo-100';
      break;
    case 'green':
      textColor = 'text-green-400';
      fillColor = 'fill-green-400';
      bgColor = 'bg-green-400';
      hex400 = '#4ade80'; // for 400
      borderColor = 'border-green-200';
      bgLightColor = 'bg-green-100';
      break;
    case 'teal':
      textColor = 'text-teal-400';
      fillColor = 'fill-teal-400';
      bgColor = 'bg-teal-400';
      hex400 = '#2dd4bf'; // for 400
      borderColor = 'border-teal-200';
      bgLightColor = 'bg-teal-100';
      break;
    case 'gray':
      textColor = 'text-gray-400';
      fillColor = 'fill-gray-400';
      bgColor = 'bg-gray-400';
      hex400 = '#9ca3af'; // for 400
      borderColor = 'border-gray-200';
      bgLightColor = 'bg-gray-100';
      break;
    case 'emerald':
      textColor = 'text-emerald-400';
      fillColor = 'fill-emerald-400';
      bgColor = 'bg-emerald-400';
      hex400 = '#34d399'; // for 400
      borderColor = 'border-emerald-200';
      bgLightColor = 'bg-emerald-100';
      break;
    case 'rose':
      textColor = 'text-rose-400';
      fillColor = 'fill-rose-400';
      bgColor = 'bg-rose-400';
      hex400 = '#fb7185'; // for 400
      borderColor = 'border-rose-200';
      bgLightColor = 'bg-rose-100';
      break;
    case 'sky':
      textColor = 'text-sky-400';
      fillColor = 'fill-sky-400';
      bgColor = 'bg-sky-400';
      hex400 = '#38bdf8'; // for 400
      borderColor = 'border-sky-200';
      bgLightColor = 'bg-sky-100';
      break;
    case 'amber':
      textColor = 'text-amber-400';
      fillColor = 'fill-amber-400';
      bgColor = 'bg-amber-400';
      hex400 = '#fbbf24'; // for 400
      borderColor = 'border-amber-200';
      bgLightColor = 'bg-amber-100';
      break;
    default:
      textColor = 'text-neutral-400';
      fillColor = 'fill-neutral-400';
      bgColor = 'bg-neutral-400';
      hex400 = '#a3a3a3'; // for 400
      borderColor = 'border-neutral-200';
      bgLightColor = 'bg-blue-100';
      break;
  }
  return { textColor, fillColor, bgColor, hex400, borderColor, bgLightColor };
}

export default getColorClasses;
