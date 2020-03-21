export const Logger = (arg) => {
  if (arg.logType === undefined
    || arg.log === undefined){
    return;
  }
  const logType = arg.logType;
  const log = arg.log;
  switch(logType){
    case 'log':
      console.log(log);
      break;
    case 'error':
      console.error(log);
      break;
    default:
      console.log(log);
  }
}