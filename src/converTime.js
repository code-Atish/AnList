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
    if(days===0) return `Ep ${episode} airs in ${hours} Hours`
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
  function truncateSentence(sentence,length=45) {
    const maxLength=length;
    if (sentence?.length <= maxLength) {
      return sentence;
    } else {
      // Truncate the sentence and add "..." at the end
      return sentence?.substring(0, maxLength) + "...";
    }
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
  export  {timeUntilAiring,secondsToDhms,truncateSentence,capitalizeString,nextEpCounter,TitleCase} 