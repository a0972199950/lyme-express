import webpush from 'web-push'
import config from 'config'

interface IPushConfig {
  endpoint: string
  keys: {
    auth: string
    p256dh: string
  }
}

class WebpushHelper {
  private email: string = config.get('email')
  private publicKey: string = config.get('vapid.publicKey')
  private privateKey: string = config.get('vapid.privateKey')

  public init() {
    webpush.setVapidDetails(
      `mailto:${this.email}`,
      this.publicKey,
      this.privateKey
    )
  }

  public sendNotification(pushConfig: IPushConfig, payload: string) {
    return webpush.sendNotification(pushConfig, payload)
  }
}

export default new WebpushHelper()
