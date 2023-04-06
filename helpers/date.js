const { format } = require('date-fns')

exports.dateToString = date => new Date(date).toISOString();

exports.date = date => format(date, 'dd/MM/yyyy')

exports.time = date => format(date, 'hh:mm')
