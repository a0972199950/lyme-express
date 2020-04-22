import config from 'config'
import cors from 'cors'

class Cors {
  private opts = {
    origin: config.get<string>('frontendDomain')
  }

  init() {
    return () => cors(this.opts)
  }
}

export default new Cors().init()