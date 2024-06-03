import { Logging } from '../models';

class logger {
  public static error(message, organisation = null){
    Logging.create({organisation: organisation, loglevel: "error", logtext: message.toString()})
  }
  public static debug(message, organisation = null){
    Logging.create({organisation: organisation, loglevel: "debug", logtext: message.toString()})
  }
  public static info(message, organisation = null){
    Logging.create({organisation: organisation, loglevel: "info", logtext: message.toString()})
  }
}
export { logger };