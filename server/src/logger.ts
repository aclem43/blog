const Colors: { [key: string]: string } = {
  red: '\x1b[31m%s\x1b[0m',
  yellow: '\x1b[33m%s\x1b[0m',
  green: '\x1b[32m%s\x1b[0m',

  reset: '\x1b[0m'
}

const log = (message: string, level: string, color: string) => {
  console.log(color, level, Colors.reset, message)
}
const toString = (message: unknown[]) => {
  return message.map((m) => (typeof m === 'string' ? m : JSON.stringify(m))).join(' ')
}

export const logger = {
  error: (...message: unknown[]) => log(toString(message), '[ERROR]', Colors.red),
  warn: (...message: unknown[]) => log(toString(message), '[WARN]', Colors.yellow),
  info: (...message: unknown[]) => log(toString(message), '[INFO]', Colors.green),
  log: (...message: unknown[]) => log(toString(message), '[INFO]', Colors.green)
}
