
import { EmbedWrapper } from './app/script/embed/bootstrap/embed-wrapper';

window.addEventListener('message', (e) => {
  if (e.origin !== window.location.origin) return
  const data = e.data
  if (data.type === 'open-project') {
    const size: {
      width: number
      height: number
    } = data.size
    const defaultData: URL = data.data
    const klecks = new EmbedWrapper({
      embedUrl: '',
      // disableAutoFit: true,
      onSubmit: (onSuccess, onError) => {
        const data = klecks.getPNG?.()
        if (data) {
          window.parent.postMessage({ type: 'save', data }, '*')
          onSuccess()
        } else {
          window.parent.postMessage(
            { type: 'error', message: 'Failed to save image' },
            '*'
          )
          onError()
        }
      },
    })
    const image = new Image()
    image.src = defaultData.toString()
    image.onload = () => {
      klecks.openProject({
        width: size.width,
        height: size.height,
        layers: [
          {
            name: 'Background',
            isVisible: true,
            opacity: 1,
            mixModeStr: 'source-over',
            image: image,
          },
        ],
      })
    }
  }
})
