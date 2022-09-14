import moment from 'moment'

export const parseMsToTime = (timeStamp: number, offset?: number) =>
  moment(timeStamp)
    .utcOffset(offset ? offset : 2)
    .format('HH:mm')

export const parseMsToDate = (timeStamp: number, offset?: number) =>
  moment(timeStamp)
    .utcOffset(offset ? offset : 2)
    .format('DD.MM.YYYY')
