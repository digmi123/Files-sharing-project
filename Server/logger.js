const {createLogger, transports, format} = require('winston')

const serverLogger = createLogger({
    transports:[
        new transports.File({
            filename: './logger/server-successful-logs.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: './logger/server-error-logs.log',
            level: 'error',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = {serverLogger}