const {createLogger, transports, format} = require('winston')
const {combine,label,timestamp,printf} = format
const {Console,File} = transports
const path = require('path')

const myFormat = printf( ({ level,label, message, timestamp,stack }) => {
    return `${timestamp} [${label}] ${level}: ${stack ? stack : message}`;
  });

const serverLogger = createLogger({
    format: combine(
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        label({ label: path.basename(process.mainModule.filename) }),
        format.errors({ stack: true }),
        myFormat
     ),
    transports:[
        new File({filename: './logger/server-info-logs.log',level: 'info',}),
        new File({filename: './logger/server-error-logs.log',level: 'error',}),
        new Console({
            level: 'debug',
            format: format.combine(
              format.colorize(),
              myFormat
            )
          }) 
    ]
})

module.exports = {serverLogger}