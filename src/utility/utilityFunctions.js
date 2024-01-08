import { indigo } from "@radix-ui/colors";

function calcSecondsToDhms(seconds){
  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;
  return [days,hours,minutes];
}

function secondsToDhms(data) {
    let seconds = data.nextAiringEpisode.timeUntilAiring
    let episode = data.nextAiringEpisode.episode
    const [days,hours,minutes]=calcSecondsToDhms(seconds)
    if(days===0) return `Ep ${episode} airs in ${hours} Hours`;
    if(days===0 && hours===0) return`Ep ${episode} airs in ${minutes} Mins`;
    return `Ep ${episode} airs in ${days} Days`;
}
  
function nextEpCounter(data){
  let seconds=data.timeUntilAiring;
  let episode=data.episode;
  const [days,hours,minutes]=calcSecondsToDhms(seconds);
  let airingTime = `Ep ${episode}:`;

    if (days !== 0) {
      airingTime += ` ${days}d`;
    }

    if (hours !== 0) {
      airingTime += ` ${hours}h`;
    }

    airingTime += ` ${minutes}m`;

    return airingTime;
}
function timeUntilAiring(data){
  let seconds=data.timeUntilAiring;
  let episode=data.episode;
  const [days,hours,minutes]=calcSecondsToDhms(seconds);
  let airingTime = ``;
  if (days !== 0) {
    airingTime += `${days} Day`;
  }

  if (hours !== 0) {
    airingTime += ` ${hours} Hrs`;
  }

  airingTime += ` ${minutes} Mins`;

  return airingTime;
}

  function capitalizeString(uppercaseString) {
    // Convert the first character to uppercase and concatenate it with the rest of the string in lowercase
    return uppercaseString.charAt(0).toUpperCase() + uppercaseString.slice(1).toLowerCase();
  }
  
  function TitleCase(inputString) {
    return inputString?.replace(/\w\S*/g, function(word) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase().replace(/_/g,' ');
    });
}
export function calculateDuration(minutes) {
  if (typeof minutes !== 'number' || minutes < 0) {
      return 'Invalid input';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hoursText = hours > 0 ? `${hours} ${hours === 1 ? 'Hour' : 'Hours'}` : '';
  const minutesText = remainingMinutes > 0 ? `${remainingMinutes} ${remainingMinutes === 1 ? 'Min' : 'Mins'}` : '';

  // Combine hours and minutes for a formatted duration
  const durationText = [hoursText, minutesText].filter(Boolean).join(', ');

  return durationText || '0 minutes';
}
  export  {timeUntilAiring,secondsToDhms,capitalizeString,nextEpCounter,TitleCase} 