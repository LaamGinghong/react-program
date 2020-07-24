import ora from 'ora'

function start() {
  const spin = ora()
  spin.start('启动服务中，请稍后...')
}

export default start
