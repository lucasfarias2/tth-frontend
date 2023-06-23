function getColorClasses(color: string) {
  let textColor, fillColor;
  switch (color) {
    case 'red':
      textColor = 'text-red-500';
      fillColor = 'fill-red-500';
      break;
    case 'blue':
      textColor = 'text-blue-500';
      fillColor = 'fill-blue-500';
      break;
    case 'cyan':
      textColor = 'text-cyan-500';
      fillColor = 'fill-cyan-500';
      break;
    case 'yellow':
      textColor = 'text-yellow-500';
      fillColor = 'fill-yellow-500';
      break;
    case 'orange':
      textColor = 'text-orange-500';
      fillColor = 'fill-orange-500';
      break;
    case 'pink':
      textColor = 'text-pink-500';
      fillColor = 'fill-pink-500';
      break;
    case 'purple':
      textColor = 'text-purple-500';
      fillColor = 'fill-purple-500';
      break;
    case 'indigo':
      textColor = 'text-indigo-500';
      fillColor = 'fill-indigo-500';
      break;
    case 'green':
      textColor = 'text-green-500';
      fillColor = 'fill-green-500';
      break;
    case 'teal':
      textColor = 'text-teal-500';
      fillColor = 'fill-teal-500';
      break;
    case 'gray':
      textColor = 'text-gray-500';
      fillColor = 'fill-gray-500';
      break;
    case 'black':
      textColor = 'text-black';
      fillColor = 'fill-black';
      break;
    case 'emerald':
      textColor = 'text-emerald-500';
      fillColor = 'fill-emerald-500';
      break;
    case 'rose':
      textColor = 'text-rose-500';
      fillColor = 'fill-rose-500';
      break;
    case 'sky':
      textColor = 'text-sky-500';
      fillColor = 'fill-sky-500';
      break;
    case 'amber':
      textColor = 'text-amber-500';
      fillColor = 'fill-amber-500';
      break;
    default:
      textColor = 'text-gray-500';
      fillColor = 'fill-gray-500';
      break;
  }
  return { textColor, fillColor };
}

export default getColorClasses;
